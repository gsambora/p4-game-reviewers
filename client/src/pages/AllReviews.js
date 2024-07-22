import { useEffect, useState } from "react";
import Review from "../components/Review";

function AllReviews(){
    const [reviews, setReviews] = useState([]);

    useEffect(()=>{
        fetch("/reviews")
        .then((r) => r.json())
        .then((reviewData) => {
            userInfo = Object.values(reviewData).map((review)=>{
                fetch("/users/${review.user_id")
                .then((r) => r.json())
            })
            gameInfo = Object.values(reviewData).map((review)=>{
                fetch("/games/${review.game_id")
                .then((r)=> r.json())
            })

            const updatedReviews = Object.values(reviewData).map((review, index)=>(
                {...review, user: userInfo[index], game:gameInfo[index]}
            ))
            
            setReviews(updatedReviews)
        })
    }, []);

    console.log("After set: ", reviews, typeof(reviews))
    return(
        <>
        <h1>All Reviews:</h1>
        {reviews.length === 0 ? (<p>No reviews available.</p>) :(
             reviews.map((review) => {
                console.log(review)
                return <Review username={review.user.username} pfp={review.user.pfp_image_url} title={review.title} recommend={review.recommend} text={review.rev_text}/>})
        )}
        </>
    )
}

export default AllReviews;