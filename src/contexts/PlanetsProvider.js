import React, { useState, useEffect } from 'react';
import { object } from 'prop-types';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider(props) {
  const [data, setData] = useState([]);
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const [order, setOrder] = useState({});

  useEffect(() => {
    const requestPlanetsData = async () => {
      const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const { results } = await response.json();
      setData(results);
    };
    requestPlanetsData();
  }, []);

  const handleNameFilter = ({ target }) => {
    setFilterByName({ name: target.value });
  };

  const addNumericFilter = (filterObject) => {
    setFilterByNumericValues([...filterByNumericValues, filterObject]);
  };

  const deleteNumericFilter = (filterColumn) => {
    const newFilter = filterByNumericValues
      .filter((filter) => filter.column !== filterColumn);
    setFilterByNumericValues(newFilter);
  };

  const deleteAllNumericFilters = () => {
    setFilterByNumericValues([]);
  };

  const handleSort = ({ column, sort }) => {
    setOrder({ column, sort });
  };

  const { Provider } = PlanetsContext;
  const { children } = props;

  return (
    <Provider
      value={ {
        data,
        filterByName,
        filterByNumericValues,
        order,
        handleNameFilter,
        addNumericFilter,
        deleteNumericFilter,
        deleteAllNumericFilters,
        handleSort,
      } }
    >
      {children}
    </Provider>
  );
}

PlanetsProvider.propTypes = {
  children: object,
}.isRequired;

export default PlanetsProvider;
