import React from 'react';
import { Button, makeStyles } from '@material-ui/core';

const Buttons = (props) => {

  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    buttons: {
      borderRadius: '4px',
      color: 'gray',
      boxSizing: 'border-box',
      background:'linear-gradient(113.96deg, #189AB4 0%, #006096 100%)'
    }
  }))

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button onClick={props.clicked} className={classes.buttons}>
        {props.children}
      </Button>
    </div>
  )
}

export default Buttons
