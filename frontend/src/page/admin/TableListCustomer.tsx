import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../feature/userThunk";
import { User, Eye, Edit, Trash2, Dot } from "lucide-react";
import { StatusColor } from "../../types/HelperFunction";

type Props = {
  email: string;
};

const TableListCustomer = ({ email }: Props) => {
  const { users, error, usersStatus } = useSelector(
    (state: RootState) => state.user
  );
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    dispatch(getAllUsers({ page, limit, email }));
  }, [dispatch, page, limit, email]);

  if (usersStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (usersStatus === "failed") {
    return <div>Error: {error}</div>;
  }

  if (!users || users.length === 0) {
    return <div>No users found</div>;
  }

  return (
    <div className="overflow-x-auto rounded-lg border pb-5 border-slate-200 ">
      <table className="w-full">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
              Customer
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
              Total Spend
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-slate-200">
          {users.length === 0 ? (
            <tr key="empty">
              <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                <User className="mx-auto mb-2 h-12 w-12 text-slate-300" />
                <p className="text-sm font-medium">No customers found</p>
                <p className="text-xs mt-1">
                  Get started by adding your first customer
                </p>
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr
                key={user._id}
                className="hover:bg-slate-50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 flex justify-center items-center">
                      {user.image_profile !== "" ? (
                        <img
                          src={user.image_profile}
                          alt={user.name}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      ) : (
                        <User className="h-8 w-8 text-slate-800" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        {user.name}
                      </p>
                      <p className="text-sm text-slate-500">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${StatusColor(
                      user.status
                    )}`}
                  >
                    <Dot />
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-slate-900">
                    ${user.totalSpend?.toFixed(2) || "0.00"}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-1 hover:bg-slate-100 rounded transition-colors">
                      <Eye className="h-4 w-4 text-slate-600" />
                    </button>
                    <button className="p-1 hover:bg-slate-100 rounded transition-colors">
                      <Edit className="h-4 w-4 text-blue-600" />
                    </button>
                    <button className="p-1 hover:bg-red-50 rounded transition-colors">
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="flex justify-center gap-2 mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="px-3 py-1">Page {page}</span>

        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 border rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TableListCustomer;
