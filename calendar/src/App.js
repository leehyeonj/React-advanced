import React from "react";
import './RCA.css';
import { Header, Calendar } from './components';


function App() {
  return (
      <div className = "test-layout">
        <div className="RCA-app-container">
          <Header/>
          <Calendar/>
        </div>
      </div>
  );
}

export default App;
