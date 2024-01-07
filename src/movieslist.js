import React, { useEffect, useState } from 'react';
import MovieDetails from './moviedetails'; // Путь к вашему компоненту MovieDetails
import './movieslist.css';
import AddForm from './addform';

const baseUrl = 'http://localhost:3000/movies/';

function Movieslist() {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const [isAddMovieOpen, setIsAddMovieOpen] = useState(false);


    const handleAddMovieClick = () => {
        setIsAddMovieOpen(true);
    };

    const handleCloseAddForm = () => {
        setIsAddMovieOpen(false);
    };

    useEffect(() => {
        GetMovies();
    }, []);

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().startsWith(searchValue.toLowerCase())
    );

    const UpdateMovie = (updatedMovie) => {
        fetch(`http://localhost:3000/movies/${updatedMovie.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedMovie),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Фильм успешно обновлен:', data);
                GetMovies(); // Обновляем список фильмов после успешного обновления
                setSelectedMovie(data);
            })
            .catch(error => {
                console.error('Ошибка при обновлении фильма:', error);
            });
    };

    const AddMovie = (formData) => {
        fetch('http://localhost:3000/movies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Фильм успешно добавлен:', data);
                // Можно добавить обновление состояния после успешного добавления фильма
                setMovies(prevMovies => [...prevMovies, data]); // Добавляем новый фильм к текущему списку фильмов
            })
            .catch(error => {
                console.error('Ошибка при добавлении фильма:', error);
            });
    };

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
            <button id="addmovie" onClick={handleAddMovieClick}>Добавить фильм</button>
            {isAddMovieOpen && <AddForm onClose={handleCloseAddForm} AddMovie={AddMovie} />}
            <input id="searchfilm" type="text" placeholder="Введите название фильма" value={searchValue}
                onChange={handleSearchChange} />
            <button id="buttonsearch">Искать</button>

            {filteredMovies.map((movie) => (
                <div className="listitem" data-movie-id={movie.id} key={movie.id} onClick={() => handleClick(movie.id)}>
                    <p id="itemtitle">{movie.title}</p>
                    <div className="secondstring">
                        <p id="itemyear">{movie.year}</p>
                        <p id="itempalka" > | </p>
                        <p id="itemgenre" >{movie.genres.join(', ')}</p>
                    </div>
                    
                </div>
            ))}
            {selectedMovie && <MovieDetails movie={selectedMovie} UpdateMovie={UpdateMovie} onMovieUpdate={setSelectedMovie} />}

        </div>
    );
}

export default Movieslist;


