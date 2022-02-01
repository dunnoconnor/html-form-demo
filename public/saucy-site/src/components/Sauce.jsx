import React from 'react';

function Sauce(props) {
    return (
        <div>
        <h2 id="item-name">{props.sauce.name}</h2>
        <img className="item-img" src={props.sauce.image} alt={props.sauce.name} />
        <h3>Likes: <span id="like-counter">{props.sauce.likes}</span></h3>
        <button id="like-btn">Like</button>
        <button id="delete-btn">Delete</button>
        <a href="/edit-sauce/{{sauce.id}}" className="edit-sauce-btn">Edit this sauce</a>
        </div>
    );
}

export default Sauce;