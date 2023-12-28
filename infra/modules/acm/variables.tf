variable "domain" {
  description = "Domain Name for generating the SSL Cert"
  type        = string
}

variable "zone_id" {
  description = "Hosted Zone ID of AWS"
  type        = string
}

variable "app_name" {
  description = "Name of the application"
  type        = string
}
