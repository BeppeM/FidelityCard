import Modal from 'react-modal'; 
import '../../style/Modal.css';
import { useDispatch, useSelector } from 'react-redux';
import { addReward } from '../../features/reward/rewardThunk';
import { useState } from 'react';
import '../../style/AddReward.css';

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

export const AddReward = ({show, onHide, catalog}) => {

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    const [rewardData, setRewardData] = useState({});

    const handleInput = (e) => {
        setRewardData({...rewardData, [e.target.name]:e.target.value});
    }

    const onClickAddReward = (e) => {
        e.preventDefault();
        console.log(rewardData);
        const reward= {...rewardData,
            catalogTypeName: catalog,
            managerName: auth.user.sub,
            currentQuantity: rewardData.quantityOnRestock
        }
        console.log(reward);
        dispatch(addReward({reward:reward, token: auth.access_token}));
        onHide();
    }

    return(
        <Modal isOpen={show} style={customStyles}>
            <span onClick={onHide} className="close-shortcut-btn">
                <i className='bi bi-x-lg'></i>
            </span>
            <h2>Nuovo premio</h2>
            <form onSubmit={onClickAddReward} className='add-reward'>
                <input type="text" placeholder='Nome premio' 
                    name='rewardName' 
                    onChange={handleInput}
                    required></input><br/>
                <textarea placeholder='Descrizione' name='description' onChange={handleInput}></textarea><br/>
                <input type="number" placeholder='Punti riscatto' name="redeemPoints" onChange={handleInput} required></input><br/>
                <input type="number" placeholder='Quantità iniziale' name="quantityOnRestock" onChange={handleInput} required></input><br/>
                <input type="submit" value="Aggiungi"></input>
            </form>
        </Modal>
    )
}