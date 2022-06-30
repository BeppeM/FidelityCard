import Modal from 'react-modal'; 
import '../../style/Modal.css';
import { CreateCard } from './CreateCard'
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';


Modal.setAppElement("#root");

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      fontFamily: 'Barlow'
    },
  };

export const CreateCardShortcut = ({show, onHide}) => {

    const cards = useSelector(state => state.cards);
    const [firstRun, setFirstRun] = useState(true);

    useEffect(() => {
        if (firstRun) {
            setFirstRun(false);
        } else {
            if (cards.status === "ERR_CARD_CREATE") {
                toast.error("Impossibile creare la carta", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else if (cards.status === "CARD_CREATED") {
                toast.success("Nuova carta aggiunta al portafoglio!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }
    }, [cards.status])

    return (
        <>
            <Modal isOpen={show} style={customStyles}>
                <span onClick={onHide} className="close-shortcut-btn">
                    <i className='bi bi-x-lg'></i>
                </span>
                <h2>Crea una nuova carta</h2>
                <CreateCard onSubmit={onHide}/>
            </Modal>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    );
}