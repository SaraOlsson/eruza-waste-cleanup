import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AddImage from '../components/AddImage'

function CameraPage() {


    const [image, setImage] = React.useState(undefined);
    const classes = useStyles()

    const onFileAdd = (files) => {

        var reader = new FileReader();
        reader.onload = function(e) {
          setImage(e.target.result);
        }
    
        try {
            reader.readAsDataURL(files[0]);
        } catch(err) {
            console.log(err.message);
        }
        
    };

    const onFileRemove = () => {
        setImage(undefined);
    };

    return(

        <div className={classes.infoContainer}>
            <h3>Capture event image</h3>
            <AddImage image={image} onFileAdd={onFileAdd} onFileRemove={onFileRemove}/>
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