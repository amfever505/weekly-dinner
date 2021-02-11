import React, { useState, useEffect } from 'react';

import Section from '../Section';
import Grid from '@material-ui/core/Grid';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import Card from '../Card';
import Button from '../Button';
import MenuEditDialog from '../Dialog';
import { WEEK_DAYS, DAYS_ICON, innerH } from '../../constants';

import { login, checkLogin, logout, getMenuList, getUid, menuRef } from '../../firebase/api';
import MenuList from '../MenuList';

function Home() {
  //用useState來寫網頁原始值（什麼都沒有的狀態）再用setVar的方式改變內容
  const [test, setTest] = useState('');
  const [open, setOpen] = useState(false);
  const [menuList, setMenuList] = useState([]);

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
    const randomMenuName = menuList
      .map((m) => m.name)
      .sort(function (a, b) {
        return 0.5 - Math.random();
      });
    setTest(randomMenuName);
  };

  return (
    <Grid container spacing={3} direction="column">
      <Grid item>
        <Section height={innerH / 2}>
          <Grid container>
            {[1, 2, 3, 4, 5, 6, 7].map((n) => (
              <Grid item style={{ width: '14.28%' }} wrap="nowrap">
                <Card day={WEEK_DAYS[n]} content={test[n - 1]} daysimg={DAYS_ICON[n]} />
              </Grid>
            ))}
          </Grid>
        </Section>
      </Grid>

      <Grid item>
        <Section height={innerH * 0.4} variant="outlined">
          <Grid container style={{ maxHeight: innerH * 0.4, overflow: 'hidden' }}>
            <Grid xs={4}></Grid>
            <Grid item xs={5}>
              <MenuList menuList={menuList} />
            </Grid>
            <Grid item xs={3}>
              <div
                style={{
                  height: '100%',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Button
                  content="食事を追加"
                  size="large"
                  endIcon={<PlaylistAddIcon />}
                  onClick={handleOpenDialog}
                  style={{
                    paddingRight: 36,
                    paddingLeft: 36,
                    lineHeight: 2,
                    margin: 16,
                    color: '#d675af',
                    background: '#484848',
                  }}
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
                  style={{
                    paddingRight: 36,
                    paddingLeft: 36,
                    lineHeight: 2,
                    margin: 16,
                    color: '#d675af',
                    background: '#484848',
                  }}
                />

                <Button
                  content="ログアウト"
                  size="large"
                  endIcon={<ExitToAppIcon />}
                  onClick={logout}
                  style={{
                    paddingRight: 36,
                    paddingLeft: 36,
                    lineHeight: 2,
                    margin: 16,
                    color: '#fff',
                    background: '#d675af',
                  }}
                />
              </div>
            </Grid>
          </Grid>
        </Section>
      </Grid>
    </Grid>
  );
}

export default Home;
