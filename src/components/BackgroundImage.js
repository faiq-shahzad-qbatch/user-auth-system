import React from "react";

const BACKGROUND_IMAGE_URL =
  "https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2710&amp;q=80";

const BackgroundImage = ({ children }) => {
  return (
    <div
      className="fixed inset-0 h-screen w-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${BACKGROUND_IMAGE_URL})`,
      }}
    >
      <div className="fixed inset-0 h-screen w-screen bg-black opacity-0 dark:opacity-50"></div>
      <div className="relative flex h-screen w-screen items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default BackgroundImage;
