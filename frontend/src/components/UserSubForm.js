

export const UserSubForm = ({userType, handleChange}) => {

    if (userType === 0) {
        return (    
            <div className="user-data">
                <label className="user-info">Dati personali</label><br/>
                <div className="user-data-type">
                    <div>
                        <input 
                            className='form-text' 
                            placeholder="Nome"
                            type="text"
                            name="firstName"
                            onChange={(e) => handleChange(e)}
                            required></input><br/>
                        <input 
                            className='form-text' 
                            placeholder="Cognome"
                            type="text"
                            name="lastName"
                            onChange={(e) => handleChange(e)}
                            required></input><br/>
                        <input 
                            className='form-text' 
                            placeholder="Codice fiscale"
                            type="text"
                            name="cf"
                            onChange={(e) => handleChange(e)}
                            required></input><br/>
                    </div>
                    <div>
                        <input 
                            className='form-text address' 
                            placeholder="Indirizzo"
                            type="text"
                            name="address"
                            onChange={(e) => handleChange(e)}
                            required></input>
                        <input 
                            className='form-text house-number' 
                            placeholder="Civico"
                            type="number"
                            name="houseNumber"
                            onChange={(e) => handleChange(e)}
                            required></input><br/>
                        <input 
                            className='form-text' 
                            placeholder="Città"
                            type="text"
                            name="city"
                            onChange={(e) => handleChange(e)}
                            required></input><br/>
                        <input 
                            className='form-text' 
                            placeholder="Telefono"
                            type="number"
                            name="phone"
                            onChange={(e) => handleChange(e)}
                            required></input><br/>
                    </div>
                </div>            
            </div>
        )
    }

    if (userType === 1) {
        return (
            <div className="user-data">
            <label className="user-info">Dati aziendali</label><br/>
                <div className="user-data-type">
                    <div>
                        <input 
                            className='form-text' 
                            placeholder="Nome società"
                            type="text"
                            name="businessName"
                            onChange={(e) => handleChange(e)}
                            required></input><br/>
                        <input 
                            className='form-text' 
                            placeholder="Ragione sociale"
                            type="text"
                            name="socialReason"
                            onChange={(e) => handleChange(e)}
                            required></input><br/>
                        <input 
                            className='form-text' 
                            placeholder="Partita IVA"
                            type="text"
                            name="piva"
                            onChange={(e) => handleChange(e)}
                            required></input><br/>
                    </div>
                    <div>
                        <input 
                            className='form-text address' 
                            placeholder="Indirizzo"
                            type="text"
                            name="address"
                            onChange={(e) => handleChange(e)}
                            required></input>
                        <input 
                            className='form-text house-number' 
                            placeholder="Civico"
                            type="number"
                            name="houseNumber"
                            onChange={(e) => handleChange(e)}
                            required></input><br/>
                        <input 
                            className='form-text' 
                            placeholder="Città"
                            type="text"
                            name="city"
                            onChange={(e) => handleChange(e)}
                            required></input><br/>
                        <input 
                            className='form-text' 
                            placeholder="Telefono"
                            type="number"
                            name="phone"
                            onChange={(e) => handleChange(e)}
                            required></input><br/>
                    </div>
                </div>
            </div>
        )
    }
}