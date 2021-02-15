import React, { useState, useEffect } from 'react';

import Section from '../Section';
import Grid from '@material-ui/core/Grid';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { makeStyles } from '@material-ui/core/styles';

import Card from '../Card';
import Button from '../Button';
import MenuEditDialog from '../Dialog';
import MiniDrawer from '../Drawer';
import { WEEK_DAYS, DAYS_ICON, innerH } from '../../constants';

import { login, checkLogin, logout, getMenuList, getUid, menuRef } from '../../firebase/api';
import MenuList from '../MenuList';
import { Autocomplete } from '@material-ui/lab';

const useStyles = makeStyles({
  root: {
    width: '100%-48px',
  },
  gridItem: {
    height: (innerH - 48) / 3,
    overflow: 'auto',
    margin: 0,
  },
  contentRoot: {
    height: innerH * 0.5 - 240,
  },
  btnGroup: {
    width: '100%',
    height: '50%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainBtn: {
    paddingRight: 36,
    paddingLeft: 36,
    lineHeight: 1.5,
    margin: 16,
    color: '#d675af',
    background: '#484848',
  },
  subBtn: {
    paddingRight: 36,
    paddingLeft: 36,
    lineHeight: 2,
    margin: 16,
    color: '#fff',
    background: '#d675af',
  },
  //用objectfit設定自適應大小
  img: {
    objectFit: 'contain',
  },
});

function Home() {
  //用useState來寫網頁原始值（什麼都沒有的狀態）再用setVar的方式改變內容
  const [randomMenuList, setRandomMenuList] = useState([]);
  const [open, setOpen] = useState(false);
  const [menuList, setMenuList] = useState([]);
  const classes = useStyles();

  // equals react componenDidMount()
  useEffect(() => {
    checkLogin().subscribe((user) => {
      if (user) {
        console.log('login success!', user);
        getMenuList().subscribe((data) => {
          setMenuList(data);
        });
      } else {
        login();
      }
    });
  }, []);

  const handleOpenDialog = () => setOpen(true);
  const handleCloseDialog = () => setOpen(false);

  const randomMenu = () => {
    const randomMenuList = menuList.sort((a, b) => {
      return 0.5 - Math.random();
    });
    setRandomMenuList([...randomMenuList]);
  };
  console.log(randomMenuList[0]);
  const miniDrawerWidth = '48px';
  return (
    <>
      <Grid container spacing={3} direction="row" style={{ width: `calc(100% - ${miniDrawerWidth})` }}>
        <Grid item lg={6}>
          <Section height={innerH}>
            <Grid container>
              {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                <Grid item style={{ width: '100%', maxHeight: innerH / 7 }}>
                  <Card day={WEEK_DAYS[n]} randomMenu={randomMenuList[n - 1]} daysimg={DAYS_ICON[n]} />
                </Grid>
              ))}
            </Grid>
          </Section>
        </Grid>

        <Grid item lg={6}>
          <Section height={innerH - 48} variant="outlined">
            <Grid container style={{ height: innerH, overflow: 'hidden', flexDirection: 'column' }}>
              <Grid item className={classes.gridItem}></Grid>
              <Grid item className={classes.gridItem}>
                <MenuList menuList={menuList} />
              </Grid>
              <Grid item className={classes.gridItem}>
                <div className={classes.btnGroup}>
                  <Button
                    content="食事を追加"
                    size="large"
                    endIcon={<PlaylistAddIcon />}
                    onClick={handleOpenDialog}
                    className={classes.mainBtn}
                  />
                  <MenuEditDialog
                    title="食事を追加"
                    content="ここで自分の食べたいものを追加して、一週間の食事リストを作りましょう！"
                    label="食事　例：オムライス　など"
                    nextButton="追加する"
                    cancleButton="やめる"
                    open={open}
                    onClose={handleCloseDialog}
                  />

                  {/* 用onClick呼叫setTest去改變內容 */}
                  <Button
                    content="シャッフル！"
                    size="large"
                    endIcon={<RestaurantIcon />}
                    onClick={randomMenu}
                    className={classes.mainBtn}
                  />
                </div>
                {/* <div className={classes.btnGroup}>
                  <Button
                    content="ログアウト"
                    size="large"
                    endIcon={<ExitToAppIcon />}
                    onClick={logout}
                    className={classes.subBtn}
                  />
                </div> */}
              </Grid>
            </Grid>
          </Section>
        </Grid>
      </Grid>

      <MiniDrawer />
    </>
  );
}

export default Home;
