import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import AddImage from '../components/AddImage'

function HomePage() {


    // const [image, setImage] = React.useState(undefined);
    const classes = useStyles()

    const sample_data = [15, 14, 20, 23, 43, 22, 12, 23]


    return(

        <div className={classes.infoContainer}>

            <div className={classes.tableInfo}>
                <h3>Monday 22, 2021</h3>
                
                <div className={`${classes.tableContainer}`}>
                    <div className={`row`}>
                        <div className="col-6">
                            <b>Type</b>
                        </div>
                        <div className="col-6">
                            <b>Quantity</b>
                        </div> 
                    </div>
                    {
                        sample_data.map( (d, idx) => 
                        <div key={idx} className={`row`}>
                            <div className="col-6">
                                Bottles
                            </div>
                            <div className="col-6">
                                {d}
                            </div> 
                        </div>
                        )
                    }
                </div>
            </div>


            <div>
                <Button
                variant="contained"
                color="primary"
                onClick={() => alert('DEMO: close event')}
                style={{lineHeight: '1.2'}}
                >
                    Close event
                </Button>
            </div>

        </div>
    );
}

const useStyles = makeStyles({
    infoContainer: {
        padding: '15px',
        display: 'flex',
        flexDirection: 'column',
        height: '100%'

    },
    infoText: {
        fontSize: 'small'
    },
    tableInfo: {
        maxHeight: 300,
        marginBottom: 50
    },
    tableContainer: {
        backgroundColor: '#f2f2f2',
        borderRadius: 5,
        padding: 10
    }
});

export default HomePage