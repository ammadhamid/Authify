import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
export default function Oauth() {
  return (
    <>
      <div className="flex-around w-[263px] sm:w-[268px] ">
        <Button className="Oauth-button">
          <Image
            width={19}
            height={19}
            src={"/github_icon.png"}
            alt="googleOautIcon"
          />{" "}
          Github
        </Button>

        <Button className="Oauth-button">
          {" "}
          <Image
            width={19}
            height={19}
            src={"/google_icon.png"}
            alt="googleOautIcon"
          />
          Google
        </Button>
      </div>
    </>
  );
}
