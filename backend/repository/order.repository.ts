import type { QueryOrderManagement } from "../interface/order.interface.js";
import Order from "../schema/order.schema.js";

export const OrderReposioty = {
  filterAllOrderFromAdmin: async (query: QueryOrderManagement) => {
    const skip = (query.page - 1) * query.limit;

    return await Order.aggregate([
      {
        $lookup: {
          // join user with order
          from: "users", // name stored in collection of mongodb
          localField: "user", // name current field in your code
          foreignField: "_id", // foreign key order.user._id === user._id
          as: "user", // name file after join
        },
      },
      { $unwind: "$user" }, // turn array -> object
      {
        $addFields: {
          orderIdString: { $toString: "$_id" }, // turn OrderID into string from objectId
        },
      },
      {
        $match: {
          ...(query.status && { status: query.status }),
          ...(query.payment && { "payment.status": query.payment }),
          ...(query.search && {
            orderIdString: { $regex: query.search, $options: "i" }, // regex === wehre
          }),
        },
      },
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: query.limit },
    ]);
  },
};
