import React, { useContext, useState } from 'react';
import ApiContext from '../contexts/ApiContext';

function Header() {
  const {
    handleInputChange,
    filterByName,
    handleFilter,
    filterByNumericValues,
  } = useContext(ApiContext);

  const [filterInput, setFilterInput] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFilterInput({
      ...filterInput,
      [name]: value,
    });
  };

  const columns = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const verifyRepeatedColumn = (acc, curr) => {
    let filtersAvailables;
    filterByNumericValues.forEach((filter, index) => {
      if (index !== 0) {
        if (filtersAvailables.includes(curr)) {
          filtersAvailables = curr === filter.column ? acc : acc.concat(curr);
        } else {
          filtersAvailables = acc;
        }
      } else {
        filtersAvailables = curr === filter.column ? acc : acc.concat(curr);
      }
    });
    return filtersAvailables;
  };

  const reduceColumnOptions = () => {
    const reducedArray = columns.reduce((acc, curr) => {
      console.log(filterByNumericValues);
      if (filterByNumericValues.length === 0) {
        return acc.concat(curr);
      }
      return verifyRepeatedColumn(acc, curr);
    }, []);
    return reducedArray;
  };

  return (
    <header>
      <input
        data-testid="name-filter"
        onChange={ handleInputChange }
        value={ filterByName.name }
      />
      <label htmlFor="column">
        Column
        <select
          data-testid="column-filter"
          name="column"
          id="column"
          // value={ filterInput.column }
          onChange={ handleChange }
        >
          { reduceColumnOptions().map((column, index) => (
            <option key={ index } value={ column }>{column}</option>
          )) }
        </select>
      </label>
      <label htmlFor="comparison">
        <select
          data-testid="comparison-filter"
          name="comparison"
          id="comparison"
          value={ filterInput.comparison }
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
