import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Home";
import Events from "./Events";
import Members from "./Members";
import NewEvent from "./NewEvent";
import MyProfile from "./MyProfile";
import Search from "./Search";
import Login from "./Login";
import {Provider} from "react-redux";
import store from "./reducers/store";
import CurrentUserContext from "./reducers/current-user-context";
import Register from "./Register";
import EventDetailsPage from "./EventDetails";
import {HStack, Text} from "@chakra-ui/react";

function App() {
  return (
      <Provider store={store}>
        <CurrentUserContext>
          <div className="container ms-5 mt-3">
            <HStack>
              <Text
                  bgGradient='linear(to-l, #A9D09E, #75BDE0)'
                  bgClip='text'
                  fontSize='6xl'
                  fontWeight='extrabold'>
                Turtle Hub
              </Text>
              <img className="ms-2 mb-3 turtle-img" width={40}
                   src={require(`./icons/turtle.png`)}/>
            </HStack>
            <BrowserRouter>
              <Routes>
                <Route index element={<Home/>}/>
                <Route path="/events" element={<Events/>}/>
                <Route path="/members" element={<Members/>}/>
                <Route path="/newEvent" element={<NewEvent/>}/>
                <Route path="/profile" element={<MyProfile/>}/>
                <Route path="/profile/:user" element={<MyProfile/>}/>
                <Route path="/search" element={<Search/>}/>
                <Route path="/search/:search" element={<Search/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/details/:eid" element={<EventDetailsPage/>}/>
              </Routes>
            </BrowserRouter>
          </div>
        </CurrentUserContext>
      </Provider>
  );
}

export default App;
