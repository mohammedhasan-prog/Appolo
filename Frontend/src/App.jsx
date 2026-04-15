import { Routes, Route } from 'react-router-dom';
import Auth from './Auth';
import Landing from './Landing';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  );
}

export default App;

