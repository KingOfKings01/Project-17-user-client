import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
export default function MoviesSection({ movies }) {
    const handleWatchTrailer = (trailerLink) => {
        window.open(trailerLink, '_blank');
    };

    return (
        <>
            {movies?.length > 0 ? movies.map((movie) => (
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
                        <Link
                            to={`movies/${movie.id}`}
                            className="bg-green-500 text-white py-1 px-2 rounded"
                        >
                            Details Page
                        </Link>
                    </div>
                </div>
            )) : (
                <div className="text-center">
                    No movies found in this category.
                    <div className="h-[50vh]" />
                </div>
            )}</>
    )
}
