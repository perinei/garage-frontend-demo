// import React from 'react';
import { Auth } from 'aws-amplify';
import { AmplifySignOut, AmplifyAuthenticator, SignOut } from '@aws-amplify/ui-react';
import '../App.css';

function Header() {

    return (
        <div>
            Casa Beleza Garage Manager
            <AmplifySignOut buttonText="Sign out"></AmplifySignOut>
            <hr></hr>
        </div >
    );
}
export default Header