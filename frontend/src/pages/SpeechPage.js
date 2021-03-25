import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { ResultReason } from 'microsoft-cognitiveservices-speech-sdk';
import { getTokenOrRefresh } from '../token_util';
import Button from '@material-ui/core/Button';
import RadioGroup from '../components/RadioGroup'

const speechsdk = require('microsoft-cognitiveservices-speech-sdk')

const axios = require('axios');

function SpeechPage() {

    const [token, setToken] = useState('') 
    const [displayText, setDisplayText] = useState('...')
    const [text, setText] = useState('...')
    const classes = useStyles()

    useEffect(() => {

        console.log(token)

        if(token !== '')
            console.log('got token now. Activate sttFromMic')
    
        },[token])

    useEffect(() => {
        getTokenOrCookie()
    },[])

    const getTokenOrCookie = async () => {
        console.log("check for valid speech key/region")

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
                setText(result.text)
            } else {
                displayText = 'ERROR: Speech was cancelled or could not be recognized. Ensure your microphone is working properly.';
            }

            setDisplayText(displayText)
        });
    }

    const labels = [{value: 'bottle', label: 'Bottle (gm)'}, {value: 'receipt', label: 'Receipt ($)'}, {value: 'donation', label: 'Donation ($)'} ]

    
    return(

        <div className={classes.infoContainer}>
            <h3>Record sound</h3>
            <div className="row">
                <div className="col-4">
                    <div 
                    onClick={() => sttFromMic()}
                    style={{
                        padding: 5, 
                        borderRadius: 100, 
                        backgroundColor: '#383b4b', 
                        width: 60, 
                        height: 60,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                    }}>
                        <i className="fas fa-microphone fa-lg mr-2"></i>
                    </div>

                    <p>
                    Convert speech to text from your mic. <br/><br/> Try for example: <br/>
                    - <i>"2 bags with plastic bottles"</i> <br/>
                    - <i>"5 dollar donation"</i>
                    </p>

                    {/* <div className="mt-2">
                        <label htmlFor="audio-file"><i className="fas fa-file-audio fa-lg mr-2"></i></label>
                        <input 
                            type="file" 
                            id="audio-file" 
                            onChange={(e) => fileChange(e)} 
                            style={{display: "none"}} 
                        />
                        Convert speech to text from an audio file.
                    </div> */}
                </div>
                <div className="col-4 output-display rounded">
                    <code>{displayText}</code>
                </div>
            </div>
            <div className={classes.manageContainer}>
                {text && <p> Result: {text}</p> }
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => alert('DEMO: save speech')}
                    style={{lineHeight: '1.2'}}
                    >
                    Save text
                </Button>
                <div style={{margin: 10}}>
                    <RadioGroup value={'bottle'} labels={labels}/>
                </div>
            </div>
        </div>
    );
}

const useStyles = makeStyles({
    infoContainer: {
        padding: '25px'
    },
    infoText: {
        fontSize: 'small'
    },
    manageContainer: {
        backgroundColor: '#f5f5f5', // #002039',
        borderRadius: 15,
        padding: 30,
        margin: 10
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

//  const fileChange = async (event) => {
//     const audioFile = event.target.files[0];
//     console.log(audioFile);
//     const fileInfo = audioFile.name + ` size=${audioFile.size} bytes `;

//     setDisplayText(fileInfo)

//     const tokenObj = await getTokenOrRefresh();
//     const speechConfig = speechsdk.SpeechConfig.fromAuthorizationToken(tokenObj.authToken, tokenObj.region);
//     speechConfig.speechRecognitionLanguage = 'en-US';

//     const audioConfig = speechsdk.AudioConfig.fromWavFileInput(audioFile);
//     const recognizer = new speechsdk.SpeechRecognizer(speechConfig, audioConfig);

//     recognizer.recognizeOnceAsync(result => {
//         let displayText;
//         if (result.reason === ResultReason.RecognizedSpeech) {
//             displayText = `RECOGNIZED: Text=${result.text}`
//         } else {
//             displayText = 'ERROR: Speech was cancelled or could not be recognized. Ensure your microphone is working properly.';
//         }

//         setDisplayText(fileInfo + displayText)
//     });
// }