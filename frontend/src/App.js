import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { getTokenOrRefresh } from './token_util';
import './custom.css'
import { ResultReason } from 'microsoft-cognitiveservices-speech-sdk';
import EventImages from './EventImages'

const speechsdk = require('microsoft-cognitiveservices-speech-sdk')


export default class App extends Component {
    constructor(props) {
        super(props);

        console.log(process.env)

        this.state = {
            displayText: 'INITIALIZED: ready to test speech...'
        }
    }
    
    async componentDidMount() {
        // check for valid speech key/region
        console.log("check for valid speech key/region")

        //this.inlineSttFromMic()

        const tokenRes = await getTokenOrRefresh();
        if (tokenRes.authToken === null) {
            this.setState({
                displayText: 'FATAL_ERROR: ' + tokenRes.error
            });
        }
    }

    // async inlineSttFromMic() {

    //     let responseData
    //     const speechRegion = 'northeurope'
    //     const url = `https://${speechRegion}.api.cognitive.microsoft.com/sts/v1.0/issueToken`

    //     try {
    //         const response = await fetch(url, {
    //           method: 'POST',
      
    //           // Let the browser set the Content-Type with correct boundary
    //           headers: {
    //             //Authorization: `Bearer ${accessToken}`
    //             OcpApimSubscriptionKey: 'd262551f0439400693076915358f17a5',
    //             ContentType: 'application/x-www-form-urlencoded',
    //           },
    //           body: {}

    //         })
      
    //         responseData = await response.json()
    //         console.log(responseData)
    //       } catch (e) {
    //         console.error(e)
    //     }

    //     // get('/api/get-speech-token');
    //     // const token = res.data.token;
    // }

    async sttFromMic() {
        const tokenObj = await getTokenOrRefresh();
        const speechConfig = speechsdk.SpeechConfig.fromAuthorizationToken(tokenObj.authToken, tokenObj.region);
        speechConfig.speechRecognitionLanguage = 'en-US';
        
        const audioConfig = speechsdk.AudioConfig.fromDefaultMicrophoneInput();
        const recognizer = new speechsdk.SpeechRecognizer(speechConfig, audioConfig);

        this.setState({
            displayText: 'speak into your microphone...'
        });

        recognizer.recognizeOnceAsync(result => {
            let displayText;
            if (result.reason === ResultReason.RecognizedSpeech) {
                displayText = `RECOGNIZED: Text=${result.text}`
            } else {
                displayText = 'ERROR: Speech was cancelled or could not be recognized. Ensure your microphone is working properly.';
            }

            this.setState({
                displayText: displayText
            });
        });
    }

    async fileChange(event) {
        const audioFile = event.target.files[0];
        console.log(audioFile);
        const fileInfo = audioFile.name + ` size=${audioFile.size} bytes `;

        this.setState({
            displayText: fileInfo
        });

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

            this.setState({
                displayText: fileInfo + displayText
            });
        });
    }

    render() {
        return (
            <Container className="app-container">
                <h3 className="display-6 mb-3">Eruza - Waste Automation &amp; Management System</h3>

                <div className="row main-container">
                    <div className="col-6">
                        <i className="fas fa-microphone fa-lg mr-2" onClick={() => this.sttFromMic()}></i>
                        Convert speech to text from your mic.

                        <div className="mt-2">
                            <label htmlFor="audio-file"><i className="fas fa-file-audio fa-lg mr-2"></i></label>
                            <input 
                                type="file" 
                                id="audio-file" 
                                onChange={(e) => this.fileChange(e)} 
                                style={{display: "none"}} 
                            />
                            Convert speech to text from an audio file.
                        </div>
                    </div>
                    <div className="col-6 output-display rounded">
                        <code>{this.state.displayText}</code>
                    </div>
                </div>

                <EventImages/>

            </Container>
        );
    }
}