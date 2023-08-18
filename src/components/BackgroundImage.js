import React from "react";

const BACKGROUND_IMAGE_URL =
  "https://images.unsplash.com/photo-1690205785263-113863e05f1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80";

const BackgroundImage = ({ children }) => {
  return (
    <div
      className="fixed inset-0 h-screen w-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${BACKGROUND_IMAGE_URL})`,
      }}
    >
      <div className="fixed inset-0 h-screen w-screen bg-black opacity-50"></div>
      <div className="relative flex h-screen w-screen items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default BackgroundImage;
