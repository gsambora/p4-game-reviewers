import React, {useState} from "react";
import EditReviewForm from "./EditReviewForm";

function Review({username, pfp, title, recommend, text, game_pic, genre, home, id, handleEditReview, handleDeleteReview}){
    const [editMode, setEditMode] = useState(false);

    function handleDelete(){
        fetch(`reviews/${id}`, {method: "delete"});

        handleDeleteReview();
    }

    function handleEdit(){

    }

    return(
        <div className="review-container">
            <div className="review-box">
                <img className="review-pfp" src={pfp} />
                <h2>{username}</h2>
                
                <div className="game-box">
                    <p><strong>{title}</strong></p>
                    <img src={game_pic} />
                    <p>{genre}</p>
                </div>
                <div>Would you recommend the game?: {recommend ? 'Yes' : 'No'}</div>
                <p>{text}</p>
                {home ? <div><button onClick={()=>{console.log("Editing") 
                    setEditMode((!editMode))}} className="edit-submit">Edit Review</button> 
                <button onClick={handleDelete} className="edit-submit">Delete Review</button></div>: ""} 
            </div>
            {editMode ? <div>Editing</div>:<></>}
        </div>
    )
}

export default Review;