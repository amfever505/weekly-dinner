import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345
  },
  contentRoot: {
    height: 100
  }
});

export default function ImgMediaCard({ day, content, daysimg, ...props }) {
  //設定day content 可以從外面傳資料進來
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={daysimg}
          title="Contemplative Reptile"
        />
        {/* 設定className裡的樣式（用object的方式）寫固定高度 */}
        <CardContent className={classes.contentRoot}>
          {/*<Typography gutterBottom variant="h5" component="h2">
            {day}
  </Typography>*/}
          <Typography variant="h6" component="h3" style={{ color: '#484848' }}>
            {content}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {/* <Button size="small" style={{ color: '#6D98BA' }}>
          シェア
</Button>*/}
        <Button size="small" style={{ color: '#6D98BA' }}>
          もっと見る
        </Button>
      </CardActions>
    </Card>
  );
}
