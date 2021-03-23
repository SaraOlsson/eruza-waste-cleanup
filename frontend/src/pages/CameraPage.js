import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

function CameraPage() {

    const classes = useStyles()

    return(

        <div className={classes.infoContainer}>
            <h3>Record sound</h3>
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

export default CameraPage