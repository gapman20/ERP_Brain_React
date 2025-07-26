import * as React from 'react';
import Button from '@mui/material/Button';

export default function ButtonUsage({ onClick}) {
  return <Button variant="outlined" onClick={onClick}>Click Me</Button>;
}