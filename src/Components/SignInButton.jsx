// this will be the child component.
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSignIn } from "../utils/userSignedIn.jsx";
import FloatingTab from "./FloatingTab.jsx";

function SignInButton(props) {

    const { signIn } = useSignIn();
    const [tab, setTab] = useState(false);      // use State for Floating Tab Button.

    
    return (
        <>
            <div className="hidden md:flex items-center">
                {signIn ? (
                    // If User is Signed In
                    <>
                        {/* Floating Tab */}
                        <FloatingTab visibility={tab} setTab={setTab} />
                        <button type="button" onClick={() => setTab(prev => !prev)} className="flex gap-2 items-center border border-slate-400 inset-shadow-xs rounded-full hover:cursor-pointer hover:bg-blue-100">
                            <img className="w-12 h-12 rounded-full" src="/images/Profile.png" alt="profile-icon" />
                        </button>
                    </>
                    // If User is Not Signed In
                ) : (
                    <Link to='/login' className="flex gap-2 items-center border border-slate-400 inset-shadow-xs rounded-full px-3 py-1.5 hover:cursor-pointer hover:bg-blue-100">
                        <div className="w-5">
                            <img className="max-w-full max-h-full object-contain" src="/images/Profile.png" alt="profile-icon" />
                        </div>
                        <p className="text-blue-600 text-sm font-semibold text-nowrap">Sign in</p>
                    </Link>
                )}
            </div>           
       
        </>
    );
}

export default SignInButton;