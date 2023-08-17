import React from "react";

const BackgroundImage = ({ children }) => {
  return (
    <div
      className="fixed inset-0 h-screen w-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(https://images.unsplash.com/photo-1558470598-a5dda9640f68?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80)`,
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
