import React, { useState } from 'react';

import Section from '../src/components/Section';
import Grid from '@material-ui/core/Grid';

import Card from '../src/components/Card';
import Button from '../src/components/Button';
import { WEEK_DAYS } from '../src/constants';

import './App.css';

function App() {
  //用useState來寫網頁原始值（什麼都沒有的狀態）再用setVar的方式改變內容
  const [test, setTest] = useState('');

  return (
    <div className="App">
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
              {/* 用onClick呼叫setTest去改變內容 */}
              <Button onClick={() => setTest('hi')} />
            </div>
          </Section>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
