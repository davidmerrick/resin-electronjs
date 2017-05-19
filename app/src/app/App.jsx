import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render(){
    return(
      <div>
          <h1>Hello, world, from React!</h1>
      </div>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<App />, document.getElementById('app'));
});

export default App
