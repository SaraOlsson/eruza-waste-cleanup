import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

function ReportPage() {


    // const [image, setImage] = React.useState(undefined);
    const classes = useStyles()


    return(

        <div className={classes.infoContainer}>
            <h3 className={classes.header}>Impact stats</h3>

            <b>Event: <i>Nicaragua April Boost - May 2021 </i></b>
            
            <div className={`row ${classes.listContainer}`}>
                    <div className="col-6">
                        <b>Collected</b>
                    </div>
                    <div className="col-6">
                        360
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
    },
    listContainer: {
        padding: 5,
        margin: 5,
        backgroundColor: "#e4e4e4",
        borderRadius: 5
    },
    header: {
        marginBottom: 35
    }
});

export default ReportPage