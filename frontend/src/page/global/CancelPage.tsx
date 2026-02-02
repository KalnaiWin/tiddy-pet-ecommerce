import { Link } from "react-router-dom";

const CancelPage = () => {
  return (
    <div>
      <Link
        to={"/"}
        className="flex justify-center items-center min-h-screen w-full text-red-600 font-bold"
      >
        Paid failed
      </Link>
    </div>
  );
};

export default CancelPage;
