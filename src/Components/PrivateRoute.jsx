import { useSignIn } from "../utils/userSignedIn.jsx";
import { Navigate, Outlet } from "react-router-dom";

// Private Route for Security Purpose
function PrivateRoute() {
    const { signIn } = useSignIn();
    return signIn ? <Outlet/> : <Navigate to='/login'/>;
}

export default PrivateRoute;