import React from 'react';

import Paper from '@material-ui/core/Paper';

const Section = ({ height, children, ...props }) => (
  <Paper
    style={{
      height,
      position: 'relative'
    }}
    elevation={0}
    {...props}
  >
    {children}
  </Paper>
);

export default Section;
