terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }

  backend "s3" {
    acl     = "private"
    bucket  = "kel-pulumi-inf-state"
    encrypt = "true"
    key     = "terraform/tf-oidc-gh-to-aws"
    region  = "eu-west-1"
    #    kms_key_id = ""
  }

  required_version = ">= 1.3.0, < 2.0.0"
}

provider "aws" {
  default_tags {
    tags = {
      Provider = "GitHub"
      Org      = "djsd123"
      Home     = "github.com/djsd123"
    }
  }
}
