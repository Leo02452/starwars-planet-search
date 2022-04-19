import React, { useState } from 'react';
import { object } from 'prop-types';
import ApiContext from './ApiContext';
// import { results } from '../testData';

function ApiProvider(props) {
  const [data, setData] = useState([]);
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);

  const requestApiSW = async () => {
    const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
    const { results } = await response.json();
    setData(results);
  };

  // const requestApiSW = () => {
  //   setData(results);
  // };

  const handleInputChange = ({ target }) => {
    setFilterByName({ name: target.value });
  };

  const handleFilter = (filterObject) => {
    setFilterByNumericValues([...filterByNumericValues, filterObject]);
  };

  const deleteFilter = (filterColumn) => {
    const newFilter = filterByNumericValues
      .filter((filter) => filter.column !== filterColumn);
    setFilterByNumericValues([...newFilter]);
  };

  const deleteAllFilters = () => {
    setFilterByNumericValues([]);
  };

  const { Provider } = ApiContext;
  const { children } = props;

  return (
    <Provider
      value={ {
        data,
        requestApiSW,
        filterByName,
        handleInputChange,
        filterByNumericValues,
        handleFilter,
        deleteFilter,
        deleteAllFilters,
      } }
    >
      {children}
    </Provider>
  );
}

ApiProvider.propTypes = {
  children: object,
}.isRequired;

export default ApiProvider;
