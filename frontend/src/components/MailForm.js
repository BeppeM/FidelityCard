import { useEffect, useState } from 'react';
import Modal from 'react-modal'; 
import { useDispatch, useSelector } from 'react-redux';
import { updateCustomerInfo } from '../features/customer/customerThunk';
import { updateManagerInfo } from '../features/manager/managerThunk';
import '../style/Modal.css';

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

export const MailForm = ({show, onHide}) => {

    const dispatch = useDispatch();

    const [mailInput, setMailInput] = useState('');
    const customer = useSelector(state => state.customers);
    const manager = useSelector(state => state.managers);
    const auth = useSelector(state => state.auth);

    const onClickUpdateMail = (e) => {
        e.preventDefault();
        console.log(auth.user.AUTHORITIES_KEY);
        if (auth.user.AUTHORITIES_KEY === "CUSTOMER") {
            const update = {...customer.value};
            update.email = mailInput;
            const data = {
                customer: update,
                token: auth.access_token
            }
            dispatch(updateCustomerInfo(data));
        } else {
            const update = {...manager.value};
            console.log(update);
            update.email = mailInput;
            console.log(update);
            const data = {
                manager: update,
                token: auth.access_token
            }
            dispatch(updateManagerInfo(data));
        }
        onHide();
    }

    return (
        <Modal isOpen={show} style={customStyles}>
            <div className='modal-body'>
                <h2 className='modal-title'>Aggiorna indirizzo email</h2>
                <form onSubmit={onClickUpdateMail}>
                    <input 
                        type="mail" 
                        placeholder='Nuovo indirizzo mail' 
                        className='form-text'
                        value={mailInput}
                        onChange={(e) => setMailInput(e.target.value)}
                    ></input><br/>
                    <input type="submit" value="Conferma" className='form-submit'></input>
                    <button type="button" onClick={onHide} className='modal-hide'>
                        <i className='bi bi-x-lg'></i>
                    </button>
                </form>
            </div>
        </Modal>
    );
}