import React from 'react';

import Paper from '@material-ui/core/Paper';

const Section = ({ height, children }) => (
  <Paper
    variant="outlined"
    style={{
      height,
      position: 'relative'
    }}
  >
    {children}
  </Paper>
);

export default Section;
