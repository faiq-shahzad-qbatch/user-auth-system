import { ReactComponent as FacebookLogo } from "../../assets/svgs/facebook-logo.svg";

function FacebookLoginButton({ facebookLogin }) {
  return (
    <>
      <button
        type="button"
        className="dark:focus:ring-[#3b5998]/55 mb-2 flex w-full flex-row items-center justify-center rounded-lg bg-[#3b5998] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#3b5998]/90 focus:outline-none focus:ring-4 focus:ring-[#3b5998]/50"
        onClick={() => facebookLogin()}
      >
        <FacebookLogo />
        Continue with Facebook
      </button>
    </>
  );
}

export default FacebookLoginButton;
