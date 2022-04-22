import React, { useContext } from 'react';
import PlanetsContext from '../contexts/PlanetsContext';
import FilterName from './FilterName';
import FilterNumericValue from './FilterNumericValue';
import Sort from './Sort';

function Header() {
  const { deleteAllNumericFilters } = useContext(PlanetsContext);

  return (
    <header>
      <FilterName />
      <FilterNumericValue />
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ () => deleteAllNumericFilters() }
      >
        Remove all filters
      </button>
      <Sort />
    </header>
  );
}

export default Header;
