import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import type { AppDispatch, RootState } from "../../store";
import { verifySuccessfulPayment } from "../../feature/paymentThunk";
import {
  ArrowRight,
  CheckCircle2,
  Download,
  ExternalLink,
  MapPin,
  Package,
  Printer,
  Share2,
  ShoppingCart,
} from "lucide-react";
import { formatVND } from "../../types/HelperFunction";

const SuccessPage = () => {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const { infoPayment } = useSelector((state: RootState) => state.payment);
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionId) {
      navigate("/");
      return;
    }
    dispatch(verifySuccessfulPayment(sessionId));
  }, [sessionId]);

  return (
    <div className="md:py-15 mx-auto space-y-8 flex flex-col items-center">
      {/* Main Success Section */}
      <section className="text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-2">
          <CheckCircle2 className="w-12 h-12 text-green-600" />
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
          Payment Successful!
        </h1>
        <p className="text-gray-600 max-w-lg mx-auto text-lg">
          Thank you for your purchase. We've sent a confirmation email to
          <span className="font-semibold text-gray-900 ml-1">
            {infoPayment?.customer.email}
          </span>
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            to={"/cart"}
            className="flex items-center px-6 py-3 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transform transition-all hover:scale-105 shadow-lg shadow-orange-200"
          >
            <Package className="w-5 h-5 mr-2" />
            Track Order
          </Link>
          <Link
            to={"/store"}
            className="flex items-center px-6 py-3 bg-white text-gray-700 font-bold border border-gray-200 rounded-xl hover:bg-gray-50 transition-all"
          >
            Continue Shopping
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-50">
            <h3 className="text-xl font-bold text-gray-900">Order Summary</h3>
            <div className="flex items-center space-x-2">
              <button
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                title="Print Receipt"
              >
                <Printer className="w-5 h-5" />
              </button>
              <button
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                title="Download Invoice"
              >
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-y-6">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                  Order Number
                </p>
                <p className="text-gray-900 font-medium">
                  {infoPayment?.sessionId}
                </p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                  Date
                </p>
                <p className="text-gray-900 font-medium">date</p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                  Payment Method
                </p>
                <div className="flex items-center">
                  <div className="w-6 h-4 bg-blue-600 rounded-sm mr-2" />
                  <p className="text-gray-900 font-medium">method payment</p>
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                  Status
                </p>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-700 uppercase">
                  {infoPayment?.paymentStatus}
                </span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-50">
              <div className="flex justify-between items-center text-gray-600 mb-2">
                <span>Subtotal ({infoPayment?.items.length})</span>
                <span>{formatVND(Number(infoPayment?.amountTotal))}</span>
              </div>
              <div className="flex justify-between items-center text-gray-600 mb-2">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <div className="flex justify-between items-center text-gray-600 mb-4">
                <span>Tax (EST)</span>
                <span>$1.2</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                <span className="text-xl font-extrabold text-gray-900">
                  Total Paid
                </span>
                <span className="text-2xl font-black text-orange-600">
                  {formatVND(Number(infoPayment?.amountTotal))}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Cards */}
        <div className="space-y-6">
          {/* Shipping Card */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mr-3">
                <MapPin className="w-5 h-5 text-blue-500" />
              </div>
              <h4 className="font-bold text-gray-900">Shipping to</h4>
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              <p className="font-bold text-gray-900">Admin User</p>
              <p>123 Pet Lane</p>
              <p>Bark City, PA 19104</p>
              <p>United States</p>
            </div>
            <button className="mt-4 w-full py-2 text-sm text-blue-600 font-bold hover:bg-blue-50 rounded-lg transition-colors flex items-center justify-center">
              Update Address
              <ExternalLink className="w-3 h-3 ml-1" />
            </button>
          </div>

          <div className="bg-orange-50 rounded-3xl p-6 shadow-sm border border-orange-100 relative overflow-hidden">
            <div className="relative z-10">
              <h4 className="font-bold text-orange-900 mb-2">
                Share the love!
              </h4>
              <p className="text-xs text-orange-800 mb-4">
                Refer a friend to Tiddy Pet and you both get $10 off your next
                order.
              </p>
              <button className="w-full py-3 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-all flex items-center justify-center shadow-md shadow-orange-200">
                <Share2 className="w-4 h-4 mr-2" />
                Share Reward
              </button>
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-10">
              <ShoppingCart className="w-24 h-24 text-orange-900" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
