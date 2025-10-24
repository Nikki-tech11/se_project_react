import "./Header.css";
import logo from "../../assets/headerlogo.svg";
import avatar from "../../assets/avataricon.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { NavLink } from "react-router-dom";

function Header({ addClothesButtonClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <NavLink to="/" className="header__logo-link">
        <img className="header__logo" src={logo} alt="WTWR Logo" />
      </NavLink>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <div className="header__actions">
        <ToggleSwitch />
        <button
          onClick={addClothesButtonClick}
          type="button"
          className="header__add-clothes-button"
        >
          + Add clothes
        </button>
        <NavLink className="header__nav-link" to="/profile">
          <div className="header__user-container">
            <p className="header__username">Terrence Tegegne</p>
            <img
              src={avatar}
              alt="Terrence Tegegne"
              className="header__avatar"
            />
          </div>
        </NavLink>
      </div>
    </header>
  );
}

export default Header;
