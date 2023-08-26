function SubmitButton({ text }) {
  return (
    <>
      <button
        type="submit"
        className="my-2 w-full rounded-md bg-indigo-custom px-4 py-2 text-white hover:bg-indigo-500 hover:shadow-md"
      >
        {text}
      </button>
    </>
  );
}

export default SubmitButton;
