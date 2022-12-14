resource "aws_iam_role" "gh_oidc_role" {
  name               = "${var.org_name}-github-oidc-role"
  assume_role_policy = data.aws_iam_policy_document.gh_assume.json
}

resource "aws_iam_role_policy_attachment" "gh_oidc_role_administrator" {
  policy_arn = data.aws_iam_policy.administrator.arn
  role       = aws_iam_role.gh_oidc_role.name
}

resource "aws_iam_openid_connect_provider" "github" {
  client_id_list  = ["sts.amazonaws.com"]
  thumbprint_list = ["6938fd4d98bab03faadb97b34396831e3780aea1"]
  url             = "https://token.actions.githubusercontent.com"
}
