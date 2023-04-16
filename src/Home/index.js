import NavBar from "../NavBar";
import {useSelector} from "react-redux";

function Home() {
  const {currentUser} = useSelector((state) => state.user);
  return (
      <div className="row">
        <NavBar active="home"/>
        <div className="col-8">
          {currentUser &&
              <h1>
            Hi, {currentUser.firstName}!
          </h1>}
          {!currentUser &&
              <h1>
                Welcome!
              </h1>}
          {currentUser && <h2>
            Your upcoming events:
          </h2>}
          <h2>
            All upcoming events:
          </h2>
        </div>
      </div>
  );
}
export default Home;