import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

const styles = (theme) => ({
  root: {
    margin: 0,
    minWidth: 500,
    [theme.breakpoints.down('sm')]: {
      minWidth: 400,
    },
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  h6: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.9em',
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.1em',
    },
  },
  content: {
    [theme.breakpoints.down('sm')]: {
      padding: '8px 12px',
    },
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6" className={classes.h6}>
        {children}{' '}
      </Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

export default function PopupDialog({ open, onClose, popupTitle, popupContent }) {
  return (
    <div>
      <Dialog PaperComponent={PaperComponent} onClose={onClose} aria-labelledby="draggable-dialog-title" open={open}>
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title" onClose={onClose}>
          {popupTitle}
        </DialogTitle>
        <DialogContent dividers>{popupContent}</DialogContent>
        <DialogActions>
          <Button autoFocus onClick={onClose} color="primary">
            オッケー！
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
