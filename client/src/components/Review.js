import React from "react";

function Review({username, pfp, title, recommend, text}){

    return(
        <div class="review-box">
            <img src={pfp} width={20}/>
            <h3>{username}</h3>
            <button>{title}</button>
            <div>Would you recommend the game?: {recommend ? 'Yes' : 'No'}</div>
            <p>{text}</p>
        </div>
    )
}

export default Review;