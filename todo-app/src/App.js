import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ToDoListPage from './pages/ToDoListPage';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <div className="App">
      <AuthProvider>
     <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/todo" element={<ToDoListPage />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
