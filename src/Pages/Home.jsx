import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategoriesWithMovies } from '../Store/categoryWithMovieSlice';

export default function Home() {
  const dispatch = useDispatch();
  const categoriesWithMovies = useSelector((state) => state.categoriesWithMovies.items);
  const categoryStatus = useSelector((state) => state.categoriesWithMovies.status);

  useEffect(() => {
    if (categoryStatus === 'idle') {
      dispatch(fetchCategoriesWithMovies());
    }
  }, [categoryStatus, dispatch]);

  if (categoryStatus === 'loading') {
    return <div>Loading...</div>;
  }

  if (categoryStatus === 'error') {
    return <div>Error fetching categories with movies.</div>;
  }

  if (categoriesWithMovies.length == 0) {
    return <div>No categories with movies found.</div>;
  }

  console.log(categoriesWithMovies);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Movies by Category</h1>
      {categoriesWithMovies.map((category) => (
        <div key={category.id} className="mb-6">
          <h2 className="text-xl font-bold">{category.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
            {
              category.movies.length > 0 ? category.movies.map((movie) => (
                <div key={movie.id} className="p-4 bg-white shadow-md rounded-lg">
                  <img src={movie.poster} alt={movie.name} className="mb-2" />
                  <h3 className="text-lg font-bold">{movie.name}</h3>
                  <p>{movie.description}</p>
                </div>
              )) : (
                <div className="text-center">No movies found in this category.</div>
              )
            }
          </div>
        </div>
      ))}
    </div>
  );
}
