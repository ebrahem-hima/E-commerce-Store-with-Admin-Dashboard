import Link from "next/link";
import React from "react";

interface Props {
  onClick: () => void;
  session: string | null;
  pathName: string;
}

const SignInSignOut = ({ session, onClick, pathName }: Props) => {
  return (
    <div>
      {session ? (
        <span
          onClick={onClick}
          className="action:ml-5 font-poppins cursor-pointer !font-medium text-[16px] leading-[24px]"
        >
          SignOut
        </span>
      ) : (
        <Link
          href={`/sign-up`}
          className={`action:ml-5 font-poppins cursor-pointer !font-medium text-[16px] leading-[24px] ${
            pathName === "/sign-up" && "border-b border-primary"
          }`}
        >
          SignUp
        </Link>
      )}
    </div>
  );
};

export default SignInSignOut;
