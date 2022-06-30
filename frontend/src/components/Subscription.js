import { useEffect, useState } from 'react'
import '../style/Subscription.css'
import { setUserView, showError } from '../utils'
import { UserSubForm } from './UserSubForm';
import { useDispatch, useSelector } from 'react-redux';
import { createCustomer } from '../features/customer/customerSlice';
import { useNavigate } from 'react-router-dom';
import { createManager } from '../features/manager/managerSlice';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const Subscription = () => {

    const [userType, setType] = useState(0);

    const [user, setUser] = useState({});
    const [errView, setErrView] = useState(false);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const managers = useSelector(state => state.managers);
    const customers = useSelector(state => state.customers);

    const handleChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value});
    }


    useEffect(() => {
        setUserView(userType);
        setUser({});
        document.getElementById("registration-form").reset();
    }, [userType]);

    useEffect(() => {
        if (customers.status === "created" || managers.status === "created") {
            return navigate("/login");
        }
    }, [customers, managers]);

    useEffect(() => {
        if (customers.status === "ERR_CREATE" || managers.status === "ERR_CREATE") {
            toast.error("Dati già utilizzati", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        document.getElementById("registration-form").reset();
    }, [customers, managers])


    const registration = (e) => {
        e.preventDefault();
        if (userType === 0) {
            dispatch(createCustomer(user))
        } else {
            dispatch(createManager(user));
        }
    }

    return (
        <div className='sub-background'>
            <div className="sub">
                <h1>Iscriviti</h1>
                <div className="user-type">
                    <span onClick={() => setType(0)}>Cliente</span>
                    <span onClick={() => setType(1)}>Gestore</span>
                </div>
                <form onSubmit={(e) => registration(e)} id="registration-form">
                    <input 
                        className="user-type-slider" 
                        type="range" 
                        min="0" max="1" 
                        value={userType}
                        onChange={(e) => setType(e.target.value)}></input><br/>
                    <div className='sub-form'>
                        <div className='user-data'>
                            <label className='user-info'>Dati account</label><br/>
                            <div>
                                <input 
                                    className='form-text' 
                                    placeholder="Mail"
                                    type="mail"
                                    name='email'
                                    onChange={(e) => handleChange(e)}
                                    required></input><br/>
                                <input 
                                    className='form-text' 
                                    placeholder="Nome utente"
                                    type="text"
                                    name='username'
                                    onChange={(e) => handleChange(e)}
                                    required></input><br/>
                                <input 
                                    className='form-text' 
                                    placeholder="Password"
                                    type="password"
                                    name='password'
                                    onChange={(e) => handleChange(e)}
                                    required></input><br/>
                            </div>
                        </div>
                        <UserSubForm userType={userType} handleChange={handleChange}/>
                    </div>
                    <input className='form-submit' type="submit" value="Crea account"></input>
                </form>
                <div id='error' className="d-flex align-items-center justify-content-center"></div>
            </div>
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
        </div>
    )
}