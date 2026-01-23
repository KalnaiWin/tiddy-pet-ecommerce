import Order from "../schema/order.schema.js";
import Product from "../schema/product.schema.js";

export const AnalyticRepository = {
  findPreviousDayNumberRevenue: async () => {
    const result = await Order.aggregate([
      {
        $match: {
          "payment.status": "PAID",
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%d-%m-%Y", date: "$createdAt" },
          },
          revenue: { $sum: "$totalPrice" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    return result;
  },

  findPreviousWeekNumberRevenue: async () => {
    const result = await Order.aggregate([
      { $match: { status: "paid" } },
      {
        $group: {
          _id: {
            year: { $isoWeekYear: "$createdAt" },
            week: { $isoWeek: "$createdAt" },
          },
          revenue: { $sum: "$totalPrice" },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.week": 1,
        },
      },
    ]);
    return result;
  },

  findPreviousMonthNumberRevenue: async () => {
    const result = await Order.aggregate([
      {
        $match: {
          "payment.status": "PAID",
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          revenue: { $sum: "$totalPrice" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);
    return result;
  },

  findMostProductsSold: async () => {
    return await Order.aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.productId",
          sold: { $sum: "$items.quantity" },
          revenue: {
            $sum: {
              $subtract: [
                "$items.price",
                { $ifNull: ["$otherPrice.discount", 0] },
              ],
            },
          },
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product",
        },
      },
      { $unwind: "$product" },
      {
        $lookup: {
          from: "variants",
          localField: "product.childProduct",
          foreignField: "_id",
          as: "variants",
        },
      },
      {
        $addFields: {
          currentTotal: {
            $reduce: {
              // loop through array and accumulate
              input: "$variants",
              initialValue: 0,
              in: { $add: ["$$value", "$$this.stock"] },
            },
          },
          name: "$product.name",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          sold: 1,
          total: "$product.total",
          revenue: 1,
          currentTotal: 1,
        },
      },
      {
        $sort: {
          sold: -1,
          revenue: -1,
        },
      },
      {
        $limit: 5,
      },
    ]);
  },
};
