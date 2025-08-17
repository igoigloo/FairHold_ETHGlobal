export class TransactionValidator {
  /**
   * Validate transfer parameters before execution
   */
  static validateTransfer(params: {
    agreementId: string;
    vendorAddress: string;
    amount: string;
    yieldAmount: string;
  }): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Validate agreement ID
    if (!params.agreementId || params.agreementId.length < 10) {
      errors.push('Invalid agreement ID');
    }

    // Validate vendor address
    if (!params.vendorAddress || !params.vendorAddress.startsWith('0x')) {
      errors.push('Invalid vendor address');
    }

    // Validate amounts
    const amount = parseFloat(params.amount);
    const yieldAmount = parseFloat(params.yieldAmount);

    if (isNaN(amount) || amount <= 0) {
      errors.push('Invalid transfer amount');
    }

    if (isNaN(yieldAmount) || yieldAmount < 0) {
      errors.push('Invalid yield amount');
    }

    // Check for reasonable maximums (prevent fat finger errors)
    if (amount > 1000000) {
      // $1M USDC max
      errors.push('Transfer amount exceeds maximum limit');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Validate wallet creation parameters
   */
  static validateWalletCreation(params: {
    agreementId: string;
    clientAddress: string;
    vendorAddress: string;
  }): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!params.agreementId) {
      errors.push('Agreement ID required');
    }

    if (!params.clientAddress || !params.clientAddress.startsWith('0x')) {
      errors.push('Invalid client address');
    }

    if (!params.vendorAddress || !params.vendorAddress.startsWith('0x')) {
      errors.push('Invalid vendor address');
    }

    if (params.clientAddress === params.vendorAddress) {
      errors.push('Client and vendor addresses cannot be the same');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}
