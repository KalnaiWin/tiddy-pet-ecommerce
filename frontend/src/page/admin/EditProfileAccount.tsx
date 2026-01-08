import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { useEffect, useState } from "react";
import {
  getAccountDetail,
  updateProfileAccount,
} from "../../feature/userThunk";
import toast from "react-hot-toast";

interface Props {
  userId: string;
}

const EditProfileAccount = ({ userId }: Props) => {
  const { detailAccount } = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAccountDetail({ id: userId }));
  }, [dispatch, userId]);

  const [formData, setFormData] = useState({
    name: detailAccount?.name || "",
    email: detailAccount?.email || "",
    phone: detailAccount?.phone || "",
    address: detailAccount?.address || "",
    status: detailAccount?.status || "",
    shipper_info: {
      vehicle_type: detailAccount?.shipper_info.vehicle_type || "",
      license_number: detailAccount?.shipper_info.license_number || "",
      verification_status:
        detailAccount?.shipper_info.verification_status || "",
    },
  });

  useEffect(() => {
    if (detailAccount) {
      setFormData({
        name: detailAccount.name || "",
        email: detailAccount.email || "",
        phone: detailAccount.phone || "",
        address: detailAccount.address || "",
        status: detailAccount.status || "",
        shipper_info: {
          vehicle_type: detailAccount.shipper_info?.vehicle_type || "",
          license_number: detailAccount.shipper_info?.license_number || "",
          verification_status:
            detailAccount.shipper_info?.verification_status || "",
        },
      });
    }
  }, [detailAccount]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!detailAccount?._id) return;

    try {
      await dispatch(
        updateProfileAccount({
          id: detailAccount._id,
          data: formData,
        })
      ).unwrap();
      dispatch(getAccountDetail({ id: detailAccount._id }));
      toast.success("Update profile successfully");
    } catch (err) {
      toast.error(err as string);
    }
  };

  return (
    <div className="">
      <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <div>
          <h2 className="text-xl font-bold text-slate-800 uppercase">
            Edit {detailAccount?.role} Account
          </h2>
          <p className="text-sm text-slate-500">
            Update profile details and account status.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-8 overflow-y-auto max-h-[70vh]"
      >
        <div className="grid grid-cols-2 gap-6">
          {/* General Information */}
          <div className="col-span-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
              General Information
            </h3>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all bg-slate-700 text-white"
              required
            />
          </div>

          <div className="col-span-2 sm:col-span-1">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all bg-slate-700 focus:text-white text-white"
              required
            />
          </div>

          <div className="col-span-2 sm:col-span-1">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all bg-slate-700 focus:text-white text-white"
            />
          </div>

          <div className="col-span-2 sm:col-span-1">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Account Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all bg-slate-700 focus:text-white text-white"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              rows={2}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all bg-slate-700 focus:text-white text-white resize-none"
            />
          </div>

          {/* Shipper Specific Fields */}
          {detailAccount?.role === "SHIPPER" && (
            <>
              <div className="col-span-2 mt-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                  Shipper Credentials
                </h3>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Vehicle Type
                </label>
                <input
                  type="text"
                  name="vehicle_type"
                  value={formData.shipper_info?.vehicle_type || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      shipper_info: {
                        ...formData.shipper_info,
                        vehicle_type: e.target.value,
                      },
                    })
                  }
                  placeholder="e.g. Motorcycle, Van"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all bg-slate-700 focus:text-white text-white"
                />
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  License Number
                </label>
                <input
                  type="text"
                  name="license_number"
                  value={formData.shipper_info?.license_number || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      shipper_info: {
                        ...formData.shipper_info,
                        license_number: e.target.value,
                      },
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all bg-slate-700 focus:text-white text-white font-mono"
                />
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Verification Status
                </label>
                <select
                  name="verification_status"
                  value={
                    formData.shipper_info?.verification_status || "pending"
                  }
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      shipper_info: {
                        ...formData.shipper_info,
                        verification_status: e.target.value,
                      },
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all bg-slate-700 focus:text-white text-white"
                >
                  <option value="pending">Pending</option>
                  <option value="verified">Verified</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </>
          )}
        </div>

        <div className="mt-10 flex justify-end space-x-3">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 shadow-lg shadow-orange-100 transition-all"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfileAccount;
