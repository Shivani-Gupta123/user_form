import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserForm from './components/FirstPage/ContactForm';
import SecondPage from './components/SecondPage/DataTable';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={UserForm} />
        <Route path="/second-page" Component={SecondPage} />
      </Routes>
    </Router>
  );
};

export default App;
