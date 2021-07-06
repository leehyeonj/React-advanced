import React from "react";
import {BrowserRouter, Route} from "react-router-dom";
import { Login, PostList, Signup } from "../pages";

import Header from "../components/Header";
import {Grid} from "../elements";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Route path="/" exact component={PostList}/>
      </BrowserRouter>
      <Grid>
        <Header></Header>
        <BrowserRouter>
          <Route path="/" exact component={PostList} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup}/>
        </BrowserRouter>
      </Grid>
    </React.Fragment>
  );
}

export default App;
