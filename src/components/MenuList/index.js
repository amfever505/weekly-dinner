import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Progress from '@material-ui/core/CircularProgress';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import { menuRef, removeMenuFromFirebase } from '../../firebase/api';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: 400,
    position: 'relative',
    backgroundColor: theme.palette.background.paper
  }
}));

export default function MenuList() {
  const [menuList, setMenuList] = useState([]);
  const classes = useStyles();

  // equals react componenDidMount()
  useEffect(() => {
    menuRef.on('value', snapshot => {
      setMenuList(snapshot.val() ? Object.values(snapshot.val()) : []);
    });
  }, []);

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
            <ListSubheader component="div" id="nested-list-subheader">
              熊熊メニュー
            </ListSubheader>
          }
          style={{
            maxHeight: 360,
            overflowY: 'auto'
          }}
        >
          {menuList.map(m => (
            <ListItem key={m.key} button>
              <ListItemText primary={m.name} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteMenu(m.key)}>
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
