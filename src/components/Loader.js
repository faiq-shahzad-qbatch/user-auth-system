import React from "react";
import { Triangle } from "react-loader-spinner";

function Loader({ show }) {
  return (
    <>
      <div
        className={`fixed inset-0 flex items-center justify-center ${
          show ? "visible" : "invisible"
        }`}
      >
        <div className="fixed inset-0 bg-slate-300 opacity-50"></div>

        <div className="relative">
          <Triangle
            height="80"
            width="80"
            color="red"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={show}
          />
        </div>
      </div>
    </>
  );
}

export default Loader;
