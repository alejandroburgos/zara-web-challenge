import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FavoritesContext } from "../context/FavoritesContext";
import heartUnselected from "../assets/icons/heart-unselected.svg";

const CharacterCard = ({ character }) => {
  const { isFavorite, addFavorite, removeFavorite } =
    useContext(FavoritesContext);

  const [characterName, setCharacterName] = useState(character.name);

  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    if (isMobile) {
      setCharacterName(
        character.name.length > 12
          ? character.name.substring(0, 22) + "..."
          : character.name
      );
    }
  }, [isMobile, character.name]);

  return (
    <div className="character-card">
      <Link to={`/character/${character.id}`}>
        <div className="character-card__container">
          <div className="character-card__content">
            <img
              className="character-card__image"
              src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
              alt={character.name}
            />
          </div>
          <div className="character-card__overlay"></div>
        </div>
      </Link>

      <div>
        <h2 className="character-card__name">{characterName}</h2>
        {isFavorite && isFavorite(character.id) ? (
          <svg
            className="character-card__favorite"
            width="24"
            height="22"
            viewBox="0 0 24 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => removeFavorite(character.id)}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 3.63869L6 -0.00292969L0 3.63869V11.4422L12 21.6734L24 11.4422V3.63869L18 -0.00292969L12 3.63869Z"
            />
          </svg>
        ) : (
          <div>
            <img
              src={heartUnselected}
              alt="Favorite"
              className="character-card__favorite"
              onClick={() => addFavorite(character)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CharacterCard;
