import React, { useContext, useState } from 'react';
import PlanetsContext from '../contexts/PlanetsContext';

function FilterNumericValue() {
  const {
    filterByNumericValues,
    addNumericFilter,
    deleteNumericFilter,
    columns,
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

  const reduceColumnOptions = () => {
    const filterColumns = filterByNumericValues.map((filter) => Object.values(filter)[0]);
    const reducedArray = columns.reduce((array, column) => (filterColumns
      .includes(column) ? array : array.concat(column)), []);
    return reducedArray;
  };

  return (
    <div>
      <label htmlFor="column">
        Column
        <select
          data-testid="column-filter"
          name="column"
          id="column"
          onChange={ handleNumericFilter }
        >
          { reduceColumnOptions().map((column, index) => (
            <option key={ index } value={ column }>{column}</option>
          )) }
        </select>
      </label>
      <label htmlFor="comparison">
        Operator
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
      <label htmlFor="value">
        Value
        <input
          type="number"
          data-testid="value-filter"
          id="value"
          name="value"
          value={ numericFilter.value }
          onChange={ handleNumericFilter }
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => {
          addNumericFilter(numericFilter);
          setNumericFilter({
            column: reduceColumnOptions()[0],
            comparison: 'maior que',
            value: 0,
          });
        } }
      >
        Filter
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
    </div>
  );
}

export default FilterNumericValue;
