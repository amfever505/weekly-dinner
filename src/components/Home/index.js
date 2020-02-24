import React, { useState } from 'react';

import Section from '../Section';
import Grid from '@material-ui/core/Grid';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import RestaurantIcon from '@material-ui/icons/Restaurant';

import Card from '../Card';
import Button from '../Button';
import Dialog from '../Dialog';
import { WEEK_DAYS } from '../../constants';

function Home() {
  //用useState來寫網頁原始值（什麼都沒有的狀態）再用setVar的方式改變內容
  const [test, setTest] = useState('');
  const [open, setOpen] = useState(false);

  const handleOpenDialog = () => setOpen(true);

  const handleCloseDialog = () => setOpen(false);

  return (
    <Grid container spacing={3} direction="column">
      <Grid item>
        <Section>
          <Grid container>
            {[1, 2, 3, 4, 5, 6, 7].map(n => (
              <Grid item style={{ width: '14.28%' }} wrap="nowrap">
                <Card day={WEEK_DAYS[n]} content={test} />
              </Grid>
            ))}
          </Grid>
        </Section>
      </Grid>
      <Grid item>
        <Section height={400} variant="outlined">
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
              content="熊熊"
              color="secondary"
              size="large"
              endIcon={<RestaurantIcon />}
              onClick={() => setTest('hi')}
            />
            <Dialog open={open} handleCloseDialog={handleCloseDialog} />
          </div>
        </Section>
      </Grid>
    </Grid>
  );
}

export default Home;
