import './AboutUs.css'
import ChhaviImg from '../../assets/ChhaviImg2.png'
import DebatreyaImg from "../../assets/DebatreyaImg2.png"
import AryawartImg from "../../assets/AryawartImg2.jpg"
import MuskanImg from "../../assets/MuskanImg.jpg"


const AboutUs = () => {
    return (
        <section className='h-screen bg-black max-h-screen aboutUs p-4 flex flex-col justify-center' >
            <h1 className='font-sans font-semibold'>Meet Our Team</h1>
            <p className='sm:w-[60%] font-semibold'>Our team is a with dynamic group of undergraduates. With a compact but highly skilled workforce of four friends, we collabrate closely to drive innovation and deliver quality solutions. </p>
            <div className="card-container min-h-[60svh] mt-auto">
                <div id="image-container" className="card pl-4 pr-2 rounded-tl-lg">
                    <img src={DebatreyaImg} alt="Debatreya" className='min-h-full' />
                </div>
                <div id="image-container" className="card px-2">
                    <img src={AryawartImg} alt="Aryawart" className='min-h-full' />
                </div>
                <div id="image-container" className="card px-2">
                    <img src={ChhaviImg} alt="Chhavi" className='min-h-full' />
                </div>
                <div id="image-container" className="card px-2 rounded-tr-lg">
                    <img src={MuskanImg} alt="Muskan" className='min-h-full' />
                </div>
                
            </div>
        </section>
    )
}
export default AboutUs
