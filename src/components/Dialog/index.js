import React from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function FormDialog({ open, handleCloseDialog }) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleCloseDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">食事を追加</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ここで自分の食べたいものを追加して、一週間の食事リストを作りましょう！
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="食事　例：オムライス"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            やめる
          </Button>
          <Button onClick={handleCloseDialog} color="primary">
            追加する
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
