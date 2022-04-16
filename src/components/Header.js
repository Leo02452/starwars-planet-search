import React, { useContext, useState } from 'react';
import ApiContext from '../contexts/ApiContext';

function Header() {
  const { handleInputChange, search, handleFilter } = useContext(ApiContext);
  const [filterInput, setFilterInput] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
    filterActivated: true,
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFilterInput({
      ...filterInput,
      [name]: value,
    });
  };

  return (
    <header>
      <input
        data-testid="name-filter"
        onChange={ handleInputChange }
        value={ search.filterByName.name }
      />
      <label htmlFor="column">
        Column
        <select
          data-testid="column-filter"
          name="column"
          id="column"
          onChange={ handleChange }
        >
          <option>population</option>
          <option>orbital_period</option>
          <option>diameter</option>
          <option>rotation_period</option>
          <option>surface_water</option>
        </select>
      </label>
      <label htmlFor="comparison">
        <select
          data-testid="comparison-filter"
          name="comparison"
          id="comparison"
          onChange={ handleChange }
        >
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>
      </label>
      <input
        type="number"
        data-testid="value-filter"
        name="value"
        value={ filterInput.value }
        onChange={ handleChange }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => handleFilter(filterInput) }
      >
        Filtrar
      </button>
    </header>
  );
}

export default Header;
