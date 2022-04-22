import React, { useContext, useState } from 'react';
import PlanetsContext from '../contexts/PlanetsContext';

function Sort() {
  const { handleSort, columns } = useContext(PlanetsContext);

  const [sortState, setSortState] = useState({
    column: 'population',
    sort: 'ASC',
  });

  const handleSortState = ({ target }) => {
    const { name, value } = target;
    setSortState({
      ...sortState,
      [name]: value,
    });
  };

  return (
    <div>
      <label htmlFor="column-sort">
        Column
        <select
          data-testid="column-sort"
          name="column"
          id="column-sort"
          onChange={ handleSortState }
        >
          { columns.map((column, index) => (
            <option key={ index } value={ column }>{column}</option>
          )) }
        </select>
      </label>
      <label htmlFor="ASC">
        <input
          type="radio"
          data-testid="column-sort-input-asc"
          id="ASC"
          value="ASC"
          name="sort"
          onChange={ handleSortState }
        />
        Ascendente
      </label>
      <label htmlFor="DESC">
        <input
          type="radio"
          data-testid="column-sort-input-desc"
          id="DESC"
          value="DESC"
          name="sort"
          onChange={ handleSortState }
        />
        Descendente
      </label>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ () => handleSort(sortState) }
      >
        Sort
      </button>
    </div>
  );
}

export default Sort;
