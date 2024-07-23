import { useEffect, useState } from "react";
import Game from "../components/Game";

function AllGames(){
    const [games, setGames] = useState([]);

    useEffect(() => {
      //console.log("Fetching reviews again")
        fetch("/games")
          .then((r) => r.json())
          .then((gameData) => {
            setGames(gameData)
          });
      }, []);

    
    return(
        <div className="all-game-container">
        <h2 style={{paddingTop: "20px"}}>All Games:</h2>
        {games.length === 0 ? (<p>Loading...</p>) :(
            games.map((game) => {
                return <Game key={game.id} title={game.title} cover_art_url={game.cover_art_url} genre={game.genre}/>})
        )}
        </div>
    )
}

export default AllGames;