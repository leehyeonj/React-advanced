import React from "react";
import PostList from "../pages/PostList";
import { BrowserRouter, Route } from "react-router-dom";
import {Grid} from "../elements";


function App() {
  return (
    <React.Fragment>
      <Grid>
        <BrowserRouter>
         <Route path="/" exact component={PostList} />
        </BrowserRouter>
      </Grid>
    </React.Fragment>
  );
}

export default App;
