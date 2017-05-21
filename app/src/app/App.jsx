import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios'

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentTrack: null
        };
    }

    updateImageUrl(){
        console.log("Updating image url...");

        let {AUTH_USERNAME, AUTH_PASSWORD, SONOS_API_SERVER} = window;

        if(!AUTH_USERNAME || !AUTH_PASSWORD || !SONOS_API_SERVER){
            console.log("Sonos API server variables not set. Bailing for now.");
            return;
        }

        let auth = {
            username: AUTH_USERNAME,
            password: AUTH_PASSWORD
        };

        let options = {
            auth: auth
        };

        axios.get(`${SONOS_API_SERVER}/state`, options)
            .then(result => {
                let data = result.data;
                let currentTrack = data.currentTrack;

                // Sometimes API returns empty data. Don't set it in that case.
                if(currentTrack.artist != "" && currentTrack.title !="") {
                    this.setState({
                        currentTrack: currentTrack
                    });
                };
            })
            .catch(err => {
                console.error(err);
            });
    }

    componentDidMount(){
        this.updateImageUrl();
        const UPDATE_INTERVAL_MS = 10000; // 10 seconds
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
                            <span>{currentTrack.artist}: {currentTrack.title}</span>
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
