import '../style/Home.css'
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { CreateCardShortcut } from './customer/CreateCardShortcut';
import { CreateCatalogShortcut } from './manager/CreateCatalogShortcut';
import { useDispatch, useSelector } from 'react-redux';
import { resetStatus as resetCustomer } from '../features/customer/customerThunk';
import { resetStatus as resetManager } from '../features/manager/managerThunk';
import { CardListShortcut } from './customer/CardListShortcut';
import ModalStatisticShortcut from './manager/ModalStatisticShortcut';

export const Home = ({logged}) => {
    
    const [showCreateCard, setShowCreateCard] = useState(false);
    const [showCreateCatalog, setShowCreateCatalog] = useState(false);
    const [showCardList, setShowCardList] = useState(false);
    const [showStatistic, setShowStatistic] = useState(false);
    const customer = useSelector(state => state.customers);
    const manager = useSelector(state => state.managers);
    const dispatch = useDispatch();


    useEffect(() => {
        if (customer.status === "created") {
            dispatch(resetCustomer());
        } else if (manager.status === "created") {
            dispatch(resetManager());
        }
    }, [])

    if (logged === null) {
        return (
            <div className="content-home">
                <Link to='/register' style={{textDecoration:"none", color:"#333"}}>
                    <div className="shortcut-card">
                        <i className="bi bi-person-plus"></i>
                        <p>Crea un nuovo utente</p>
                    </div>
                </Link>  
                {/* find another shortcut to use when no user is logged */}
            </div>)    
    }

    if (logged.AUTHORITIES_KEY === 'CUSTOMER') {
        return (
            <div className="content-home">
                <div className="shortcut-card" onClick={() => setShowCreateCard(true)}>
                    <i className="bi bi-credit-card"></i>
                    <p>Crea una nuova carta</p>
                </div>
                <div className="shortcut-card" onClick={() => setShowCardList(true)}>
                    <i className="bi bi-wallet2"></i>
                    <p>Le mie carte</p>
                </div>
                <CreateCardShortcut show={showCreateCard} onHide={() => setShowCreateCard(false)} />
                <CardListShortcut show={showCardList} onHide={() => setShowCardList(false)} />
            </div>)
    }

    if (logged.AUTHORITIES_KEY === 'MANAGER') {
        return (
            <div className="content-home">
                <div className="shortcut-card" onClick={() => setShowCreateCatalog(true)}>
                    <i className="bi bi-book"></i>
                    <p>Crea un nuovo catalogo</p>
                </div>
                <div className="shortcut-card" onClick={() => setShowStatistic(true)}>
                    <i className="bi bi-calendar3"></i>
                    <p>Resoconto iscrizioni dell'ultimo mese</p>
                </div>                
                <CreateCatalogShortcut show={showCreateCatalog} onHide={() => setShowCreateCatalog(false)} />
                <ModalStatisticShortcut show={showStatistic} onHide={() => setShowStatistic(false)} />
            </div>);
    }
}