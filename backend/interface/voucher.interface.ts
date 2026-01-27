export interface DataInputVoucher {
  code: string;
  discount: number;
  validDay: {
    dateFrom: Date;
    dateTo: Date;
  };
}
