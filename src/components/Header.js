import React, { useContext } from 'react';
import ApiContext from '../contexts/ApiContext';

function Header() {
  const { handleInputChange, search } = useContext(ApiContext);
  console.log(search.filterByName.name);
  return (
    <header>
      <input data-testid="name-filter" onChange={ handleInputChange } />
    </header>
  );
}

export default Header;
