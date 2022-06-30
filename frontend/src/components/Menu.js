import { Link } from "react-router-dom";

export const Menu = ({ logged, logout }) => {
  if (logged === null) {
    return (
      <Link to="/login" className="router-link">
        <span className="login-link">Accedi</span>
      </Link>
    );
  }

  if (logged.AUTHORITIES_KEY === "CUSTOMER") {
    return (
      <>
        <input type="checkbox" id="menuBtn"></input>
        <label htmlFor="menuBtn">
          <i className="bi bi-list"></i>
        </label>
        <ul className="menu">
          <li>
            <Link to="/wallet" className="router-link">
              <span className="menu-text">Il mio portafoglio</span>
            </Link>
          </li>
          <li>
            <Link to={"/redeem/history"} className='router-link'>
              <span className="menu-text">I miei riscatti</span>
            </Link>
          </li>
          <li>
            <span className="menu-text" onClick={logout}>
              Esci
            </span>
          </li>
        </ul>
      </>
    );
  }

  if (logged.AUTHORITIES_KEY === "MANAGER") {
    return (
      <>
        <input type="checkbox" id="menuBtn"></input>
        <label for="menuBtn">
          <i className="bi bi-list"></i>
        </label>
        <ul className="menu">
          <li>
            <Link to="/management" className="router-link">
              <span className="menu-text">Gestione dati</span>
            </Link>
          </li>
          <li>
            <Link to="/statistic" className="router-link">
              <span className="menu-text">Statistiche</span>
            </Link>
          </li>
          <li>
            <span className="menu-text" onClick={logout}>
              Esci
            </span>
          </li>
        </ul>
      </>
    );
  }
};
