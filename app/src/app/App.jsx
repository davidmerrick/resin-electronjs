import React from "react";
import ReactDOM from "react-dom";
//var remote = require('electron').remote

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount(){
    //console.log(`Sonos server: ${remote.getGlobal('Constants').SONOS_API_SERVER}`);
  }

  render(){
    return(
      <div>
          <h1>Happy birthday Julie!</h1>
          <div>
            &nbsp; &nbsp; \</div>
          <div>
            &nbsp; &nbsp; &nbsp;\</div>
          <div>
            &nbsp; &nbsp; &nbsp; \\</div>
          <div>
            &nbsp; &nbsp; &nbsp; &nbsp;\\</div>
          <div>
            &nbsp; &nbsp; &nbsp; &nbsp; &gt;\/7</div>
          <div>
            &nbsp; &nbsp; _.-(6&#39; &nbsp;\</div>
          <div>
            &nbsp; &nbsp;(=___._/` \</div>
          <div>
            &nbsp; &nbsp; &nbsp; &nbsp; ) &nbsp;\ |</div>
          <div>
            &nbsp; &nbsp; &nbsp; &nbsp;/ &nbsp; / |</div>
          <div>
            &nbsp; &nbsp; &nbsp; / &nbsp; &nbsp;&gt; /</div>
          <div>
            &nbsp; &nbsp; &nbsp;j &nbsp; &nbsp;&lt; _\</div>
          <div>
            &nbsp;_.-&#39; : &nbsp; &nbsp; &nbsp;``.</div>
          <div>
            &nbsp;\ r=._\ &nbsp; &nbsp; &nbsp; &nbsp;`.</div>
          <div>
            &lt;`\\_ &nbsp;\ &nbsp; &nbsp; &nbsp; &nbsp; .`-.</div>
          <div>
            &nbsp;\ r-7 &nbsp;`-. ._ &nbsp;&#39; . &nbsp;`\</div>
          <div>
            &nbsp; \`, &nbsp; &nbsp; &nbsp;`-.`7 &nbsp;7) &nbsp; )</div>
          <div>
            &nbsp; &nbsp;\/ &nbsp; &nbsp; &nbsp; &nbsp; \| &nbsp;\&#39; &nbsp;/ `-._</div>
          <div>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; || &nbsp; &nbsp;.&#39;</div>
          <div>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ,.-&#39; &gt;.&#39;</div>
          <div>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;.&#39;_.&#39;&#39;</div>
          <div>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;&#39;</div>
      </div>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<App />, document.getElementById('app'));
});

export default App
