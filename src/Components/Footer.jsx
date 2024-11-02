import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Footer = () => {
    const movies = useSelector((state) => state.movies.items);
    const latestMovies = movies.slice(-2).reverse();  // Get the latest 2 movies

    return (
        <footer className="bg-gray-900 text-white p-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h2 className="font-bold text-2xl">MOVIAK.com</h2>
                    <p className="mt-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas odio.
                    </p>
                </div>
                <div>
                    <h3 className="font-bold text-xl mb-2">Customer Services</h3>
                    <ul>
                        <li><Link to="/" className="hover:underline">Home</Link></li>
                        <li><Link to="" className="hover:underline">Coming Soon</Link></li>
                        <li><Link to="" className="hover:underline">Top rated</Link></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-bold text-xl mb-2">Latest Movies</h3>
                    {latestMovies.map((movie) => (
                        <div key={movie.id} className="flex items-center mb-4">
                            <img src={movie.poster} alt={movie.name} className="w-16 h-16 rounded-md" />
                            <div className="ml-4">
                                <h4 className="font-bold">{movie.name}</h4>
                                <p className="text-sm">{new Date(movie.releaseDate).toLocaleDateString()}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div>
                    <h3 className="font-bold text-xl mb-2">Contact Us</h3>
                    <ul>
                        <li>9067 Zurich, Switzerland 87</li>
                        <li><a href="mailto:abc@gmail.com" className="hover:underline">abc@gmail.com</a></li>
                        <li>01-234-5678</li>
                    </ul>
                </div>
            </div>
            <div className="mt-10 text-center border-t border-gray-800 pt-4">
                <p>&copy; {new Date().getFullYear()} MOVIAK. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
