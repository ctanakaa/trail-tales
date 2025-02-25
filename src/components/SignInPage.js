import React from "react";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { getAuth, EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth'

export function SignInScreen(){
  const firebaseUIConfig = {
    signInOptions: [ //array of sign in options supported
      //array can include just "Provider IDs", or objects with the IDs and options
      GoogleAuthProvider.PROVIDER_ID,
      { provider: EmailAuthProvider.PROVIDER_ID, requiredDisplayName: true },
    ],
    signInFlow: 'popup', //don't redirect to authenticate
    credentialHelper: 'none', //don't show the email account chooser
    callbacks: { //"lifecycle" callbacks
      signInSuccessWithAuthResult: () => {
        window.location.href = '/app'; // Change to your desired URL
      }
    }
  }
  const auth = getAuth(); //access the "authenticator"
  return (
      <div className="card-bg-light">
        <div className="container card-body">
          <p className="lead d-inline-flex justify-content-center">
            Login
            <StyledFirebaseAuth uiConfig={firebaseUIConfig} firebaseAuth={auth} />
          </p>
        </div>
      </div>
  );
}
export default SignInScreen;