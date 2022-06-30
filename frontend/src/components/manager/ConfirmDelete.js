
import Modal from 'react-modal'; 
import { useDispatch, useSelector } from 'react-redux';
import '../../style/Modal.css';
import '../../style/ConfirmDelete.css'
import { deleteReward } from '../../features/reward/rewardThunk';

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

export const ConfirmDelete = ({show, onHide, reward}) => {

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    const onClickDeleteReward = () => {
        dispatch(deleteReward({id: reward.id, token: auth.access_token}));
        onHide();
    }

    return (
        <Modal isOpen={show} style={customStyles}>
            <span onClick={onHide} className="close-shortcut-btn">
                <i className='bi bi-x-lg'></i>
            </span>
            <div className='confirm-content'>
                <p>Sicuro di voler eliminare {reward.rewardName} da {reward.catalogTypeName}?</p>
                <div className='btns'>
                    <button className='confirm' onClick={onClickDeleteReward}>Conferma</button>
                    <button className='cancel' onClick={onHide}>Annulla</button>
                </div>
            </div>
        </Modal>
    );
}