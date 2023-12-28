variable "domain_name" {
  description = "Domain name"
}

variable "tags" {
  type        = map(string)
  default     = {}
  description = "tags for all the resources, if any"
}

variable "hosted_zone" {
  default     = null
  description = "Route53 hosted zone"
}

variable "acm_certificate_arn" {
  default     = null
  description = "AWS ACM certificate ARN"
}

variable "region" {
  default     = "us-east-1"
  description = "AWS region"
}
