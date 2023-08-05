import './App.css'
import Home from './Home'
import Login from './Login'
import { SignUp } from './SignUp'
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom'


export default function App() {
  return(
    <Router>
      <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/signUp' element={<SignUp/>}/>
      <Route path='/home' element={<Home/>}/>
      </Routes>
    </Router>
    
    
    
  )
}