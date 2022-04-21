import React, { useContext, useState } from 'react';
import PlanetsContext from '../contexts/PlanetsContext';
import FilterName from './FilterName';

function Header() {
  const {
    filterByNumericValues,
    addNumericFilter,
    deleteNumericFilter,
    deleteAllNumericFilters,
    handleSort,
  } = useContext(PlanetsContext);

  const [numericFilter, setNumericFilter] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  const handleNumericFilter = ({ target }) => {
    const { name, value } = target;
    setNumericFilter({ ...numericFilter, [name]: value });
  };

  const [sortState, setSortState] = useState({
    column: 'population',
    sort: 'ASC',
  });

  const handlesortState = ({ target }) => {
    const { name, value } = target;
    setSortState({
      ...sortState,
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
      <FilterName />
      <label htmlFor="column">
        Column
        <select
          data-testid="column-filter"
          name="column"
          id="column"
          // value={ numericFilter.column }
          onChange={ handleNumericFilter }
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
          value={ numericFilter.comparison }
          onChange={ handleNumericFilter }
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
        value={ numericFilter.value }
        onChange={ handleNumericFilter }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => addNumericFilter(numericFilter) }
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
          onChange={ handlesortState }
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
          onChange={ handlesortState }
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
          onChange={ handlesortState }
        />
      </label>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ () => handleSort(sortState) }
      >
        Ordenar
      </button>
    </header>
  );
}

export default Header;
