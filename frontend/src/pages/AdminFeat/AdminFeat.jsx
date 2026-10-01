import * as React from 'react';
import { useState } from 'react';
import { Button, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// component
import AdminMovieList from '../../components/AdminFeatures/AdminItemsLists/AdminMovieList';
import AdminDirectorList from '../../components/AdminFeatures/AdminItemsLists/AdminDirectorList';
import AdminCastingList from '../../components/AdminFeatures/AdminItemsLists/AdminCastingList';
import AdminScreenwriterList from '../../components/AdminFeatures/AdminItemsLists/AdminScreenwriterList';
import AdminCompositorList from '../../components/AdminFeatures/AdminItemsLists/AdminCompositorList';
import AdminStudioList from '../../components/AdminFeatures/AdminItemsLists/AdminStudioList';
import AdminGenreList from '../../components/AdminFeatures/AdminItemsLists/AdminGenreList';
import AdminCountryList from '../../components/AdminFeatures/AdminItemsLists/AdminCountryList';
import AdminTagsList from '../../components/AdminFeatures/AdminItemsLists/AdminTagsList';
import AdminLanguagesList from '../../components/AdminFeatures/AdminItemsLists/AdminLanguagesList';
import AdminFocusList from '../../components/AdminFeatures/AdminItemsLists/AdminFocusList';
import AdminUserList from '../../components/AdminFeatures/AdminItemsLists/AdminUserList';
import AdminExportStats from '../../components/AdminFeatures/AdminItemsLists/AdminExportStats';

function AdminFeat() {
  const theme = createTheme({
    palette: { primary: { main: '#00d9c0' }, secondary: { main: '#ffebaa' } },
  });

  const [selectedItem, setSelectedItem] = useState('FILMS');

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const renderSelectedItem = () => {
    switch (selectedItem) {
      case 'FILMS':
        return <AdminMovieList />;
      case 'REALISATEURS':
        return <AdminDirectorList />;
      case 'CASTING':
        return <AdminCastingList />;
      case 'SCENARISTES':
        return <AdminScreenwriterList />;
      case 'COMPOSITEURS':
        return <AdminCompositorList />;
      case 'STUDIO':
        return <AdminStudioList />;
      case 'GENRES':
        return <AdminGenreList />;
      case 'PAYS':
        return <AdminCountryList />;
      case 'LANGUES':
        return <AdminLanguagesList />;
      case 'TAGS':
        return <AdminTagsList />;
      case 'FOCUS':
        return <AdminFocusList />;
      case 'USERS':
        return <AdminUserList />;
      case 'STATS':
        return <AdminExportStats />;
      default:
        return null;
    }
  };

  const navItems = [
    'FILMS',
    'REALISATEURS',
    'CASTING',
    'SCENARISTES',
    'COMPOSITEURS',
    'STUDIO',
    'GENRES',
    'PAYS',
    'LANGUES',
    'TAGS',
    'FOCUS',
    'USERS',
    'STATS',
  ];

  return (
    <main>
      {/* HEADER */}
      <Box
        component="section"
        id="AdminFeatNav"
        sx={{
          my: 2,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <ThemeProvider theme={theme}>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 1,
              width: '90%',
              margin: 'auto',
            }}
          >
            {navItems.map((item) => (
              <Button
                key={item}
                variant={selectedItem === item ? 'contained' : 'outlined'}
                color="primary"
                onClick={() => handleItemClick(item)}
                sx={{ flex: '1 1 140px', minWidth: '120px', maxWidth: '200px' }}
              >
                {item}
              </Button>
            ))}
          </Box>
        </ThemeProvider>
      </Box>
      {/* END HEADER */}

      {/* ADMIN CONTENTS */}
      <Box
        component="section"
        id="AdminFeatContainer"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          id="AdminFeatContent"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'aliceblue',
            width: '95%',
            borderRadius: '25px',
            pb: 8,
            mb: 8,
          }}
        >
          {renderSelectedItem()}
        </Box>
      </Box>
      {/* ADMIN CONTENTS */}
    </main>
  );
}

export default AdminFeat;
