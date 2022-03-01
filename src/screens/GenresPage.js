import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import GenresContent from "./GenresContent";
import ErrorPage from "./ErrorPage";


export default function GenresPage() {
  const params = useParams();
  const genres = useSelector(state => state.genres.genres);

  if (params.gname) {
    let genreObj = genres.filter(genre => genre.genre === params.gname)[0];
    if (genreObj) {
      return (<GenresContent gname={params.gname} />);
    } else {
      return <ErrorPage />
    }
  }

  return (<GenresContent/>)
}
