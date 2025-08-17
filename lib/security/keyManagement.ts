import { toast } from 'sonner';

export class CDPKeyManagement {
  /**
   * CDP handles all private key management automatically
   * Keys are stored in secure enclaves and never exposed
   */
  static getSecurityFeatures() {
    return {
      keyStorage: 'AWS Nitro Enclaves',
      keyRotation: 'Automatic',
      multiPartyComputation: 'Built-in',
      keyRecovery: 'Enterprise-grade backup',
      compliance: 'SOC 2 Type II certified',
    };
  }

  /**
   * Validate API credentials are properly configured
   */
  static validateCredentials(): boolean {
    const requiredEnvVars = ['CDP_API_KEY_NAME', 'CDP_PRIVATE_KEY', 'CDP_PROJECT_ID'];

    const missing = requiredEnvVars.filter((env) => !process.env[env]);

    if (missing.length > 0) {
      console.error('Missing CDP credentials:', missing);
      toast.error('Missing CDP Credentials', {
        description: `The following environment variables are missing: ${missing.join(', ')}`,
      });
      return false;
    }

    return true;
  }

  /**
   * Generate secure wallet names to prevent collisions
   */
  static generateSecureWalletName(agreementId: string): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    return `Escrow-${agreementId.slice(0, 8)}-${timestamp}-${random}`;
  }
}
