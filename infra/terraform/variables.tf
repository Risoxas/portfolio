variable "aws_region" {
  description = "AWS region for Lambda & HTTP API Gateway"
  type        = string
  default     = "us-east-1"
}

variable "gcp_project_id" {
  description = "Google Cloud Project ID for Cloud Run"
  type        = string
}

variable "gcp_region" {
  description = "GCP region eligible for Cloud Run Always Free Tier"
  type        = string
  default     = "us-central1"
}

variable "gcp_container_image" {
  description = "Container image URI for services/gcp-analytics-api"
  type        = string
}

variable "allowed_origin" {
  description = "Vercel frontend origin for CORS"
  type        = string
  default     = "*"
}
