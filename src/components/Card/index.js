import React, { useState } from 'react';
import { innerH } from '../../constants';
import PopupDialog from '../Popup';
import ContentTable from '../ContentTable';
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
import { CallReceived } from '@material-ui/icons';

const useStyles = makeStyles({
  root: {
    Width: '100%',
    height: (innerH - 40) / 7,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderRadius: 'unset',
  },
  rootCardContent: {
    width: '65%',
  },
  daysImg: {
    display: 'inline-block',
    width: (innerH - 40) / 7,

    //objectFit: 'contain',
  },
  //用objectfit設定自適應大小
  img: {
    objectFit: 'contain',
  },
});

export default function ImgMediaCard({ day, randomMenu, randomMenu2, randomMenuList, daysimg, menuTable, ...props }) {
  //設定day content 可以從外面傳資料進來
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handlePopupOpen = () => setOpen(true);

  const handleCloseDialog = () => setOpen(false);
  return (
    <div>
      <Card className={classes.root}>
        <div className={classes.daysImg}>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            image={daysimg}
            title="Contempla tive Reptile"
            // classes={classes.daysImg}
            //在這邊呼叫usestyle裡設定的objectfit
          />
        </div>

        <CardActionArea className={classes.rootCardContent} onClick={randomMenu ? handlePopupOpen : null}>
          {/* 設定className裡的樣式（用object的方式）寫固定高度 */}
          <CardContent className={classes.contentRoot}>
            {randomMenu ? (
              randomMenu2 ? (
                <>
                  <Typography varant="h6" component="h3" style={{ color: '#484848' }}>
                    {randomMenu.name}　＆　{randomMenu2.name}
                  </Typography>
                </>
              ) : (
                <Typography varant="h6" component="h3" style={{ color: '#484848' }}>
                  {randomMenu.name}
                </Typography>
              )
            ) : null}
          </CardContent>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              {randomMenu ? (
                randomMenu2 ? (
                  <Typography paragraph>¥{Number(randomMenu.price) + Number(randomMenu2.price)}</Typography>
                ) : (
                  <Typography paragraph>¥{Number(randomMenu.price)}</Typography>
                )
              ) : null}
            </CardContent>
          </Collapse>
        </CardActionArea>

        <CardActions>
          {/* <Button size="small" style={{ color: '#6D98BA' }}>
          シェア
</Button>*/}
          <Button
            size="small"
            style={{ color: '#6D98BA', minWidth: '20%' }}
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
          >
            もっと見る
          </Button>
        </CardActions>
        <PopupDialog
          open={open}
          onClose={handleCloseDialog}
          popupTitle={'内容確認'}
          popupContent={<ContentTable randomMenusList={randomMenuList} />}
        ></PopupDialog>
      </Card>
    </div>
  );
}
