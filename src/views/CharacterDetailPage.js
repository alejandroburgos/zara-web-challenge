import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useMarvelApi } from "../services/api";
import heartRed from "../assets/icons/heart-red.svg";
import heartUnselected from "../assets/icons/heart-unselected.svg";
import ComicsCarrousel from "../components/ComicsCarrousel";
import { FavoritesContext } from "../context/FavoritesContext";
import { useLoading } from "../context/LoadingContext";

const CharacterDetailPage = () => {
  const { addFavorite, removeFavorite, isFavorite } =
    useContext(FavoritesContext);
  const { loading, setLoading } = useLoading();
  const { fetchCharacterDetails } = useMarvelApi();
  const { id } = useParams();
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    const getCharacter = async () => {
      setLoading(true);
      const result = await fetchCharacterDetails(id);
      setCharacter(result);
      setLoading(false);
    };
    getCharacter();
  }, [id, fetchCharacterDetails, setLoading]);

  return (
    <>
      {!loading && character && (
        <div className="character-detail-page">
          <div className="character-detail">
            <img
              className="character-detail__image"
              src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
              alt={character.name}
            />
            <div className="character-detail__content">
              <div className="character-detail__info">
                <h1 className="character-detail__name">{character.name}</h1>
                <img
                  src={isFavorite(character.id) ? heartRed : heartUnselected}
                  alt="Favorite"
                  className="character-detail__favorite"
                  onClick={() =>
                    isFavorite(character.id)
                      ? removeFavorite(character.id)
                      : addFavorite(character)
                  }
                />
              </div>
              <p className="character-detail__description">
                {character.description}
              </p>
            </div>
          </div>
        </div>
      )}
      <ComicsCarrousel id={id} loading={loading} />
    </>
  );
};

export default CharacterDetailPage;
