
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/header'
import Home from './pages/home'
import AddBlog from './pages/add-blog'

function App() {
  

  return (
    <>
    <Header />
    <Routes>
      <Route exact path='/' element={<Home />} />
      <Route path='/add-blog' element={<AddBlog />} />
    </Routes>
    
    </>
  )
}

export default App
