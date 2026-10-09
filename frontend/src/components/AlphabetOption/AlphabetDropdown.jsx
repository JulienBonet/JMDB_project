/* eslint-disable react/prop-types */
import { Box } from '@mui/material';

const LETTERS = Array.from({ length: 26 }, (_, index) => String.fromCharCode(65 + index));

const NUMBERS = Array.from({ length: 10 }, (_, index) => String(index));

function AlphabetDropdown({ onLetterChange, origin, search }) {
  const options = origin === 'tags' ? [...NUMBERS, ...LETTERS] : LETTERS;

  return (
    <Box
      component="select"
      onChange={(event) => onLetterChange(event.target.value)}
      sx={{
        textAlign: 'center',
        fontFamily: 'var(--font-02)',
        color: 'var(--color-02)',
        backgroundColor: 'var(--color-04)',
        border: '1px solid white',
        borderTop: 0,
        padding: '5px 0',
        cursor: 'pointer',
        width: { xs: '25%', sm: '16%' },
        fontSize: { xs: 'small', md: 'medium' },
        fontWeight: 'bold',
        borderRadius: '0 0 10px 10px',
      }}
    >
      {search !== '' && <option value="">-</option>}
      {options.map((char) => (
        <option key={char} value={char}>
          {char}{' '}
        </option>
      ))}{' '}
    </Box>
  );
}

export default AlphabetDropdown;
