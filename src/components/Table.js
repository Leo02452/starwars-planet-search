import React, { useContext } from 'react';
import PlanetsContext from '../contexts/PlanetsContext';

function Table() {
  const {
    data,
    filterByName,
    filterByNumericValues,
    order,
  } = useContext(PlanetsContext);

  const mapAndRenderPlanets = (array) => (
    array
      .map((planet, index) => (
        <tr key={ index }>
          <td data-testid="planet-name">{ planet.name }</td>
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

  const reduceWithNumericFilter = (array) => {
    const planetsForFilter = filterByNumericValues
      .map(({ column, comparison, value }) => array.reduce((acc, planet) => {
        switch (comparison) {
        case 'maior que':
          return +planet[column] > +value ? acc.concat(planet) : acc;
        case 'menor que':
          return +planet[column] < +value ? acc.concat(planet) : acc;
        case 'igual a':
          return +planet[column] === +value ? acc.concat(planet) : acc;
        default:
          break;
        }
        return acc;
      }, []));
    const intersection = planetsForFilter.reduce((arr1, arr2) => arr1
      .filter((planet) => arr2.includes(planet)));
    return intersection;
  };

  const filteredPlanets = (array) => {
    const isNameFilterActivated = filterByName.name !== '';
    const isNumericFilterActivated = filterByNumericValues.length > 0;
    if (isNameFilterActivated) {
      const filteredByName = array
        .filter((planet) => planet.name.toLowerCase()
          .includes(filterByName.name.toLowerCase()));
      return filteredByName;
    }
    if (isNumericFilterActivated) {
      return reduceWithNumericFilter(array);
    }
    return array;
  };

  const defaultSort = () => {
    const ascendentOrder = -1;
    const defaultNameSort = filteredPlanets(data).sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return ascendentOrder;
      }
      return 0;
    });
    return defaultNameSort;
  };

  const sortedPlanets = () => {
    if (Object.keys(order).length === 0) {
      return mapAndRenderPlanets(defaultSort());
    }

    const sortPlanets = filteredPlanets(data).sort((a, b) => {
      const ascendentOrder = -1;

      if (Number.isNaN(a[order.column] - b[order.column])) {
        return a[order.column] > b[order.column] ? 1 : ascendentOrder;
      }

      switch (order.sort) {
      case 'ASC':
        return a[order.column] - b[order.column];
      case 'DESC':
        return b[order.column] - a[order.column];
      default:
        return null;
      }
    });

    return mapAndRenderPlanets(sortPlanets);
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
        { sortedPlanets() }
      </tbody>
    </table>
  );
}

export default Table;
