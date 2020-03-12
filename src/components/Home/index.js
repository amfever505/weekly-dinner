import React, { useState, useEffect } from 'react';

import Section from '../Section';
import Grid from '@material-ui/core/Grid';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import RestaurantIcon from '@material-ui/icons/Restaurant';

import Card from '../Card';
import Button from '../Button';
import Dialog from '../Dialog';
import { WEEK_DAYS } from '../../constants';
import { menuRef } from '../../firebase/api';
import MenuList from '../MenuList';

function Home() {
  //用useState來寫網頁原始值（什麼都沒有的狀態）再用setVar的方式改變內容
  const [test, setTest] = useState('');
  const [open, setOpen] = useState(false);
  const [menuList, setMenuList] = useState([]);

  // equals react componenDidMount()
  useEffect(() => {
    menuRef.on('value', snapshot => {
      //忘記這邊的snapshot.val是什麼了
      setMenuList(snapshot.val() ? Object.values(snapshot.val()) : []);
    });
  }, []);

  const handleOpenDialog = () => setOpen(true);

  const handleCloseDialog = () => setOpen(false);

  const randomMenu = () => {
    const randomMenuName = menuList
      .map(m => m.name)
      .sort(function(a, b) {
        return 0.5 - Math.random();
      });
    setTest(randomMenuName);
  };

  return (
    <Grid container spacing={3} direction="column">
      <Grid item>
        <Section>
          <Grid container>
            {[1, 2, 3, 4, 5, 6, 7].map(n => (
              <Grid item style={{ width: '14.28%' }} wrap="nowrap">
                <Card day={WEEK_DAYS[n]} content={test[n - 1]} />
              </Grid>
            ))}
          </Grid>
        </Section>
      </Grid>

      <Grid item>
        <Section height={400} variant="outlined">
          <Grid container>
            <Grid item xs={6}>
              <MenuList menuList={menuList} />
            </Grid>
            <Grid item xs={6}>
              <div
                style={{
                  height: '100%',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Button
                  content="食事を追加"
                  color="secondary"
                  size="large"
                  endIcon={<PlaylistAddIcon />}
                  onClick={handleOpenDialog}
                />
                {/* 用onClick呼叫setTest去改變內容 */}
                <Button
                  content="シャッフル！"
                  color="secondary"
                  size="large"
                  endIcon={<RestaurantIcon />}
                  onClick={randomMenu}
                />
                <Dialog open={open} handleCloseDialog={handleCloseDialog} />
              </div>
            </Grid>
          </Grid>
        </Section>
      </Grid>
    </Grid>
  );
}

export default Home;
