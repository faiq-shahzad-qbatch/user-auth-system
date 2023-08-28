import { ReactComponent as GoogleLogo } from "../../assets/svgs/google-logo.svg";

function GoogleLoginButton({ googleLogin }) {
  return (
    <>
      <button
        type="button"
        className="dark:focus:ring-[#4285F4]/55 mb-2 flex w-full flex-row items-center justify-center space-x-2 rounded-lg bg-[#4285F4] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#4285F4]/90 focus:outline-none focus:ring-4 focus:ring-[#4285F4]/50"
        onClick={googleLogin}
      >
        <div className="flex h-6 w-6 items-center justify-center rounded-sm bg-white">
          <GoogleLogo className="h-4 w-4" />
        </div>
        <span>Continue with Google</span>
      </button>
    </>
  );
}

export default GoogleLoginButton;
