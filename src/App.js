import React from 'react';
import Table from './components/Table';
import ApiProvider from './contexts/ApiProvider';

function App() {
  return (
    <ApiProvider>
      <Table />
    </ApiProvider>
  );
}

export default App;
