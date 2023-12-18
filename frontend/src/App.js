import React from 'react';
import Nav from './components/Nav';
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import TicketForm from './components/TicketForm';
import TicketList from './components/TicketList';
import { formToJSON } from 'axios';
import ChatComponent from './components/Chat';
import Login from './components/Login';
import Signup from './components/SignUp';

const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
      <Nav/>
      <h1>Vendor</h1>
      <Routes>
          <Route path = '/' element={<Login/>}></Route>
          <Route path = '/signup' element={<Signup/>}></Route>
          <Route path = '/vendoraddproduct' element={<TicketForm/>}></Route>
          <Route path ='/vendor' element ={<TicketList />}> </Route>
          <Route path = '/Chats' element ={<ChatComponent/>}></Route>
      </Routes>
          
      </BrowserRouter>
      
      
    </div>
  );
};

export default App;
