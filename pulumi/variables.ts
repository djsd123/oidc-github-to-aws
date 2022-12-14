import * as pulumi from '@pulumi/pulumi'
import { getCallerIdentity } from '@pulumi/aws'

export const accountId = getCallerIdentity().then(id => id.accountId)

const stackConfig = new pulumi.Config('oidc-github-to-aws')
export const config = {
    organizationName: stackConfig.require('orgName')
}
