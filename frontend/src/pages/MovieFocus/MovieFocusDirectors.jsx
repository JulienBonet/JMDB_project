import { useLoaderData } from 'react-router-dom';

import focusDirectorsIco from '../../assets/ico/focus_directors.png';
import useMovieFocusPage from '../../hooks/useMovieFocusPage';
import MovieFocusLayout from '../../components/MovieFocusLayout/MovieFocusLayout';

function MovieFocusDirectors() {
  const themaData = useLoaderData();

  const focusState = useMovieFocusPage({
    mode: 'artist',
    type: 'directors',
    initialData: themaData,
  });

  return (
    <MovieFocusLayout
      {...focusState}
      icon={focusDirectorsIco}
      alt="Les grands auteurs"
      title="LES GRANDS AUTEURS"
      initialData={themaData}
      showChronologicalFocus={true}
    />
  );
}

export default MovieFocusDirectors;
