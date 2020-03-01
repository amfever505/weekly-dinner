import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Progress from '@material-ui/core/CircularProgress';

import { menuRef } from '../../firebase/api';

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
      setMenuList(Object.values(snapshot.val()));
    });
  }, []);

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
            <ListItem button>
              <ListItemText primary={m.name} />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
}
