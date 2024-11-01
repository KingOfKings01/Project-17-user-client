import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategoriesWithMovies } from '../Store/categoryWithMovieSlice';

import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const Home = () => {
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
  if (categoriesWithMovies.length === 0) {
    return <div>No categories with movies found.</div>;
  }

  return (
    <div>
      <Swiper
        slidesPerView={1}
        centeredSlides={true}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        className="mySwiper"
      >
        {categoriesWithMovies.map((category) => (
          category.movies.slice(0, 1).map((movie) => ( // Display one movie from each category
            <SwiperSlide key={movie.id}>
              <div className='relative flex flex-col justify-center items-center w-full h-screen'>
                <img src={movie.heroSectionImage} className='w-full h-full object-cover' alt={movie.name} />
                <div className="absolute bottom-20 left-20 bg-opacity-75 bg-gray-800 p-4 text-white rounded-md">
                  <h1 className="text-4xl font-bold">{movie.name}</h1>
                  <p className="mt-2">{movie.description}</p>
                </div>
              </div>
            </SwiperSlide>
          ))
        ))}
      </Swiper>
      
      {categoriesWithMovies.map((category) => (
        <div key={category.id} id={category.name} tabIndex="-1" className="mb-6">
          <h2 className="text-xl font-bold">{category.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {category.movies.length > 0 ? category.movies.map((movie) => (
              <div key={movie.id} className="p-4 bg-white shadow-md rounded-lg">
                <img src={movie.poster} alt={movie.name} className="mb-2" />
                <h3 className="text-lg font-bold">{movie.name}</h3>
                <p>{movie.description}</p>
              </div>
            )) : (
              <div className="text-center">
                No movies found in this category.
                <div className="h-[50vh]" />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
