import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import { makeStyles } from '@material-ui/core/styles'
import HomeRoundedIcon from '@material-ui/icons/HomeRounded'
import LoyaltyRoundedIcon from '@material-ui/icons/LoyaltyRounded'
import NotificationsIcon from '@material-ui/icons/Notifications'
import PublishIcon from '@material-ui/icons/PublishRounded'

import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import MicIcon from '@material-ui/icons/Mic';
import TimelineIcon from '@material-ui/icons/Timeline';
import ReceiptIcon from '@material-ui/icons/Receipt';

import React from 'react'

import { useHistory } from "react-router-dom"
// import our css
// import '../../App.css'


function BottomMenuBar() {

    const [value, setValue] = React.useState('default')
    const history = useHistory()
    const classes = useStyles()

    const handleMenuClick = (event = undefined, val) => {
  
      let {pathname} = history.location
  
      if(`/${val}` === pathname) // dont push to current
        return
  
        setValue(val)
        history.push("/" + val)
      
    };
  
    return (
      <>
  
        <BottomNavigation value={value} onChange={ (evt,value) => handleMenuClick(evt, value) } 
            className={classes.bottomMenu}>
          <BottomNavigationAction label="home" value="home" icon={<HomeRoundedIcon />} />
          <BottomNavigationAction label="speech" value="speech" icon={<MicIcon />} />
          <BottomNavigationAction label="photo" value="photo" icon={<AddAPhotoIcon />} />
          <BottomNavigationAction label="scan" value="scan" icon={<ReceiptIcon />} />
          <BottomNavigationAction label="report" value="report" icon={<TimelineIcon />} />
        </BottomNavigation>
  
      </>
    );
  
    // <Badge badgeContent={3} color="secondary"><NotificationsIcon /></Badge>
  
  }

  const useStyles = makeStyles({
    bottomMenu: {
      width: '100%'
    }
  
  })

  export default BottomMenuBar