import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../store";
import { useEffect } from "react";
import { getAllOrders } from "../../../feature/orderThunk";
import { formatVND } from "../../../types/HelperFunction";

const CurrentPayment = () => {
  const { orders } = useSelector((state: RootState) => state.order);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(
      getAllOrders({
        page: 1,
        limit: 5,
        search: "",
        status: "",
        payment: "PAID",
      }),
    );
  }, [dispatch]);

  return (
    <div className="flex flex-col bg-white rounded-t-md">
      <h1 className="p-4 font-black bg-slate-100 rounded-t-md">
        Recent Customers
      </h1>
      <div>
        {orders && orders.length ? (
          <div>
            {orders.map((item) => (
              <div
                key={item._id}
                className="flex justify-between p-2 items-center hover:bg-slate-50"
              >
                <div className="flex items-center gap-2">
                  <div className="rounded-full">
                    <img
                      src={item.user.image_profile}
                      alt={item.user._id}
                      className="object-cover size-8 rounded-full"
                    />
                  </div>
                  <div className="flex flex-col">
                    <p className="font-bold">{item.user.name}</p>
                    <p>{item.user.email}</p>
                  </div>
                </div>
                <div className="text-green-500 font-medium">
                  {formatVND(item.totalPrice)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>Empty</div>
        )}
      </div>
    </div>
  );
};

export default CurrentPayment;
