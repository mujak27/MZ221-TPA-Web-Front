import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Activation } from './components/Activation/Activation';
import { Home } from './components/Home/Home';
import { Login } from './components/Login/Login';
import { Register } from './components/register/Register';
import Profile from './components/User/Profile';
import { ContextProvider } from './Provider/ContextProvider';

type props={

};

export const App:React.FC<props> = () => {


  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/activation/:activationId" element={<Activation />} />
          <Route path="*" element={<>
            <ContextProvider>
              <Home />
            </ContextProvider>
          </>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
