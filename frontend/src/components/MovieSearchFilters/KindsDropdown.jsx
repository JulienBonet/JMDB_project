/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { Select, MenuItem, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MovieTwoToneIcon from '@mui/icons-material/MovieTwoTone';
// services
import { getKinds } from '../../services/referenceDataService';
// SX
import { filterSelectSx, filterMenuProps } from './MovieSearchFiltersStyles';

function KindsDropdown({ onKindChange, selectedKindData }) {
  const [kinds, setKinds] = useState([]);
  // breakpoint for placeholder or icon
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  //------------------
  // REQUEST ALL KINDS
  //------------------
  useEffect(() => {
    getKinds()
      .then(setKinds)
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (event) => onKindChange(event.target.value);

  //------------------
  // RETURN
  //------------------
  return (
    <Select
      value={selectedKindData}
      onChange={handleChange}
      displayEmpty
      sx={filterSelectSx}
      MenuProps={filterMenuProps}
    >
      {/* Placeholder / icône mobile */}
      <MenuItem value="">
        {isTablet ? <MovieTwoToneIcon sx={{ fontSize: 20, mr: 1 }} /> : 'GENRES'}
      </MenuItem>

      {kinds.map((kind) => (
        <MenuItem key={kind.id} value={kind.name}>
          {kind.name}
        </MenuItem>
      ))}
    </Select>
  );
}

export default KindsDropdown;
