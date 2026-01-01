import { Search, Truck, UserCircle2 } from "lucide-react";
import { useState } from "react";
import TableListShipper from "./TableListShipper";
import TableListCustomer from "./TableListCustomer";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";

const AccountManagement = () => {
  const { users } = useSelector((state: RootState) => state.user);
  const [isCustomer, setIsCustomer] = useState(true);

  const [isEmail, setIsEmail] = useState("");

  const totalShipper = users.filter((user) => {
    user.role === "SHIPPER";
    user.status === "ACTIVE";
  }).length;
  const totalVerified = users.filter((user) => {
    user.role === "SHIPPER";
    user?.shipper_info?.verification_status === "APPROVED";
  }).length;
  const totalCustomer = users.filter((user) => {
    user.role === "CUSTOMER";
    user.status === "ACTIVE";
  }).length;
  let amountSpend = 0;
  users.forEach((user) => {
    amountSpend += user.totalSpend;
  });

  return (
    <div className="h-full bg-slate-100 min-h-screen p-5">
      <div className="flex gap-2 items-center">
        <h1 className="font-bold text-lg sm:text-xl md:text-2xl">
          Account Management
        </h1>
      </div>
      <p className="text-xs sm:text-sm md:text-base text-slate-600">
        Manage accounts of customers and shippers.
      </p>
      <div className="grid md:grid-cols-3 grid-cols-2 w-full my-2 md:p-3 rounded-md gap-1 items-center md:text-xl text-xs">
        <div className="flex flex-col gap-1 bg-white items-center justify-center py-2 rounded-md">
          <p className="tracking-widest text-slate-500 font-semibold">TOTAL</p>
          <p className="font-bold">{users.length}</p>
        </div>
        <div className="flex flex-col gap-1 bg-white items-center justify-center py-2 rounded-md">
          <p className="tracking-widest text-slate-500 font-semibold">ACTIVE</p>
          <p className="font-bold text-green-600">
            {isCustomer ? totalCustomer : totalShipper}
          </p>
        </div>
        <div
          className={`${
            isCustomer ? "flex" : "hidden"
          } flex-col col-span-2 md:col-span-1 gap-1 bg-white items-center justify-center py-2 rounded-md`}
        >
          <p className="tracking-widest text-slate-500 font-semibold">AMOUNT</p>
          <p className="font-bold ">{amountSpend} VND</p>
        </div>
        <div
          className={`${
            !isCustomer ? "flex" : "hidden"
          } flex-col col-span-2 md:col-span-1 gap-1 bg-white items-center justify-center py-2 rounded-md`}
        >
          <p className="tracking-widest text-slate-500 font-semibold">VERIFY</p>
          <p className="font-bold text-blue-500">{totalVerified}</p>
        </div>
      </div>
      <div className="grid md:grid-cols-3 grid-cols-2 gap-2 bg-white p-2 w-full rounded-md justify-between md:text-sm text-xs items-center">
        <div className="flex gap-2 md:justify-start justify-center w-full md:col-span-1 col-span-2">
          <button
            className={`flex gap-2 items-center py-1 px-2 rounded-md w-1/2 ${
              isCustomer ? "bg-blue-500 text-white" : "text-slate-800 border"
            }`}
            onClick={() => setIsCustomer(!isCustomer)}
          >
            <UserCircle2 />
            <p>CUSTOMER</p>
          </button>
          <button
            className={`flex gap-2 items-center py-1 px-2 rounded-md w-1/2 ${
              !isCustomer ? "bg-green-500 text-white" : "text-slate-800 border"
            }`}
            onClick={() => setIsCustomer(!isCustomer)}
          >
            <Truck />
            <p>SHIPPER</p>
          </button>
        </div>
        <div className="relative w-full col-span-2">
          <input
            type="text"
            className="w-full indent-8 rounded-md p-1 bg-slate-200 focus:outline-none border"
            placeholder="Search email"
            value={isEmail}
            onChange={(e) => setIsEmail(e.target.value)}
          />
          <Search className="absolute md:top-1 top-0.5 left-1 size-5 text-slate-500" />
        </div>
      </div>
      <div className="my-5 md:text-md text-xs">
        {isCustomer ? (
          <TableListCustomer email={isEmail} />
        ) : (
          <TableListShipper email={isEmail} />
        )}
      </div>
    </div>
  );
};

export default AccountManagement;
