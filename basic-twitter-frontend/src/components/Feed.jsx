import axios from "axios";
import { useEffect, useState } from "react";
import InputPost from "./InputPost";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Sidebar2 from "./SideBar2";
import IndiPost from "./IndiPost";

const Feed = () => {
    const [errMessage, setErrMessage] = useState('');
    const [userName, setUserName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [lastName, setLastName] = useState('');
    const navigate = useNavigate();

    const axiosInstance = axios.create({
        baseURL: 'http://localhost:3000',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    // Add a request Interceptor

    axiosInstance.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('token');
            console.log(token);
            if (token) {
                config.headers.Authorization = `${token}`;
            }
            return config;
        }, (error) => {
            return Promise.reject(error);
        }
    )

    axiosInstance.interceptors.response.use(
        (response) => {
            return response;
        }, (error) => {
            if (error.response.status) {
                setErrMessage("You are not logged in");
            }
        }
    )

    const [posts, setPosts] = useState([]);


    const fetchPost = async () => {

        try {
            

            const response = await axiosInstance.get('/');
            console.log(response.data.firstName, response.data.lastName);
            setFirstName(response.data.firstName);
            setLastName(response.data.lastName);
            setEmail(response.data.email);
            setPosts(response.data.post);
            setUserName(response.data.email);
            console.log(userName);

        } catch (err) {
            setErrMessage("You are not logged in");
            // console.log(errMessage)
            console.log("There was an error", err);
        }
    }
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
        
        fetchPost();
        setErrMessage('');
    }, []);

    const handleRefetch = () => {
        setErrMessage('');
        fetchPost();
    }

    // useEffect(() => {
    //     // console.log(userName);increase
    // }, [userName])

    return (
        <div className="flex">
            <div className="bg-gray-200 flex h-screen">
                <Sidebar2 firstName={firstName} lastName={lastName} email={email}/>
            </div>
            <div className="flex-1 flex justify-center bg-light-white-300">
                <div className="p-7 flex flex-col items-center border mr-40">
                    <h1 className="text-2xl font-semibold mb-10">Post</h1>
                    <InputPost username={userName} handleRefetch={handleRefetch} /><br />
                    <h1>Post List</h1>
                    {errMessage}
                    <ul className="" style={{ width: "500px"}}>
                        {posts.map(post => (
                            <IndiPost  key={post._id} id={post._id} userName={post.postedBy.userName} content={post.content} year={post.postedBy.year} className="flex"/>
                        ))}
                    </ul>
                </div>
            </div>
        </div>

    )
}

export default Feed