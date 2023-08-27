function AuthModal({ text, children }) {
  return (
    <>
      <div className="w-sm flex animate-fade-down flex-col items-center justify-center rounded-lg bg-white p-8 shadow-md dark:bg-gray-800 dark:bg-opacity-90 dark:text-gray-200 ">
        <h2 className="mb-4 text-2xl font-bold">{text}</h2>
        {children}
      </div>
    </>
  );
}

export default AuthModal;
