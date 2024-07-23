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
        <h2 style={{paddingTop: "20px"}}>All Reviews:</h2>
        {reviews.length === 0 ? (<p>Loading...</p>) :(
             reviews.map((review) => {
                //console.log(review)
                return <Review key={review.id} username={review.user.username} pfp={review.user.pfp_image_url} 
                title={review.game.title} game_pic={review.game.cover_art_url} genre={review.game.genre}
                recommend={review.recommend} text={review.rev_text}/>})
        )}
        </>
    )
}

export default AllReviews;