import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { useEffect, useState } from "react";
import { getAllShippers } from "../../feature/userThunk";
import { BookCheck, Check, Trash2 } from "lucide-react";
import {
  dropShipperSelected,
  selectShipperForOrder,
} from "../../feature/orderThunk";
import SkeletonSelectShipper from "../../components/common/(admin)/SkeletonSelectShipper";

interface Props {
  orderId: string;
}

const SelectShipperDeliver = ({ orderId }: Props) => {
  const { users, usersStatus } = useSelector((state: RootState) => state.user);
  const { ordersDetailAdmin } = useSelector((state: RootState) => state.order);
  const dispatch = useDispatch<AppDispatch>();
  const [shipperId, setShipperId] = useState({
    id: "",
    name: "",
  });
  const [page, setPage] = useState(1);
  const limit = 5;

  useEffect(() => {
    dispatch(getAllShippers({ page, limit, email: "", verify: "APPROVED" }));
  }, [dispatch, page, limit]);

  return (
    <div className="flex flex-col gap-2 min-h-screen relative">
      <h1 className="flex items-center font-bold text-xl gap-2 px-3 pt-3">
        <BookCheck className="size-5 text-red-500" />
        Select Shipper
      </h1>
      <div className="flex items-center my-2">
        {ordersDetailAdmin?.shipping?.shipper?._id ? (
          <div className="flex w-full justify-between">
            <div className="flex gap-1.5">
              Assigned for{" "}
              <p className="text-green-600 font-semibold">
                {ordersDetailAdmin?.shipping?.shipper.name}
              </p>
            </div>
            <button
              title="Delete"
              className="text-red-500 bg-red-100 p-1 rounded-md hover:bg-red-200 cursor-pointer"
              onClick={() =>
                dispatch(
                  dropShipperSelected({ orderId: ordersDetailAdmin._id }),
                )
              }
            >
              <Trash2 />
            </button>
          </div>
        ) : (
          <div>
            {shipperId.name !== "" ? (
              <div className="flex items-center gap-1 text-sm">
                You has chosen
                <p className="text-green-600 font-semibold">{shipperId.name}</p>
              </div>
            ) : (
              <p>You have not chosen</p>
            )}
          </div>
        )}
      </div>
      <div>
        {usersStatus === "loading" ? (
          Array.from({ length: 6 }).map((_, idx) => (
            <SkeletonSelectShipper key={idx} />
          ))
        ) : users && users.length > 0 ? (
          <div className="flex flex-col gap-2 cursor-pointer">
            {users.map((user) => (
              <div
                key={user._id}
                className={`flex w-full justify-between relative pb-10 ${ordersDetailAdmin?.shipping?.shipper?._id === user._id ? "bg-green-100" : "bg-slate-100"} rounded-md`}
                onClick={() => {
                  if (!ordersDetailAdmin?.shipping?.shipper?._id) {
                    setShipperId({
                      id: user._id,
                      name: user.name,
                    });
                  }
                }}
              >
                <div className="flex gap-2 p-2">
                  <img
                    src={user?.image_profile || `/src/asset/images/Empty.webp`}
                    alt={user?._id}
                    className="size-8 object-conver rounded-md"
                  />
                  <div className="flex flex-col">
                    <p className="font-bold text-sm">{user?.name}</p>
                    <p className="text-xs text-slate-700">{user?.email}</p>
                  </div>
                </div>
                <button
                  className={`${shipperId.id === user?._id ? "text-orange-600 bg-orange-200" : ordersDetailAdmin?.shipping?.shipper?._id === user?._id ? "text-green-800 bg-green-300" : "bg-slate-500"} rounded-full p-2  size-8 flex justify-center items-center absolute top-2 right-2`}
                >
                  <Check />
                </button>
                <p className="absolute bottom-0 text-orange-500 bg-orange-100 w-full p-1 border-l-8 border-orange-600 text-sm">
                  "Trust me bro, I can handle this"
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div>Empty</div>
        )}
      </div>
      <div className="flex justify-center gap-2 mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-3 py-1">Page {page}</span>
        <button
          disabled={users?.length === 0}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 border rounded"
        >
          Next
        </button>
      </div>
      <button
        className="w-full absolute bottom-0 bg-orange-600 text-white p-3 rounded-md hover:opacity-80 cursor-pointer"
        onClick={() =>
          dispatch(
            selectShipperForOrder({
              orderId: orderId,
              shipperId: shipperId.id,
            }),
          )
        }
      >
        Confirm Shipper
      </button>
    </div>
  );
};

export default SelectShipperDeliver;
