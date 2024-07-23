import { useEffect, useState } from "react";
import Review from "../components/Review";

function Home({userInfo}){
    let accountInfo = <></>
    if (userInfo){
        accountInfo = <><p>Your account information:</p>
        <img src={userInfo.pfp_image_url}/>
        <p><strong>Bio: </strong>{userInfo.bio}</p></>
    }
    

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch("/reviews")
          .then((r) => r.json())
          .then((reviewData) => {
            const latestReviews = reviewData.slice(-5,reviewData.length)
            console.log(latestReviews)

            //fetch user information for each review
            const userInfo = Object.values(latestReviews).map((review) =>
                fetch(`/users/${review.user_id}`)
                .then((r) => r.json())
            );
            
            //fetch game information for each review
            const gameInfo = Object.values(latestReviews).map((review) =>
                fetch(`/games/${review.game_id}`)
                .then((r) => r.json())
            );
            
            //once both user and game information has been fetched, add this to each review in the array
            Promise.all([...userInfo, ...gameInfo]).then((data) => {
              const users = data.slice(0, latestReviews.length);
              const games = data.slice(latestReviews.length);
      
              const updatedReviews = Object.values(latestReviews).map((review, index) => (
                {...review, user: users[index], game: games[index],}
                ));
      
              setReviews(updatedReviews);
            });
          });
      }, []);

    return(
        <div>
            <h2 style={{paddingTop: "20px"}}>Home</h2>
            <h3>{userInfo ? `Welcome, ${userInfo.username}!` : "Please log in!"}</h3>
            <div className="acct-info">{accountInfo}</div>

            <h3>Latest Reviews:</h3>
            {reviews.length === 0 ? (<p>Loading...</p>) :(
             reviews.map((review) => {
                //console.log(review)
                return <Review key={review.id} username={review.user.username} pfp={review.user.pfp_image_url} title={review.game.title} recommend={review.recommend} text={review.rev_text}/>})
            )}
        </div>
    )
}

export default Home;