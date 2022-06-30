import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCard } from "../../features/card/cardThunk";
import { getManagerCatalogs, resetStatus } from "../../features/catalog/catalogThunk";
import { getManagers } from "../../features/manager/managerThunk";
import '../../style/CreateCard.css';

const LocalDate = require('@js-joda/core').LocalDate;


export const CreateCard = ({onSubmit}) => {

    const managers = useSelector(state => state.managers);
    const catalogs = useSelector(state => state.catalogs);
    const auth = useSelector(state => state.auth);

    const dispatch = useDispatch();

    const [shop, setShop] = useState('');
    const [cardType, setCardType] = useState('');

    useEffect(() => {
        dispatch(getManagers(auth.access_token));
    }, []);

    useEffect(() => {
        if (managers.status === "fulfilled" && shop !== '') {
            dispatch(getManagerCatalogs({manager: shop, token: auth.access_token}));    
        }
        return () => dispatch(resetStatus());
    }, [shop]);

    const onClickCreateCard = (e) => {
        e.preventDefault();
        const today = new Date();
        const subDate = today.getFullYear() + "-" + (parseInt(today.getMonth())+1) + "-" + today.getDate();
        const expDate = today.getFullYear() + "-" + (parseInt(today.getMonth())+1) + "-" + (parseInt(today.getDate())+4);
        const card = {
            customerUsername: auth.user.sub,
            manager: shop,
            catalogName: cardType,
            currentPoints: 0,
            earnedPoints: 0,
            subscriptionDate: LocalDate.now().toString(),
            expirationDate: LocalDate.now().plusYears(4).toString()
        }
        const data = {card: card, token: auth.access_token};
        dispatch(createCard(data));
        if (onSubmit !== null) {
            onSubmit();
        }
    }


    if (managers.status === "pending") {
        console.log("Waiting for managers");
        return <div className="spinner-border" role="status"></div>;
    } 
    if (managers.status === "fulfilled") {
        return (
            <div className="create-card">
                <form onSubmit={onClickCreateCard} id="card-create-form">
                    <select 
                        id="shops" 
                        className="create-card-select" 
                        onChange={(e) => setShop(e.target.value)}
                        required>
                        <option className="select-placeholder" disabled selected>Seleziona il negozio</option>
                        {managers.value.map(shop => <option value={shop.username}>{shop.businessName}</option>)}
                    </select>
                    <br/>
                    <select 
                        id="catalog" 
                        className="create-card-select" 
                        disabled={catalogs.status === "fulfilled" ? false : true} 
                        onChange={(e) => setCardType(e.target.value)}
                        required>
                        <option className="select-placeholder" disabled selected>Seleziona il catalogo a cui vuoi iscriverti</option>
                        {catalogs.status === "fulfilled" ? catalogs.value.map(cat => <option value={cat.catalogTypeName}>{cat.catalogTypeName}</option>) : ""}
                    </select>
                    <br/>
                    <input 
                        type="submit" 
                        className="create-card-submit" 
                        value="Crea carta"
                        disabled={shop === '' || cardType === '' ? true : false}>
                    </input>
                </form>
            </div>
        )
    }
    
}