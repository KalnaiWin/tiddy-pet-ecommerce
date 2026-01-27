export interface Vouchers {
  code: string;
  discount: number;
  validDay: {
    dateFrom: string;
    dateTo: string;
  };
}

export interface InitailVoucherState {
  vouchers: Vouchers[];
  status: "idle" | "loading" | "succeeded" | "failed";
  creatingStatus: "idle" | "loading" | "succeeded" | "failed";
}
