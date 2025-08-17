export class WalletError extends Error {
  constructor(public message: string, public code: string, public statusCode: number = 500, public details?: any) {
    super(message);
    this.name = 'WalletError';
  }
}

export class WalletErrorHandler {
  static handle(error: any): WalletError {
    console.error('Wallet operation error:', error);

    // CDP SDK specific errors
    if (error.message?.includes('insufficient funds')) {
      return new WalletError('Insufficient funds in wallet', 'INSUFFICIENT_FUNDS', 400, { originalError: error.message });
    }

    if (error.message?.includes('invalid address')) {
      return new WalletError('Invalid wallet address provided', 'INVALID_ADDRESS', 400, { originalError: error.message });
    }

    if (error.message?.includes('network')) {
      return new WalletError('Network error during wallet operation', 'NETWORK_ERROR', 503, { originalError: error.message });
    }

    if (error.message?.includes('rate limit')) {
      return new WalletError('Rate limit exceeded for wallet operations', 'RATE_LIMITED', 429, { originalError: error.message });
    }

    // Database errors
    if (error.code === 'P2002') {
      // Prisma unique constraint
      return new WalletError('Wallet already exists for this agreement', 'WALLET_EXISTS', 409, { originalError: error.message });
    }

    // Generic error
    return new WalletError('Wallet operation failed', 'OPERATION_FAILED', 500, { originalError: error.message });
  }

  static async retry<T>(operation: () => Promise<T>, maxRetries = 3, delay = 1000): Promise<T> {
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await operation();
      } catch (error) {
        const walletError = this.handle(error);

        // Don't retry client errors (4xx)
        if (walletError.statusCode >= 400 && walletError.statusCode < 500) {
          throw walletError;
        }

        if (i === maxRetries - 1) {
          throw walletError;
        }

        // Exponential backoff
        await new Promise((resolve) => setTimeout(resolve, delay * Math.pow(2, i)));
      }
    }

    throw new Error('Max retries exceeded');
  }
}
