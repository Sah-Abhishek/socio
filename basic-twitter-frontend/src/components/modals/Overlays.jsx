import { createPortal } from 'react-dom';
import Modal from './Modal';
import { useAtom } from 'jotai';
import { uiAtom } from '../../state';
const mountElement = document.getElementById("overlays");


const Overlays = () => {

    const [ui] = useAtom(uiAtom)

    return(
    createPortal(
        <>{ ui.modal &&
            <Modal />
       } </>
        , mountElement)

    )

}

export default Overlays