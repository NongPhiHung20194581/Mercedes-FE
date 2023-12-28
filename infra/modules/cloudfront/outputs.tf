output "cloudfront_domain_name" {
  value = aws_cloudfront_distribution.s3_distribution.domain_name
}

output "cloudfront_dist_id" {
  value = aws_cloudfront_distribution.s3_distribution.id
}

output "website_address" {
  value = var.domain_name
}

output "s3_bucket_id" {
  value = aws_s3_bucket.s3_bucket.id
}
