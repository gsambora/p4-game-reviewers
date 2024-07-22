import { useEffect, useState } from "react";
import Review from "../components/Review";

function AllReviews(){
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch("/reviews")
          .then((r) => r.json())
          .then((reviewData) => {
            //fetch user information for each review
            const userInfo = Object.values(reviewData).map((review) =>
                fetch(`/users/${review.user_id}`)
                .then((r) => r.json())
            );
            
            //fetch game information for each review
            const gameInfo = Object.values(reviewData).map((review) =>
                fetch(`/games/${review.game_id}`)
                .then((r) => r.json())
            );
            
            //once both user and game information has been fetched, add this to each review in the array
            Promise.all([...userInfo, ...gameInfo]).then((data) => {
              const users = data.slice(0, reviewData.length);
              const games = data.slice(reviewData.length);
      
              const updatedReviews = Object.values(reviewData).map((review, index) => (
                {...review, user: users[index], game: games[index],}
                ));
      
              setReviews(updatedReviews);
            });
          });
      }, []);

    
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