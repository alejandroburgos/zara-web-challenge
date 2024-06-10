import React, { useState, useEffect, useContext } from "react";
import { useMarvelApi } from "../services/api";
import CharacterCard from "../components/CharacterCard";
import SearchBar from "../components/SearchBar";
import { FavoritesContext } from "../context/FavoritesContext";
import { useLoading } from "../context/LoadingContext";

const CharacterListPage = ({ showFavorites }) => {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [query, setQuery] = useState("");
  const { favorites } = useContext(FavoritesContext);
  const { fetchCharacters } = useMarvelApi();
  const { loading, setLoading } = useLoading();

  useEffect(() => {
    if (!showFavorites) {
      const fetchAllCharacters = async () => {
        const results = await fetchCharacters();
        setCharacters(results);
        setFilteredCharacters(results);
      };

      fetchAllCharacters();
    } else {
      setCharacters(favorites);
      setFilteredCharacters(favorites);
      setLoading(false);
    }
  }, [showFavorites]);

  useEffect(() => {
    if (showFavorites) {
      setCharacters(favorites);
      setFilteredCharacters(favorites);
      setLoading(false);
    } else if (!showFavorites) {
      setCharacters(characters);
      setFilteredCharacters(characters);
    }
  }, [showFavorites, favorites, characters, query]);

  useEffect(() => {
    if (query) {
      const results = characters.filter((character) =>
        character.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCharacters(results);
    } else {
      setFilteredCharacters(showFavorites ? favorites : characters);
    }
  }, [query, characters, favorites, showFavorites]);

  return (
    <div className="character-list-page">
      {showFavorites && (
        <h1 className="character-list-page__title-favorites">Favorites</h1>
      )}
      <SearchBar onSearch={setQuery} />
      {!loading ? (
        <p className="character-list-page__count">
          {filteredCharacters && filteredCharacters.length} results
        </p>
      ) : (
        <p className="character-list-page__count">Loading...</p>
      )}
      <div className="character-list">
        {filteredCharacters &&
          filteredCharacters.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
      </div>
    </div>
  );
};

export default CharacterListPage;
