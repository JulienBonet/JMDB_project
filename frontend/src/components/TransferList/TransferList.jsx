/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { FixedSizeList } from 'react-window';
import {
  Modal,
  Box,
  Container,
  Grid,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Button,
  Paper,
  TextField,
  MenuItem,
} from '@mui/material';
// Services
import { getByName } from '../../services/movieService';
// components
import CreateItemCard from '../AdminFeatures/AdminItemsCards/CreateItemCard';

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

export default function TransferList({
  items,
  selectedKinds,
  onSelectedKindsUpdate,
  selectedDirectors,
  onSelectedDirectorsUpdate,
  selectedScreenwriters,
  onSelectedScreenwritersUpdate,
  selectedMusic,
  onSelectedMusicUpdate,
  selectedCasting,
  onSelectedCastingUpdate,
  selectedStudios,
  onSelectedStudiosUpdate,
  selectedCountries,
  onSelectedCountriesUpdate,
  selectedLanguages,
  onSelectedLanguagesUpdate,
  selectedTags,
  onSelectedTagsUpdate,
  selectedFocus,
  onSelectedFocusUpdate,
  dataType,
}) {
  let selectedItems;
  let onSelectedItemsUpdate;

  switch (dataType) {
    case 'kinds':
      selectedItems = selectedKinds || [];
      onSelectedItemsUpdate = onSelectedKindsUpdate || (() => {});
      break;
    case 'directors':
      selectedItems = selectedDirectors || [];
      onSelectedItemsUpdate = onSelectedDirectorsUpdate || (() => {});
      break;
    case 'screenwriters':
      selectedItems = selectedScreenwriters || [];
      onSelectedItemsUpdate = onSelectedScreenwritersUpdate || (() => {});
      break;
    case 'music':
      selectedItems = selectedMusic || [];
      onSelectedItemsUpdate = onSelectedMusicUpdate || (() => {});
      break;
    case 'casting':
      selectedItems = selectedCasting || [];
      onSelectedItemsUpdate = onSelectedCastingUpdate || (() => {});
      break;
    case 'studio':
    case 'studios':
      selectedItems = selectedStudios || [];
      onSelectedItemsUpdate = onSelectedStudiosUpdate || (() => {});
      break;
    case 'country':
    case 'countries':
      selectedItems = selectedCountries || [];
      onSelectedItemsUpdate = onSelectedCountriesUpdate || (() => {});
      break;
    case 'languages/sorted_id':
    case 'languages':
      selectedItems = selectedLanguages || [];
      onSelectedItemsUpdate = onSelectedLanguagesUpdate || (() => {});
      break;
    case 'tags/sorted_id':
    case 'tags':
      selectedItems = selectedTags || [];
      onSelectedItemsUpdate = onSelectedTagsUpdate || (() => {});
      break;
    case 'focus':
      selectedItems = selectedFocus || [];
      onSelectedItemsUpdate = onSelectedFocusUpdate || (() => {});
      break;
    default:
      selectedItems = [];
      onSelectedItemsUpdate = () => {};
  }

  const getOriginFromDataType = (dataType) => {
    switch (dataType) {
      case 'directors':
        return 'director';
      case 'casting':
        return 'casting';
      case 'screenwriters':
        return 'screenwriter';
      case 'music':
        return 'compositor';
      case 'studio':
        return 'studio';
      case 'country':
        return 'country';
      case 'kinds':
        return 'kind';
      case 'languages/sorted_id':
        return 'language';
      case 'tags/sorted_id':
      case 'tags':
        return 'tag';
      case 'focus':
        return 'focus';
      default:
        return '';
    }
  };

  // État pour la barre de recherche dans la liste de droite
  const [searchTermRight, setSearchTermRight] = useState('');
  const [focusCategory, setFocusCategory] = useState('all');

  // Modal createdItemCard
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
  };
  const [modalOrigin, setModalOrigin] = useState(''); // <- stocke le type d'item

  const openModal = (dt) => {
    setShowModal(true); // ouvre le modal
    setModalOrigin(dt); // stocke le dataType actuel
    setSearchTermRight(''); // reset search si besoin
  };

  // Item List
  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState(selectedItems || []);
  const [right, setRight] = useState(
    (items || []).filter((item) => !(selectedItems || []).some((kind) => kind.id === item.id))
  );

  useEffect(() => {
    setRight(
      (items || []).filter(
        (item) => !(selectedItems || []).some((selectedItem) => selectedItem.id === item.id)
      )
    );
  }, [items, selectedItems]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));

    const updatedSelectedItems = selectedItems.filter(
      (item) => !leftChecked.some((checkedItem) => checkedItem.id === item.id)
    );
    onSelectedItemsUpdate(updatedSelectedItems);
  };

  const handleCheckedLeft = () => {
    const updatedSelectedItems = left.concat(rightChecked);

    setLeft(updatedSelectedItems);

    setRight(
      not(right, rightChecked).filter(
        (item) => !selectedItems.some((selectedItem) => selectedItem.id === item.id)
      )
    );

    setChecked(not(checked, rightChecked));

    onSelectedItemsUpdate(updatedSelectedItems);
  };

  // Fonction pour filtrer les items de droite en fonction de la recherche ou focus

  const cleanedRight = useMemo(
    () => (right || []).filter((item) => item && item.name && item.name.trim() !== ''),
    [right]
  );

  const focusCategories = useMemo(() => {
    if (dataType !== 'focus') return [];

    const categories = cleanedRight
      .map((item) => item.categoryName) // <- ici
      .filter(Boolean);

    return ['all', ...new Set(categories)];
  }, [cleanedRight, dataType]);

  const filteredRightItems = cleanedRight.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(searchTermRight.toLowerCase());

    if (dataType !== 'focus') {
      return matchSearch;
    }

    const matchCategory = focusCategory === 'all' || item.categoryName === focusCategory; // <- ici

    return matchSearch && matchCategory;
  });

  // Fonction pour gérer l'ajout d'un nouvel élément
  const handleNewItem = async (name) => {
    try {
      const endpoint = dataType === 'music' ? 'music' : getOriginFromDataType(dataType);
      const newItem = await getByName(endpoint, name);

      // Vérifie si l'item n'est pas déjà présent dans right
      if (!right.some((item) => item.id === newItem.id)) {
        setRight((prevRight) => [...prevRight, newItem]);
      } else {
        console.info("L'élément existe déjà dans right.");
      }

      setSearchTermRight(newItem.name);
    } catch (error) {
      console.error("Erreur lors de la récupération de l'élément :", error);
    }
  };

  // useMediaQuery
  const isSmall = useMediaQuery('(max-width: 768px)');
  const listHeight = isSmall ? 250 : 460;

  // ------------
  // SX
  // -----------

  const listPaperSx = {
    width: 350,
    height: listHeight,
    overflow: 'auto',
    overflowX: 'hidden',
    overflowY: 'hidden',
    border: 'solid 1px var(--color-04)',
  };

  // ---------------

  const customList = (items) => (
    <Paper sx={listPaperSx}>
      <FixedSizeList
        height={listHeight}
        width={350}
        itemCount={items.length}
        itemSize={50}
        style={{ overflowX: 'hidden', overflowY: 'auto' }}
      >
        {({ index, style }) => (
          <ListItemButton
            key={index}
            role="listitem"
            onClick={handleToggle(items[index])}
            style={style}
          >
            <ListItemIcon>
              <Checkbox
                checked={checked.indexOf(items[index]) !== -1}
                tabIndex={-1}
                disableRipple
              />
            </ListItemIcon>
            <ListItemText primary={items[index].name} />
          </ListItemButton>
        )}
      </FixedSizeList>
    </Paper>
  );
  return (
    <>
      <Grid
        container
        spacing={0}
        justifyContent="center"
        alignItems="center"
        sx={{
          width: '95%',
          margin: '0 auto',
          padding: '0',
          flexWrap: 'nowrap',
          flexDirection: 'row',
          gap: 2,
          '@media (max-width: 768px)': {
            flexDirection: 'column',
            alignItems: 'center',
          },
        }}
      >
        {/* LISTE DE GAUCHE */}
        <Grid
          item
          sx={{
            flexShrink: 1,
            flexGrow: 1,
            minWidth: { xs: '90%', sm: '40%', lg: '350px' },
            maxWidth: 500,
            display: 'flex',
            justifyContent: 'center',
            paddingLeft: {
              xs: 0,
              sm: '10px',
            },
          }}
        >
          {customList(left)}
        </Grid>
        {/* END LISTE DE GAUCHE */}

        {/* CENTRAL BOUTONS */}
        <Grid item>
          <Grid
            container
            direction={{ xs: 'row', md: 'column' }}
            alignItems="center"
            justifyContent="center"
            gap="0 1rem"
          >
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleCheckedRight}
              disabled={leftChecked.length === 0}
              aria-label="move selected right"
            >
              {isSmall ? '↓' : '>'}
            </Button>
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={() => openModal(dataType)}
              aria-label="add new item"
            >
              +
            </Button>
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleCheckedLeft}
              disabled={rightChecked.length === 0}
              aria-label="move selected left"
            >
              {isSmall ? '↑' : '<'}
            </Button>
          </Grid>
        </Grid>
        {/* CENTRAL BOUTONS */}

        {/* LISTE DE DROITE */}
        <Grid
          item
          sx={{
            flexShrink: 1,
            flexGrow: 1,
            minWidth: { xs: '90%', sm: '40%', lg: '350px' },
            maxWidth: 500,
            display: 'flex',
            justifyContent: 'center',
            paddingRight: {
              xs: 0,
              sm: '10px',
            },
          }}
        >
          <Paper sx={listPaperSx}>
            {/* Barre de filtre uniquement pour focus */}
            {dataType === 'focus' && (
              <TextField
                select
                label="Focus category"
                value={focusCategory}
                onChange={(e) => setFocusCategory(e.target.value)}
                sx={{ m: 1, width: '95%' }}
              >
                {focusCategories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat === 'all' ? 'Toutes les catégories' : cat}
                  </MenuItem>
                ))}
              </TextField>
            )}

            {/* Search */}
            <TextField
              sx={{ m: 1, width: '95%' }}
              fullWidth
              label="Search"
              variant="outlined"
              value={searchTermRight}
              onChange={(e) => setSearchTermRight(e.target.value)}
            />

            {/* Liste des items */}
            <FixedSizeList
              height={listHeight}
              width={350}
              itemCount={filteredRightItems.length}
              itemSize={50}
              style={{ overflowX: 'hidden', overflowY: 'auto' }}
            >
              {({ index, style }) => (
                <ListItemButton
                  key={index}
                  role="listitem"
                  onClick={handleToggle(filteredRightItems[index])}
                  style={style}
                >
                  <ListItemIcon>
                    <Checkbox
                      checked={checked.indexOf(filteredRightItems[index]) !== -1}
                      tabIndex={-1}
                      disableRipple
                    />
                  </ListItemIcon>
                  <ListItemText primary={filteredRightItems[index].name} />
                </ListItemButton>
              )}
            </FixedSizeList>
          </Paper>
        </Grid>
      </Grid>
      {/* end LISTE DE DROITE  */}

      {/* MODAL */}
      <Modal
        open={showModal}
        onClose={closeModal}
        sx={{
          overflowY: 'auto',
        }}
      >
        <Box
          sx={{
            minHeight: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            py: 2,
          }}
        >
          <Container maxWidth="sm">
            <Box
              onClick={closeModal}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  closeModal();
                }
              }}
              role="button"
              tabIndex={0}
              sx={{
                textAlign: 'right',
                fontFamily: 'var(--font-04)',
                fontWeight: 600,
                color: 'var(--color-02)',
                cursor: 'pointer',
                p: '1rem 1rem 1rem 0',
                mx: '5%',
              }}
            >
              X Fermer
            </Box>

            <CreateItemCard
              origin={getOriginFromDataType(modalOrigin)}
              onUpdate={(newItemName) => {
                setShowModal(false);
                handleNewItem(newItemName);
              }}
              closeModal={closeModal}
            />
          </Container>
        </Box>
      </Modal>
      {/* END MODAL */}
    </>
  );
}
