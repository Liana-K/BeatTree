import './SearchBar.css'

import React, {useState} from "react";
import axios from "axios";

function SearchBar() {
    const [query, setQuery]  = useState("");
    const [tracks, setTracks] = useState([]);

    const handleSearch = async () => {
        if (!query) return;
        try {
            const res = await axios.get('http://localhost:3001/search' , {
                params: {q : query},
            });
            setTracks(res.data.tracks);
        } catch (err) {
            console.error("Search error:", err);
        }
    };
    
    return(
        <div className="search-center-container">
            <input className="search-prompt-text"
            type="text" 
            placeholder="Search a BPM, song, or artist" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={handleSearch}>
                Search
            </button>

            <ul>
                {tracks.map((track) => (
                  <li key = {track.id} >
                     <strong>{track.name}</strong> — {track.artists.map(a => a.name).join(", ")}
                  </li>  
                ))}
            </ul>
        </div>
    );
}




export default SearchBar;

