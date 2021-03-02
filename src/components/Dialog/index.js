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
  defaultPrice = 0,
  defaultContent = '',
  type,
  editedKey,
  ...props
}) {
  const [menuName, setMenuName] = useState('');
  const [contentName, setContentName] = useState('');
  const [price, setPrice] = useState(0);
  const [changeNameListener, setChangeNameListener] = useState(false);
  const [changeContentListener, setChangeContentListener] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    setMenuName(defaultValue);
    setPrice(defaultPrice);
    setContentName(defaultContent);
  }, [defaultValue, defaultPrice, defaultContent]);

  const handleInput = (e) => {
    setMenuName(e.target.value);
  };
  const handlePriceInput = (e) => {
    setPrice(e.target.value);
  };
  const handleContentInput = (e) => {
    setContentName(e.target.value);
  };

  const handleUpdateMenu = () => {
    if (type === 'edit') {
      updateMenuToFirebase({ name: menuName, price: price, content: contentName, key: editedKey });
    } else {
      addMenuToFirebase({ name: menuName, price: price, content: contentName });
    }
    onClose();
    setMenuName('');
    setPrice(0);
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
          <br />
          <TextField
            margin="dense"
            id="price"
            label="おいくら？"
            type="number"
            multiline
            fullWidth
            onChange={handlePriceInput}
            defaultValue={defaultPrice}
            error={isNaN(price)}
            variant="outlined"
          />
          <br />
          <TextField
            id="outlined-multiline-static"
            label="食材、お店、備考など"
            multiline
            fullWidth
            rows={4}
            onChange={handleContentInput}
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
