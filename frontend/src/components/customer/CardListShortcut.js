import Modal from 'react-modal'; 
import '../../style/Modal.css';
import {CardList} from './CardList';

Modal.setAppElement("#root");

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      fontFamily: 'Barlow',
      height: '40em',
      width: '55em',
      padding:'5em'
    },
};

export const CardListShortcut = ({show, onHide}) => {
    return (
        <Modal isOpen={show} style={customStyles}>
            <span onClick={onHide} className="close-shortcut-btn">
                <i className='bi bi-x-lg'></i>
            </span>
            <h2>Le mie carte</h2>
            <CardList showToast={false}/>
        </Modal>
    )
}