import { useEffect, useState } from 'react';
import Modal from 'react-modal'; 
import { useDispatch, useSelector } from 'react-redux';
import { updatePassword } from '../features/auth/authThunk';
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

export const PasswordForm = ({show, onHide}) => {

    const [passwordInput, setPasswordInput] = useState('');
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    const onClickUpdatePassword = (e) => {
        e.preventDefault();
        const update = {
            username: auth.user.sub,
            password: passwordInput,
            userRole: auth.user.AUTHORITIES_KEY
        }
        dispatch(updatePassword({user:update, token:auth.access_token}))
    }

    return (
        <Modal isOpen={show} style={customStyles}>
            <div className='modal-body'>
                <h2 className='modal-title'>Aggiorna password</h2>
                <form onSubmit={onClickUpdatePassword}>
                    <input 
                        type="password" 
                        placeholder='Nuova password' 
                        className='form-text'
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}></input><br/>
                    <input type="submit" value="Conferma" className='form-submit'></input>
                    <button type="button" onClick={onHide} className='modal-hide'>
                        <i className='bi bi-x-lg'></i>
                    </button>
                </form>
            </div>
        </Modal>
    );
}