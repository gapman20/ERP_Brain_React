import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

export default function ButtonUsage({ onClick }) {
  return <Button variant="outlined" onClick={onClick}>Click Me</Button>;
}

ButtonUsage.propTypes = {
  onClick: PropTypes.func.isRequired,
};