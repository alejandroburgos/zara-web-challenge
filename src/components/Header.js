import React, { useContext } from "react";
import marvel_logo from "../assets/images/marvel-logo.svg";
import heart_red from "../assets/icons/heart-red.svg";
import { Link } from "react-router-dom";
import { FavoritesContext } from "../context/FavoritesContext";
import { useLoading } from "../context/LoadingContext";
import LoadingBar from "./LoadingBar";

const Header = () => {
  const { favorites } = useContext(FavoritesContext) || [];
  const { loading, setLoading } = useLoading();

  return (
    <div>
      <header className="header">
        <Link to="/">
          <img className="header__logo" src={marvel_logo} alt="Marvel Logo" />
        </Link>
        <Link
          to="/favorites"
          state={{ showFavorite: true }}
          onClick={() => setLoading(true)}
        >
          <div className="header__favorites">
            <img
              className="header__favorites--icon"
              src={heart_red}
              alt="Favorites"
            />
            <span
              className="header__favorites--count"
              data-testid="header-favorites-count"
            >
              {(favorites && favorites.length) || 0}
            </span>
          </div>
        </Link>
      </header>
      {loading && <LoadingBar />}
    </div>
  );
};

export default Header;
