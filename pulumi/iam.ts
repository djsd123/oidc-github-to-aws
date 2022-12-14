import * as pulumi from '@pulumi/pulumi'
import { iam } from '@pulumi/aws'

import { accountId, config } from './variables'

const administratorAccessPolicy = iam.getPolicy({
    name: 'AdministratorAccess'
})

const gitHubAssumePolicyDocument = iam.getPolicyDocument({

    statements: [
        {
            sid: 'GithubOidc',
            effect: 'Allow',
            actions: ['sts:AssumeRoleWithWebIdentity'],

            principals: [
                {
                    identifiers: [`arn:aws:iam::${accountId}:oidc-provider/token.actions.githubusercontent.com`],
                    type: 'Federated'
                }
            ],

            conditions: [
                {
                    test: 'StringLike',
                    values: [`repo:${config.organizationName}/*:*`],
                    variable: 'token.actions.githubusercontent.com:sub'
                },
                {
                    test: 'StringEquals',
                    values: ['sts.amazonaws.com'],
                    variable: 'token.actions.githubusercontent.com:aud'
                }
            ]
        }
    ]
})

export const gitHubOIDCRole = new iam.Role('github-assume-role', {
    name: pulumi.interpolate `${config.organizationName}-github-oidc`,
    description: 'Allow GitHub to assume role in AWS',
    assumeRolePolicy: gitHubAssumePolicyDocument.then(policyDocument => policyDocument.json)
})

new iam.RolePolicyAttachment('github-assume-role-policy-attachment', {
    policyArn: administratorAccessPolicy.then(policy => policy.arn),
    role: gitHubOIDCRole.name
})

new iam.OpenIdConnectProvider('github-oidc-provider', {
    clientIdLists: ['sts.amazonaws.com'],
    thumbprintLists: ['6938fd4d98bab03faadb97b34396831e3780aea1'],
    url: 'https://token.actions.githubusercontent.com'
})
