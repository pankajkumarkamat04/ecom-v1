import { useSelector } from "react-redux";
import Profile from "../../../../pages/user/Profile";

const MyProfile = () => {
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  return (
    <Profile>
      <div className="row">
      <div className="col-md-6">
        <img src="" alt="" />
      </div>
      <div className="col-md-6"><div>
        <div className="row mt-4 flex-column">
          <div className="col-md-4">
            <h5>Name</h5>
            <p>
              <b>{user?.name}</b>
            </p>
          </div>
          <div className="col-md-4">
            <h5>Email</h5>
            <p>
              <b>{user?.email}</b>
            </p>
          </div>
          <div className="col-md-4">
            <h5>Mobile No</h5>
            <p>
              <b>{user?.phone_no}</b>
            </p>
          </div>
        </div>
      </div></div>
      </div>
    </Profile>
  );
};

export default MyProfile;
