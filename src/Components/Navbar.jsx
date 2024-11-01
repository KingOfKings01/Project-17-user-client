import { useState } from 'react';
import { useSelector } from 'react-redux';

const NavBar = () => {
  const categories = useSelector((state) => state.categoriesWithMovies.items);
  const [isOpen, setIsOpen] = useState(false);
  const handleToggleMenu = () => setIsOpen((prev) => !prev);

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
        {categories.slice(0, 2).map((category) => (
          <p key={category.id} className="text-white cursor-pointer" onClick={() => handleCategoryClick(category.name)}>
            {category.name}
          </p>
        ))}
        {categories.length > 2 && (
          <p onClick={handleToggleMenu} className="relative cursor-pointer text-white">
            More
            {isOpen && (
              <div className="absolute z-50 top-8 py-2 px-3 bg-gray-700 text-white mt-2 w-max">
                {categories.slice(2).map((category) => (
                  <p className='whitespace-nowrap ' key={category.id} onClick={() => handleCategoryClick(category.name)}>
                    {category.name}
                  </p>
                ))}
              </div>
            )}
          </p>
        )}
      </div>
    </nav>
    <div className="h-[9vh]"></div>
    </>
  );
};

export default NavBar;
