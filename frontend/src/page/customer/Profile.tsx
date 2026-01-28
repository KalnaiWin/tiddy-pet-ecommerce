import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { fetchUser, updateProfileAccount } from "../../feature/userThunk";
import {
  formatVND,
  roleUserColor,
  StatusColor,
} from "../../types/HelperFunction";
import { Camera, UserCog } from "lucide-react";
import type { AccountCustomerEdit } from "../../types/InterfaceUser";
import SkeletonProfile from "../../components/common/(customer)/SkeletonProfile";
import { resetOrderState } from "../../store/orderSlice";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { currentUser, status } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUser());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (!currentUser) {
      dispatch(resetOrderState());
      navigate("/");
    }
  }, [currentUser, dispatch]);

  const [formData, setFormData] = useState({
    name: currentUser?.name,
    image_profile: currentUser?.image_profile,
    phone: currentUser?.phone,
    address: currentUser?.address,
  });

  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || "",
        image_profile: currentUser.image_profile || "",
        phone: currentUser.phone || "",
        address: currentUser.address || "",
      });
    }
  }, [currentUser]);

  const addImage = () => {
    const url = prompt("Enter Image URL:");
    if (url) {
      setFormData((prev) => ({
        ...prev,
        image_profile: url,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      updateProfileAccount({
        id: "",
        data: formData as AccountCustomerEdit,
      }),
    );
  };

  if (status === "loading") return <SkeletonProfile />;

  return (
    <div className="p-10">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1 text-[#ff7e20]">
            <UserCog className="size-8" />
            <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
          </div>
          <p className="text-gray-500 text-sm text-left">
            Manage your personal information and account settings.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col items-center text-center">
            <div className="relative group">
              <div className="w-32 h-32 bg-gray-100 rounded-full overflow-hidden mb-4 border-4 border-white shadow-lg ring-1 ring-gray-100">
                {formData.image_profile ? (
                  <img
                    src={formData.image_profile}
                    alt={formData.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300 text-5xl"></div>
                )}
              </div>
              <div
                className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                onClick={() => addImage()}
              >
                <Camera className="text-white" />
              </div>
            </div>

            <h2 className="text-xl font-bold text-gray-800">{formData.name}</h2>
            <p className="text-gray-500 text-sm mb-4">{currentUser?.email}</p>

            <div className="flex gap-2 mb-6">
              <span
                className={`px-3 py-1 rounded-full text-[10px] font-bold border ${StatusColor(String(currentUser?.status).toUpperCase())}`}
              >
                {currentUser?.status}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-[10px] font-bold bg-blue-50 border border-blue-100 ${roleUserColor(String(currentUser?.role).toUpperCase())}`}
              >
                {currentUser?.role}
              </span>
            </div>

            <div className="w-full pt-6 border-t border-gray-50 grid grid-cols-1 gap-4">
              <div className="text-center">
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">
                  Total Spend
                </p>
                <p className="text-2xl font-black text-[#ff7e20]">
                  {formatVND(Number(currentUser?.totalSpend))}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-2 py-1.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#ff7e20]/20 focus:border-[#ff7e20] outline-none transition-all disabled:bg-gray-50 disabled:text-gray-500"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    disabled={true}
                    value={currentUser?.email}
                    className="w-full px-2 py-1.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#ff7e20]/20 focus:border-[#ff7e20] outline-none transition-all disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-2 py-1.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#ff7e20]/20 focus:border-[#ff7e20] outline-none transition-all disabled:bg-gray-50 disabled:text-gray-500"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">
                    Delivery Address
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    rows={3}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    className="w-full px-2 py-1.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#ff7e20]/20 focus:border-[#ff7e20] outline-none transition-all disabled:bg-gray-50 disabled:text-gray-500 resize-none"
                    placeholder="Street, City, State, ZIP"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3">
                <button
                  type="submit"
                  className="bg-[#ff7e20] text-white px-8 py-2 rounded-lg text-sm font-semibold hover:bg-[#e66d15] transition-colors shadow-lg shadow-orange-100"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
