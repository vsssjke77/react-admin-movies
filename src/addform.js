import React, { useEffect } from 'react';
import { useState } from 'react';
import './addform.css';

function AddForm({onClose, AddMovie }) {

    useEffect(() => {
        const listItems = document.querySelectorAll('.listitem');
        listItems.forEach(item => {
            item.classList.add('disabled');
        });

        return () => {
            listItems.forEach(item => {
                item.classList.remove('disabled');
            });
        };
    }, []);
    const [formData, setFormData] = useState({
        title: '',
        year: '',
        plot: '',
        posterUrl: '',
        rating: 0,
        actors: '',
        director: '',
        selectedGenres: [], // Выбранные жанры для отправки на сервер
        availableGenres: [
            "Comedy", "Fantasy", "Crime", "Drama", "Music", "Adventure", "History", "Thriller",
            "Animation", "Family", "Mystery", "Biography", "Action", "Film-Noir", "Romance",
            "Sci-Fi", "War", "Western", "Horror", "Musical", "Sport"
        ] // Список доступных жанров
    });

    

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        let sanitizedValue = value;
        if (name === 'rating') {
            const rating = parseInt(value, 10);
            if (rating > 10) {
                alert('Рейтинг не должен превышать 10');
                sanitizedValue = 10;
            }
        }

        setFormData((prevData) => ({
            ...prevData,
            [name]: sanitizedValue
        }));
    };

    const handleGenreChange = (event) => {
        const selectedOptions = event.target.selectedOptions;
        const selectedGenres = Array.from(selectedOptions, option => option.value);

        if (selectedGenres.length > 3) {
            // Если выбрано больше трех жанров, оставляем только первые три
            const firstThreeGenres = selectedGenres.slice(0, 3);
            setFormData(prevData => ({
                ...prevData,
                selectedGenres: firstThreeGenres
            }));
        } else {
            setFormData(prevData => ({
                ...prevData,
                selectedGenres: selectedGenres
            }));
        }
    };

    const handleCancel = () => {
        onClose();
    };

    const handleSave = () => {
        const movieDataToSend = {
            title: formData.title,
            year: formData.year,
            plot: formData.plot,
            posterUrl: formData.posterUrl,
            rating: formData.rating,
            actors: formData.actors,
            director: formData.director,
            genres: formData.selectedGenres // Отправляем только выбранные жанры на сервер
        };

        AddMovie(movieDataToSend);
        onClose();
    };

    return (
        <div className="addForm">
            <h2>Добавление фильма</h2>
            <p>Название фильма</p>
            <input name="title" value={formData.title} onChange={handleInputChange}></input>
            <p>Год выпуска</p>
            <input name="year" type="number" min={0} value={formData.year} onChange={handleInputChange}></input>
            <p>Укажите 3 жанра фильма</p>
            <select onChange={handleGenreChange} multiple>
                {formData.availableGenres.map((genre, index) => (
                    <option key={index} value={genre}>{genre}</option>
                ))}
            </select>
            <p>Описание</p>
            <input id="plotinput" name="plot" value={formData.plot} onChange={handleInputChange}></input>
            <p>Укажите ссылку на обложку</p>
            <input name="posterUrl" value={formData.posterUrl} onChange={handleInputChange}></input>
            <p>Рейтинг</p>
            <input type="number" name="rating" min={0} max={10} value={formData.rating} onChange={handleInputChange}></input>
            <p>Укажите список актеров</p>
            <input name="actors" value={formData.actors} onChange={handleInputChange}></input>
            <p>Режиссер</p>
            <input name="director" value={formData.director} onChange={handleInputChange}></input>
            <hr></hr>
            <button id="canceleditbtn" onClick={handleCancel}>Отменить</button>
            <button id="accepteditbtn" onClick={handleSave}>Сохранить</button>
        </div>);
}

export default AddForm;