import React, { useContext, useState } from 'react';
import PlanetsContext from '../contexts/PlanetsContext';

function Header() {
  const {
    handleNameFilter,
    filterByName,
    addNumericFilter,
    filterByNumericValues,
    deleteNumericFilter,
    deleteAllNumericFilters,
    handleSort,
  } = useContext(PlanetsContext);

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

  const [sortFilter, setsortFilter] = useState({
    column: 'population',
    sort: 'ASC',
  });

  const handleSortFilter = ({ target }) => {
    const { name, value } = target;
    setsortFilter({
      ...sortFilter,
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

  const reduceColumnOptions = () => {
    const filterColumns = filterByNumericValues.map((filter) => Object.values(filter)[0]);
    const reducedArray = columns.reduce((array, column) => (filterColumns
      .includes(column) ? array : array.concat(column)), []);
    return reducedArray;
  };

  return (
    <header>
      <input
        data-testid="name-filter"
        onChange={ handleNameFilter }
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
        onClick={ () => addNumericFilter(filterInput) }
      >
        Filtrar
      </button>
      <div>
        { filterByNumericValues.length > 0
          && filterByNumericValues.map(({ column, comparison, value }, index) => (
            <div key={ index } data-testid="filter">
              <span>{ `${column} ${comparison} ${value} ` }</span>
              <button
                type="button"
                onClick={ () => deleteNumericFilter(column) }
              >
                X
              </button>
            </div>
          ))}
      </div>
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ () => deleteAllNumericFilters() }
      >
        Remover todas filtragens
      </button>
      <label htmlFor="column-sort">
        Column
        <select
          data-testid="column-sort"
          name="column"
          id="column-sort"
          onChange={ handleSortFilter }
        >
          { columns.map((column, index) => (
            <option key={ index } value={ column }>{column}</option>
          )) }
        </select>
      </label>
      <label htmlFor="ASC">
        Ascendente
        <input
          type="radio"
          data-testid="column-sort-input-asc"
          id="ASC"
          value="ASC"
          name="sort"
          onChange={ handleSortFilter }
        />
      </label>
      <label htmlFor="DESC">
        Descendente
        <input
          type="radio"
          data-testid="column-sort-input-desc"
          id="DESC"
          value="DESC"
          name="sort"
          onChange={ handleSortFilter }
        />
      </label>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ () => handleSort(sortFilter) }
      >
        Ordenar
      </button>
    </header>
  );
}

export default Header;
