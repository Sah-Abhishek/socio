import axios from "axios";
import { useEffect, useState } from "react"


const InputPost = ({ username, handleRefetch}) => {

    const [inputPost, setInputPost] = useState("");
    const [postErrMsg, setPostErrMessage] = useState("");
    const userName = username;
    const token = localStorage.getItem('token');

    const handleChange = (event) => {
        console.log(event);
        // console.log();
        setInputPost(event.target.value);
    }

    const axiosInstance = axios.create({
        baseURL: "https://socio-psi.vercel.app/post",
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const refetch = () => {
        handleRefetch();
    }

    


    axiosInstance.interceptors.request.use(
        config => {
            // const token = localStorage.getItem('token');
            console.log(token);
            if (token) config.headers.Authorization = `${token}`;
        }, (error) => {
            return Promise.reject(error);
        }

    )
    axiosInstance.interceptors.response.use(
        response => {
            return response;
        }, error => {
            if (error.response.status) {
                // setPostErrMessage("You are not logged in");
                console.log("There was an error doing the post", error)
            }
        }
    )



    const handlePost = async () => {
        try {
            const response = await axios.post("http://localhost:3000/post", {
                userName: userName,
                content: inputPost
            }, {
                headers: {
                    'Authorization': `${token}`,
                    'Content-Type': 'application/json',
                }
            });
            console.log("Response from the server: ", response.data);
            console.log(userName);
            setInputPost("");
            setPostErrMessage(""); // Clear any previous error messages
        } catch (error) {
            if (error.response && error.response.status === 401) {
                // Unauthorized error
                console.error("Unauthorized error:", error);
                setPostErrMessage("You are not logged in");
            } else {
                // Other errors
                console.error("Error posting:", error);
                setPostErrMessage("An error occurred while posting");
            }
        }
    };


    return (
        <div className="flex items-center justify-center flex-col">
            <textarea
                rows={5}
                cols={50}
                value={inputPost}
                onChange={handleChange}
                className="resize-none border rounded-lg p-2 focus:outline-none bg-gray-700 text-white"
                placeholder="Enter your text here"
                onBlur={(e) => e.target.blur()} // Blur the textarea immediately on focus
            />
            <br />
            <button onClick={()=> {
                handlePost();
                refetch();
                }} className="mt-5 mb-20 h-12 w-48 border rounded-md bg-slate-400">
                Post
            </button>
            {/* {postErrMsg && <h1>{postErrMsg}</h1>} */}
        </div>


    )

}

export default InputPost