import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Chat from './pages/Chats'
import Notfound from './pages/Notfound'
import { useAuth } from "./context/AuthContext";
function App() {
  const auth = useAuth();
  return (
   <main>
    <Header />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      {auth?.isLoggedIn && auth.user && (
          <Route path="/chat" element={<Chat />} />
        )}
      <Route path='*' element={<Notfound />} />
    </Routes>
   </main>
  )
}

export default App