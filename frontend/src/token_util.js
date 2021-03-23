import axios from 'axios';
import Cookie from 'universal-cookie';

export async function getTokenOrRefresh() {
    const cookie = new Cookie();
    const speechToken = cookie.get('speech-token');

    if (speechToken === undefined) {

        const speechKey = 'd262551f0439400693076915358f17a5' // process.env.SPEECH_KEY || 
        const speechRegion = 'northeurope' // process.env.SPEECH_REGION  || 

        const headers = { 
            headers: {
                'Ocp-Apim-Subscription-Key': speechKey,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        try {
            const tokenResponse = await axios.post(`https://${speechRegion}.api.cognitive.microsoft.com/sts/v1.0/issueToken`, null, headers);
            

            // const res = await axios.get('/api/get-speech-token');
            const token = tokenResponse.data;
            const region = speechRegion;
            cookie.set('speech-token', region + ':' + token, {maxAge: 540, path: '/'});

            console.log('Token fetched from back-end: ' + token);
            return { authToken: token, region: region };
        } catch (err) {

            return { authToken: null, error: err.response.data };
        }
    } else {
        console.log('Token fetched from cookie: ' + speechToken);
        const idx = speechToken.indexOf(':');
        return { authToken: speechToken.slice(idx + 1), region: speechToken.slice(0, idx) };
    }

    // if (speechToken === undefined) {
    //     try {
    //         const res = await axios.get('/api/get-speech-token');
    //         const token = res.data.token;
    //         const region = res.data.region;
    //         cookie.set('speech-token', region + ':' + token, {maxAge: 540, path: '/'});

    //         console.log('Token fetched from back-end: ' + token);
    //         return { authToken: token, region: region };
    //     } catch (err) {
    //         console.log(err.response.data);
    //         return { authToken: null, error: err.response.data };
    //     }
    // } else {
    //     console.log('Token fetched from cookie: ' + speechToken);
    //     const idx = speechToken.indexOf(':');
    //     return { authToken: speechToken.slice(idx + 1), region: speechToken.slice(0, idx) };
    // }
}