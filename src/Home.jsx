//Home Page
import './Home.css'

function Home() {
    return(
        <>
            <header className="header">
                <nav className="navbar">
                    {/* <a href="#profile">My Profile</a> */}
                    <a href="#home" className="logo"><span>BeatTree</span></a>
                    {/* <a href="#songlogs">Song Logs</a> */}
                </nav>
            </header>

            {/* <div className="search-center-container">
                <p  className="search-prompt-text">Looking for a beat?</p>
                <input type="text" placeholder='Search a BPM, song, or artist...' className="searchbar"/>
            </div> */}
            
        </>
    );
}

export default Home