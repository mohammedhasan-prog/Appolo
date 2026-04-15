import { Routes, Route } from 'react-router-dom';
import Auth from './Auth';
import Landing from './Landing';
import Navbar from './Navbar';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </>
  );
}

export default App;

