import React from "react";
import PostList from "../pages/PostList";
import { BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Route path="/" exact component={PostList} />
    </div>
  );
}

export default App;
