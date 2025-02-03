
 import React from "react";
 import {Routes, Route} from "react-router-dom";
 import { Link, BrowserRouter, HashRouter } from 'react-router-dom';
 
 import Home from "./pages/Home";
 import About from "./pages/About";
 import Counter from "./pages/Counter";
 import Input from "./pages/Input";
 import Input2 from "./pages/Input2";
 import List from "./pages/List";
 import List1 from "./pages/List1";
 import ItemList from "./pages/ItemList";
 import ItemList2 from "./pages/ItemList2";
 

 import './App.css';

function App() {
  return (
    <HashRouter>
      <div className="App">
        <nav>
          <Link to="/">Home </Link>  | {" "}
          <Link to="/about">About</Link> |{" "}
          <Link to="/counter">Counter</Link> |{" "}
          <Link to="/input">Input</Link> |{" "}
          <Link to="/input2">Input2</Link> |{" "}
          <Link to="/list">List</Link>  |{" "}
          <Link to="/list1">List1</Link>|{" "}
          <Link to="/itemList">ItemList</Link>|{" "}
          <Link to="/itemList2">ItemList2</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />}> </Route>
          <Route path="/about" element={<About />}> </Route>
          <Route path="/counter" element={<Counter />}> </Route>
          <Route path="/input" element={<Input />}> </Route>
          <Route path="/input2" element={<Input2 />}> </Route>
          <Route path="/list" element={<List />}> </Route>
          <Route path="/list1" element={<List1 />}> </Route>
          <Route path="/itemList" element={<ItemList />}> </Route>
          <Route path="/itemList2" element={<ItemList2 />}> </Route>
        </Routes>
      </div>
    </HashRouter>
  );
};

export default App;