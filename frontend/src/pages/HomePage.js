import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import AddImage from '../components/AddImage'

function HomePage() {


    // const [image, setImage] = React.useState(undefined);
    const classes = useStyles()


    return(

        <div className={classes.infoContainer}>

            <div className={classes.tableInfo}>
                <h3>Monday 22, 2021</h3>
                
                <div className="row">
                        <div className="col-6">
                            Collected
                        </div>
                        <div className="col-6">
                            360
                        </div>
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
        maxHeight: 200,
        marginBottom: 50
    }
});

export default HomePage