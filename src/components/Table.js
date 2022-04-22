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

  const switchCase = (object1, object2) => {
    let comparisons;
    switch (object2.comparison) {
    case 'maior que':
      comparisons = +object1[object2.column] > +object2.value;
      break;
    case 'menor que':
      comparisons = +object1[object2.column] < +object2.value;
      break;
    case 'igual a':
      comparisons = +object1[object2.column] === +object2.value;
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
    return filteredByOptions;
  };

  const filteredPlanets = (array) => {
    const isNameFilterDesactivated = (filterByName.name === '');
    if (!isNameFilterDesactivated) {
      const filteredByName = array
        .filter((planet) => planet.name.toLowerCase()
          .includes(filterByName.name.toLowerCase()));
      return filteredByName;
    }
    if (filterByNumericValues.length > 0) {
      return reduceFilter(array);
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
