import React from 'react'
import { FaPenNib } from "react-icons/fa6";
import {Link} from 'react-router-dom';

const Nav = () => {
  return (
    <header className="px-4 lg:px-6 h-[10svh] flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <FaPenNib className="h-6 w-6" />
          <span className="sr-only">Pen and Pixel</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4">
            Pricing
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4">
            About
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4">
            Contact
          </Link>
        </nav>
      </header>
  )
}

export default Nav