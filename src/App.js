import React from 'react';

import Section from '../src/components/Section';
import Grid from '@material-ui/core/Grid';
import './App.css';

function App() {
  return (
    <div className="App">
      <Section>
        <Grid container>
          {[1, 2, 3, 4, 5, 6, 7].map(n => (
            <Grid item style={{ width: '14.28%' }} wrap="nowrap">
              {n}
            </Grid>
          ))}
        </Grid>
      </Section>
      <Section>
        <div></div>
      </Section>
    </div>
  );
}

export default App;
