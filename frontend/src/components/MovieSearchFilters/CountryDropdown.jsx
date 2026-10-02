/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { Select, MenuItem, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PublicIcon from '@mui/icons-material/Public';
// services
import { getCountries } from '../../services/referenceDataService';
// SX
import { filterSelectSx, filterMenuProps } from './MovieSearchFiltersStyles';

function CountryDropdown({ onCountryChange, selectedCountryData }) {
  const [countries, setCountries] = useState([]);
  // breakpoint for placeholder or icon
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  // --- Fetch des pays ---
  useEffect(() => {
    getCountries()
      .then(setCountries)
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (event) => {
    onCountryChange(event.target.value);
  };

  return (
    <Select
      value={selectedCountryData}
      onChange={handleChange}
      displayEmpty
      sx={filterSelectSx}
      MenuProps={filterMenuProps}
    >
      <MenuItem value="">
        {isTablet ? <PublicIcon sx={{ fontSize: 18, mr: 1 }} /> : 'PAYS'}
      </MenuItem>

      {countries.map((country) => (
        <MenuItem key={country.id} value={country.name}>
          {country.name}
        </MenuItem>
      ))}
    </Select>
  );
}

export default CountryDropdown;
