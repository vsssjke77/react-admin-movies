import React, { useEffect, useState } from 'react';
import MovieDetails from './moviedetails'; // Путь к вашему компоненту MovieDetails

import './movieslist.css';

const baseUrl = 'http://localhost:3000/movies/';

function Movieslist() {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        GetMovies();
    }, []);

    function GetMovies() {
        fetch(baseUrl)
            .then((response) => response.json())
            .then((movies) => setMovies(movies))
            .catch((error) => console.error('Error fetching movies:', error));
    }
    function handleClick(movieId) {
        const selected = movies.find(movie => movie.id === movieId);
        setSelectedMovie(selected);
    }

    return (
        <div id="movieslist">
            <input id="searchfilm" type="text" placeholder="Введите название фильма" />
            <button id="buttonsearch">Искать</button>

            {movies.map((movie) => (
                <div className="listitem" data-movie-id={movie.id} key={movie.id} onClick={() => handleClick(movie.id)}>
                    <p id="itemtitle">{movie.title}</p>
                    <div className="secondstring">
                        <p id="itemyear">{movie.year}</p>
                        <p id="itempalka" > | </p>
                        <p id="itemgenre" >{movie.genres.join(', ')}</p>
                    </div>
                    
                </div>
            ))}
            {selectedMovie && <MovieDetails movie={selectedMovie} />}

        </div>
    );
}

export default Movieslist;


