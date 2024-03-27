import React from "react";
import Nav from "../../Layouts/Nav";
import { FaHouse , FaPhoneFlip} from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
function ContactUs() {
  return (
    <div>
      <Nav />
      <div
        className="h-full"
        // style={{
        //   backgroundImage:
        //     "url(https://getwallpapers.com/wallpaper/full/7/c/b/335542.jpg)",
        // }}
      >
        <div className="p-14 flex flex-col items-center justify-center">
          <h2 className="text-3xl  font-bold mb-3 text-center md:text-left ">
            Contact Us
          </h2>
          <div className="mb-7 text-center md:text-left ">
            <p className="font-normal">
              We're here to help! Feel free to reach out to us using the form
              below.
            </p>
          </div>
          <div className="max-w-4xl rounded-lg shadow-lg flex flex-row md:flex-row pl-10 bg-[#a3a0a017]">
            <div className="md:w-1/2 flex flex-col justify-center items-center md:items-start ">
              <div className="flex items-center mb-14">
                <div className="mr-4">
                  <FaHouse />
                </div>
                <div>
                  <h3 className="font-semibold text-xl">Address</h3>
                  <p className="font-normal">NIT Kurukshetra, Haryana</p>
                </div>
              </div>
              <div className="flex items-center mb-14">
                <div className="mr-4">
                  <MdEmail />
                </div>
                <div>
                  <h3 className="font-semibold text-xl">Email</h3>
                  <p className="font-normal">penandpixel.com</p>
                </div>
              </div>
              <div className="flex items-center mb-14">
                <div className="mr-4">
                  <FaPhoneFlip />
                </div>
                <div>
                  <h3 className="font-semibold text-xl">Phone</h3>
                  <p className="font-normal">+91 987654321</p>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 md:mt-0  rounded-lg">
              <div className="bg-[#f5f5f5] p-8 rounded-lg shadow-md underline">
                <form>
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full mb-6 p-2 rounded-lg bg-transparent border-b-2 border-gray-300 focus:border-gray-600"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full mb-6 p-2 rounded-lg bg-transparent border-b-2 border-gray-300 focus:border-gray-600"
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    className="w-full mb-6 p-2 rounded-lg bg-transparent border-b-2 border-gray-300 focus:border-gray-600"
                  />
                  <textarea
                    placeholder="Type your Message..."
                    rows="4"
                    className="w-full mb-5 p-2 rounded-lg bg-transparent border-b-2 border-gray-300 focus:border-gray-600"
                  ></textarea>
                  <button
                    type="submit"
                    className="bg-blue-600  px-4 py-2 rounded-md hover:bg-blue-700 mb-1 w-full font-semibold text-red-50"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
