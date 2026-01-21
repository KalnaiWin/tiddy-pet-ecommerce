import { User, XIcon } from "lucide-react";
import { useState } from "react";
import LoginAndRegisterPage from "../page/customer/LoginAndRegisterPage";

const ButtonAuth = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button
        className="flex items-center gap-2 bg-slate-800 text-white py-2 px-4 rounded-full text-sm hover:bg-slate-700 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <User className="w-5 h-5" />
        <p>Login</p>
      </button>
      {/* Login and Register */}
      {isOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black/40 flex justify-center items-center z-2"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-full max-w-md p-6 rounded-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <XIcon
              className="absolute top-10 right-10 cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            />
            <LoginAndRegisterPage />
          </div>
        </div>
      )}
    </div>
  );
};

export default ButtonAuth;
