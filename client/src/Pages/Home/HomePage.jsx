import React from 'react';
import HomeLayout from '../../Layouts/HomeLayout'
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <HomeLayout>
      <div className="flex flex-col items-center justify-center h-[80vh] p-5 poppins-regular pb-20">
        <h1 className="sm:text-7xl text-5xl font-bold mb-auto self-start">
          Pen and Pixel
        </h1>
        <div className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Your Notes. Your Voice.</h1>
          <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            The platform for rapid note taking. Express ypurself, manage day-to-day tasks, spread creativity, collaborate on ideas, only on a single platform.
          </p>
        </div>
        <div className="mx-auto w-full max-w-sm space-y-2">
          <form className="flex space-x-2">
            <input className="max-w-lg flex-1 border border-black rounded-lg p-2 m-4 mb-1" placeholder="Enter your email" type="email" />
            <button type="submit">Sign Up</button>
          </form>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Sign up to get notified when we launch.
            <Link className="underline underline-offset-2" href="#">
              Terms & Conditions
            </Link>
          </p>
        </div>
      </div>
    </HomeLayout>
  )
}

export default HomePage
