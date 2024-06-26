import { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaRegComment } from "react-icons/fa";



const IndiPost = ({ userName, content, year }) => {
    const [liked, setLiked] = useState(false);

    // const fetchLike = () => {
    //     const response = 
    // }

    useEffect(() => {

    }
)


    const likePost = () => {
        setLiked(true);
    }

    let bgColorClass = "";
    if(year == 1) bgColorClass = "bg-orange-400"
    if(year == 2) bgColorClass = "bg-yellow-400"
    if(year == 3) bgColorClass = "bg-red-400"
    if(year == 4) bgColorClass = "bg-red-400"
    
    return (
        <div className={`${bgColorClass} rounded-lg shadow-md p-4 mb-4`}>
            <div >
            <h2 className="text-xl font-semibold mb-2 p-2 mt-2 rounded-md">{userName}</h2>
            <p className="text-gray-700 text-medium">{content}</p>
        </div>
        <div className="flex gap-4 items-center"><button className="border" onClick={likePost}><span><CiHeart size={20} className="text-xl font-bold"/></span></button><button className="border"><span><FaRegComment/></span></button></div>
        </div>
    )
}
export default IndiPost