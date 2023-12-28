import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import './movieslist.css';

const baseUrl = 'http://localhost:3000/movies/';

function Movieslist() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        GetMovies();
    }, []);

    function GetMovies() {
        fetch(baseUrl)
            .then((response) => response.json())
            .then((movies) => setMovies(movies))
            .catch((error) => console.error('Error fetching movies:', error));
    }

    return (
        <div id="movieslist">
            <input id="searchfilm" type="text" placeholder="Введите название фильма" />
            <button id="buttonsearch">Искать</button>

            {movies.map((movie, index) => (
                <div className="listitem" key={index}>
                    <p id="itemtitle">{movie.title}</p>
                    <div className="secondstring">
                        <p id="itemyear">{movie.year}</p>
                        <p id="itempalka" > | </p>
                        <p id="itemgenre" >{movie.genres}</p>
                    </div>
                    
                </div>
            ))}
        </div>
    );
}

export default Movieslist;


