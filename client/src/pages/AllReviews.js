import { useEffect, useState } from "react";
import Review from "../components/Review";

function AllReviews(){
    const [reviews, setReviews] = useState([]);

    useEffect(()=>{
        fetch("/reviews")
        .then((r) => r.json())
        .then((reviewData) => {
            console.log("Before set: ", reviews)
            console.log(typeof(reviewData))
            setReviews(Object.values(reviewData))
        })
    }, []);

    console.log("After set: ", reviews, typeof(reviews))
    return(
        <>
        <h1>All Reviews:</h1>
        {reviews.length === 0 ? (<p>No reviews available.</p>) :(
             reviews.map((review) => {
                console.log(review)
                console.log(review.user_id)
            return <Review username={review.user.username} pfp={review.user.pfp_image_url} title={review.game.title} recommend={review.recommend} text={review.rev_text}/>})
        )}
        </>
    )
}

export default AllReviews;