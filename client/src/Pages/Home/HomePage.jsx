import React from 'react';
import HomeLayout from '../../Layouts/HomeLayout'
import { Link } from 'react-router-dom';
import Button from '../../Components/Button'
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate()
  return (
    <HomeLayout>
      <section className="flex flex-col items-center justify-center h-[90vh] p-5 poppins-regular pb-20 relative">
        <h1 className="sm:text-8xl text-5xl font-bold max-sm:self-start sm:absolute top-8 left-8 sedgwick-ave">
          Pen and Pixel
        </h1>
        <div className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Your Notes. Your Voice.</h1>
          <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            The platform for rapid note taking. Express ypurself, manage day-to-day tasks, spread creativity, collaborate on ideas, only on a single platform.
          </p>
          <div className="w-full max-w-sm space-y-2 mt-6 font-medium">
            <Button 
              text="Get Started" 
              className="w-max px-2 py-1 mr-10 text-white bg-black border border-black"
              handleOnClick={() => navigate('/login')}
            />
            <Button
              text="Browse Blogs"
              className="w-max px-2 py-1 text-black bg-white hover:bg-gray-100 outline"
              handleOnClick={() => navigate('/browse')}
            />
          </div>
        </div>
        
      </section>
      <section className="flex flex-col items-center justify-center min-h-[100vh] p-5 poppins-regular pb-20 snap-y">
        <h1 className="text-5xl font-bold mb-5">Features</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="flex flex-col items-center justify-center p-5 border border-gray-200 rounded-lg">
            <h1 className="text-3xl font-bold mb-3">Note Taking</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Take notes, create lists, and set reminders. All in one place.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center p-5 border border-gray-200 rounded-lg">
            <h1 className="text-3xl font-bold mb-3">Collaboration</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Share your notes with friends and colleagues. Work together in real-time.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center p-5 border border-gray-200 rounded-lg">
            {/* Content Summarization */}
            <h1 className="text-3xl font-bold mb-3">Content Summarization</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Summarize your notes and articles. Get the gist of the content.
            </p>
          </div>
        </div>
      </section>
    </HomeLayout>
  )
}

export default HomePage
