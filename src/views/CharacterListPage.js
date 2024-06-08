import React, { useState, useEffect, useContext } from "react";
import { useMarvelApi } from "../services/api";
import CharacterCard from "../components/CharacterCard";
import SearchBar from "../components/SearchBar";
import { FavoritesContext } from "../context/FavoritesContext";
import { useLoading } from "../context/LoadingContext";
import { charactersMock } from "../data/charactersMock";

const CharacterListPage = ({ showFavorites }) => {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [query, setQuery] = useState("");
  const { favorites } = useContext(FavoritesContext);
  const { fetchCharacters } = useMarvelApi();
  const { loading } = useLoading();

  useEffect(() => {
    const fetchAllCharacters = async () => {
      const results = await fetchCharacters();
      if (results && results.status === 200) {
        setCharacters(results);
        setFilteredCharacters(results);
      } else {
        setCharacters(charactersMock);
        setFilteredCharacters(charactersMock);
      }
    };

    fetchAllCharacters();
  }, []);

  useEffect(() => {
    if (showFavorites) {
      setFilteredCharacters(favorites);
    } else if (!query) {
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
