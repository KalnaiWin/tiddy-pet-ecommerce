export const StatusColor = (text: string) => {
  switch (text) {
    case "ACTIVE":
      return "bg-green-100 text-green-800";
    case "INACTIVE":
      return "bg-gray-100 text-gray-800";
    case "BUSY":
      return "bg-yellow-100 text-yellow-800";
    case "BANNED":
      return "bg-red-100 text-red-800";
    default:
      break;
  }
};

export const VerifyStatus = (text: string) => {
  switch (text) {
    case "PENDING":
      return "bg-yellow-100 text-yellow-800";
    case "APPROVED":
      return "bg-green-100 text-green-800";
    case "REJECTED":
      return "bg-red-100 text-red-800";
    default:
      break;
  }
};

export const StatusProduct = (text: string) => {
  switch (text) {
    case "Available":
      return "text-green-500 bg-green-100";
    case "Out of stock":
      return "text-red-500 bg-red-100";
    case "Draft":
      return "text-slate-500 bg-slate-100";
    default:
      break;
  }
};

export const convertSlug = (text: string): string => {
  return text
    .toLowerCase()
    .normalize("NFD") // tách dấu tiếng Việt
    .replace(/[\u0300-\u036f]/g, "") // xóa dấu
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9\s-]/g, "") // xóa ký tự đặc biệt
    .trim()
    .replace(/\s+/g, "-") // space → -
    .replace(/-+/g, "-"); // nhiều - → 1
};
