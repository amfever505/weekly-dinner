import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Progress from '@material-ui/core/CircularProgress';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import { removeMenuFromFirebase } from '../../firebase/api';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: 400,
    position: 'relative',
    backgroundColor: theme.palette.background.paper
  }
}));

export default function MenuList(props) {
  const { menuList } = props;
  const classes = useStyles();

  const handleDeleteMenu = key => {
    removeMenuFromFirebase(key);
  };

  return (
    <div className={classes.root}>
      {menuList.length === 0 ? (
        <Progress
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%'
          }}
        />
      ) : (
        <List
          subheader={
            <ListSubheader
              component="div"
              id="nested-list-subheader"
              style={{ color: '#333333' }}
            >
              メニューリスト
            </ListSubheader>
          }
          style={{
            color: 'gray',
            maxHeight: 360,
            overflowY: 'auto'
          }}
        >
          {menuList.map(m => (
            <ListItem key={m.key} button>
              <ListItemText primary={m.name} style={{ color: '#210203' }} />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDeleteMenu(m.key)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
}
