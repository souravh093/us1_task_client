/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import RootProfileDropdown from "../root/RootProfileDropDown"
import { Menu, X } from "lucide-react"

interface MobileMenuProps {
  userData: any
}

const MobileMenu: React.FC<MobileMenuProps> = ({ userData }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="md:hidden">
      <Button variant="ghost" size="icon" onClick={toggleMenu}>
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-md py-4 px-4">
          <div className="flex flex-col gap-4">
            <Link className="hover:text-gray-800" href={"/"}>
              Home
            </Link>
            <Link className="hover:text-gray-800" href={"/all-skills"}>
              Skills
            </Link>
            <Link className="hover:text-gray-800" href={"/contact"}>
              Contact
            </Link>
            <Link href="/all-skills">
              <Button className="rounded-3xl w-full">Try It Free Today</Button>
            </Link>
            <RootProfileDropdown data={userData} />
          </div>
        </div>
      )}
    </div>
  )
}

export default MobileMenu

