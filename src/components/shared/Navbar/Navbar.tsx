import Image from "next/image";
import logo from "@/assets/logo.png";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import RootProfileDropdown from "../root/RootProfileDropDown";
import { currentUser } from "@/services/AuthService";
import MobileMenu from "./MobileMenu";

const Navbar = async () => {
  const userData = await currentUser();
  return (
    <nav className="bg-transparent py-4 absolute w-full z-10 md:bg-transparent bg-white">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center gap-4 md:gap-10">
          <div className="flex gap-2 items-center">
            <Image
              className="w-8 h-8 md:w-10 md:h-10"
              width={400}
              height={400}
              src={logo || "/placeholder.svg"}
              alt="logo"
            />
            <h1 className="text-xl md:text-2xl font-bold">SkillSync</h1>
          </div>
          <div className="hidden md:flex gap-5 font-semibold">
            <Link className="hover:text-gray-600" href={"/"}>
              Home
            </Link>
            <Link className="hover:text-gray-600" href={"/all-skills"}>
              Skills
            </Link>
          </div>
        </div>

        <div className="hidden md:flex gap-5 items-center">
          <Link href="/all-skills">
            <Button className="rounded-3xl">Try It Free Today</Button>
          </Link>
          <RootProfileDropdown data={userData} />
        </div>

        <MobileMenu userData={userData} />
      </div>
    </nav>
  );
};

export default Navbar;
