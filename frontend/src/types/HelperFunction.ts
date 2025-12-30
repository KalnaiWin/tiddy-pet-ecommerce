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
