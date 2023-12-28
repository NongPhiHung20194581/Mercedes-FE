variable "domain" {
  description = "The FQDN domain"
  type        = string
}

variable "app_name" {
  description = "The name of the application"
  type        = string
}

variable "region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}
