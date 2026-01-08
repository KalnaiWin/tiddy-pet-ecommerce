import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { useEffect } from "react";
import { getAccountDetail } from "../../feature/userThunk";
import { StatusColor, VerifyStatus } from "../../types/HelperFunction";
import {
  CalendarCheck,
  CircleDollarSign,
  Info,
  MapPin,
  Phone,
} from "lucide-react";

interface Props {
  userId: string;
}

const ViewUserInformation = ({ userId }: Props) => {
  const { detailAccount } = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAccountDetail({ id: userId }));
  }, [dispatch, userId]);

  return (
    <div className="h-fit">
      <div className="relative h-32 bg-orange-600">
        <button className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors"></button>
        <div className="absolute -bottom-12 left-8">
          <div className="relative">
            <img
              src={`/src/asset/Empty.webp`}
              alt={detailAccount?.name}
              className="w-24 h-24 rounded-2xl border-4 border-white shadow-lg object-cover"
            />
            <div
              className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white ${
                detailAccount?.status === "ACTIVE"
                  ? "bg-green-500"
                  : "bg-gray-400"
              }`}
            ></div>
          </div>
        </div>
      </div>

      <div className="pt-16 pb-8 px-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              {detailAccount?.name}
            </h2>
            <p className="text-slate-500 font-medium">{detailAccount?.email}</p>
          </div>
          <div
            className={`px-4 py-1.5 rounded-full text-sm font-semibold border ${StatusColor(
              detailAccount?.status as string
            )}`}
          >
            {detailAccount?.status}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-slate-50 rounded-lg">
                <Phone className="w-5 h-5 text-slate-400" />
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">
                  Phone Number
                </p>
                <p className="text-slate-700 font-medium">
                  {detailAccount?.phone
                    ? detailAccount.phone
                    : "Did not update"}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-slate-50 rounded-lg">
                <MapPin className="w-5 h-5 text-slate-400" />
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">
                  Address
                </p>
                <p className="text-slate-700 font-medium">
                  {detailAccount?.address
                    ? detailAccount.address
                    : "Did not update"}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-slate-50 rounded-lg">
                <CircleDollarSign className="w-5 h-5 text-slate-400" />
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">
                  Total Spending
                </p>
                <p className="text-slate-800 font-bold text-lg">
                  $
                  {detailAccount?.totalSpend.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-slate-50 rounded-lg">
                <CalendarCheck className="w-5 h-5 text-slate-400" />
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">
                  Member Since
                </p>
                <p className="text-slate-700 font-medium">
                  {detailAccount?.createdAt
                    ? new Date(detailAccount.createdAt).toLocaleDateString(
                        "vi-VN"
                      )
                    : "Did not create"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {detailAccount?.role === "SHIPPER" && detailAccount?.shipper_info && (
          <div className="mt-8 p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-4 flex items-center">
              <Info className="w-4 h-4 mr-2 text-orange-500" />
              Shipper Credentials
            </h3>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <p className="text-xs text-slate-400 font-semibold mb-1">
                  Vehicle
                </p>
                <p className="text-slate-700 font-bold">
                  {detailAccount?.shipper_info.vehicle_type}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-semibold mb-1">
                  License
                </p>
                <p className="text-slate-700 font-bold font-mono uppercase">
                  {detailAccount?.shipper_info.license_number
                    ? detailAccount.shipper_info.license_number
                    : "Did not update"}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-semibold mb-1">
                  Verification
                </p>
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold uppercase ${VerifyStatus(
                    detailAccount?.shipper_info.verification_status
                  )}`}
                >
                  {detailAccount?.shipper_info.verification_status}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewUserInformation;
