import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCustomerCards } from "../../features/card/cardThunk";
import { Card } from "./Card";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const CardList = ({showToast}) => {

    const dispatch = useDispatch();
    const cards = useSelector(state => state.cards);
    const auth = useSelector(state => state.auth);
    const redeem = useSelector(state => state.redeem);

    const [firstRun, setFirstRun] = useState(true);

    useEffect(() => {
        if (cards.status === null 
            || redeem.status === "REDEEM" 
            || cards.status === "CARD_CREATED"
            || cards.status === "ERR_CARD_CREATE") {
            dispatch(getCustomerCards({customer:auth.user.sub, token:auth.access_token}))
        }
    }, [redeem.status]);
    

    useEffect(() => {
        // do not show any toast on first run
        if (firstRun) {
            setFirstRun(false);
        } else {
            if (cards.status === "ERR_CARD_CREATE") {
                toast.error("Impossibile creare la carta", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else if (cards.status === "CARD_CREATED") {
                toast.success("Nuova carta aggiunta al portafoglio!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else if (cards.status === "DELETE" && showToast) {
                toast.success("Carta rimossa dal portafoglio!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            }
        }
    }, [cards.status]);
    
    if (cards.value?.length === 0) {
        return <p>Non hai ancora carte nel tuo portafoglio</p>
    } 

    return (
        <>
        {
            cards.status === null || cards.status === "pending"
                ? <div className="spinner-border" role="status"></div>
                : <div className="card-list">{cards.value.map( card => <Card key={card.id} card={card} /> )}</div>   
        } 
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
        </>
        
        
    )
}