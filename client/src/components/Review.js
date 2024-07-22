import React from "react";

function Review({username, pfp, title, recommend, text}){

    return(
        <div className="review-box">
            <img src={pfp}/>
            <h2>{username} </h2>
            <button>{title}</button>
            <div>Would you recommend the game?: {recommend ? 'Yes' : 'No'}</div>
            <p>{text}</p>
        </div>
    )
}

export default Review;