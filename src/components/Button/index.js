import React from 'react';

import Button from '@material-ui/core/Button';

const CustomizedButton = ({ content, ...props }) => (
  <Button variant="outlined" size="large" style={{ width: 300 }} {...props}>
    {content}
  </Button>
);

export default CustomizedButton;
