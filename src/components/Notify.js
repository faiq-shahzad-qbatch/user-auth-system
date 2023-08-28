import { ToastContainer, toast } from "react-toastify";

import { useEffect } from "react";
import { useSelector } from "react-redux";

function Notify() {
  const success = useSelector((state) => state.userReducer.success);
  const error = useSelector((state) => state.userReducer.error);

  useEffect(() => {
    if (success) {
      toast.success(success);
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <ToastContainer
      theme="colored"
      position="bottom-right"
      newestOnTop={true}
    />
  );
}

export default Notify;
