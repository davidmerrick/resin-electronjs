import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios'

// Todo: figure out how to inject environment variables for this conf instead.
// That way, users can configure this at the Resin.io dashboard level.
import Conf from '../conf/Conf'

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            imgUrl: null
        };
    }

    updateImageUrl(){
        console.log("Updating image url...");

        let auth = {
            username: Conf.AUTH_USERNAME,
            password: Conf.AUTH_PASSWORD
        };

        let options = {
            auth: auth
        };

        axios.get(`${Conf.SONOS_API_SERVER}/state`, options)
            .then(result => {
                let data = result.data;
                let imgUrl = data.currentTrack.absoluteAlbumArtUri;
                this.setState({
                    imgUrl: imgUrl
                });
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
    if(this.state.imgUrl){
        return(
            <div>
                <img src={this.state.imgUrl} />
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
