data "aws_caller_identity" "current" {}

data "aws_iam_policy_document" "gh_assume" {
  statement {
    sid     = "GithubOidc"
    effect  = "Allow"
    actions = ["sts:AssumeRoleWithWebIdentity"]

    principals {
      identifiers = ["arn:aws:iam::${data.aws_caller_identity.current.account_id}:oidc-provider/token.actions.githubusercontent.com"]
      type        = "Federated"
    }

    condition {
      test     = "StringLike"
      values   = ["repo:${var.org_name}/*:*"]
      variable = "token.actions.githubusercontent.com:sub"
    }

    condition {
      test     = "StringEquals"
      values   = ["sts.amazonaws.com"]
      variable = "token.actions.githubusercontent.com:aud"
    }
  }
}

data "aws_iam_policy" "administrator" {
  name = "AdministratorAccess"
}
