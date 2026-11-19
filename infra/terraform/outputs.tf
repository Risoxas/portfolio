output "aws_contact_api_url" {
  description = "Set this as AWS_CONTACT_API_URL in Vercel Environment Variables"
  value       = aws_apigatewayv2_api.contact_api.api_endpoint
}

output "gcp_analytics_api_url" {
  description = "Set this as GCP_API_URL in Vercel Environment Variables"
  value       = google_cloud_run_v2_service.analytics_api.uri
}
