terraform {
  required_version = ">= 1.6.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    google = {
      source  = "hashicorp/google"
      version = "~> 6.0"
    }
    archive = {
      source  = "hashicorp/archive"
      version = "~> 2.4"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

provider "google" {
  project = var.gcp_project_id
  region  = var.gcp_region
}

# -----------------------------------------------------------------------------
# AWS Free Tier: Lambda + HTTP API Gateway (1M requests/mo free)
# -----------------------------------------------------------------------------
data "archive_file" "contact_lambda_zip" {
  type        = "zip"
  source_dir  = "${path.module}/../../services/aws-contact-lambda/dist"
  output_path = "${path.module}/.build/contact-lambda.zip"
}

resource "aws_iam_role" "contact_lambda_role" {
  name = "portfolio-contact-lambda-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "lambda.amazonaws.com"
      }
    }]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_logs" {
  role       = aws_iam_role.contact_lambda_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_lambda_function" "contact_handler" {
  function_name    = "portfolio-contact-handler"
  role             = aws_iam_role.contact_lambda_role.arn
  handler          = "handler.handler"
  runtime          = "nodejs22.x"
  filename         = data.archive_file.contact_lambda_zip.output_path
  source_code_hash = data.archive_file.contact_lambda_zip.output_base64sha256
  memory_size      = 128
  timeout          = 5

  environment {
    variables = {
      ALLOWED_ORIGIN = var.allowed_origin
    }
  }
}

resource "aws_apigatewayv2_api" "contact_api" {
  name          = "portfolio-contact-http-api"
  protocol_type = "HTTP"

  cors_configuration {
    allow_origins = [var.allowed_origin]
    allow_methods = ["GET", "POST", "OPTIONS"]
    allow_headers = ["Content-Type"]
  }
}

resource "aws_apigatewayv2_integration" "lambda_integration" {
  api_id                 = aws_apigatewayv2_api.contact_api.id
  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.contact_handler.invoke_arn
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "health_route" {
  api_id    = aws_apigatewayv2_api.contact_api.id
  route_key = "GET /health"
  target    = "integrations/${aws_apigatewayv2_integration.lambda_integration.id}"
}

resource "aws_apigatewayv2_route" "contact_route" {
  api_id    = aws_apigatewayv2_api.contact_api.id
  route_key = "POST /contact"
  target    = "integrations/${aws_apigatewayv2_integration.lambda_integration.id}"
}

resource "aws_apigatewayv2_stage" "default" {
  api_id      = aws_apigatewayv2_api.contact_api.id
  name        = "$default"
  auto_deploy = true
}

resource "aws_lambda_permission" "apigw_invoke" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.contact_handler.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.contact_api.execution_arn}/*/*"
}

# -----------------------------------------------------------------------------
# GCP Always Free Tier: Cloud Run (2M requests/mo, scale-to-zero)
# -----------------------------------------------------------------------------
resource "google_cloud_run_v2_service" "analytics_api" {
  name     = "portfolio-analytics-api"
  location = var.gcp_region

  template {
    scaling {
      min_instance_count = 0
      max_instance_count = 2
    }

    containers {
      image = var.gcp_container_image
      ports {
        container_port = 8080
      }
      resources {
        limits = {
          cpu    = "1"
          memory = "256Mi"
        }
        cpu_idle = true
      }
      env {
        name  = "ALLOWED_ORIGINS"
        value = var.allowed_origin
      }
    }
  }
}

resource "google_cloud_run_v2_service_iam_member" "public_access" {
  project  = var.gcp_project_id
  location = google_cloud_run_v2_service.analytics_api.location
  name     = google_cloud_run_v2_service.analytics_api.name
  role     = "roles/run.invoker"
  member   = "allUsers"
}
