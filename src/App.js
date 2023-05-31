import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import AllUser from './components/all-users';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' exact element={<AllUser/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
