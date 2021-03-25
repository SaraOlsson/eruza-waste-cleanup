import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { computerVision, isConfigured as ComputerVisionIsConfigured } from '../services/azure-cognitiveservices-computervision'

function ReceiptPage() {
    
    const [fileSelected, setFileSelected] = useState(null);
    const [analysis, setAnalysis] = useState(null);
    const [processing, setProcessing] = useState(false);

    const classes = useStyles()
    
    const handleChange = (e) => {
        setFileSelected(e.target.value)
    }
    const onFileUrlEntered = (e) => {

        // hold UI
        setProcessing(true);
        setAnalysis(null);

        computerVision(fileSelected || null).then((item) => {
        // reset state/form
        setAnalysis(item);
        setFileSelected("");
        setProcessing(false);
        });
    };

    // Display JSON data in readable format
    const PrettyPrintJson = (data) => {
        return (<div><pre>{JSON.stringify(data, null, 2)}</pre></div>);
    }

    // Display relevant data
    const OurPrettyPrint = (data) => {

        let readResults = data.text.readResults[0]
        console.log(readResults)
        console.log("language: " + readResults.language)

        if(!readResults)
            return <p>Could not analyse</p>
        
        let lines = readResults.lines
        let language = readResults['language']
        console.log("also language: " + language)
        let date = lines.find(l => l.text.includes('FACTURA'))
        let total = lines.find(l => l.text.includes('TOTAL')).text

        let dateClean = date.words.map(w => w.text).slice(0,3)

        let all_text = lines.map(l => l.text)

        return (<div>

            {/* Receipt date: {date.text} */}
            <p> Receipt date: {date.text} </p>
            <p> Total cost: {total} </p>


            <p><b> All text found: </b></p>
            {/* {
                all_text.map( t => <p> {t} </p>)
            } */}

            <TextareaAutosize
            rowsMax={10}
            aria-label="maximum height"
            placeholder="Maximum 4 rows"
            value={all_text.join()}
            width={500}
            />
        
        </div>)
        
         

        //return (<div><pre>{JSON.stringify(readResults, null, 2)}</pre></div>);
    }

    const DisplayResults = () => {
        return (
        <>
            <h3>Computer Vision Analysis</h3>
            <div style={{display: 'flex', placeContent: 'space-evenly'}}>
                <div><img src={analysis.URL} height="200" border="1" alt={(analysis.description && analysis.description.captions && analysis.description.captions[0].text ? analysis.description.captions[0].text : "can't find caption")} /></div>
                
                {OurPrettyPrint(analysis)}
                {/* {PrettyPrintJson(analysis)} */}
            </div>
        </>
        )
    };

    const Analyze = () => {
        return (
        <div>
          {!processing &&
            <div>
              <p>Example: 'https://eruzawastestorage.blob.core.windows.net/event-images/receipts/receipt_1.png'</p>
              <div>
                <label>URL</label>
                <input type="text" placeholder="Enter URL" size="50" onChange={handleChange}></input>
              </div>
              {/* <button onClick={onFileUrlEntered}>Analyze</button> */}
              <Button
                variant="contained"
                color="primary"
                onClick={onFileUrlEntered}
                style={{lineHeight: '1.2'}}
                disabled={fileSelected === ''}
                >
                    Analyze
                </Button>
            </div>
          }
          {processing && <div>Processing</div>}
          <hr />
          {analysis && DisplayResults()}
          </div>
        )
      }

    return(

        <div className={classes.infoContainer}>
            <h3 className={classes.header}>Receipt analysis</h3>
            {/* <AddImage image={image} onFileAdd={onFileAdd} onFileRemove={onFileRemove}/> */}
            {
                ComputerVisionIsConfigured ? Analyze() : <p> Not ready </p>
            }
        </div>
    );
}

const useStyles = makeStyles({
    infoContainer: {
        padding: '15px'
    },
    infoText: {
        fontSize: 'small'
    },
    header: {
        marginBottom: 35
    }
});

export default ReceiptPage