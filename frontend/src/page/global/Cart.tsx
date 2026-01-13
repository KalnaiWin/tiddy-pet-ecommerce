import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { useEffect } from "react";
import {
  deleteItemFromCart,
  getAllItemsFromCart,
} from "../../feature/cartThunk";
import { Trash } from "lucide-react";

const Cart = () => {
  const { cartArray } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAllItemsFromCart());
  }, [dispatch]);

  console.log("Cart: ", cartArray);

  return (
    <>
      {cartArray.length > 0 ? (
        <div>
          {cartArray.map((item) => {
            let discountedMinPrice = item.product.minPrice
              ? item.product.discount
                ? item.product.minPrice -
                  (item.product.minPrice * item.product.discount) / 100
                : item.product.minPrice
              : null;

            let discountedMaxPrice = item.product.discount
              ? item.product.maxPrice -
                (item.product.maxPrice * item.product.discount) / 100
              : item.product.maxPrice;

            return (
              <div
                key={item.product._id}
                className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 hover:shadow-md transition-shadow group mb-3"
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    // checked={item.isSelected}
                    //   onChange={() => onToggleSelect(item._id, item.selectedChildId)}
                    className="w-5 h-5 rounded text-[#FF6B00] focus:ring-[#FF6B00] border-gray-300 cursor-pointer"
                  />
                </div>
                <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-50">
                  <img
                    src={item.product.imageProduct[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">{}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Variation:{" "}
                    <span className="text-gray-700 font-medium">
                      {/* {selectedChild?.name} */}
                    </span>
                  </p>
                  <p className="text-xs text-[#FF6B00] font-medium mt-1">
                    {item.product.brand.name} • {item.product.category[0].name}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-2 w-full sm:w-auto">
                  <div className="flex items-center gap-2">
                    {item.product.minPrice ? (
                      <span className="text-sm text-gray-400 line-through">
                        ${discountedMinPrice?.toFixed(2)}
                      </span>
                    ) : (
                      <span className="text-sm text-gray-400 line-through">
                        ${discountedMinPrice?.toFixed(2)} {" - "}$
                        {discountedMaxPrice?.toFixed(2)}
                      </span>
                    )}
                    <span className="text-lg font-bold text-gray-900">
                      ${item.product.discount.toFixed(2)}
                    </span>
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

                    {/* Remove Button */}
                    <button
                      onClick={() =>
                        dispatch(deleteItemFromCart(item.product._id))
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
      ) : (
        <div>
          <div>Empty</div>
        </div>
      )}
    </>
  );
};

export default Cart;
