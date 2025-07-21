"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Image from "next/image";

const Hero = () => {
  const router = useRouter();

  const signUp = () => {
    router.push("/signup");
  };

  return (
    // <Button onClick={signUp}>Signup</Button>
    <div className=" flex justify-center">
      <NavigationMenu className="">
        <NavigationMenuList>
          <NavigationMenuItem className="flex">
            <NavigationMenuLink className="ml-6" href="/">
              <h1 className="font-bold font-poppins text-lg md:text-xl text-black ">
                Authify
              </h1>
            </NavigationMenuLink>
            <NavigationMenuLink className="ml-6  text-lg md:text-xl text-black" href="/signup">
              Signup
            </NavigationMenuLink>

            <NavigationMenuLink className="ml-6  text-lg md:text-xl text-black" href="/login">
              Login
            </NavigationMenuLink>
            {/* <NavigationMenuLink>Login</NavigationMenuLink> */}
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default Hero;
