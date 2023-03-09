import NavBar from "../NavBar";

function Home() {
  return (
      <div className="row">
        <NavBar active="home"/>
        <div className="col-8">
          <h1>
            Hi, Name!
          </h1>
          <h2>
            Your upcoming events:
          </h2>
          <h2>
            All upcoming events:
          </h2>
        </div>
      </div>
  );
}
export default Home;