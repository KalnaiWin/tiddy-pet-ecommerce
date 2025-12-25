import { NavLink } from "react-router-dom";
import { pathCategorySelects, pathUserSelect } from "../types/InterfaceUser";

const SelectorMenuBar = () => {
  return (
    <div className="w-full h-full">
      <div className="flex flex-col gap-3 border border-gray-200 p-5 h-[55%] overflow-y-auto">
        <h3 className="px-3 font-bold text-gray-600 uppercase tracking-widest mb-4">
          SHOP CATEGORIES
        </h3>
        <div className="flex flex-col gap-4">
          {pathCategorySelects.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className="flex gap-2 items-center group hover:bg-orange-50 px-3 py-4 transition-all rounded-md"
            >
              <item.icon className="group-hover:text-orange-700" />
              <p className="group-hover:font-semibold">{item.name}</p>
            </NavLink>
          ))}
        </div>
        <h3 className="px-3 font-bold text-gray-600 uppercase tracking-widest mb-4">
          MY ACCOUNT
        </h3>
        <div className="flex flex-col gap-5">
          {pathUserSelect.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className="flex gap-2 items-center group hover:bg-orange-50 px-3 py-4 transition-all rounded-md"
            >
              <item.icon className="group-hover:text-orange-700" />
              <p className="group-hover:font-semibold">{item.name}</p>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectorMenuBar;
