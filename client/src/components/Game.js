import React from "react";

function Game({title, cover_art_url, genre}){

    return(
            <div className="game-list-box">
                <img className="game-cover-art" src={cover_art_url} />
                <h2>{title}</h2>
                <p>{genre}</p>
            </div>
    )
}

export default Game;