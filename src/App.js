import React from 'react';

import Section from '../src/components/Section';
import Grid from '@material-ui/core/Grid';

import Card from '../src/components/Card';
import Button from '../src/components/Button';
import './App.css';

function App() {
  return (
    <div className="App">
      <Grid container spacing={3} direction="column">
        <Grid item>
          <Section>
            <Grid container>
              {[1, 2, 3, 4, 5, 6, 7].map(n => (
                <Grid item style={{ width: '14.28%' }} wrap="nowrap">
                  <Card />
                </Grid>
              ))}
            </Grid>
          </Section>
        </Grid>
        <Grid item>
          <Section height={400}>
            <div
              style={{
                height: '100%',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Button />
            </div>
          </Section>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
