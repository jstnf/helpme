import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/main.css';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import Page from './scripts/Page';
import PageHome from './pages/PageHome';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Page component={PageHome} title={'helpme: a README editor!'} />} />
      <Route path='editor/' element={<PageHome />} />
      <Route path='editor/:user/:repo' element={<PageHome />} />
    </Routes>
  </BrowserRouter>
);
