import React from 'react';

import Button from '@material-ui/core/Button';

const CustomizedButton = ({ content, ...props }) => (
  <Button
    variant="contained"
    style={{
      paddingRight: 36,
      paddingLeft: 36,
      lineHeight: 2,
      margin: '16px auto',
    }}
    {...props}
  >
    {content}
  </Button>
);

export default CustomizedButton;
