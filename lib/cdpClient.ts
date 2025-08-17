import { CdpClient } from '@coinbase/cdp-sdk-js';

const cdpClient = new CdpClient({
  apiKeyName: process.env.CDP_API_KEY_NAME!,
  privateKey: process.env.CDP_PRIVATE_KEY!,
  projectId: process.env.CDP_PROJECT_ID!,
});

export default cdpClient;
