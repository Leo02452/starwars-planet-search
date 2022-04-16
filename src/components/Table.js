import React, { useContext, useEffect } from 'react';
import apiContext from '../contexts/ApiContext';

function Table() {
  const { data, requestApiSW, search, filter } = useContext(apiContext);

  useEffect(() => {
    requestApiSW();
  }, [requestApiSW]);

  const mapAndRenderPlanets = (array) => (
    array
      .map((planet, index) => (
        <tr key={ index }>
          <td>{ planet.name }</td>
          <td>{ planet.rotation_period }</td>
          <td>{ planet.orbital_period }</td>
          <td>{ planet.diameter }</td>
          <td>{ planet.climate }</td>
          <td>{ planet.gravity }</td>
          <td>{ planet.terrain }</td>
          <td>{ planet.surface_water }</td>
          <td>{ planet.population }</td>
          <td>{ planet.films }</td>
          <td>{ planet.created }</td>
          <td>{ planet.edited }</td>
          <td>{ planet.url }</td>
        </tr>
      )));

  const filteredPlanets = (array) => {
    const isNamedFilterDesactivated = (search.filterByName.name === '');
    const isFilterActivated = filter.filterByNumericValues[0].filterActivated;
    if (!isNamedFilterDesactivated) {
      const filteredByName = array
        .filter((planet) => planet.name.toLowerCase()
          .includes(search.filterByName.name.toLowerCase()));
      return mapAndRenderPlanets(filteredByName);
    } if (isFilterActivated) {
      const { comparison, column, value } = filter.filterByNumericValues[0];
      let filteredByOptions;

      switch (comparison) {
      case 'maior que':
        filteredByOptions = array
          .filter((planet) => +planet[column] > +value);
        return mapAndRenderPlanets(filteredByOptions);
      case 'menor que':
        filteredByOptions = array
          .filter((planet) => +planet[column] < +value);
        return mapAndRenderPlanets(filteredByOptions);
      case 'igual a':
        filteredByOptions = array
          .filter((planet) => +planet[column] === +value);
        return mapAndRenderPlanets(filteredByOptions);
      default:
        return null;
      }
    } else {
      return mapAndRenderPlanets(array);
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotation Period</th>
          <th>Orbit Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        { filteredPlanets(data) }
      </tbody>
    </table>
  );
}

export default Table;
