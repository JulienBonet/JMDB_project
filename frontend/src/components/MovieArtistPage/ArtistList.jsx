/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Box, Button } from '@mui/material';
import AlphabetDropdown from '../AlphabetOption/AlphabetDropdown';
import Counter from '../Counters/Counters';

function ArtistList({
  handleLetterChange,
  search,
  selectedByLetter,
  filteredArtist,
  handleArtistClick,
  origin,
  artistAmount,
  selectedArtistAmount,
}) {
  const [selectedArtistId, setSelectedArtistId] = useState(null);

  const artistsToDisplay = search === '' ? selectedByLetter : filteredArtist;

  const countToDisplay = search === '' ? artistAmount : selectedArtistAmount;

  return (
    <Box
      component="section"
      id="MovieArtist_group_section"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: {
          xs: '50%',
          md: '30%',
          lg: '20%',
        },
        height: '90vh',
      }}
    >
      <Counter origin={origin} countAmount={countToDisplay} />
      <AlphabetDropdown
        onLetterChange={handleLetterChange}
        origin={origin}
        AlphabetDropdownClassName="artistlist"
        search={search}
      />
      <Box
        id="MovieArtist_list_container"
        sx={{
          width: '100%',
          height: {
            xs: '60vh',
            sm: '75vh',
            md: '65vh',
          },

          overflow: 'auto',
          my: 1,
          pt: 2,
        }}
      >
        <Box
          id="MovieArtist_list"
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {artistsToDisplay.map((artist) => (
            <Button
              key={artist.id}
              variant="text"
              color="primary"
              size="small"
              onClick={() => {
                setSelectedArtistId(artist.id);
                handleArtistClick(artist);
              }}
              sx={{
                fontFamily: 'var(--font-04)',
                color: selectedArtistId === artist.id ? 'var(--color-03)' : 'var(--color-01)',
                fontWeight: selectedArtistId === artist.id ? 'bold' : 'none',
                fontSize: 'medium',
                display: 'flex',
                flexWrap: 'wrap',
                width: '90%',
              }}
            >
              {artist.name}
            </Button>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
export default ArtistList;
