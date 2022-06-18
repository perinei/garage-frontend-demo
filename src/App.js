import './App.css';
import Amplify from 'aws-amplify'
import React from 'react';
import { AmplifySignIn, AmplifyAuthenticator } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import Header from './pages/Header.jsx'
import Main from './pages/Main.jsx'

Amplify.configure({
  Auth: {
    identityPoolId: process.env.REACT_APP_identityPoolId
  },
  aws_cognito_region: process.env.REACT_APP_cognito_region,
  aws_user_pools_id: process.env.REACT_APP_user_pools_id,
  aws_user_pools_web_client_id: process.env.REACT_APP_user_pools_web_client_id,
});

const AuthStateApp = () => {
  const [authState, setAuthState] = React.useState();
  const [user, setUser] = React.useState();
  const [appVersion, setAppVersion] = React.useState("v2.0.4");

  // setuserpool(process.env.REACT_APP_identityPoolId)

  React.useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData)
    });
  }, []);

  return authState === AuthState.SignedIn && user ? (
    <div className="App">
      <Header/>
      <Main/>
    </div>
  ) :
  (
    // <div>
    //   <div>
    //     app version {appVersion}
    //   </div>
    <AmplifyAuthenticator>
      <AmplifySignIn
        headerText="Casa Beleza Garage Manager"
        usernameAlias="email"
        hideSignUp="true"
        slot="sign-in"
      />
    </AmplifyAuthenticator>
    // </div>
  );
}

export default AuthStateApp;
