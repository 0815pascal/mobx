import { Button } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';

const StyledButton = styled(Button)({
  borderRadius: '.5rem',
  textTransform: 'none',
  appearance: 'button',
  fontSize: '.875rem',
  fontWeight: '600',
  padding: '8px 12px',
  minHeight: '2.25rem',
  lineHeight: '1.25rem',
  backgroundColor: '#00008f',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  backgroundClip: 'padding-box',
  border: '0 solid #00008f',
  textDecoration: 'none',
  '&:hover': {
    backgroundColor: 'hsl(240 100% 33% / 1)',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
});

const fullWidthStyle = {
  width: '100%',
  margin: 0,
};

export const ContainedButton = ({ onClick, fullWidth = false, type = '', form = '', color = 'primary', size = 'medium', disabled, text = '', style = {}, wide = false, ...rest }) => {
  let wideStyle;
  if (fullWidth) {
    return (
      <StyledButton style={fullWidthStyle} type={type} form={form} disabled={disabled} color={color} size={size} variant="contained" sx={style} onClick={onClick}>
        {text}
      </StyledButton>
    );
  }

  if (wide) wideStyle = { ...style, padding: '0 3rem' };

  return (
    <StyledButton {...rest} type={type} form={form} disabled={disabled} color={color} size={size} variant="contained" sx={wideStyle} onClick={onClick}>
      {text}
    </StyledButton>
  );
};
