import { useLoaderData } from 'react-router-dom';

import collectionIco from '../../assets/ico/focus_collection.png';
import useMovieFocusPage from '../../hooks/useMovieFocusPage';
import MovieFocusLayout from '../../components/MovieFocusLayout/MovieFocusLayout';

function MovieCollection() {
  const themaData = useLoaderData();

  const focusState = useMovieFocusPage({
    mode: 'focus',
    category: 3,
    initialData: themaData,
  });

  return (
    <MovieFocusLayout
      {...focusState}
      icon={collectionIco}
      alt="Collections"
      title="COLLECTIONS"
      initialData={themaData}
    />
  );
}

export default MovieCollection;
