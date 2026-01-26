import { AnalyticRepository } from "../repository/analytic.repository.js";

export const AnalyticService = {
  getPreviousDataOfRevenue: async (time: string) => {
    let result;
    if (time === "day")
      result = await AnalyticRepository.findPreviousDayNumberRevenue();
    else if (time === "week")
      result = await AnalyticRepository.findPreviousWeekNumberRevenue();
    else if (time === "month")
      result = await AnalyticRepository.findPreviousMonthNumberRevenue();
    return result;
  },

  getPreviousDataOfProduct: async () => {
    return await AnalyticRepository.findMostProductsSold();
  },
  getOrderStatusDistribution: async () => {
    return await AnalyticRepository.getOrderStatusDistribution();
  },
};
