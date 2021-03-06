// import React from 'react';
import { Auth } from 'aws-amplify';
import React, { useState, useEffect } from 'react';
import '../App.css';
import AWS from 'aws-sdk'
import Amplify, { PubSub } from 'aws-amplify';
import { AWSIoTProvider } from '@aws-amplify/pubsub';
import { Button } from '@mui/material';
import { Helmet } from "react-helmet";
// working

function ColorGreen({children}) {
    return <span style={{color: 'green'}}>{children}</span>;
  }

  function ColorRed({children}) {
    return <span style={{color: 'red'}}>{children}</span>;
  }


function Main() {

    const [garageDoorPosition, setGarageDoorPosition] = useState("unknow")

    React.useEffect(() => {

        async function ini() {

            await Auth.currentCredentials().then((info) => {
                // console.log(info)

                const currentUserCognitoIdentityId = info.identityId;

                // console.log(currentUserCognitoIdentityId)

                const config = {

                    accessKeyId: info.accessKeyId,
                    secretAccessKey: info.secretAccessKey,
                    sessionToken: info.sessionToken,
                    region: process.env.REACT_APP_cognito_region

                }

                var params = {
                    policyName: 'Garage', /* required */
                    target: currentUserCognitoIdentityId /* required */
                };

                var iot = new AWS.Iot(config);

                iot.attachPolicy(params, function (err, data) {
                    if (err) console.log(err, err.stack); // an error occurred
                    else console.log(data);           // successful response
                });

                Amplify.addPluggable(new AWSIoTProvider({
                    aws_pubsub_region: process.env.REACT_APP_cognito_region,
                    aws_pubsub_endpoint: 'wss://' + process.env.REACT_APP_IoTendpoint + '/mqtt',
                }));

                PubSub.subscribe('$aws/things/garage_pi/shadow/update/documents').subscribe({
                    next: data => messagereceivedSwithChanged(data),
                    error: error => console.error(error),
                    close: () => console.log('Done'),
                });

                console.log("subscribed")
                PubSub.subscribe('$aws/things/garage_pi/shadow/get/accepted').subscribe({
                    next: data => messagereceivedGetStatus(data),
                    error: error => console.error(error),
                    close: () => console.log('Done'),
                });

                const timer = setTimeout(() => getSwithStatus(), 1000);
                return () => clearTimeout(timer);
            });
        }
        ini()

    },
        [])

    async function getSwithStatus() {
        await PubSub.publish('$aws/things/garage_pi/shadow/get', '{}');
        // console.log(process.env.REACT_APP_user_pools_id)
    }


    function messagereceivedGetStatus(data) {
        setGarageDoorPosition(data["value"]["state"]["reported"]["switch"])

    }

    function messagereceivedSwithChanged(data) {
        setGarageDoorPosition(data["value"]["current"]["state"]["reported"]["switch"])

    }

    function publish() {
        PubSub.publish('garage/button', { msg: 'pressed' });

    }



    return (
        <div>
            <div>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Garage</title>
                    {/* <link rel="canonical" href="http://mysite.com/example" /> */}
                </Helmet>
            </div>
            <div>&nbsp;</div>
            <div><h2>Garage door is</h2></div>
     
            <div>
                <h1>
                    {garageDoorPosition=='Closed' ? 
                    <ColorGreen>{garageDoorPosition}</ColorGreen> : 
                    <ColorRed>{garageDoorPosition}</ColorRed>}
                </h1>
            </div>

            {/* <Button variant="outlined" onClick={getSwithStatus} size="small">Get Garage Status</Button> */}

    
            <div>&nbsp;</div>

            <Button variant="contained" onClick={publish} size="large">Garage Door Push Button</Button>

        </div >
    );
}
export default Main