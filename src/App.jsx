import {} from 'react';
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register';
import Home from './pages/Home/Home';
import PrivateRoute from './components/other/PrivateRoute';
import Logout from './pages/Auth/Logout';
import NewPost from './pages/NewPost/NewPost';
import Footer from './components/footer/Footer';
import Post from './pages/Post/Post';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          {/* <Outlet>は、親ルート内に配置された子ルートのコンポーネントを描画する場所を指定 */}
          <Route element={<PrivateRoute><Outlet/></PrivateRoute>}>
              <Route path='/home' element={<Home />}></Route>
              <Route path='/logout' element={<Logout />}></Route>
              <Route path='/home/newPost' element={<NewPost />}></Route>
              <Route path='/home/:trip_id' element={<Post />}></Route>
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
