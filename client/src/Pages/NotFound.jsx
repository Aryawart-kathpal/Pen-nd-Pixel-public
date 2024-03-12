import { useNavigate } from 'react-router-dom';
export default function NotFound(){
    const navigate = useNavigate();
    return (
        <div className="h-screen w-full flex flex-col justify-center items-center bg-white">
            <h1 className="text-center text-9xl font-extrabold text-black">
                404 
            </h1>
            <h2 className="text-5xl px-5 py-2 rounded-md bg-black text-white font-mono">not found</h2>
            <button className="m-5" onClick={() => navigate(-1)}>
                <span className="relative inline-block text-md font-medium text-black group active:text-yellow-500">Go Back</span>
            </button>
        </div>
    )
}