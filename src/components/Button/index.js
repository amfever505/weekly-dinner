import React from 'react';

import Button from '@material-ui/core/Button';

const CustomizedButton = ({ content, ...props }) => (
  <Button variant="contained" style={{ width: 300, margin: 8 }} {...props}>
    {content}
  </Button>
);

export default CustomizedButton;
