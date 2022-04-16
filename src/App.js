import React from 'react';
import Header from './components/Header';
import Table from './components/Table';
import ApiProvider from './contexts/ApiProvider';

function App() {
  return (
    <ApiProvider>
      <Header />
      <Table />
    </ApiProvider>
  );
}

export default App;
