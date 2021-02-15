import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { addMenuToFirebase, updateMenuToFirebase } from '../../firebase/api';

const useStyles = makeStyles({
  rootPaper: {
    width: 500,
  },
});

export default function FormDialog({
  open,
  onClose,
  title,
  content,
  label,
  nextButton,
  cancleButton,
  defaultValue = '',
  defaultContent = '',
  type,
  editedKey,
  ...props
}) {
  const [menuName, setMenuName] = useState('');
  const [contentName, setContentName] = useState('');
  const [changeNameListener, setChangeNameListener] = useState(false);
  const [changeContentListener, setChangeContentListener] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    setMenuName(defaultValue);
    setContentName(defaultContent);
  }, [defaultValue, defaultContent]);

  const handleInput = (e) => {
    setMenuName(e.target.value);
  };

  const handleInput2 = (e) => {
    setContentName(e.target.value);
  };

  const handleUpdateMenu = () => {
    if (type === 'edit') {
      updateMenuToFirebase({ name: menuName, content: contentName, key: editedKey });
    } else {
      addMenuToFirebase({ name: menuName, content: contentName });
    }
    onClose();
    setMenuName('');
    setContentName('');
  };

  return (
    <div>
      <Dialog classes={{ paper: classes.rootPaper }} open={open} onClose={onClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{content}</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label={label}
            multiline
            fullWidth
            onChange={handleInput}
            defaultValue={defaultValue}
            variant="outlined"
            error={menuName.length === 0}
            required
          />
          <></>
          <TextField
            id="outlined-multiline-static"
            label="備考"
            multiline
            fullWidth
            rows={4}
            onChange={handleInput2}
            defaultValue={defaultContent}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            {cancleButton}
          </Button>
          <Button onClick={handleUpdateMenu} disabled={menuName.length === 0} color="primary">
            {nextButton}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
