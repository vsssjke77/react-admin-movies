﻿import React from 'react';

import './moviedetails.css';


function MovieDetails({ movie }) {
    const handleImageError = (event) => {
        event.target.src = 'noposter.png'; // Устанавливаем изображение-заглушку
        event.target.alt = 'Нет постера'; // Устанавливаем альтернативный текст
    };

    return (
        <div className="selected-movie">
            <div className="header-movie">
                <div className="header-leftside">
                    <p>Id: {movie.id}</p>
                    <img src="iconcopy.png" alt=""></img>
                </div>
                <div className="header-rightside">
                    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M5 13.5858V9.17157L13.5858 0.585786C14.3668 -0.195262 15.6332 -0.195262 16.4142 0.585786L18 2.17157C18.781 2.95262 18.781 4.21895 18 5L9.41421 13.5858H5ZM14 15.5858V12.5858L16 10.5858V12.5858V15.5858C16 17.2426 14.6569 18.5858 13 18.5858H3C1.34315 18.5858 0 17.2426 0 15.5858V5.58579C0 3.92893 1.34315 2.58579 3 2.58579H6H8L6 4.58579H3C2.44772 4.58579 2 5.0335 2 5.58579V15.5858C2 16.1381 2.44772 16.5858 3 16.5858H13C13.5523 16.5858 14 16.1381 14 15.5858ZM15 2L16.5858 3.58579L8.58579 11.5858H7V10L15 2Z" fill="#333333" />

                    </svg>
                    <p>Редактировать</p>
                </div>
            </div>
            <div className="info">
                <img src={movie.posterUrl} onError={handleImageError} alt="Постер фильма" />
                <div className="infotext">
                    <div className="infotext-upperside">
                        <h2>{movie.title}</h2>
                        <p>{movie.director}</p>
                    </div>
                    <div className="infotext-other">
                        <div className="infotext-other-parameters">
                            <p id="header-of-parametrers">Параметры</p>
                            <p className= "infotext-other-parameters-spans" style={{ color: '#6C6C6C' }}>
                                <span style={{ color: '#6C6C6C' }}>Год производства
                                    <span> {movie.year}</span>
                                </span>
                                
                                {movie.genres.map((genre, index) => (
                                    <span className="strange" key={index}>
                                        <br />
                                        <span style={{ color: '#6C6C6C' }}>Жанр</span> {genre}
                                    </span>
                                ))}
                            </p>
                        </div>
                        <div className="infotext-other-actors">
                            <p id="header-of-parametrers">В главных ролях:</p>
                            <p id="header-of-parametrers">{movie.actors}</p>
                        </div>
                    </div>
                    
                    {/* Другая информация о фильме */}
                </div>
                <div className="info-about">
                    <p id="about">Описание</p>
                    <p id="header-of-parametrers">{movie.plot}</p>
                    <div className="info-about-rating">
                        <p id="header-of-parametrers">Текущий рейтинг</p>
                        <p id="info-about-rating-rating">{movie.rating}</p>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default MovieDetails;