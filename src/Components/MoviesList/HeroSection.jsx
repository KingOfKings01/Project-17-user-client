/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function HeroSection({ movies }) {
  const handleWatchTrailer = (trailerLink) => {
    window.open(trailerLink, "_blank");
  };

  const enableLoop = movies.length > 1;

  return (
    <Swiper
      slidesPerView={1}
      centeredSlides={true}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      loop={enableLoop}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      className="mySwiper"
    >
      {movies.map((movie) => (
        <SwiperSlide key={movie.id}>
          <div className="relative flex flex-col justify-center items-center w-full h-screen">
            <img src={movie.heroSectionImage} className="w-full h-full object-cover" alt={movie.name} />
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
                <Link
                  to={`movies/${movie.id}`}
                  className="bg-green-500 text-white py-1 px-2 rounded"
                >
                  Details Page
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
