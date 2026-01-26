import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { useEffect } from "react";
import {
  deleteItemFromCart,
  getAllItemsFromCart,
} from "../../feature/cartThunk";
import { ArrowRight, Loader, ShoppingBag, Sparkles, Trash } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { formatVND } from "../../types/HelperFunction";
import type { CheckOut, OrderCreateInput } from "../../types/InterfaceOrder";
import { checkoutCart } from "../../feature/paymentThunk";
import { createOrder } from "../../feature/orderThunk";
import SkeletonCart from "../../components/common/(customer)/SkeletonCart";
import { resetStatusCart } from "../../store/cartSlice";

const Cart = () => {
  const { cartArray, status } = useSelector((state: RootState) => state.cart);
  const { checkoutStatus } = useSelector((state: RootState) => state.payment);
  const { currentUser } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllItemsFromCart());
    return () => {
      dispatch(resetStatusCart());
    };
  }, [dispatch]);

  let subTotal = 0;
  cartArray.forEach((item) => {
    if (!item?.variantId) return;
    subTotal += item?.price * item.quantity;
  });
  console.log(subTotal);

  let discount = 0;
  cartArray.forEach((item) => {
    if (!item?.variantId) return;

    discount += item?.price * item.quantity * (item?.productDiscount / 100);
  });

  const total = subTotal - discount;

  const checkOutCart: CheckOut = {
    userId: String(currentUser?._id),
    items: cartArray.map((item) => ({
      name: item.variantName,
      image: [item.image],
      price: Math.round(item.price * (1 - item.productDiscount / 100)),
      quantity: item.quantity,
    })),
  };

  const orderCartInput: OrderCreateInput = {
    items: cartArray.map((item) => ({
      productId: item.productId,
      variantId: item.variantId,
      quantity: item.quantity,
    })),
    shippingFee: 0,
    voucherId: "",
  };

  if (status === "loading") return <SkeletonCart />;

  return (
    <div className="flex flex-col md:px-25 px-15 py-10 mb-5">
      {/* Title */}
      <div className="flex justify-between items-center border-b pb-4 mb-10">
        <div>
          <h1 className="text-2xl font-semibold">Your Cart</h1>
          <p className="text-sm text-gray-500">
            {cartArray.length} items in your cart
          </p>
        </div>

        <button className="text-sm text-red-500 hover:underline">
          Clear cart
        </button>
      </div>

      {cartArray.length > 0 ? (
        <div className="flex md:flex-row flex-col w-full gap-5">
          <div className="md:w-2/3 w-full">
            {cartArray.map((item) => {
              return (
                <div
                  key={item?.variantId}
                  className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 hover:shadow-md transition-shadow group mb-3 relative"
                >
                  <p className="absolute -top-5 -left-5 bg-orange-600 text-white rounded-full size-12 flex items-center justify-center">
                    {item?.productDiscount}%
                  </p>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      // checked={item.isSelected}
                      //   onChange={() => onToggleSelect(item._id, item.selectedChildId)}
                      className="w-5 h-5 rounded text-[#FF6B00] focus:ring-[#FF6B00] border-gray-300 cursor-pointer"
                    />
                  </div>
                  <Link
                    to={`/store/${item.productId}}`}
                    className="w-24 h-24 rounded-lg overflow-hidden bg-gray-50"
                  >
                    <img
                      src={item?.image}
                      alt={item?.productName}
                      className="w-full h-full object-cover"
                    />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {item?.productName}
                    </h3>
                    <p className="text-xs text-gray-500  mt-1">
                      {item.variantName}
                    </p>
                    <div className="text-xs text-[#FF6B00] font-medium mt-1 flex">
                      {item?.brand?.name} •{" "}
                      {item.category &&
                        item.category.map((cate) => (
                          <div key={cate._id}>
                            <p>{cate.name}</p>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2 w-full sm:w-auto">
                    <div className="flex items-center gap-2 text-lg font-bold text-gray-900">
                      <span>${formatVND(item.price)}</span>
                    </div>

                    <div className="flex items-center gap-4 w-full justify-between sm:justify-start">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                        <button
                          //   onClick={() =>
                          //     onUpdateQuantity(item._id, item.selectedChildId, -1)
                          //   }
                          //   disabled={item.quantity <= 1}
                          className="px-3 py-1 bg-gray-50 hover:bg-gray-100 text-gray-600 transition-colors disabled:opacity-50"
                        >
                          -
                        </button>
                        <span className="px-4 py-1 text-sm font-medium w-12 text-center">
                          {item.quantity}
                        </span>
                        <button
                          //   onClick={() =>
                          // onUpdateQuantity(item._id, item.selectedChildId, 1)
                          //   }
                          className="px-3 py-1 bg-gray-50 hover:bg-gray-100 text-gray-600 transition-colors"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() =>
                          dispatch(deleteItemFromCart(item?.variantId))
                        }
                        className="text-gray-400 hover:text-red-500 transition-colors p-2"
                      >
                        <Trash />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col gap-4 bg-white p-4 rounded-xl border border-gray-100 hover:shadow-md transition-shadow group mb-3 md:w-1/3 w-full">
            <h1 className="font-bold text-2xl">Order Summary</h1>
            <div className="flex w-full justify-between">
              <h2 className="text-slate-700 font-medium">Subtotal</h2>
              <p className="font-semibold text-xl">{formatVND(subTotal)}</p>
            </div>
            <div className="flex w-full justify-between">
              <h2 className="text-green-700 font-medium">Discount</h2>
              <p className="text-green-500 font-bold">{`-${formatVND(
                discount,
              )}`}</p>
            </div>
            <div className="flex w-full justify-between">
              <h2 className="text-slate-700 font-medium">Shipping</h2>
              <p className="font-bold text-green-500">Free</p>
            </div>
            <div className="flex flex-col w-full gap-2">
              <h2 className="font-bold tracking-widest text-slate-600">
                PROMO CODE
              </h2>
              <div className="flex gap-2 md:flex-row flex-col">
                <input
                  type="text"
                  className="md:w-[90%] w-full rounded-md indent-2 border-2 py-1"
                  placeholder="Enter code"
                />
                <button className="md:w-[10%] w-full bg-orange-600 text-white rounded-md py-2">
                  Apply
                </button>
              </div>
            </div>
            <div className="flex w-full justify-between mt-5">
              <h2 className="text-2xl font-black">Total</h2>
              <p className="font-bold text-xl text-orange-600">
                {formatVND(total)}
              </p>
            </div>
            <button
              onClick={async () => {
                await dispatch(createOrder(orderCartInput));
                const url = await dispatch(checkoutCart(checkOutCart));
                if (!url.payload) return alert("Check out error");
                navigate(url.payload);
              }} // test payment and create order
              className={`${checkoutStatus === "loading" ? "cursor-not-allowed bg-orange-300" : "hover:bg-orange-300 hover:text-orange-500 cursor-pointer bg-orange-500"} w-full py-5 rounded-md font-black text-white flex items-center justify-center`}
              disabled={checkoutStatus === "loading"}
            >
              {checkoutStatus === "loading" ? (
                <div className="flex gap-2">
                  <Loader className="animate-spin" />
                  <p>Sending</p>
                </div>
              ) : (
                <p>Checkout Here</p>
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="py-14 text-center">
          <div className="relative inline-block mb-8">
            <div className="w-48 h-48 md:w-56 md:h-56 bg-orange-50 rounded-full flex items-center justify-center mx-auto relative overflow-hidden">
              <div className="absolute top-4 right-4 w-12 h-12 bg-orange-100 rounded-full blur-xl"></div>
              <div className="absolute bottom-10 left-6 w-16 h-16 bg-yellow-50 rounded-full blur-xl"></div>
              <div className="relative z-10 text-orange-500 transition-all">
                <ShoppingBag size={80} strokeWidth={1} />
              </div>
            </div>
            <div className="absolute -top-2 -right-2 text-yellow-400">
              <Sparkles size={24} />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Your cart is feeling a bit lonely
          </h1>
          <p className="text-slate-500 max-w-md mx-auto mb-10 text-lg leading-relaxed">
            It looks like you haven't added anything to your cart yet. Your
            furry friends are waiting for some treats!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to={"/store"}
              className="w-full sm:w-auto px-8 py-4 bg-orange-500 text-white font-bold rounded-2xl hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-200 transition-all flex items-center justify-center gap-2 group"
            >
              Start Shopping
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
