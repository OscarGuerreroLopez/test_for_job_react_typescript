import React, { Component } from "react";
import RouterMain from "./router";

class App extends Component<{}, {}> {
  render() {
    return (
      <div className="container-fluid">
        <RouterMain />
      </div>
    );
  }
}

export default App;
