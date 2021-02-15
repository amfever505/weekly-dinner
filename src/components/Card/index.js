import React, { useState } from 'react';
import { innerH } from '../../constants';

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  contentRoot: {
    height: innerH * 0.5 - 240,
  },
  //用objectfit設定自適應大小
  img: {
    objectFit: 'contain',
  },
});

export default function ImgMediaCard({ day, randomMenu, daysimg, ...props }) {
  //設定day content 可以從外面傳資料進來
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={daysimg}
          title="Contempla tive Reptile"
          classes={{ img: classes.img }}
          //在這邊呼叫usestyle裡設定的objectfit
        />
        {/* 設定className裡的樣式（用object的方式）寫固定高度 */}
        <CardContent className={classes.contentRoot}>
          {/*<Typography gutterBottom variant="h5" component="h2">
            {day}
  </Typography>*/}
          {randomMenu ? (
            <Typography variant="h6" component="h3" style={{ color: '#484848' }}>
              {randomMenu.name}
            </Typography>
          ) : null}
        </CardContent>
      </CardActionArea>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>{randomMenu ? <Typography paragraph>{randomMenu.content}</Typography> : null}</CardContent>
      </Collapse>
      <CardActions>
        {/* <Button size="small" style={{ color: '#6D98BA' }}>
          シェア
</Button>*/}
        <Button
          size="small"
          style={{ color: '#6D98BA' }}
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
        >
          もっと見る
        </Button>
      </CardActions>
    </Card>
  );
}
