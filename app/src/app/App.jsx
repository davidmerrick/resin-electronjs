import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentTrack: null
        };
    }

    updateImageUrl(){
        let currentTrack = window.CURRENT_TRACK;
        if(currentTrack) {
            this.setState({
                currentTrack: currentTrack
            });
        };
    }

    componentDidMount(){
        // Todo: set this to be triggered by an event
        this.updateImageUrl();
        const UPDATE_INTERVAL_MS = 3000; // 3 seconds
        window.setInterval(() => this.updateImageUrl(), UPDATE_INTERVAL_MS);
    }

    render(){
        let {currentTrack} = this.state;

        if(currentTrack && currentTrack.artist && currentTrack.title){
            return(
                <div id="content-wrapper">
                    <div id="album-details">
                        <img src={currentTrack.absoluteAlbumArtUri} />
                        <br />
                        <div id="song-data">
                            <span className="song-title">{currentTrack.title}</span><br />
                            <span className="song-artist">{currentTrack.artist}</span><br />
                            <span className="song-album">{currentTrack.album}</span>
                        </div>
                    </div>
                </div>
            );
        } else {
            return(
                <div>
                    <h1>Loading...</h1>
                </div>
            );
        };
    }
}

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(<App />, document.getElementById('app'));
});

export default App
