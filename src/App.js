import React from "react";
import Header from "./components/Header";
import CharacterListPage from "./views/CharacterListPage";
import "./styles/main.scss";
import { Route, Routes } from "react-router-dom";
import CharacterDetailPage from "./views/CharacterDetailPage";

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<CharacterListPage />} />
        <Route
          path="/favorites"
          element={<CharacterListPage showFavorites={true} />}
        />
        <Route path="/character/:id" element={<CharacterDetailPage />} />
      </Routes>
    </div>
  );
};

export default App;
