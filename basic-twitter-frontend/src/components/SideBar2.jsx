import { ChevronFirst, ChevronLast, Dot, MoreVertical } from 'lucide-react';
import { useState } from 'react';
import SidebarItems from './SidebarItems';
import {
    UserRound,
    PenTool,
    LogOut,
    Kanban
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSetAtom } from 'jotai';
import Overlays from './modals/Overlays';
import { uiAtom } from '../state';



const Sidebar2 = ({ firstName, lastName, email }) => {
    // const [firstName, setFirstName] = useState("Abhishek");
    // const [lastName, setLastName] = useState("Sah");
    // const [email, setEmail] = useState("abhish@gmail.com");
    const [expanded, setExpanded] = useState(true);
    const navigate = useNavigate();
    const setUii = useSetAtom(uiAtom)


    const logOut = () => {
        setUii((prev) => ({
            ...prev,
            modal: true
        })
        )

        // navigate('/login');
    }

    return (
        <aside className="fixed inset-y-0 left-0">
            <nav className="h-full flex flex-col bg-white border-r shadow-sm">
                <div className="p-4 pb-2 flex justify-between items-center">
                    <img src="https://img.logoipsum.com/243.svg" className={`overflow-hidden transition-all ${expanded ? "w-32" : "w-0"}`} />
                    <button onClick={() => setExpanded(curr => !curr)} className='bg-gray-50 p-1.5 rounded-lg hover:bg-gray-200'>
                        {expanded ? <ChevronFirst /> : <ChevronLast />}
                    </button>
                </div>
                <Overlays />

                <ul className='flex-1 px-3'>
                    <SidebarItems icon={<UserRound size={30} />} text={"Profile"} alert={<Dot />} expanded={expanded} />
                    <SidebarItems icon={<PenTool size={30} />} text={"Your Post"} expanded={expanded} />
                    <SidebarItems icon={<Kanban size={30} />} text={"TEachers Review"} expanded={expanded} />
                    <button onClick={logOut} >
                        <SidebarItems icon={<LogOut size={30} />} text={"Log out"} expanded={expanded} />
                    </button>
                    {/* <SidebarItems icon={} text={} /> */}
                </ul>
                <div className='border-t flex p-3'>
                    <img src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true" alt="" className='rounded-md w-10 h-10' />
                    <div className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>
                        <div className='leading-4'>
                            <h4 className="font-semibold">{firstName} {lastName}</h4>
                            <span className="text-xs text-gray-600">{email}</span>
                        </div>
                        <MoreVertical size={20} />
                    </div>
                </div>
            </nav>
        </aside>
    )
}
export default Sidebar2

