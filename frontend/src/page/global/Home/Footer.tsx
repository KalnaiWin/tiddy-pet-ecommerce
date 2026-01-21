import { Link } from "react-router-dom";
import { Policy } from "../../../types/InterfaceGlobal";

const Footer = () => {
  return (
    <div className="flex flex-col w-full gap-10 mb-10">
      <div className="grid md:grid-cols-4 grid-cols-1 md:space-y-0 space-y-10 bg-slate-900 w-full p-10">
        {Policy.map((item) => (
          <div
            key={item.name}
            className="flex flex-col items-center justify-center px-15 text-center gap-3"
          >
            <item.icon className="size-20 bg-white/10 rounded-2xl flex items-center justify-center text-orange-500 p-5" />
            <h1 className="font-bold text-lg text-white">{item.name}</h1>
            <p className="text-slate-400 text-sm">{item.description}</p>
          </div>
        ))}
      </div>
      <footer className="bg-white border-gray-100">
        <div className="mx-auto px-10 w-full flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="bg-orange-500 text-white font-black p-2 rounded-md text-2xl rotate-20">
              TP
            </div>
            <span className="font-bold text-slate-800 text-2xl">Tiddy Pet</span>
          </div>
          <p className="text-slate-400 text-sm">
            © 2025 Tiddy Pet Store. All rights reserved.
          </p>
          <div className="flex gap-6 text-slate-500 text-sm font-medium">
            <Link to={"/"} className="hover:text-orange-600">
              Terms
            </Link>
            <Link to={"/"} className="hover:text-orange-600">
              Privacy
            </Link>
            <Link to={"/"} className="hover:text-orange-600">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
