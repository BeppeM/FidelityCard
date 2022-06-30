import Modal from 'react-modal'; 
import '../../style/Modal.css';
import { CreateCatalog } from './CreateCatalog';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import {useEffect, useState} from 'react';

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

export const CreateCatalogShortcut = ({show, onHide}) => {

    const catalogs = useSelector(state => state.catalogs);
    const [firstRun, setFirstRun] = useState(true); 

    useEffect(() => {
        if (firstRun) {
            setFirstRun(false);
        } else {
            if (catalogs.status === "ERR_CREATE_CAT") {
                toast.error("Il catalogo esiste già", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else if (catalogs.status === "CREATE_CAT") {
                toast.success("Catalogo creato", {
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
    }, [catalogs.status])

    return (
        <>
            <Modal isOpen={show} style={customStyles}>
                <span onClick={onHide} className="close-shortcut-btn">
                    <i className='bi bi-x-lg'></i>
                </span>
                <h2>Crea catalogo</h2>
                <CreateCatalog onSubmit={onHide}/>
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