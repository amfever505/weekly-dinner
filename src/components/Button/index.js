import React from 'react';

import Button from '@material-ui/core/Button';

const CustomizedButton = ({ ...props }) => (
  <Button variant="outlined" size="large" style={{ width: 300 }} {...props}>
    熊熊
  </Button>
);

export default CustomizedButton;
