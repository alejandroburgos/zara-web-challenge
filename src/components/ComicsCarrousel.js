import React, { useState, useEffect } from "react";
import { useMarvelApi } from "../services/api";

const ComicsCarrousel = ({ id, loading }) => {
  const { fetchComics } = useMarvelApi();

  const [comics, setComics] = useState([]);

  useEffect(() => {
    const getComics = async () => {
      const result = await fetchComics(id);
      setComics(result);
    };
    getComics();
  }, [id]);

  return (
    <>
      {!loading && (
        <div className="comics-carrousel">
          <h1>Comics</h1>
          <div className="comics-carrousel__scroll">
            <div className="comics-carrousel__list">
              {comics.map((comic) => (
                <div key={comic.id} className="comics-carrousel__comic">
                  <img
                    className="comics-carrousel__comic-image"
                    src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                    alt={comic.title}
                  />
                  <p className="comics-carrousel__comic-title">{comic.title}</p>
                  <p className="comics-carrousel__comic-year">
                    {comic.dates[0].date.slice(0, 4)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ComicsCarrousel;
