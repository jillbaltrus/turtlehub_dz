import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Home";
import Events from "./Events";
import Members from "./Members";
import NewEvent from "./NewEvent";
import Profile from "./Profile";
import Search from "./Search";

function App() {
  return (
      <div className="container ms-5 mt-3">
        <div className="row ms-2 header-text">
            Turtle Hub
        </div>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home/>}/>
            <Route path="/events" element={<Events/>}/>
            <Route path="/members" element={<Members/>}/>
            <Route path="/newEvent" element={<NewEvent/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/search" element={<Search/>}/>
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
