import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { ResultReason } from 'microsoft-cognitiveservices-speech-sdk';
import { getTokenOrRefresh } from '../token_util';

const speechsdk = require('microsoft-cognitiveservices-speech-sdk')

const axios = require('axios');

function SpeechPage() {

    const [token, setToken] = useState('') 
    const [displayText, setDisplayText] = useState('')
    const classes = useStyles()

    useEffect(() => {

        console.log(token)

        if(token !== '')
            console.log('got token now. Activate sttFromMic')
    
        },[token])

    useEffect(() => {
        // getToken()
        getTokenOrCookie()
    },[])

    const getTokenOrCookie = async () => {
        console.log("check for valid speech key/region")

        //this.inlineSttFromMic()

        const tokenRes = await getTokenOrRefresh();
        console.log(tokenRes)
    }

    


    const sttFromMic = async () => {
        const tokenObj = await getTokenOrRefresh();
        const speechConfig = speechsdk.SpeechConfig.fromAuthorizationToken(tokenObj.authToken, tokenObj.region);
        speechConfig.speechRecognitionLanguage = 'en-US';
        
        const audioConfig = speechsdk.AudioConfig.fromDefaultMicrophoneInput();
        const recognizer = new speechsdk.SpeechRecognizer(speechConfig, audioConfig);

        setDisplayText('speak into your microphone...')

        recognizer.recognizeOnceAsync(result => {
            let displayText;
            if (result.reason === ResultReason.RecognizedSpeech) {
                displayText = `RECOGNIZED: Text=${result.text}`
            } else {
                displayText = 'ERROR: Speech was cancelled or could not be recognized. Ensure your microphone is working properly.';
            }

            setDisplayText(displayText)

        });
    }

     const fileChange = async (event) => {
        const audioFile = event.target.files[0];
        console.log(audioFile);
        const fileInfo = audioFile.name + ` size=${audioFile.size} bytes `;

        setDisplayText(fileInfo)

        const tokenObj = await getTokenOrRefresh();
        const speechConfig = speechsdk.SpeechConfig.fromAuthorizationToken(tokenObj.authToken, tokenObj.region);
        speechConfig.speechRecognitionLanguage = 'en-US';

        const audioConfig = speechsdk.AudioConfig.fromWavFileInput(audioFile);
        const recognizer = new speechsdk.SpeechRecognizer(speechConfig, audioConfig);

        recognizer.recognizeOnceAsync(result => {
            let displayText;
            if (result.reason === ResultReason.RecognizedSpeech) {
                displayText = `RECOGNIZED: Text=${result.text}`
            } else {
                displayText = 'ERROR: Speech was cancelled or could not be recognized. Ensure your microphone is working properly.';
            }

            setDisplayText(fileInfo + displayText)
        });
    }

    return(

        <div className={classes.infoContainer}>
            <h3>Record sound</h3>
            <div className="row main-container">
                    <div className="col-6">
                        <i className="fas fa-microphone fa-lg mr-2" onClick={() => sttFromMic()}></i>
                        Convert speech to text from your mic.

                        <div className="mt-2">
                            <label htmlFor="audio-file"><i className="fas fa-file-audio fa-lg mr-2"></i></label>
                            <input 
                                type="file" 
                                id="audio-file" 
                                onChange={(e) => fileChange(e)} 
                                style={{display: "none"}} 
                            />
                            Convert speech to text from an audio file.
                        </div>
                    </div>
                    <div className="col-6 output-display rounded">
                        <code>{displayText}</code>
                    </div>
                </div>
        </div>
    );
}

const useStyles = makeStyles({
    infoContainer: {
        padding: '15px'
    },
    infoText: {
        fontSize: 'small'
    }
});

export default SpeechPage


// const getToken = async () => {

//     const speechKey = 'd262551f0439400693076915358f17a5' // process.env.SPEECH_KEY || 
//     const speechRegion = 'northeurope' // process.env.SPEECH_REGION  || 

//     const headers = { 
//         headers: {
//             'Ocp-Apim-Subscription-Key': speechKey,
//             'Content-Type': 'application/x-www-form-urlencoded'
//         }
//     };

//     try {
//         const tokenResponse = await axios.post(`https://${speechRegion}.api.cognitive.microsoft.com/sts/v1.0/issueToken`, null, headers);
//         // console.log(tokenResponse.data)
//         setToken(tokenResponse.data)
//         // res.send({ token: tokenResponse.data, region: speechRegion });
//     } catch (err) {
//         console.log('There was an error authorizing your speech key.')
//     }
// }