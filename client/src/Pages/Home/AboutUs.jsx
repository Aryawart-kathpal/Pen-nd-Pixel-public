import './AboutUs.css'
import ChhaviImg from '../../assets/ChhaviImg2.png'
import DebatreyaImg from "../../assets/DebatreyaImg2.png"
import AryawartImg from "../../assets/AryawartImg2.jpg"
import MuskanImg from "../../assets/MuskanImg.jpg"


const AboutUs = () => {
    return (
        <section className='h-screen p-5 poppins-semibold flex flex-col overflow-hidden justify-between' >
            <h1 className='font-semibold text-5xl'>Meet Our Team</h1>
            <p className='py-3 sm:w-[60%]'>Our team is a with dynamic group of undergraduates. With a compact but highly skilled workforce of four friends, we collabrate closely to drive innovation and deliver quality solutions. </p>
            <div className="card-container pt-20">
                <div id="image-container" className="card">
                    <img src={DebatreyaImg} alt="Debatreya" className='' />
                </div>
                <div id="image-container" className="card">
                    <img src={AryawartImg} alt="Aryawart" className='' />
                </div>
                <div id="image-container" className="card">
                    <img src={ChhaviImg} alt="Chhavi" className='' />
                </div>
                <div id="image-container" className="card">
                    <img src={MuskanImg} alt="Muskan" className='' />
                </div>
                
            </div>
        </section>
    )
}
export default AboutUs
