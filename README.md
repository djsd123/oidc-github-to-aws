# OIDC GitHub to AWS

Configures AWS to trust GitHub as a federated auth provider

[terraform]: https://www.terraform.io/downloads
[hashicorp/aws]: https://registry.terraform.io/providers/hashicorp/aws

## Requirements

| Name            | Version |
|-----------------|---------|
| [terraform]     | ~> 1.3  |
| [hashicorp/aws] | ~> 4.x  |


## Inputs

| Name     | Description                                                                                                      | Type     | Default   | Required |
|----------|------------------------------------------------------------------------------------------------------------------|----------|-----------|:--------:|
| org_name | The name of the GitHub Org. i.e. I have no org so I just use my username: `djsd123` Common name for all resources. | `string` | `djsd123` |    no    |


## Usage

Modify state in [versions.tf](terraform/versions.tf) to your own

**Initialise**

```shell
terraform init
```

**Plan**

```shell
terraform plan
```

**Apply**

```shell
terraform apply -var org_name=<GitHub ORG NAME> -auto-approve
```

## Outputs

| Name     | Description                                        |
|----------|----------------------------------------------------|
| role_arn | The ARN of the resulting role that will be created |


**Note**

This will allow an entire Org to authenticate with AWS.  Ideally (Best Practice) you would want to scope to a particular 
respository in [data.tf](terraform/data.tf) Line 16. i.e. `repo:djsd123/oidc-github-to-aws:*` or `repo:hashicorp/terraform-provider-aws:*`


```terraform
    condition {
      test     = "StringLike"
      values   = ["repo:<ORG NAME>/<REPO NAME>:*"]
      variable = "token.actions.githubusercontent.com:sub"
    }
```
