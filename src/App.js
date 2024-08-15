import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Global Bootstrap CSS import

import Navbar from './components/Navbar'; // Navigation bar component
import User from './components/User';
import Products from './components/Products';
import Singleuser from './components/Singleuser';
import Category from './components/Category';
import Comment from './components/Comment';
import Report from './components/Report';
import Review from './components/Review';
import Useredit from './components/Edit&Delete/Useredit';
import Productedit from './components/Edit&Delete/Productedit';
import Productview from './components/Edit&Delete/Productview';
import Categoryedit from './components/Edit&Delete/Categoryedit';
import Categoryview from './components/Edit&Delete/Categoryview';
import Reviewedit from './components/Edit&Delete/Reviewedit';
import Reviewview from './components/Edit&Delete/Reviewview';
import Commentedit from './components/Edit&Delete/Commentedit';
import Commentview from './components/Edit&Delete/Commentview';
import Reportedit from './components/Edit&Delete/Reportedit';
import Reportview from './components/Edit&Delete/Reportview';
import NotFound from './components/NotFound'; // 404 Component

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<User />} />
          <Route path="/user" element={<User />} />
          <Route path="/products" element={<Products />} />
          <Route path="/singleuser" element={<Singleuser />} />
          <Route path="/comment" element={<Comment />} />
          <Route path="/category" element={<Category />} />
          <Route path="/report" element={<Report />} />
          <Route path="/review" element={<Review />} />
          <Route path="/useredit" element={<Useredit />} />
          <Route path="/productedit" element={<Productedit />} />
          <Route path="/productview" element={<Productview />} />
          <Route path="/categoryedit" element={<Categoryedit />} />
          <Route path="/categoryview" element={<Categoryview />} />
          <Route path="/reviewedit" element={<Reviewedit />} />
          <Route path="/reviewview" element={<Reviewview />} /> 
          <Route path="/commentedit" element={<Commentedit />} /> 
          <Route path="/commentview" element={<Commentview />} /> 
          <Route path="/reportedit" element={<Reportedit />} /> 
          <Route path="/reportview" element={<Reportview />} /> 
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
