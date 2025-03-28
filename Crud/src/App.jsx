import './App.css'
import Header from './header'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import FormData from './FormData'
import ShowData from './ShowData'
import UpdateData from './UpdateData'

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <div className="container mt-5">
          <Routes>
            <Route path="/" element={<FormData />} />
            <Route path="/display" element={<ShowData />} />
            <Route path="/update/:id" element={<UpdateData />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
