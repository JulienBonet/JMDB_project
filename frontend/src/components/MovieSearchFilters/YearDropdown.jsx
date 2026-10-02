/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { Select, MenuItem, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';
// services
import { getDecades } from '../../services/referenceDataService';
// SX
import { filterSelectSx, filterMenuProps } from './MovieSearchFiltersStyles';

function YearDropdown({ onYearChange, selectedYearData }) {
  const [decades, setDecades] = useState([]);
  // breakpoint for placeholder or icon
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  //------------------
  // REQUEST ALL YEARS / DECADES
  //------------------
  useEffect(() => {
    getDecades()
      .then(setDecades)
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (event) => {
    onYearChange(event.target.value);
  };

  //------------------
  // RETURN
  //------------------
  return (
    <Select
      value={selectedYearData}
      onChange={handleChange}
      displayEmpty
      sx={filterSelectSx}
      MenuProps={filterMenuProps}
    >
      {/* Placeholder / icône mobile */}
      <MenuItem value="">
        {isTablet ? <CalendarMonthTwoToneIcon sx={{ fontSize: 20, mr: 1 }} /> : 'PERIODE'}
      </MenuItem>

      {decades.map((decade) => (
        <MenuItem key={decade.decade} value={decade.decade}>
          Années {decade.decade}
        </MenuItem>
      ))}
    </Select>
  );
}

export default YearDropdown;
