import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import SettingsIcon from '@material-ui/icons/Settings';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
  },
  labelRoot: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.9em',
    },
  },
}));

export default function OptionList({ daysValue, handleDaysValueChange, duplicated, handleDuplicatedOption, ...props }) {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <List
          subheader={
            <ListSubheader
              component="div"
              id="nested-list-subheader"
              style={{
                color: '#333333',
                background: '#fff',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <SettingsIcon style={{ fontSize: 28, color: '#484848' }} />
              オプション
            </ListSubheader>
          }
          style={{
            Height: 360,
            overflowY: 'auto',
          }}
        >
          <ListItem>
            一日　
            <RadioGroup row name="daysSelector" value={daysValue} onChange={handleDaysValueChange}>
              <FormControlLabel
                value="7"
                control={<Radio />}
                label={<span className={classes.labelRoot}>1食作る！</span>}
              />
              <FormControlLabel
                value="14"
                control={<Radio />}
                label={<span className={classes.labelRoot}>2食作る！</span>}
              />
            </RadioGroup>
          </ListItem>
          <ListItem>
            <Typography>リストが足りない場合は</Typography>
          </ListItem>
          <ListItem>
            <RadioGroup row name="duplicated" value={duplicated} onChange={handleDuplicatedOption}>
              <FormControlLabel
                value="on"
                control={<Radio />}
                label={<span className={classes.labelRoot}>重複する</span>}
              />
              <FormControlLabel
                value="off"
                control={<Radio />}
                label={<span className={classes.labelRoot}>重複しない（枠が空く）</span>}
              />
            </RadioGroup>
          </ListItem>
        </List>
      </div>
    </>
  );
}
