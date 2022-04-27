import { useEffect, useState } from "react";
import "./App.css";

function App() {
    const [film, setFilm] = useState<string>("");

    useEffect(() => {
        async function getFirstFilm() {
            const response = await fetch(
                `https://ghibliapi.herokuapp.com/films`
            );
            let result = await response.json();
            setFilm(result[0].title);
        }
        getFirstFilm();
    }, []);
    return (
        <div className="App">
            <header className="App-header">Studio Ghibli API</header>
            <p>{film}</p>
        </div>
    );
}

export default App;
