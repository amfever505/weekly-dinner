import React, { useState } from 'react';
import MenuEditDialog from '../Dialog';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Progress from '@material-ui/core/CircularProgress';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';

import { removeMenuFromFirebase } from '../../firebase/api';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: 'auto',
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function MenuList(props) {
  const [open, setOpen] = useState(false);
  const [editedItem, setEditedItem] = useState({});

  const { menuList } = props;
  const classes = useStyles();
  const handleDeleteMenu = (key) => {
    removeMenuFromFirebase(key);
  };
  const handleOpenandEditDialog = (item) => {
    setOpen(true);
    setEditedItem(item);
  };
  const handleCloseDialog = () => setOpen(false);

  return (
    <>
      <div className={classes.root}>
        {menuList.length === 0 ? (
          <Progress
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
            }}
          />
        ) : (
          <List
            subheader={
              <ListSubheader
                component="div"
                id="nested-list-subheader"
                style={{
                  color: '#333333',
                  background: '#fff',
                }}
              >
                メニューリスト
              </ListSubheader>
            }
            style={{
              maxHeight: 360,
              overflowY: 'auto',
            }}
          >
            {menuList.map((item) => (
              <ListItem key={item.key} button>
                <ListItemText primary={item.name} style={{ color: '#210203' }} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="rewrite" onClick={() => handleOpenandEditDialog(item, item.key)}>
                    <CreateIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteMenu(item.key)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        )}
      </div>
      <MenuEditDialog
        title="内容編集"
        content="入力した内容を編集できる"
        label=""
        nextButton="編集する"
        cancleButton="やめる"
        open={open}
        defaultValue={editedItem.name}
        defaultContent={editedItem.content}
        onClose={handleCloseDialog}
        editedKey={editedItem.key}
        type="edit"
      />
    </>
  );
}
