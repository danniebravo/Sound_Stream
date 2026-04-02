import { useState } from 'react';
import TestComponents from './components/pages/TestComponents(CELIS)';
import './components/styles/global.css';

function App() {
  const [modoPrueba, setModoPrueba] = useState(true); // Cambia a false para ver el original

  return modoPrueba ? <TestComponents /> : <AppOriginal />;
}

export default App;