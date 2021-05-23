import React, { useState, useEffect, useCallback } from 'react';

import Section from '../Section';
import Grid from '@material-ui/core/Grid';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import { makeStyles } from '@material-ui/core/styles';

import Card from '../Card';
import Button from '../Button';
import MenuEditDialog from '../Dialog';
import MiniDrawer from '../Drawer';
import OptionList from '../OptionList';
import WelcomeDialog from '../Popup';
import Slideshow from '../Slideshow';
import { WEEK_DAYS, DAYS_ICON, innerH } from '../../constants';

import { login, checkLogin, getMenuList } from '../../firebase/api';
import MenuList from '../MenuList';
import { Autocomplete } from '@material-ui/lab';

const useStyles = makeStyles({
  root: {
    width: '100%-40px',
  },
  gridItem: {
    height: (innerH - 40) / 3,
    overflow: 'auto',
    margin: 0,
  },
  contentRoot: {
    height: innerH * 0.5 - 240,
  },
  btnGroup: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    justifyContent: 'center',
  },
  mainBtn: {
    paddingRight: 36,
    paddingLeft: 36,
    display: 'flex',
    lineHeight: 2,
    alignItems: 'center',
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
  const [welcome, setWelcome] = useState(true);
  const [menuList, setMenuList] = useState([]);
  const classes = useStyles();

  const [daysValue, setDaysValue] = useState('7');
  const [duplicated, setDuplicated] = useState('on');
  const handleDaysValueChange = useCallback(
    (event) => {
      setDaysValue(event.target.value);
    },
    [setDaysValue]
  );

  const handleDuplicatedOption = useCallback(
    (event) => {
      setDuplicated(event.target.value);
    },
    [setDuplicated]
  );

  // equals react componenDidMount()
  useEffect(() => {
    checkLogin().subscribe((user) => {
      if (user) {
        console.log('login success!', user);
        getMenuList().subscribe((data) => {
          setMenuList(data);
          // setWelcome(true);
        });
      } else {
        login();
        window.alert(
          'こちらはWeekly menu!まずはログインしてください！（アカウント情報はFirebaseにより暗号化され、管理者にも分からないようにしており、ご安心してください♪( ´▽｀)'
        );
      }
    });
  }, []);

  const handleOpenDialog = () => setOpen(true);
  const handleCloseDialog = () => setOpen(false);
  const handleCloseWelcome = () => setWelcome(false);
  const randomMenu = () => {
    const clonedList = [...menuList];
    let randomList = [];
    if (clonedList.length < Number(daysValue)) {
      //少於餐數，重複取出
      if (duplicated === 'on') {
        //清單少於餐數（7或14）時先隨機將餐數補滿
        if (clonedList.length < Number(daysValue)) {
          for (let i = clonedList.length; i < Number(daysValue); i++) {
            const item = clonedList[Math.floor(Math.random() * clonedList.length)];
            clonedList.push(item);
          }
        }
        randomList = clonedList.sort(function (a, b) {
          return 0.5 - Math.random();
        });
      } else {
        // 少於餐數不重複
        for (let i = 0; i < Number(daysValue) - clonedList.length; i++) {
          clonedList.push('');
        }
        randomList = clonedList.sort(function (a, b) {
          return 0.5 - Math.random();
        });
      }
    } else {
      //正常情況
      randomList = clonedList
        .sort(function (a, b) {
          return 0.5 - Math.random();
        })
        .slice(0, Number(daysValue));

      console.log(randomList);
    }
    setRandomMenuList([...randomList]);
  };
  const randomMenuList2 = randomMenuList.slice(7);
  console.log(randomMenuList, randomMenuList2);
  const miniDrawerWidth = '48px';
  return (
    <>
      <WelcomeDialog
        open={welcome}
        onClose={handleCloseWelcome}
        popupTitle={'ようこそ、Weekly menu!ーー何を食べる？'}
        popupContent={<Slideshow />}
      ></WelcomeDialog>

      <Grid container spacing={1} direction="row" style={{ width: `calc(100% - ${miniDrawerWidth})` }}>
        <Grid item lg md sm={12} xs={12}>
          <Section height={innerH - 40} variant="outlined">
            <Grid container style={{ height: innerH - 40, overflow: 'hidden', flexDirection: 'column' }}>
              <Grid item className={classes.gridItem}>
                <OptionList
                  daysValue={daysValue}
                  handleDaysValueChange={handleDaysValueChange}
                  duplicated={duplicated}
                  handleDuplicatedOption={handleDuplicatedOption}
                />
              </Grid>
              <Grid item className={classes.gridItem}>
                <MenuList menuList={menuList} />
              </Grid>
              <Grid item className={classes.gridItem}>
                <Grid container direction="row" justify="space-evenly" className={classes.btnGroup}>
                  <Grid item lg={6} md xs={12} alignItems="center">
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
                  </Grid>
                  <Grid item lg={6} md xs={12}>
                    {/* 用onClick呼叫setTest去改變內容 */}

                    <a href="#list">
                      <Button
                        content="シャッフル！"
                        size="large"
                        endIcon={<RestaurantIcon />}
                        onClick={randomMenu}
                        className={classes.mainBtn}
                      />
                    </a>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Section>
        </Grid>

        <Grid item lg md sm={12} xs={12}>
          <Section height={innerH - 40} id="list">
            <Grid container>
              {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                <Grid item style={{ width: '100%', maxHeight: innerH / 7 }}>
                  <Card
                    day={WEEK_DAYS[n]}
                    randomMenu={randomMenuList[n - 1]}
                    randomMenu2={randomMenuList2[n - 1]}
                    daysimg={DAYS_ICON[n]}
                    randomMenuList={randomMenuList}
                  />
                </Grid>
              ))}
            </Grid>
          </Section>
        </Grid>
      </Grid>
      <MiniDrawer />
    </>
  );
}

export default Home;
