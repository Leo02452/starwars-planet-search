import React, { useState, useEffect } from 'react';
import { object } from 'prop-types';
import ApiContext from './ApiContext';
// import { results } from '../testData';

function ApiProvider(props) {
  const [data, setData] = useState([]);
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const [order, setOrder] = useState({});

  useEffect(() => {
    const requestApiSW = async () => {
      const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const { results } = await response.json();
      setData(results);
    };
    requestApiSW();
  }, []);

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

  const handleSort = ({ column, sort }) => {
    setOrder({ column, sort });
  };

  const { Provider } = ApiContext;
  const { children } = props;

  return (
    <Provider
      value={ {
        data,
        filterByName,
        handleInputChange,
        filterByNumericValues,
        handleFilter,
        deleteFilter,
        deleteAllFilters,
        order,
        handleSort,
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
