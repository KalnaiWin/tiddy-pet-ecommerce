import { ArrowRight, Eye, EyeClosed, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { roles, type UserRole } from "../../types/InterfaceUser";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store";
import { loginUser, registerUser } from "../../feature/userThunk";

const LoginAndRegisterPage = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [role, setRole] = useState<UserRole>("CUSTOMER");

  const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      await dispatch(
        loginUser({
          email: formData.email,
          password: formData.password,
        }),
      );
    } else {
      await dispatch(
        registerUser({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role,
        }),
      );
    }
  };

  return (
    <div className="bg-white py-4 flex flex-col justify-around items-center rounded-md gap-5">
      <div className="text-center">
        <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center text-white rotate-6 mx-auto mb-4">
          <span className="text-3xl font-bold">TP</span>
        </div>
        <h2 className="text-3xl font-bold text-slate-900">
          {isLogin ? "Welcome Back!" : "Join the Family"}
        </h2>
        <p className="text-slate-500 mt-2 text-sm">
          {isLogin
            ? "Sign in to access your pet profile"
            : "Start your journey with Tiddy Pet Shop"}
        </p>
      </div>
      <form
        className="w-full px-12 flex flex-col gap-3"
        onSubmit={handleSubmit}
      >
        {!isLogin && (
          <div className="flex flex-col gap-1">
            <label className="text-xs text-slate-500 font-bold">
              FULL NAME
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                required
                type="text"
                placeholder="Washington Machine"
                className="w-full bg-slate-200 border-2 border-transparent focus:border-orange-500 focus:bg-slate-100 rounded-2xl px-5 py-2.5 indent-6 text-sm transition-all outline-none"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
          </div>
        )}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-500 font-bold">
            EMAIL ADDRESS
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              required
              type="email"
              placeholder="hello@paws.com"
              className="w-full bg-slate-200 border-2 border-transparent focus:border-orange-500 focus:bg-slate-100 rounded-2xl px-5 py-2.5 indent-6 text-sm transition-all outline-none"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-slate-500 font-bold">PASSWORD</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              required
              type={isShowPassword ? "text" : "password"}
              placeholder="••••••••"
              className="w-full bg-slate-200 border-2 border-transparent focus:border-orange-500 focus:bg-slate-100 rounded-2xl px-5 py-2.5 indent-6 text-sm transition-all outline-none"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 right-4 text-slate-400"
              onClick={() => setIsShowPassword(!isShowPassword)}
            >
              {isShowPassword ? <Eye /> : <EyeClosed />}
            </div>
          </div>
        </div>
        {!isLogin && (
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">
              Choose Your Role
            </label>
            <div className="flex gap-2 justify-center">
              {roles.map((r) => {
                const Icon = r.icon;
                const active = role === r.id;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setRole(r.id)}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all ${
                      active
                        ? "border-orange-500 bg-orange-50 text-orange-600"
                        : "border-slate-100 bg-white text-slate-400 hover:border-slate-200"
                    }`}
                  >
                    <Icon className="w-5 h-5 mb-1" />
                    <span className="text-[10px] font-bold uppercase">
                      {r.label}
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="text-[10px] text-center text-slate-400 italic">
              {roles.find((r) => r.id === role)?.desc}
            </p>
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-slate-900 text-white rounded-2xl py-3 font-bold shadow-lg hover:bg-orange-600 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 mt-2 group cursor-pointer"
        >
          {isLogin ? "Sign In" : "Create Account"}
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </form>
      <div className="flex items-center gap-3 text-sm">
        <p>Don{"'"}t have an account?</p>
        <button
          className="text-orange-600 font-black hover:underline cursor-pointer"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Register Now" : "Sign In Here"}
        </button>
      </div>
    </div>
  );
};

export default LoginAndRegisterPage;
