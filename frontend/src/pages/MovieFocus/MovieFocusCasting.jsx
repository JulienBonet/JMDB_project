import { useLoaderData } from 'react-router-dom';
// icon
import focusCastingIco from '../../assets/ico/focus_casting.png';
// hook
import useMovieFocusPage from '../../hooks/useMovieFocusPage';
// component
import MovieFocusLayout from '../../components/MovieFocusLayout/MovieFocusLayout';

function MovieFocusCasting() {
  const themaData = useLoaderData();

  const focusState = useMovieFocusPage({
    mode: 'artist',
    type: 'casting',
    initialData: themaData,
  });

  return (
    <MovieFocusLayout
      {...focusState}
      icon={focusCastingIco}
      alt="Les stars"
      title="LES STARS"
      initialData={themaData}
      showChronologicalFocus={true}
    />
  );
}

export default MovieFocusCasting;
