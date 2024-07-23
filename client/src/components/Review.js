import React from "react";

function Review({username, pfp, title, recommend, text, game_pic, genre}){

    return(
        // <div className="review-box">
        //     <img src={pfp}/>
        //     <h2>{username} </h2>
        //     {/* <button>{title}</button> */}
        //     <div className="game-box">{title}</div>
        //     <div>Would you recommend the game?: {recommend ? 'Yes' : 'No'}</div>
        //     <p>{text}</p>
            
        // </div>

        <div className="review-container">
            <div className="review-box">
                <img className="review-pfp" src={pfp} />
                <h2>{username}</h2>
                {/* <button>{title}</button> */}
                <div className="game-box">
                    <p><strong>{title}</strong></p>
                    <img src={game_pic} />
                    <p>{genre}</p>
                </div>
                <div>Would you recommend the game?: {recommend ? 'Yes' : 'No'}</div>
                <p>{text}</p>
            </div>
        </div>
    )
}

export default Review;