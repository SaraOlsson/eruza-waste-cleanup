import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import FileInput from './FileInput';
import { makeStyles } from '@material-ui/core/styles';

function AddImage(props) {

    const classes = useStyles(); 
  
    return (
      <React.Fragment>
        <Grid container spacing={1}>
          <Grid item xs={12} style={{
              display: 'flex',
              marginBottom: '10px'
          }}>
          <FileInput onChange={props.onFileAdd} uploadText='Upload image'/>
          </Grid>
        </Grid>
        { props.image !== undefined &&
        <React.Fragment>
          <Grid item xs={12}>
            <img src={props.image} alt={"loadedimage"} className={classes.loadedimage} style={{width: 200}}/>
          </Grid>
          
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={props.onFileRemove}
              style={{lineHeight: '1.2'}}
            >
              Remove image
            </Button>
          </Grid>
        </React.Fragment>
        }
      </React.Fragment>
    );
}
 
// material ui design
const useStyles = makeStyles(theme => ({
    loadedimage: {
        width: '100%',
        borderRadius: '4px'
    }
}));

export default AddImage;