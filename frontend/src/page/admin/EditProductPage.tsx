import { ArrowLeft, Loader, Trash, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { childProductInput } from "../../types/InterfaceProduct";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import {
  editProduct,
  getAllBrands,
  getAllCategories,
  viewProductDetail,
} from "../../feature/productThunk";
import { convertSlug } from "../../types/HelperFunction";
import toast from "react-hot-toast";
import { resetProductCRUDstatus } from "../../store/productSlice";

const EditProductPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { categories, brands, editStatus, detail } = useSelector(
    (state: RootState) => state.product
  );

  const [newCategory, setNewCategory] = useState("");
  const [customCategories, setCustomCategories] = useState<string[]>([]);

  const [newBrand, setNewBrand] = useState("");
  const [customBrand, setCustomBrand] = useState("");

  useEffect(() => {
    if (id) {
      dispatch(viewProductDetail({ id: id }));
    }
  }, [id, dispatch]);

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllBrands());
  }, [dispatch]);

  useEffect(() => {
    if (editStatus === "succeeded") {
      navigate("/admin/store");
    }
    if (editStatus === "failed") {
      toast.error("Update failed");
      dispatch(resetProductCRUDstatus());
    }
  }, [editStatus, navigate, dispatch]);
  
  const [formData, setFormData] = useState({
    name: "",
    status: "",
    description: "",
    imageProduct: ["/src/asset/Empty.webp"],
    minPrice: 0,
    maxPrice: 0,
    total: 0,
    discount: 0,
    childProduct: [
      {
        name: "",
        price: 0,
        image: "",
        stock: 0,
      },
    ],
    category: [
      {
        name: "",
        slug: "",
        isActive: false,
      },
    ],
    brand: {
      name: "",
      slug: "",
      isActive: false,
    },
  });

  useEffect(() => {
    if (detail && id) {
      setFormData({
        name: detail.name || "",
        status: detail.status || "",
        description: detail.description || "",
        imageProduct:
          detail.imageProduct?.length > 0
            ? detail.imageProduct
            : ["/src/asset/Empty.webp"],
        minPrice: detail.minPrice || 0,
        maxPrice: detail.maxPrice || 0,
        total: detail.total || 0,
        discount: detail.discount || 0,
        childProduct:
          detail.childProduct?.length > 0
            ? detail.childProduct
            : [
                {
                  name: "",
                  price: 0,
                  image: "",
                  stock: 0,
                },
              ],
        category:
          detail.category?.length > 0
            ? detail.category.map((cat: any) => ({
                name: cat.name,
                slug: cat.slug,
                isActive: cat.isActive ?? true,
              }))
            : [
                {
                  name: "",
                  slug: "",
                  isActive: false,
                },
              ],
        brand: detail.brand
          ? {
              name: detail.brand.name,
              slug: detail.brand.slug,
              isActive: detail.brand.isActive ?? true,
            }
          : {
              name: "",
              slug: "",
              isActive: false,
            },
      });

      // Also populate custom categories and brand if they exist
      if (detail.category) {
        const customCats = detail.category.map((cat: any) => cat.name);
        setCustomCategories(customCats);
      }
      if (detail.brand?.name) {
        setCustomBrand(detail.brand.name);
      }
    }
  }, [detail, id]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const addImage = () => {
    const url = prompt("Enter Image URL:");
    if (url) {
      setFormData((prev) => ({
        ...prev,
        imageProduct: [...prev.imageProduct, url],
      }));
    }
  };

  const addChildProduct = () => {
    const newChild: childProductInput = {
      name: `Variant ${formData.childProduct.length + 1}`,
      price: formData.maxPrice,
      image: "https://picsum.photos/200/200",
      stock: 10,
    };
    setFormData((prev) => ({
      ...prev,
      childProduct: [...prev.childProduct, newChild],
    }));
  };

  const removeChildProduct = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      childProduct: prev.childProduct.filter((_, i) => i !== index),
    }));
  };

  const handleAddCategory = () => {
    if (newCategory.trim() === "") return;
    const name = newCategory.trim();
    const slug = convertSlug(name);

    setCustomCategories((prev) =>
      prev.includes(name) ? prev : [...prev, name]
    );
    setFormData((prev) => ({
      ...prev,
      category: prev.category.some((c) => c.slug === slug)
        ? prev.category
        : [
            ...prev.category,
            {
              name,
              slug,
              isActive: true,
            },
          ],
    }));
    setNewCategory("");
  };

  const handleAddBrand = () => {
    if (newBrand.trim() === "") return;
    const name = newBrand.trim();
    const slug = convertSlug(name);

    setCustomBrand(name);

    setFormData((prev) => ({
      ...prev,
      brand: {
        name,
        slug,
        isActive: true,
      },
    }));
    setNewBrand("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id) {
      navigate("/");
      return;
    }
    if (!formData.name.trim()) {
      alert("Product name is required");
      return;
    }

    // const payload = {
    //   ...formData,
    //   category: formData.category.filter((c) => c.isActive),
    //   imageProduct: formData.imageProduct.filter(Boolean),
    //   childProduct: formData.childProduct.filter((c) => c.name && c.price > 0),
    // };

    // console.log("SUBMIT PAYLOAD:", payload);

    dispatch(editProduct({ id, data: formData }));
  };

  return (
    <form
      className="w-full min-h-screen bg-slate-100 p-3 sm:p-5"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 sm:gap-0">
        <div className="flex flex-col">
          <h1 className="font-bold text-lg sm:text-xl md:text-2xl">
            Edit Product
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-slate-600">
            Manage your product catalog, pricing and stock levels.
          </p>
        </div>
        <Link
          to={"/admin/store"}
          className="p-2 group bg-black text-white rounded-md font-black flex items-center gap-2"
        >
          <ArrowLeft className="group-hover:-translate-x-1 transition-all" />
          Back
        </Link>
      </div>

      <div className="lg:col-span-2 space-y-8">
        {/* Basic information */}
        <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-xl font-semibold mb-6 text-slate-800 border-b pb-4">
            Basic Information
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g. Premium Orthopedic Dog Bed"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-slate-700 text-white placeholder:text-white/70"
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-slate-700">
                  Description
                </label>
              </div>
              <textarea
                name="description"
                rows={6}
                required
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Provide a detailed description of the product features, benefits, and materials..."
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none resize-none bg-slate-700 text-white placeholder:text-white/70"
              />
            </div>
          </div>
        </section>

        {/* Image gallery */}
        <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-xl font-semibold mb-6 text-slate-800 border-b pb-4">
            Product Gallery
          </h2>
          <div className="grid grid-cols-4 gap-4 mb-4">
            {formData.imageProduct.length > 0 &&
              formData.imageProduct.map((url, idx) => (
                <div
                  key={idx}
                  className="relative group aspect-square rounded-lg overflow-hidden border border-slate-200"
                >
                  <img
                    src={url}
                    alt={`Preview ${idx}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((p) => ({
                        ...p,
                        imageProduct: p.imageProduct.filter(
                          (_, i) => i !== idx
                        ),
                      }))
                    }
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            <button
              type="button"
              onClick={addImage}
              className="aspect-square border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center text-slate-400 hover:text-indigo-500 hover:border-indigo-500 transition-all"
            >
              <svg
                className="w-8 h-8 mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span className="text-xs font-medium">Add Image</span>
            </button>
          </div>
        </section>

        {/* Child rpduct */}
        <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6 border-b pb-4">
            <h2 className="text-xl font-semibold text-slate-800">
              Child Products (Variants)
            </h2>
            <button
              type="button"
              onClick={addChildProduct}
              className="text-sm font-semibold text-indigo-600 hover:text-indigo-800"
            >
              + Add Variant
            </button>
          </div>
          <div className="space-y-4">
            {formData.childProduct.length === 0 ? (
              <p className="text-slate-400 text-sm text-center py-8 bg-slate-50 rounded-lg border border-dashed">
                No variants added yet. Add variants for different sizes, colors,
                or flavors.
              </p>
            ) : (
              formData.childProduct.map((child, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 p-4 border border-slate-200 rounded-lg bg-slate-50"
                >
                  <img
                    src={child.image || "/src/asset/Empty.webp"}
                    className="w-12 h-12 rounded bg-white object-cover border"
                    alt=""
                  />
                  <div className="flex-1 grid grid-cols-3 gap-4">
                    <input
                      className="bg-transparent border-b border-slate-300 focus:border-indigo-500 outline-none text-sm py-1"
                      placeholder="Variant Name"
                      value={child.name}
                      onChange={(e) => {
                        const newChildren = [...formData.childProduct];
                        newChildren[idx].name = e.target.value;
                        setFormData((p) => ({
                          ...p,
                          childProduct: newChildren,
                        }));
                      }}
                    />
                    <input
                      type="number"
                      className="bg-transparent border-b border-slate-300 focus:border-indigo-500 outline-none text-sm py-1"
                      placeholder="Price"
                      value={child.price}
                      onChange={(e) => {
                        const newChildren = [...formData.childProduct];
                        newChildren[idx].price = Number(e.target.value);
                        setFormData((p) => ({
                          ...p,
                          childProduct: newChildren,
                        }));
                      }}
                    />
                    <input
                      type="number"
                      className="bg-transparent border-b border-slate-300 focus:border-indigo-500 outline-none text-sm py-1"
                      placeholder="Stock"
                      value={child.stock}
                      onChange={(e) => {
                        const newChildren = [...formData.childProduct];
                        newChildren[idx].stock = Number(e.target.value);
                        setFormData((p) => ({
                          ...p,
                          childProduct: newChildren,
                        }));
                      }}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeChildProduct(idx)}
                    className="text-red-500 hover:text-red-800 bg-red-200 rounded-md p-1"
                  >
                    <Trash />
                  </button>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
      {/* Right Column: Sidebar Settings */}
      <div className="space-y-8">
        {/* Pricing & Inventory */}
        <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-xl font-semibold mb-6 text-slate-800 border-b pb-4">
            Pricing & Stock
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Base Min Price
                </label>
                <input
                  type="number"
                  name="minPrice"
                  value={formData.minPrice}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-slate-700 text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Base Max Price
                </label>
                <input
                  type="number"
                  name="maxPrice"
                  value={formData.maxPrice}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-slate-700 text-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Discount (%)
              </label>
              <input
                type="number"
                name="discount"
                min="0"
                max="100"
                value={formData.discount}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-slate-700 text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Total Inventory
              </label>
              <input
                type="number"
                name="total"
                value={formData.total}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-slate-700 text-white"
              />
            </div>
          </div>
        </section>

        {/* Categorization */}
        <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-xl font-semibold mb-6 text-slate-800 border-b pb-4">
            Classification
          </h2>

          <div className="space-y-8 flex">
            <div className="w-1/2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                Brand {"(Only 1)"}
              </label>
              <div className="flex flex-wrap gap-2">
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    className="px-3 py-1 rounded-xl border border-dashed border-slate-500 text-slate-600 text-sm"
                    placeholder="+ Add new category"
                    value={newBrand}
                    onChange={(e) => setNewBrand(e.target.value)}
                  />

                  <button
                    type="button"
                    onClick={handleAddBrand}
                    className="text-slate-200 px-2 py-1 bg-black rounded-xl"
                  >
                    Add
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-2 items-center">
                <p className="text-blue-600 font-semibold text-xs">
                  Current brand :
                </p>
                {brands?.length !== 0 ? (
                  brands?.map((brand) => (
                    <div
                      key={brand._id}
                      className="px-2 py-0.5 rounded-xl bg-blue-600 text-white text-xs font-semibold"
                    >
                      <p>{brand.name}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs font-semibold">None</p>
                )}
              </div>
            </div>

            <div className="w-1/2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                Categories {"(Many)"}
                <div className="absolute top-0 right-0"></div>
              </label>
              <div className="flex flex-wrap gap-2">
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    className="px-3 py-1 rounded-xl border border-dashed border-slate-500 text-slate-600 text-sm"
                    placeholder="+ Add new category"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                  />

                  <button
                    type="button"
                    onClick={handleAddCategory}
                    className="text-slate-200 px-2 py-1 bg-black rounded-xl"
                  >
                    Add
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-2 items-center">
                <p className="text-red-600 font-semibold text-xs">
                  Current brand :
                </p>
                {categories?.length !== 0 ? (
                  categories?.map((category) => (
                    <div
                      key={category._id}
                      className="px-2 py-0.5 rounded-xl bg-red-600 text-white text-xs font-semibold"
                    >
                      <p>{category.name}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs font-semibold">None</p>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 border border-dashed items-center p-2 rounded-md">
            {customBrand !== "" && (
              <div className="relative w-fit bg-blue-800 rounded-md px-3 py-1 mb-2">
                <p className="text-xs text-white font-semibold">
                  {customBrand}
                </p>
                <button
                  className="absolute -top-2 -right-2"
                  onClick={() => setCustomBrand("")}
                >
                  <XIcon className="size-4 p-0.5 bg-red-300 rounded-full text-red-500" />
                </button>
              </div>
            )}
            {/* Custom added categories */}
            {customCategories.length > 0 && (
              <div className="flex gap-2 items-center mb-2">
                {customCategories.map((cat, idx) => (
                  <div
                    key={idx}
                    className="relative w-fit bg-red-800 rounded-md px-3 py-1"
                  >
                    <p className="text-xs text-white font-semibold">{cat}</p>
                    <button
                      className="absolute -top-2 -right-2"
                      onClick={() =>
                        setCustomCategories((prev) =>
                          prev.filter((_, i) => i !== idx)
                        )
                      }
                    >
                      <XIcon className="size-4 p-0.5 bg-red-300 rounded-full text-red-500" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Status */}
        <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-xl font-semibold mb-6 text-slate-800 border-b pb-4">
            Publishing
          </h2>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Status
            </label>
            <div className="grid grid-cols-1 gap-2">
              {["Available", "Out of stock", "Draft"].map((status) => (
                <label
                  key={status}
                  className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors"
                >
                  <input
                    type="radio"
                    name="status"
                    value={status}
                    checked={formData.status === status}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-indigo-600"
                  />
                  <span
                    className={`text-sm font-medium ${
                      formData.status === status
                        ? "text-indigo-700"
                        : "text-slate-600"
                    }`}
                  >
                    {status}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </section>
      </div>
      <button
        type="submit"
        className={`w-full my-10 py-5 ${
          editStatus === "loading" ? "cursor-not-allowed" : "cursor-pointer"
        } bg-orange-600  rounded-md py-2 hover:bg-orange-400 flex justify-center items-center`}
        disabled={editStatus === "loading"}
      >
        {editStatus === "loading" ? (
          <p className="flex justify-center items-center text-white font-black text-xl gap-2 animate-pulse">
            <Loader className="animate-spin" />
            Please waiting...
          </p>
        ) : (
          <p className="font-black text-2xl text-white">Submit</p>
        )}
      </button>
    </form>
  );
};

export default EditProductPage;
