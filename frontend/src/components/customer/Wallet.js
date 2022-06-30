import "../../style/Wallet.css";

import { useEffect, useState } from "react";
import { PasswordForm } from "../PasswordForm";
import { MailForm } from "../MailForm";
import { IdCard } from "../IdCard";
import { CreateCard } from "./CreateCard";
import { CardList } from "./CardList";
import { useDispatch, useSelector } from "react-redux";
import { getCustomerInfo } from "../../features/customer/customerThunk";
import { Chart } from "./Chart";
export const Wallet = () => {
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [showMail, setShowMail] = useState(false);

  const customer = useSelector((state) => state.customers);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (
      auth.user.AUTHORITIES_KEY === "CUSTOMER" &&
      (auth.user === null || auth.user?.sub !== customer.value?.username)
    ) {
      dispatch(getCustomerInfo(auth.access_token));
    }
  }, []);

  if (customer.status === "pending") {
    return <div className="spinner-border" role="status"></div>;
  }
  if (customer.status === "fulfilled") {
    return (
      <div className="account-content">
        <div className="customer-data">
          <div>
            <h2>I miei dati</h2>
            <IdCard
              user={customer.value}
              role={auth.user.AUTHORITIES_KEY}
              mailUpdate={() => setShowMail(true)}
              passwordUpdate={() => setShowPassword(true)}
            />
          </div>
        </div>
        <div className="new-card">
          <div>
            <h2>Crea una nuova carta</h2>
            <CreateCard />
          </div>
        </div>
        <div className="management">          
          <div className="customer-cards">
          <h2>Le mie carte</h2>
            <CardList />
          </div>
          <div className="customer-chart" style={{ marginTop: "2em" }}>
            <h2>Media dei punti delle carte</h2>            
              <Chart />            
          </div>
        </div>
        <PasswordForm
          show={showPassword}
          onHide={() => setShowPassword(false)}
        />
        <MailForm show={showMail} onHide={() => setShowMail(false)} />
      </div>
    );
  }
};
