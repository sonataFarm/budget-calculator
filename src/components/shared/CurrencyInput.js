import React from 'react';
import currency from '../../util/currency';
import { InputLabel, Input, InputAdornment } from '@material-ui/core';

const CurrencyInput = ({ label, value, onChange }) => {
  const handleChange = e => {
    e.preventDefault();
    const numericOnly = e.currentTarget.value.replaceAll(/\D/g, '');
    onChange(numericOnly);
  }

  const renderValue = () => {
    if (value.match(/\D/)) {
      console.err('CurrencyInput received a non-numeric value');
    }
    return currency.usd(value);
  };

  return (
    <div>
      <InputLabel htmlFor="budget">{label}</InputLabel>
      <Input
        id="budget"
        value={renderValue()}
        onChange={handleChange}
        size="med"
      />
    </div>
  );
};

export default CurrencyInput;