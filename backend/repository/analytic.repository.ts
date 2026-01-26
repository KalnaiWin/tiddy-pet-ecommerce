import Order from "../schema/order.schema.js";

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
            $dateTrunc: {
              date: "$createdAt",
              unit: "day",
            },
          },
          revenue: { $sum: "$totalPrice" },
          totalOrder: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
      {
        $project: {
          _id: 0,
          label: {
            $dateToString: {
              format: "%d-%m-%Y",
              date: "$_id",
            },
          },
          revenue: 1,
          totalOrder: 1,
        },
      },
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
        $project: {
          _id: 0,
          week: "$_id.week",
          year: "$_id.year",
          totalOrder: 1,
          revenue: 1,
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
          totalOrder: { $sum: 1 },
        },
      },
      {
        $addFields: {
          label: {
            $concat: [
              { $toString: "$_id.month" },
              "-",
              { $toString: "$_id.year" },
            ],
          },
        },
      },
      {
        $project: {
          _id: 0,
          label: 1,
          totalOrder: 1,
          revenue: 1,
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
              $multiply: ["$items.quantity", "$items.price"],
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

  getOrderStatusDistribution: async () => {
    return await Order.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          status: "$_id",
          count: 1,
        },
      },
      {
        // Convert array → key-value pairs
        $group: {
          _id: null,
          data: {
            $push: { k: "$status", v: "$count" },
          },
        },
      },
      {
        // Merge with default statuses (all = 0)
        $addFields: {
          data: {
            $mergeObjects: [
              // Later values override earlier ones
              {
                // First object = default values
                PENDING: 0,
                CONFIRMED: 0,
                ASSIGNED: 0,
                PICKING: 0,
                SHIPPING: 0,
                DELIVERED: 0,
                FAILED: 0,
                CANCELLED: 0,
              },
              // Second object = actual counts
              { $arrayToObject: "$data" },
            ],
          },
        },
      },
      {
        // Return final object
        $replaceRoot: {
          newRoot: "$data",
        },
      },
    ]);
  },
};
