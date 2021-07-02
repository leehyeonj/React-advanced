import React from 'react';
import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import PostList from '../pages/PostList';
import Login from '../pages/Login';
import Header from '../components/Header';
import {Grid} from "../elements";

function App() {
  return (
    <React.Fragment>
    <Grid>
    <Header></Header>
      <BrowserRouter>
        <Route path="/" exact component={PostList}/>
        <Route path="/login" exact component={Login}/>
      </BrowserRouter>
    </Grid>
    </React.Fragment>
  );
}

export default App;
