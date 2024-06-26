import { useSetAtom } from "jotai"
import { uiAtom } from "../../state"
import { useNavigate } from "react-router-dom";

const Modal = () => {
    const setUi = useSetAtom(uiAtom);
    const navigate = useNavigate();

    const logOut = () => {
        localStorage.removeItem('token');
        setUi(
            () => ({
                modal: null,
            })
        )
        navigate('/login');
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
            <div className="modal-content bg-white w-full max-w-md mx-4 rounded-lg shadow-xl">
                <div className="flex justify-end">
                    <button className="close-btn text-white hover:text-gray-800 p-2" onClick={() => setUi(() => ({ modal: null }))}>
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="p-8">
                    <h1 className="text-2xl font-bold mb-4 text-white">Logout</h1>
                    <p className="text-gray-300 mb-4">Are you sure you want to logout?</p>
                    <div className="flex justify-end">
                        <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-md mr-2" onClick={logOut}>Logout</button>
                        <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-6 rounded-md" onClick={() => setUi(() => ({ modal: null }))}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal