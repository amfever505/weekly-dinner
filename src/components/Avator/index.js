import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { showUserInfo } from '../../firebase/api';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    maxWidth: 240,
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  //   small: {
  //     width: theme.spacing(3),
  //     height: theme.spacing(3),
  //   },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    [theme.breakpoints.down('sm')]: {
      width: theme.spacing(5),
      height: theme.spacing(5),
    },
  },
  text: {
    display: 'block',
    color: theme.palette.common.white,
    wordWrap: 'break-word',
  },
}));

export default function ImageAvatars() {
  const classes = useStyles();
  console.log(showUserInfo());
  return (
    <>
      <div className={classes.root}>
        <Avatar alt="Remy Sharp" src={showUserInfo().photoUrl} className={classes.large} />
        <div>
          <Typography variant="h5" className={classes.text}>
            {showUserInfo().name}
          </Typography>
        </div>
      </div>
      {/* <Typography className={classes.text}>{showUserInfo().email}</Typography> */}
    </>
  );
}
