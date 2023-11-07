import {} from 'react';
import { BrowserRouter } from "react-router-dom";
import Login from './pages/Login/Login'
import Register from './pages/Register/Register';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
