output "cloudfront_domain_name" {
  value = module.cloudfront.cloudfront_domain_name
}

output "cloudfront_distribution_id" {
  value = module.cloudfront.cloudfront_dist_id
}

output "s3_bucket_id" {
  value = module.cloudfront.s3_bucket_id
}
