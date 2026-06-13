import { NavLink } from "react-router-dom";

function Error() {
  return (
    <>
      <p className="font-bold text-3xl lg:text-5xl mt-2 mb-6 lg:mb-10">
        404 - Error Not Found.
      </p>
      <NavLink
        className={
          "text-xl lg:text-2xl border px-2 py-1 bg-white hover:bg-gray-200 rounded-lg"
        }
        to={"/"}
      >
        Back to home
      </NavLink>
    </>
  );
}

export default Error;
