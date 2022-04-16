import React, { useState } from 'react';
import { object } from 'prop-types';
import ApiContext from './ApiContext';

function ApiProvider(props) {
  const [data, setData] = useState([]);

  const requestApiSW = async () => {
    const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
    const result = await response.json();
    setData(result.results);
  };

  const { Provider } = ApiContext;
  const { children } = props;

  return (
    <Provider value={ { data, requestApiSW } }>
      {children}
    </Provider>
  );
}

ApiProvider.propTypes = {
  children: object,
}.isRequired;

export default ApiProvider;
