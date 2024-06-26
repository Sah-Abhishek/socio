import { useState } from 'react';
import { BsArrowLeftShort, BsSearch } from 'react-icons/bs'
import { GiDeerHead, } from "react-icons/gi";
import { FaRegUser } from "react-icons/fa6";
import { FaUserLarge } from "react-icons/fa6";





const Sidebar = () => {
    const [open, setOpen] = useState(true);
    const [firstName, setFirstName] = useState("Scarlet");
    const [lastName, setLastName] = useState('Johanson')
    const [year, setYear] = useState("2");
    const menus = [
        { title: "Profile" },
        { title: "Your Posts" },
        { title: "Teacher's Review" },

    ]
    const titleLogout = "Log Out"
    return (
        <div className={`bg-harvest-gold-500 h-screen p-5 pt-8 ${open ? "w-72" : "w-20"} relative  duration-300`}>
            <BsArrowLeftShort onClick={() => setOpen(!open)} className={`bg-white text-harvest-gold-500 text-strong text-3xl rounded-full absolute -right-3 top-9 border border-harvest-gold-400 cursor-pointer ${!open && "rotate-180 duration-300"}`} />
            <div className='inline-flex items-center'>
                <GiDeerHead className={`${!open ? "text-4xl " : "text-6xl"} ${open && "rotate-[360deg]"} duration-300 text-strong cursor-pointer block float-left mr-2`} />
                <h1 className={`text-black text-strong text-3xl origin-left font-medium ${!open && "scale-0"} duration-300`}>Ether</h1>
            </div>
            <div className={`flex items-center rounded-md bg-light-white ${!open ? "px-2.5 ml-0" : "px-4"} py-2 mt-4 `}>
                <BsSearch className={` text-black text-lg cursor-pointer block float-left font-bold ${open && "mr-2"}`} />
                <input type="serch" placeholder="Search" className={`text-base bg-transparent sm:placeholder-gray-600 w-full focus:outline-none font-serif ${!open && "hidden"}`} />
            </div>
            <div className='inline-flex flex-col items-center justify-center mt-10 ml-10 pl-5 '>
                <div>
                    <FaRegUser className={`text-black text-strong text-8xl origin-left font-medium ${!open && "scale-0"} duration-300`} />

                </div>
                <div className={`mt-5  duration-300  ${!open && "hidden"} `}>
                    <h1 className='origin-left font-medium'>{firstName} {lastName}</h1>
                    <div><h1>{year}<p>nd year</p></h1></div>

                </div>
            </div>
            <ul className='flex flex-1 flex-col pt-2 border'>
                {menus.map((menu, index) => (
                    <>
                        <li key={index} className={`text-black-500 text-sm flex flex-1 items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md border mt-6 align-items ${menu.spacing ? "mt-auto justify-end" : ""} overflow-auto`}>
                            <span className='text-2xl block float-left'>
                                <FaUserLarge />
                            </span>
                            <span className={`text-base font-medium flex-1 duration-300 ${!open && "hidden"}`}>{menu.title}</span>

                        </li>

                    </>
                ))}


            </ul>
            <div>
                <li className={`text-black-500 text-sm flex flex-1 items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md border mt-6 align-items  overflow-auto`}>
                    <span className='text-2xl block float-left'>
                        <FaUserLarge />
                    </span>
                    <span className={`text-base font-medium flex-1 duration-300 ${!open && "hidden"}`}>{titleLogout}</span>

                </li>
            </div>
        </div>
    );


}

export default Sidebar;