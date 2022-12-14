import './iam'

import { gitHubOIDCRole } from './iam'

// Export the arn of the role
export const roleArn = gitHubOIDCRole.arn
