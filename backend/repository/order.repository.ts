import mongoose, { Types } from "mongoose";
import type { QueryOrderManagement } from "../interface/order.interface.js";
import Order from "../schema/order.schema.js";

export const OrderReposioty = {
  filterAllOrderForAdmin: async (query: QueryOrderManagement) => {
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

  filterAllOrdersForCustomer: async (
    query: QueryOrderManagement,
    userId: string,
  ) => {
    const skip = (query.page - 1) * query.limit;
    return await Order.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $lookup: {
          from: "variants",
          localField: "items.variantId",
          foreignField: "_id",
          as: "variants",
        },
      },
      { $unwind: "$user" },
      // {
      //   $addFields: {
      //     orderIdString: { $toString: "$_id" },
      //   },
      // },
      {
        $addFields: {
          items: {
            $map: {
              input: "$items",
              as: "item",
              in: {
                productId: "$$item.productId",
                quantity: "$$item.quantity",
                price: "$$item.price",

                variant: {
                  $let: {
                    vars: {
                      v: {
                        $arrayElemAt: [
                          {
                            $filter: {
                              input: "$variants",
                              as: "variant",
                              cond: {
                                $eq: ["$$variant._id", "$$item.variantId"],
                              },
                            },
                          },
                          0,
                        ],
                      },
                    },
                    in: {
                      id: "$$v._id",
                      name: "$$v.name",
                      image: "$$v.image",
                      price: "$$v.price",
                    },
                  },
                },
              },
            },
          },
        },
      },
      {
        $match: {
          ...(query.status && { status: query.status }),
          ...(query.payment && { "payment.status": query.payment }),
          ...(query.search && {
            orderIdString: { $regex: query.search, $options: "i" },
          }),
          "user._id": new mongoose.Types.ObjectId(userId),
        },
      },
      {
        // 1: include, 0: exclude
        $project: {
          _id: 1,
          // orderId: "$orderIdString",
          items: 1,
          totalPrice: 1,
          status: 1,
          createdAt: 1,

          "payment.status": 1,
          "payment.method": 1,

          user: {
            id: "$user._id",
            name: "$user.name",
            email: "$user.email",
          },
        },
      },

      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: query.limit },
    ]);
  },
};
