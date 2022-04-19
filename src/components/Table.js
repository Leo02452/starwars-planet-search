import React, { useContext, useEffect } from 'react';
import apiContext from '../contexts/ApiContext';

function Table() {
  const {
    data,
    requestApiSW,
    filterByName,
    filterByNumericValues,
  } = useContext(apiContext);

  useEffect(() => {
    requestApiSW();
  }, []);

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

  const switchCase = (object, array) => {
    let comparisons;
    switch (array.comparison) {
    case 'maior que':
      comparisons = +object[array.column] > +array.value;
      break;
    case 'menor que':
      comparisons = +object[array.column] < +array.value;
      break;
    case 'igual a':
      comparisons = +object[array.column] === +array.value;
      break;
    default:
      break;
    }
    return comparisons;
  };

  const reduceFilter = (array) => {
    const filteredByOptions = array
      .reduce((acc, curr) => {
        let arrayReduced = [];
        filterByNumericValues.forEach((filter, index) => {
          const comparisons = switchCase(curr, filter);
          if (index !== 0) {
            if (arrayReduced.includes(curr)) {
              if (comparisons) {
                arrayReduced = acc.concat(curr);
              } else {
                arrayReduced = acc;
              }
            }
          } else if (comparisons) {
            arrayReduced = acc.concat(curr);
          } else {
            arrayReduced = acc;
          }
        });
        return arrayReduced;
      }, []);
    return mapAndRenderPlanets(filteredByOptions);
  };

  const filteredPlanets = (array) => {
    const isNameFilterDesactivated = (filterByName.name === '');
    if (!isNameFilterDesactivated) {
      const filteredByName = array
        .filter((planet) => planet.name.toLowerCase()
          .includes(filterByName.name.toLowerCase()));
      return mapAndRenderPlanets(filteredByName);
    }
    if (filterByNumericValues.length > 0) {
      return reduceFilter(array);
    }
    return mapAndRenderPlanets(array);
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
