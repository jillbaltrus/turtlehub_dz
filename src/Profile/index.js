import NavBar from "../NavBar";

function Profile() {
  return (
      <div className="row">
        <NavBar active="profile"/>
        <div className="col-8">
          Profile
        </div>
      </div>
  );
}
export default Profile;