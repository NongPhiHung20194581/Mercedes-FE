terraform {
    required_providers {        
        # AWS Cloud Provider
        aws = {
            source  = "hashicorp/aws"
            version = "4.52"
        }

        # Provider to interact with the local system
        local = {
            source  = "hashicorp/local"
            version = "2.3"
        }

    }

    required_version = ">= 1.1.0"
}

provider "aws" {
    region = var.region
}