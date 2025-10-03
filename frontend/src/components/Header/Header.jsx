import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <div className='header'>
      <div className="header-contents">
        <h2>Online Food Ordering Made Easy</h2>
        <p>
          Craving something delicious? Explore a wide variety of mouth-watering dishes and get them delivered to your doorstep in no time. Fresh, hot, and tasty – just the way you like it!
        </p>
        <button>View Menu</button>
      </div>
    </div>
  );
}

export default Header;
