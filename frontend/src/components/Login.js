import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import "../style/Login.css"
import { login } from "../features/auth/authThunk";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Login = () => {

    let navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const auth = useSelector(state => state.auth);
    const customer = useSelector(state => state.customers);
    const manager = useSelector(state => state.managers);

    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth]);

    useEffect(() => {
        if (auth.status === "AUTH") {
            console.log("testing");
            const toPage = location?.state?.from?.pathname || "/";
            return navigate(toPage)
        } else if (auth.status === "ERR_AUTH") {
            toast.error("Credenziali errate", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }, [auth.status]); 

    useEffect(() => {
        if (customer.status === "created" || manager.status === "created") {
            toast.success("Utente creato con successo", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }, [customer, manager]);

    // Login saves data in local storage: to be updated, just for testing
    const handleAuth = (e) => {
        e.preventDefault();
        const credentials = {
            username: username,
            password: password
        }
        dispatch(login(credentials));
        setUsername('');
        setPassword('');
    }


    if (auth.status === "refresh_pending") {
            return <div className="spinner-border position-absolute top-50 start-50 transalate-middle" role="status"></div>
    } else {
        return (
            <div className="login-background">
                <div className="login position-absolute top-50 start-50 translate-middle">
                    <h1>Accedi</h1>
                    <form onSubmit={handleAuth}>
                        <input 
                            type="text" 
                            className="form-text"
                            placeholder="Username"
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)}
                            required>
                        </input><br/>
                        <input 
                            type="password" 
                            className="form-text" 
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}>
                        </input><br/>
                        <input className="form-submit" type="submit" value="Accedi"></input>
                    </form>
                    <div id='error' className="d-flex align-items-center justify-content-center" hidden></div>
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
    
}