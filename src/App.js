import React from "react";
import Header from "./components/Header";
import CharacterListPage from "./views/CharacterListPage";
import "./styles/main.scss";
import { Route, Routes } from "react-router-dom";
import CharacterDetailPage from "./views/CharacterDetailPage";
import AlertError from "./components/AlertError";
import { useLoading } from "./context/LoadingContext";

const App = () => {
  const { error } = useLoading();
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<CharacterListPage showFavorites={false} />} />
        <Route
          path="/favorites"
          element={<CharacterListPage showFavorites={true} />}
        />
        <Route path="/character/:id" element={<CharacterDetailPage />} />
      </Routes>
      {error && <AlertError message={error} />}
    </div>
  );
};

export default App;
