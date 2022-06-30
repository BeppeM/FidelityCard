
import Modal from 'react-modal'; 
import { useDispatch, useSelector } from 'react-redux';
import '../../style/Modal.css';
import '../../style/ConfirmDelete.css'
import { deleteCard } from '../../features/card/cardThunk';

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

export const ConfirmDelete = ({show, onHide, card, manager}) => {

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    const onClickDeleteCard = () => {
        dispatch(deleteCard({id: card.id, token: auth.access_token}));
        onHide();
    }

    return (
        <Modal isOpen={show} style={customStyles}>
            <span onClick={onHide} className="close-shortcut-btn">
                <i className='bi bi-x-lg'></i>
            </span>
            <div className='confirm-content'>
                <p>Sicuro di voler eliminare la carta {card.catalogName} di {manager}?</p>
                <div className='btns'>
                    <button className='confirm' onClick={onClickDeleteCard}>Conferma</button>
                    <button className='cancel' onClick={onHide}>Annulla</button>
                </div>
            </div>
            
        </Modal>
    );
}