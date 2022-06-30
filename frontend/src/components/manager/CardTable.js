import { CardItem } from "./CardItem";
import '../../style/CardTable.css';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCatalogCards } from "../../features/card/cardThunk";


export const CardTable = ({catalog}) => {

    const dispatch = useDispatch();
    
    const auth = useSelector(state => state.auth);
    const cards = useSelector(state => state.cards);


    useEffect(() => {
        if (catalog !== '') {
            dispatch(getCatalogCards({manager:auth.user.sub, catalog:catalog, token:auth.access_token}))
        }
    }, [catalog]);

    if (cards.status === "fulfilled") {
        if (cards.value.length === 0) {
            return <p>Nessuna iscrizione per {catalog}</p>
        } else {
            return (
                <div className="card-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Cliente</th>
                                <th>Punti</th>
                                <th>Scadenza</th>
                                <th>Aggiungi punti</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cards.value.map(card => <CardItem card={card} />)}
                        </tbody>
                    </table>
                </div>
            )
        }
    } else if (cards.status === "pending" || cards.status === null){
        return <p>Nessun catalogo selezionato</p> 
    }

    
    
}