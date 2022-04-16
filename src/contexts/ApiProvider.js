import React, { useState } from 'react';
import { object } from 'prop-types';
import ApiContext from './ApiContext';
import testData from '../testData';

function ApiProvider(props) {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState({ filterByName: { name: '' } });

  // const requestApiSW = async () => {
  //   const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
  //   const result = await response.json();
  //   setData(result.results);
  // };

  const requestApiSW = () => {
    setData(testData.results);
  };

  const handleInputChange = ({ target }) => {
    setSearch({ filterByName: { name: target.value } });
  };

  const { Provider } = ApiContext;
  const { children } = props;

  return (
    <Provider value={ { data, requestApiSW, search, handleInputChange } }>
      {children}
    </Provider>
  );
}

ApiProvider.propTypes = {
  children: object,
}.isRequired;

export default ApiProvider;
