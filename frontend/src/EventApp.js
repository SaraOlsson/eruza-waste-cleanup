import React, {useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Route, Switch } from "react-router-dom";
import './custom.css'

import TopMenuBar from './components/TopMenuBar';
import BottomMenuBar from "./components/BottomMenuBar";

import {
    SpeechPage
} from './pages'

// main component of the app
function EventApp() {

    //const [openBotDialog, setOpenBotDialog] = React.useState(false);
  
    const classes = useStyles();

    // scan photo speech stats

    return (
  
      <div className={classes.body}>
  

  
          <div className={classes.headerrow}>
            <TopMenuBar/>
          </div>
  
          <div className={`${classes.mainContainer}`}>
  
            <Switch>
              <Route exact path="/home" component={SpeechPage}/>
              <Route path="/scan" component={SpeechPage} />
              <Route path="/photo" component={SpeechPage} />
              <Route path="/speech" component={SpeechPage} />
              <Route path="/stats" component={SpeechPage} />
            </Switch>

          </div>
  
          <div className={classes.footer}>
            <BottomMenuBar/>
          </div>
  
        
        
      </div>

  
    );
  }

  const useStyles = makeStyles({
    body: {
      // padding: 15,
      // paddingTop: '35px',
      // maxWidth: 800,
      marginLeft: 'auto',
      marginRight: 'auto',
      background: '#d4dcd5',

      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '90%'
    },
    mainContainer: {
        paddingTop: '60px',
        paddingBottom: '50px',
        minHeight: 300
    },
    footer: {
        // position: 'fixed',
        left: 0,
        bottom: 0,
        width: 100 + '%',
        display: 'flex',
        justifyContent: 'center'
    },
    // headerrow: {
    //     position: 'fixed',
    //     left: 0,
    //     top: 0,
    //     width: 100 + '%',
    //     zIndex: 10
    // }
  });
  
  export default EventApp