import { useParams } from "react-router-dom";
import type { childProduct, ProductInfo } from "../types/InterfaceProduct";
import { DollarSign, Shield, ShoppingCart, Star, Truck } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { useEffect, useRef, useState } from "react";
import { viewProductDetail } from "../feature/productThunk";
import { addItemToCart } from "../feature/cartThunk";

interface ProductInformationProps {
  product: ProductInfo;
}

export const ProductInformation = ({ product }: ProductInformationProps) => {
  const {
    name,
    imageProduct,
    minPrice,
    maxPrice,
    brand,
    category,
    discount,
    sold,
    total,
    status = "Available",
  } = product;

  return (
    <div className="w-full bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition h-fit hover:-translate-y-1">
      {/* Image */}
      <div className="relative h-56 w-full">
        <img
          src={imageProduct[0] || "/src/assets/Empty.webp"}
          alt={name}
          className="w-full h-full object-cover"
        />

        {discount > 0 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            -{discount}%
          </span>
        )}
      </div>

      {/* Content */}
      <div className=" p-2 flex flex-col gap-1">
        {/* Name */}
        <h3 className="text-lg font-semibold line-clamp-2">{name}</h3>

        {/* Brand & Category */}
        <div className="flex flex-wrap gap-2 text-sm">
          <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
            {brand.name}
          </span>

          {category.map((cate) => (
            <span
              key={cate.slug}
              className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full"
            >
              {cate.name}
            </span>
          ))}
          {/* Status */}
          <div className="text-sm">
            <span
              className={`px-2 py-0.5 rounded-full ${
                status === "Available"
                  ? "bg-green-100 text-green-600"
                  : status === "Out of stock"
                  ? "bg-red-100 text-red-600"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {status}
            </span>
          </div>
        </div>

        <div className="flex justify-between">
          {/* Price */}
          <div className="flex items-center gap-1 font-semibold text-orange-600">
            <DollarSign className="size-4" />
            {minPrice ? (
              <>
                <span>{minPrice}</span>
                <span>-</span>
                <span>{maxPrice}</span>
              </>
            ) : (
              <span>{maxPrice}</span>
            )}
          </div>

          {/* Sold */}
          <p className="text-xs text-gray-500">
            Sold {sold} / {total}
          </p>
        </div>
      </div>
    </div>
  );
};

export const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();

  const { detail } = useSelector((state: RootState) => state.product);
  const dispatch = useDispatch<AppDispatch>();

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariantId, setSelectedVariantId] = useState<childProduct>();

  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    dispatch(viewProductDetail({ id: id as string }));
  }, [dispatch, id]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setSelectedVariantId(undefined);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleBuyNow = () => {
    alert(`Proceeding to checkout with ${quantity} item(s).`);
  };

  const minPrice =
    detail?.minPrice != null
      ? detail.minPrice - (detail.minPrice * detail.discount) / 100
      : 0;

  const maxPrice =
    detail?.maxPrice != null
      ? detail.maxPrice - (detail.maxPrice * detail.discount) / 100
      : 0;

  return (
    <div className="space-y-4 px-30">
      {/* Breadcrumbs */}
      <nav className="text-sm flex items-center space-x-2 text-gray-600 mb-4">
        {detail?.category.map((cat, idx) => (
          <div key={cat._id}>
            <a href="#" className="hover:text-orange-600 transition-colors">
              {cat.name}
            </a>
            {idx < detail.category.length - 1 && <span>&gt;</span>}
          </div>
        ))}
      </nav>

      <div className="bg-white rounded shadow-sm p-4 md:p-6 grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-5 space-y-4">
          <div className="relative aspect-square rounded border overflow-hidden bg-gray-50">
            {selectedVariantId ? (
              <img
                src={selectedVariantId.image}
                alt={selectedVariantId.name}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={detail?.imageProduct[selectedImage]}
                alt={detail?.name}
                className="w-full h-full object-contain"
              />
            )}
          </div>
          <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
            {detail?.imageProduct.map((img, idx) => (
              <button
                key={idx}
                onMouseEnter={() => setSelectedImage(idx)}
                className={`w-20 h-20 border-2 rounded overflow-hidden ${
                  selectedImage === idx
                    ? "border-orange-600"
                    : "border-transparent"
                }`}
              >
                <img
                  src={img}
                  alt={`Thumb ${idx}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
          <div className="flex items-center justify-center space-x-8 pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Chia sẻ:</span>
              <div className="flex space-x-2">
                <button className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">
                  f
                </button>
                <button className="w-6 h-6 rounded-full bg-blue-400 text-white flex items-center justify-center text-xs">
                  t
                </button>
                <button className="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center text-xs">
                  p
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-2 cursor-pointer group">
              <span className="text-red-500 text-xl">♥</span>
              <span className="text-sm group-hover:underline">
                Đã thích (25)
              </span>
            </div>
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="md:col-span-7 space-y-6">
          <h1 className="text-xl font-medium text-gray-800 line-clamp-2 leading-relaxed">
            {detail?.name}
          </h1>

          <div className="flex items-center space-x-4 text-sm divide-x divide-gray-200">
            <div className="flex items-center space-x-1">
              <span className="text-xl font-bold leading-none">5.0</span>
              <div className="flex text-orange-500">
                <Star className="w-5 h-5" />
                <Star className="w-5 h-5" />
                <Star className="w-5 h-5" />
                <Star className="w-5 h-5" />
                <Star className="w-5 h-5" />
              </div>
            </div>
            <div className="pl-4">
              <span className="text-gray-800 border-b border-gray-800 leading-none">
                {detail?.sold}
              </span>
              <span className="text-gray-500 ml-1">Đánh Giá</span>
            </div>
            <div className="pl-4">
              <span className="text-gray-800">1,2k</span>
              <span className="text-gray-500 ml-1">Đã Bán</span>
            </div>
          </div>

          <div className="bg-gray-50 p-4 flex items-center space-x-4">
            <div className="flex items-baseline space-x-2">
              {selectedVariantId ? (
                <div className="text-3xl font-medium text-orange-600">
                  {selectedVariantId.price.toLocaleString()}₫
                </div>
              ) : (
                <div className="flex items-center">
                  <span className="text-3xl font-medium text-orange-600">
                    ₫{minPrice.toLocaleString()} - ₫{maxPrice.toLocaleString()}
                  </span>
                </div>
              )}
              <span className="text-gray-400 line-through text-base">
                ₫{Math.round(detail?.maxPrice || 0 * 1.2).toLocaleString()}
              </span>

              <span className="bg-orange-600 text-white text-xs px-1 rounded font-bold">
                -{detail?.discount}% GIẢM
              </span>
            </div>
          </div>

          <div className="space-y-6 text-sm">
            {/* Shipping */}
            <div className="flex items-start">
              <span className="w-28 text-gray-500 ">Vận Chuyển</span>
              <div className="flex-1 space-y-2">
                <div className="flex items-center space-x-2">
                  <Truck />
                  <span className="text-gray-800">Miễn phí vận chuyển</span>
                </div>
                <div className="text-gray-500 text-xs pl-7">
                  Miễn phí vận chuyển cho đơn hàng trên ₫0
                </div>
              </div>
            </div>

            {/* Child Products */}
            <div className="flex items-start">
              <span className="w-28 text-gray-500  mt-2">Loại</span>
              <div className="flex-1 flex flex-wrap gap-2" ref={wrapperRef}>
                {detail?.childProduct.map((child, idx) => {
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedVariantId(child)}
                      className={`px-4 py-1.5 border rounded-sm transition-all ${
                        selectedVariantId === child
                          ? "border-orange-600 text-orange-600"
                          : "border-gray-200 hover:border-orange-600 text-gray-700"
                      }`}
                    >
                      {child.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center">
              <span className="w-28 text-gray-500 ">Số Lượng</span>
              <div className="flex items-center border border-gray-200 rounded-sm">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 border-r border-gray-200 hover:bg-gray-50"
                >
                  -
                </button>
                <input
                  type="text"
                  value={quantity}
                  readOnly
                  className="w-12 text-center text-gray-700 focus:outline-none"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 border-l border-gray-200 hover:bg-gray-50"
                >
                  +
                </button>
              </div>
              <span className="ml-4 text-gray-500">
                {detail?.total} sản phẩm có sẵn
              </span>
            </div>

            {/* Action Buttons */}
            <div
              className="flex flex-col sm:flex-row gap-4 pt-4"
              ref={wrapperRef}
            >
              <button
                onClick={() =>
                  dispatch(
                    addItemToCart({
                      productId: detail?._id as string,
                      variantId: selectedVariantId?._id as string,
                      quantity: quantity,
                    })
                  )
                }
                disabled={!selectedVariantId}
                className={`flex-1 flex items-center justify-center space-x-2 border border-orange-600 bg-orange-50 text-orange-600 py-3 rounded-sm hover:bg-orange-100 transition-colors ${
                  !selectedVariantId ? "cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                <ShoppingCart />
                <span>Thêm Vào Giỏ Hàng</span>
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 bg-orange-600 text-white py-3 rounded-sm hover:bg-orange-700 transition-colors shadow-sm"
              >
                Mua Ngay
              </button>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <Shield />
              <span>Shopee Đảm Bảo</span>
            </div>
            <span className="text-gray-400 text-xs">
              3 Ngày Trả Hàng / Hoàn Tiền
            </span>
          </div>
        </div>
      </div>

      {/* Product Specification Section */}
      <div className="bg-white rounded shadow-sm p-6 space-y-6">
        <div>
          <h2 className="bg-gray-50 p-4 -mx-6 -mt-6 text-lg font-medium text-gray-800 uppercase mb-6">
            CHI TIẾT SẢN PHẨM
          </h2>
          <div className="space-y-4 max-w-4xl">
            <DetailItem
              label="Danh Mục"
              value={
                <div className="flex space-x-1 items-center overflow-x-auto whitespace-nowrap">
                  {detail?.category.map((c, i) => (
                    <div key={c._id}>
                      <span className="text-blue-700 hover:underline cursor-pointer">
                        {c.name}
                      </span>
                      {i < detail.category.length - 1 && (
                        <span className="text-gray-400">&gt;</span>
                      )}
                    </div>
                  ))}
                </div>
              }
            />
            <DetailItem
              label="Thương hiệu"
              value={
                <span className="text-blue-700 hover:underline cursor-pointer">
                  {detail?.brand.name}
                </span>
              }
            />
            <DetailItem label="Kiểu đóng gói" value="Tùy size" />
            <DetailItem label="Công Thức" value="Dạng Lỏng" />
            <DetailItem label="Xuất xứ" value="Việt Nam" />
            <DetailItem label="Loại thú cưng" value="Mèo" />
            <DetailItem label="Hạn sử dụng" value="36 tháng" />
            <DetailItem label="Gửi từ" value="TP. Hồ Chí Minh" />
          </div>
        </div>

        <div>
          <h2 className="bg-gray-50 p-4 -mx-6 text-lg font-medium text-gray-800 uppercase mb-6">
            MÔ TẢ SẢN PHẨM
          </h2>
          <div className="text-gray-700 whitespace-pre-wrap leading-relaxed text-sm">
            {detail?.description}
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailItem: React.FC<{ label: string; value: React.ReactNode }> = ({
  label,
  value,
}) => (
  <div className="flex items-start">
    <span className="w-40 text-gray-500 text-sm">{label}</span>
    <div className="flex-1 text-gray-800 text-sm">{value}</div>
  </div>
);
