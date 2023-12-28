module "cloudfront" {
  source = "./modules/cloudfront"

  hosted_zone = var.domain
  domain_name = local.url
  acm_certificate_arn = module.acm.acm_arn
  region = var.region
}
