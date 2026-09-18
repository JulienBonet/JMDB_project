import { useLoaderData } from 'react-router-dom';

import themaIco from '../../assets/ico/focus_thema.png';
import useMovieFocusPage from '../../hooks/useMovieFocusPage';
import MovieFocusLayout from '../../components/MovieFocusLayout/MovieFocusLayout';

function MovieThema() {
  const themaData = useLoaderData();

  const focusState = useMovieFocusPage({
    mode: 'focus',
    category: 1,
    initialData: themaData,
  });

  return (
    <MovieFocusLayout
      {...focusState}
      icon={themaIco}
      alt="Thémas"
      title="THEMAS"
      initialData={themaData}
    />
  );
}

export default MovieThema;
