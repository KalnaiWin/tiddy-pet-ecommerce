export interface InfoPaymentItem {
  name: string;
  quantity: number;
  unitAmount: number;
  total: number;
}

export interface InfoPayment {
  sessionId: string;
  amountTotal: number;
  currency: string;
  paymentStatus: string;

  customer: {
    email?: string;
    phone?: string;
    address?: string;
  };

  items: InfoPaymentItem[];
  createdAt: string;
}

export interface initialPayment {
  infoPayment: InfoPayment | null;
  checkoutStatus: "idle" | "loading" | "succeeded" | "failed";
  verifySuccessfull: "idle" | "loading" | "succeeded" | "failed";
}
