import React from 'react';
// import { Auth } from 'aws-amplify';
import { AmplifySignOut, AmplifyAuthenticator, SignOut } from '@aws-amplify/ui-react';
import '../App.css';
// import { Button } from "@material-ui/core";

// async function signOut() {
//     await Auth.signOut()
//     window.location.replace('/');
// }

function Header() {

    return (
        <div>
            <div><h3>Casa Beleza Garage Manager</h3></div>
            <div id='parent' style={{ textAlign: 'left', display: 'flex', justifyContent: 'space-between' }}>
                <div></div>                
                <div><AmplifySignOut buttonText="Sign out"></AmplifySignOut></div>
                <div></div>
            </div>
            
            {/* <div><Button onClick={signOut} style={{ color: '#FF5F58' }} variant='outlined'>Sign out</Button>&emsp;</div> */}
            <hr></hr>
        </div >
    );
}
export default Header