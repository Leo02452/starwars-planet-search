import React, { useContext } from 'react';
import PlanetsContext from '../contexts/PlanetsContext';

function FilterName() {
  const { filterByName, handleNameFilter } = useContext(PlanetsContext);

  return (
    <label htmlFor="name-filter">
      <input
        data-testid="name-filter"
        id="name-filter"
        onChange={ handleNameFilter }
        value={ filterByName.name }
      />
    </label>
  );
}

export default FilterName;
