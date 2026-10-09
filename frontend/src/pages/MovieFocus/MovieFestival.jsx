import { useLoaderData } from 'react-router-dom';
// icon
import festivalIco from '../../assets/ico/focus_festival.png';
// hook
import useMovieFocusPage from '../../hooks/useMovieFocusPage';
// component
import MovieFocusLayout from '../../components/MovieFocusLayout/MovieFocusLayout';

function MovieFestival() {
  const themaData = useLoaderData();

  const focusState = useMovieFocusPage({
    mode: 'focus',
    category: 2,
    initialData: themaData,
  });

  return (
    <MovieFocusLayout
      {...focusState}
      icon={festivalIco}
      alt="Festivals"
      title="FESTIVALS"
      initialData={themaData}
    />
  );
}

export default MovieFestival;
