locals {
  url = "${var.app_name}.${var.domain}"
}

data aws_availability_zones available {
}

data "aws_route53_zone" "default" {
  name = "${var.domain}."
}

module "acm" {
  source = "./modules/acm"

  zone_id     = data.aws_route53_zone.default.zone_id
  domain      = local.url
  app_name    = var.app_name
}
