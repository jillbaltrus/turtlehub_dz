import {profileThunk} from "../services/user-thunks";
import {useEffect} from "react";
import {useDispatch} from "react-redux";

function CurrentUserContext({children}) {
  const dispatch = useDispatch();
  const getProfile = async () => {
    await dispatch(profileThunk());
  };
  useEffect(() => {
    try {
      getProfile();
    } catch (e) {
      // no current user. do nothing
    }
  }, []);

  return children;
}

export default CurrentUserContext;