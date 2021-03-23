import axios from 'axios';
import Cookie from 'universal-cookie';

export async function getTokenOrRefresh() {
    const cookie = new Cookie();
    const speechToken = cookie.get('speech-token');

    // quick fix..
    return {
        authToken: "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJyZWdpb24iOiJub3J0aGV1cm9wZSIsInN1YnNjcmlwdGlvbi1pZCI6IjJhMzdlMGRmYmI4ZTRmOTFhYTVkNGMyZWQwOThlZWY4IiwicHJvZHVjdC1pZCI6IlNwZWVjaFNlcnZpY2VzLkYwIiwiY29nbml0aXZlLXNlcnZpY2VzLWVuZHBvaW50IjoiaHR0cHM6Ly9hcGkuY29nbml0aXZlLm1pY3Jvc29mdC5jb20vaW50ZXJuYWwvdjEuMC8iLCJhenVyZS1yZXNvdXJjZS1pZCI6Ii9zdWJzY3JpcHRpb25zLzE1NjZhNDVhLWE0ZjItNDlmMi04MmIzLWVhZTc5N2QxNGMyNy9yZXNvdXJjZUdyb3Vwcy9FUlVaQS1XQVNURS1DTEVBTlVQL3Byb3ZpZGVycy9NaWNyb3NvZnQuQ29nbml0aXZlU2VydmljZXMvYWNjb3VudHMvZXJ1emF3YXN0ZXNwZWVjaCIsInNjb3BlIjoic3BlZWNoc2VydmljZXMiLCJhdWQiOiJ1cm46bXMuc3BlZWNoc2VydmljZXMubm9ydGhldXJvcGUiLCJleHAiOjE2MTY0NjY3MTYsImlzcyI6InVybjptcy5jb2duaXRpdmVzZXJ2aWNlcyJ9.XmEpQQb0ngH_nMFjyFAxwt5GMdxUtXo-D_ULcZ7qdto",
        region: "northeurope"
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