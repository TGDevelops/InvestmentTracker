import React from 'react'
import { styled } from '@mui/material/styles';
import { Button } from '@material-ui/core';

const BootstrapButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    color: 'white',
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    backgroundColor: '#000000',
  });

const BootStrapButton = (props) => {
    const label = props.label;
    const onClickEvent = props.onClickEvent;
  return (
        <BootstrapButton
            variant="contained"
            onClick={onClickEvent}
            type="submit"
          >
            {label}
        </BootstrapButton>
  )
}

export default BootStrapButton