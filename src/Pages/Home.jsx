import { useSelector } from 'react-redux';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import MoviesSection from '../Components/MoviesList/MoviesSection';
import HeroSection from '../Components/MoviesList/HeroSection';

const Home = () => {
  const categoriesWithMovies = useSelector((state) => state.categoriesWithMovies.items);

  const { heroSection, otherCategories } = categoriesWithMovies.reduce(
    (acc, category) => {
      if (category.isHeroSection && !acc.heroSection) {
        acc.heroSection = category;
      } else {
        acc.otherCategories.push(category);
      }
      return acc;
    },
    { heroSection: null, otherCategories: [] }
  );

  return (
    <div>
      
      {/* Render hero section */}
      {heroSection && <HeroSection key={heroSection.id} movies={heroSection.movies} />}

      {/* Render other categories */}
      {otherCategories.map((category) => (
        <div key={category.id}>
          <div id={category.name} tabIndex="-1" className="mb-6 p-4">
            <h2 className="text-xl font-bold">{category.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <MoviesSection movies={category.movies} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
