import { React, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "./context/AuthContext";

function NavLinks(props) {
  const [auth, sethAuth] = useContext(AuthContext);
  const history = useNavigate();

  const logout = () => {
    sethAuth(null);
    history("/");
    props.closeMenu();
  };
  return (
    <ul className="nav__list">
      <li className="nav__item" onClick={() => props.isActive && props.closeMenu()}>
        <NavLink to="/">Home</NavLink>
      </li>
      <li className="nav__item" onClick={() => props.isActive && props.closeMenu()}>
        <NavLink to="/hotels">Hotels</NavLink>
      </li>
      <li className="nav__item" onClick={() => props.isActive && props.closeMenu()}>
        <NavLink to="/contact">Contact</NavLink>
      </li>
      <li className="nav__item" onClick={() => props.isActive && props.closeMenu()}>
        {auth ? <NavLink to="/admin">Admin</NavLink> : <NavLink to="/login">Login</NavLink>}
      </li>
      {auth ? (
        <li className="nav__item">
          <button className="logOutButton" onClick={logout}>
            Logout
          </button>
        </li>
      ) : null}
    </ul>
  );
}

export default NavLinks;
