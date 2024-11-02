import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const categories = useSelector((state) => state.categoriesWithMovies.items);

  const handleCategoryClick = (categoryName) => {
    const categoryElement = document.getElementById(categoryName);
    const yOffset = -80; //Todo: To control the offset
    if (categoryElement) {
      const y = categoryElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      categoryElement.focus({ preventScroll: true });
    }
  };

  return (
    <>

      <nav className="bg-gray-800 p-4 fixed w-screen h-[9vh]">
        <div className="flex space-x-4">
          <Link to="/" className='text-white text-xl'>Movies Show</Link>
          {categories.map((category) => (
            <div key={category.id} >
              {!category.isHeroSection &&
                <span className="text-white cursor-pointer" onClick={() => handleCategoryClick(category.name)}>{category.name}</span>
              }
            </div>
          ))}

        </div>
      </nav>
      <div className="h-[9vh]"></div>
    </>
  );
};

export default NavBar;
