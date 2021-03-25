import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import AddImage from '../components/AddImage'
import RadioGroup from '../components/RadioGroup'
import axios from 'axios';

function CameraPage() {


    const [image, setImage] = React.useState(undefined);
    const [numBottles, setNumBottles] = React.useState('');
    const classes = useStyles()

    const onFileAdd = (files) => {

        // trySendRequest(files[0])

        var reader = new FileReader();
        reader.onload = function(e) {
          setImage(e.target.result);
          trySendRequest(e.target.result) // using URL atm
        }
    
        try {
            reader.readAsDataURL(files[0]);
        } catch(err) {
            console.log(err.message);
        }
        
    };

    const trySendRequest = async (imageData) => {

        // console.log(imageData)

        const customVisionKey = '1ce21a7477df4f5f8f95f5708fbfc27f' // process.env || 

        const headers = { 
            headers: {
                'Prediction-Key': customVisionKey,
                'Content-Type': 'application/json'
            }
        };
        // 'application/octet-stream'
        // 'application/json'

        const body = {"Url": "https://eruzawastestorage.blob.core.windows.net/event-images/plastic/1616245404771.jpg"};
        const url_url = 'https://customvisionhhs.cognitiveservices.azure.com/customvision/v3.0/Prediction/c11ba780-1341-49b1-8e6b-d536093afe00/detect/iterations/Iteration1/url'
        const url_image = 'https://customvisionhhs.cognitiveservices.azure.com/customvision/v3.0/Prediction/c11ba780-1341-49b1-8e6b-d536093afe00/detect/iterations/Iteration1/image'

        try {
            const detectResponse = await axios.post(url_url, body, headers);
            
            console.log(detectResponse);
            parseDetection(detectResponse)


            
        } catch (err) {

            console.log('error');
        }
        
    };

    const parseDetection = (detectResponse) => {

        const threshold = 0.7
        let predictions = detectResponse.data.predictions
        console.log(predictions);
        let num_bottels = predictions.map(p => p.probability > threshold).length
        console.log(num_bottels);

        setNumBottles(num_bottels);
    };


    const onFileRemove = () => {
        setImage(undefined);
    };

    const labels = [{value: 'plastic', label: 'Plastic'}, {value: 'receipt', label: 'Receipt'}, {value: 'event', label: 'Event'} ]

    return(

        <div className={classes.infoContainer}>
            <h3>Capture event image</h3>
            <AddImage image={image} onFileAdd={onFileAdd} onFileRemove={onFileRemove}/>

            {numBottles !== '' &&
                <h3>Num bottles found in image: {numBottles}</h3> 
            }

            <div className={classes.manageContainer}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => alert('DEMO: save image')}
                    style={{lineHeight: '1.2'}}
                    >
                    Save image
                </Button>
                <div style={{margin: 10}}>
                    <RadioGroup value={'plastic'} labels={labels}/>
                </div>
            </div>

        </div>
    );
}

const useStyles = makeStyles({
    infoContainer: {
        padding: '15px',
        height: '100%'
    },
    manageContainer: {
        backgroundColor: '#f5f5f5', // #002039',
        borderRadius: 15,
        padding: 30,
        margin: 10
    },
    infoText: {
        fontSize: 'small'
    }
});

export default CameraPage

// url
// https://customvisionhhs.cognitiveservices.azure.com/customvision/v3.0/Prediction/c11ba780-1341-49b1-8e6b-d536093afe00/detect/iterations/Iteration1/url
// Set Prediction-Key Header to : 1ce21a7477df4f5f8f95f5708fbfc27f
// Set Content-Type Header to : application/json
// Set Body to : {"Url": "https://example.com/image.png"}

// image
// https://customvisionhhs.cognitiveservices.azure.com/customvision/v3.0/Prediction/c11ba780-1341-49b1-8e6b-d536093afe00/detect/iterations/Iteration1/image
// Set Prediction-Key Header to : 1ce21a7477df4f5f8f95f5708fbfc27f
// Set Content-Type Header to : application/octet-stream
// Set Body to : <image file>