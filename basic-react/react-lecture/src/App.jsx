import "./App.css";
import React from "react";

import Header from "./components/header/header.jsx";
import Hero from "./components/heros/hero.jsx";
import Newcollection from "./components/new-collection/new-collection-header/new-collection.jsx"

function App() {
  return (
    <>
      <div>
        <Header />
        <Hero />
        <Newcollection/>
      </div>
    </>
  );
}

export default App;
