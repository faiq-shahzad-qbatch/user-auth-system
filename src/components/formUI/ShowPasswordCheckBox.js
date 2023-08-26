function ShowPasswordCheckBox({ showPassword, togglePasswordVisibility }) {
  return (
    <>
      <div className="flex items-center justify-start space-x-4 self-start">
        <input
          id="togglePassword"
          type="checkbox"
          value={showPassword}
          onClick={togglePasswordVisibility}
        />
        <label htmlFor="togglePassword">Show Password</label>
      </div>
    </>
  );
}

export default ShowPasswordCheckBox;
