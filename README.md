# OIDC GitHub to AWS

Configures AWS to trust GitHub as a federated auth provider

[terraform]: https://www.terraform.io/downloads
[hashicorp/aws]: https://registry.terraform.io/providers/hashicorp/aws
[pulumi]: https://www.pulumi.com/docs/get-started/install/
[node]: https://nodejs.org/en/download/package-manager/

## Requirements

| Name            | Version            |
|-----------------|--------------------|
| [terraform]     | ~> 1.3             |
| [hashicorp/aws] | ~> 4.x             |
| [Pulumi]        | >= 3.49.0, < 4.0.0 |
| [node]          | >= 16.x, < 17.x    |


## Inputs

| Name       | Description                                                                         | Type     | Default   | Required |
|------------|-------------------------------------------------------------------------------------|----------|-----------|:--------:|
| `org_name` | The name of the GitHub Org. i.e. I have no org so I just use my username: `djsd123` | `string` | `djsd123` |    no    |


## Terraform Usage

```shell
cd terraform
```

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


## Pulumi Usage

```shell
cd pulumi
```

**Set required environment variables**

```shell
export PULUMI_PREFER_YARN=true
export PULUMI_BACKEND_URL=<STATE BUCKET NAME>
```

**Install Dependencies**

```shell
yarn install
```

**Initialise**

```shell
pulumi stack init
```

**Plan/Preview**

```shell
pulumi preview
```

**Update/Apply**

```shell
pulumi up
```

## Outputs

| Name                   | Description                                        |
|------------------------|----------------------------------------------------|
| `role_arn` / `roleArn` | The ARN of the resulting role that will be created |


### Note

At present this config will allow an entire Org to authenticate with AWS.  Ideally (Best Practice) you would want to scope to a particular 
repository in [data.tf](terraform/data.tf) Line 16 / [iam.ts](pulumi/iam.ts) Line 28.  i.e. `repo:djsd123/oidc-github-to-aws:*` or `repo:hashicorp/terraform-provider-aws:*`


**HCL**

```terraform
    condition {
      test     = "StringLike"
      values   = ["repo:<ORG NAME>/<REPO NAME>:*"]
      variable = "token.actions.githubusercontent.com:sub"
    }
```


**TypeScript**

```typescript
    conditions: [
        {
            test: 'StringLike',
            values: [`repo:<ORG NAME>/<REPO NAME>:*`],
            variable: 'token.actions.githubusercontent.com:sub'
        }
    ]
```
