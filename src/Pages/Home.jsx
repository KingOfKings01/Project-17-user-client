
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const Home = () => {
  const navigate = useNavigate();
  const categoriesWithMovies = useSelector((state) => state.categoriesWithMovies.items);

  const handleWatchTrailer = (trailerLink) => {
    window.open(trailerLink, '_blank');
  };

  const handleDetailsPage = (movieId) => {
    navigate(`/movies/${movieId}`);
  };

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
                  <div className="mt-4">
                    <button
                      onClick={() => handleWatchTrailer(movie.trailerLink)}
                      className="bg-blue-500 text-white py-1 px-2 rounded mr-2"
                    >
                      Watch Trailer
                    </button>
                    <button
                      onClick={() => handleDetailsPage(movie.id)}
                      className="bg-green-500 text-white py-1 px-2 rounded"
                    >
                      Details Page
                    </button>
                  </div>
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
                <div className="mt-4">
                  <button
                    onClick={() => handleWatchTrailer(movie.trailerLink)}
                    className="bg-blue-500 text-white py-1 px-2 rounded mr-2"
                  >
                    Watch Trailer
                  </button>
                  <button
                    onClick={() => handleDetailsPage(movie.id)}
                    className="bg-green-500 text-white py-1 px-2 rounded"
                  >
                    Details Page
                  </button>
                </div>
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
