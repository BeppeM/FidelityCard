import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import '../../style/Card.css';
import { formatDate } from '../../utils';
import { ConfirmDelete } from './ConfirmDelete';



export const Card = ({card}) => {
    
    const dispatch = useDispatch();
    const managers = useSelector(state => state.managers);
    const auth = useSelector(state => state.auth);

    const [showConfirmDeleteView, setShowConfirmDeleteView] = useState(false);
    
    const findBusinessName = (username) => {
        return managers?.value?.find(manager => manager.username === username).businessName;
    }
    
    return (
        <>
            <div className="fidelity-card">
                <h3>{findBusinessName(card.manager)}</h3>
                <p>{card.catalogName}</p>
                <p>{card.currentPoints} pts</p>
                <div className='card-actions'>
                    <Link className='router-link' to={"/" + card.manager + "/" + card.catalogName + "/" + card.id} >
                        <i className='bi bi-book visit-catalog'></i><br/>
                    </Link>
                    <i className='bi bi-trash delete' onClick={() => setShowConfirmDeleteView(true)}></i>
                </div>
                <p>Scadenza: {formatDate(card.expirationDate)}</p>
            </div>
            <ConfirmDelete 
                show={showConfirmDeleteView} 
                onHide={() => setShowConfirmDeleteView(false)} 
                manager={findBusinessName(card.manager)}
                card = {card} />
        </>
    );
}