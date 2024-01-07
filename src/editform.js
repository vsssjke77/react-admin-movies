import React, { useEffect } from 'react';
import { useState } from 'react';
import './editform.css';

function EditFrom({ movie, onClose, UpdateMovie }) {

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

    const [editedMovie, setEditedMovie] = useState({ ...movie });

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        let sanitizedValue = value;
        if (name === 'rating') {
            const rating = parseInt(value, 10);
            if (rating > 10) {
                /*sanitizedValue = 10;*/
                alert('Рейтинг не должен превышать 10');
                
            }
        }

        setEditedMovie((prevData) => ({
            ...prevData,
            [name]: sanitizedValue
        }));
    };



    const handleCancel = () => {
        onClose(); // Вызываем функцию onClose, чтобы закрыть форму
    };

    const handleSave = () => {
        UpdateMovie(editedMovie);
        onClose();
    };

    return (
        <div className="editForm">
            <h2>Редактирование фильма {movie.title}</h2>
            <p>Название фильма</p>
            <input defaultValue={movie.title} name="title" onChange={handleInputChange}></input>
            <p>Год выпуска</p>
            <input defaultValue={movie.year} type="number" name="year" onChange={handleInputChange} min={0} ></input>
            <p>Описание</p>
            <input id="plotinput" defaultValue={movie.plot} name="plot" onChange={handleInputChange}></input>
            <p>Укажите ссылку на обложку</p>
            <input defaultValue={movie.posterUrl} name="posterUrl" onChange={handleInputChange}></input>
            <p>Рейтинг</p>
            <input defaultValue={movie.rating} type="number" name="rating" onChange={handleInputChange}min={0} max={10}></input>
            <p>Укажите список актеров</p>
            <input defaultValue={movie.actors} name="actors" onChange={handleInputChange}></input>
            <p>Режиссер</p>
            <input defaultValue={movie.director} name="director" onChange={handleInputChange}></input>
            <hr></hr>
            <button id="canceleditbtn" onClick={handleCancel}>Отменить</button>
            <button id="accepteditbtn" onClick={handleSave }>Сохранить</button>
        </div>);
}

export default EditFrom;