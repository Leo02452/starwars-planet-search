import React from 'react';
import Header from './components/Header';
import Table from './components/Table';
import PlanetsProvider from './contexts/PlanetsProvider';

function App() {
  return (
    <PlanetsProvider>
      <Header />
      <Table />
    </PlanetsProvider>
  );
}

export default App;
