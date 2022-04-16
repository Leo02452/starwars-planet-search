import React, { useState } from 'react';
import { object } from 'prop-types';
import ApiContext from './ApiContext';
import { results } from '../testData';

function ApiProvider(props) {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState({ filterByName: { name: '' } });
  const [filter, setFilter] = useState({
    filterByNumericValues: [
      {
        column: '',
        comparison: '',
        value: '',
        filterActivated: false,
      },
    ],
  });

  // const requestApiSW = async () => {
  //   const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
  //   const result = await response.json();
  //   setData(result.results);
  // };

  const requestApiSW = () => {
    setData(results);
  };

  const handleInputChange = ({ target }) => {
    setSearch({ filterByName: { name: target.value } });
  };

  const handleFilter = (filterObject) => {
    setFilter({
      filterByNumericValues: [
        {
          ...filter.filterByNumericValues[0],
          ...filterObject,
        },
      ],
    });
  };

  const { Provider } = ApiContext;
  const { children } = props;

  return (
    <Provider
      value={ {
        data,
        requestApiSW,
        search,
        handleInputChange,
        filter,
        handleFilter,
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
