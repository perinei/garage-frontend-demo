import React from 'react';
import { Auth } from 'aws-amplify';
import { AmplifySignOut, AmplifyAuthenticator, SignOut } from '@aws-amplify/ui-react';
import '../App.css';
import { Button } from "@material-ui/core";



function Header() {

    return (
        <div>
            Casa Beleza Garage Manager
            <div><Button onClick={signOut} style={{ color: '#FF5F58' }} variant='outlined'>Sign out</Button>&emsp;</div>
            <AmplifySignOut buttonText="Sign out"></AmplifySignOut>
            <hr></hr>
        </div >
    );
}
export default Header