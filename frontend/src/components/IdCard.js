

export const IdCard = ({user, role, mailUpdate, passwordUpdate}) => {
    return (
        <div className="id-card">
            <div className="card-content">
                <div className="card-front">
                    <p><b>Nome</b>: 
                        {role === "CUSTOMER" ? user.firstName + " " + user.lastName 
                                            : user.businessName + " " + user.socialReason} 
                    </p>
                    <p><b>{role === "CUSTOMER" ? "Residenza" : "Sede"}
                    </b>: {user.address}, {user.houseNumber} - {user.city}</p>
                    <p><b>Telefono</b>: {user.phone}</p>
                </div>
                <div className="card-back">
                    <div>
                        <p><b>Nome utente</b>: {user.username}</p>
                    </div>
                    <div>
                        <p><b>Indirizzo Mail</b>: {user.email}</p>
                        <span onClick={mailUpdate}><i className="bi bi-pen"></i></span>
                    </div>
                    <div>
                        <p><b>Password</b>: *******</p>
                        <span onClick={passwordUpdate}><i className="bi bi-pen"></i></span>
                    </div>
                </div>
            </div>
            
        </div>
    )
}