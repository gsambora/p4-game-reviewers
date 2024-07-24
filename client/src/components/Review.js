import React, {useState} from "react";
import EditRecommend from "./EditRecommend";
import EditReviewText from "./EditReviewText";

function Review({username, pfp, title, recommend, text, game_pic, genre, home, id, handleEditReview, handleDeleteReview}){
    const [editMode, setEditMode] = useState(false);
    const [recLetter, setRecommend] = useState(recommend);
    const [revText, setRevText] = useState(text);

    function handleDelete(){
        fetch(`reviews/${id}`, {method: "delete"});

        handleDeleteReview();
    }

    function handleChangeRec(){
        setRecommend(!recLetter);
    }

    function handleChangeText(newText){
        setRevText(newText)
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
                <div>
                    Would you recommend the game?: {editMode ? (
                        <EditRecommend id={id} changeMode={setEditMode} handleChangeRec={handleChangeRec} handleNewReview={handleEditReview} />
                    ):(
                        recLetter ? 'Yes' : 'No'
                    )}
                </div>
                <div>
                    {editMode?(
                        <EditReviewText id={id} changeMode={setEditMode} handleChangeText={handleChangeText} handleNewReview={handleEditReview} />
                    ):(
                        <p>{revText}</p>
                    )}
                </div>
                
                {home ? <div><button onClick={()=>{console.log("Editing") 
                    setEditMode((!editMode))}} className="edit-submit">{editMode ? "Finish Editing" : "Edit Review"}</button> 
                <button onClick={handleDelete} className="edit-submit">Delete Review</button></div>: ""} 
            </div>
            {editMode ? <div>Editing</div>:<></>}
        </div>
    )
}

export default Review;