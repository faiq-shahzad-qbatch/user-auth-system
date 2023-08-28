import React from "react";
import { ReactComponent as SpinnerSVG } from "../assets/svgs/spinner.svg";

function Spinner({ show = true }) {
  return (
    <>
      <div
        className={`${
          show ? "visible" : "invisible"
        } fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-300 bg-opacity-50 dark:bg-slate-600 dark:bg-opacity-50`}
      >
        <div role="status">
          <SpinnerSVG className="mr-2 inline h-8 w-8 animate-spin fill-gray-600 text-gray-200 dark:fill-gray-300 dark:text-gray-600" />
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </>
  );
}

export default Spinner;
