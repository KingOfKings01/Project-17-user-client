import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails } from '../Store/movieSlice'; // Make sure to create this thunk action
import BookingFormModal from '../Components/BookingFormModal';

const MovieDetail = () => {
    const { movieId } = useParams();
    const dispatch = useDispatch();
    const movie = useSelector((state) => state.movies.selectedMovie);
    const movieStatus = useSelector((state) => state.movies.status);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedShowtime, setSelectedShowtime] = useState(null);


    useEffect(() => {
        if (movieId) {
            dispatch(fetchMovieDetails(movieId));
        }
    }, [dispatch, movieId]);

    if (movieStatus === 'loading') {
        return <div>Loading...</div>;
    }
    if (movieStatus === 'error') {
        return <div>Error fetching movie details.</div>;
    }
    if (!movie) {
        return <div>Movie not found.</div>;
    }

    const handleShowtimeClick = (showtime) => {
        console.log("chu");
        setSelectedShowtime(showtime);
        setIsModalOpen(true);
    };

    return (
        <div className="p-6">
            <div className="flex flex-col md:flex-row items-center">
                <img src={movie.heroSectionImage} alt={movie.name} className="w-full md:w-1/2 h-auto rounded-md shadow-md" />
                <div className="md:ml-6 mt-4 md:mt-0">
                    <h1 className="text-3xl font-bold">{movie.name}</h1>
                    <p className="mt-2">{movie.description}</p>
                    <p className="mt-2"><strong>Director:</strong> {movie.director}</p>
                    <p className="mt-2"><strong>Genre:</strong> {movie.genre}</p>
                    <p className="mt-2"><strong>Release Date:</strong> {new Date(movie.releaseDate).toLocaleDateString()}</p>
                    <p className="mt-2"><strong>Language:</strong> {movie.language}</p>
                    <p className="mt-2"><strong>IMDb Rating:</strong> {movie.imdbRating}</p>
                    <a
                        href={movie.trailerLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded"
                    >
                        Watch Trailer
                    </a>
                </div>


            </div>
            <h2 className="mt-8 text-xl font-bold">Book Your Ticket Now</h2>
            <div className="mt-4">
                {movie.showtimes.length > 0 ? (
                    movie.showtimes.map((showtime) => (
                        <button
                            key={showtime.id}
                            onClick={() => handleShowtimeClick(showtime)}
                            className="bg-gray-700 text-white py-2 px-4 rounded mt-2 mr-2"
                        >
                            {new Date(showtime.dateTime).toLocaleString()}
                        </button>
                    ))
                ) : (
                    <p className="mt-2">No shows available right now.</p>
                )}
            </div>

            {isModalOpen && (
                <BookingFormModal
                    selectedShowtime={selectedShowtime}
                    movieName={movie.name}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
};

export default MovieDetail;
