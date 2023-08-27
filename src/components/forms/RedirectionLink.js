import { Link } from "react-router-dom";

function RedirectionLink({ linkText, redirectTo, pageTitle }) {
  return (
    <>
      <p className="my-2">
        {linkText + " "}
        <Link
          to={redirectTo}
          className="font-normal text-indigo-custom underline hover:text-indigo-500"
        >
          {pageTitle}
        </Link>
      </p>
    </>
  );
}

export default RedirectionLink;
