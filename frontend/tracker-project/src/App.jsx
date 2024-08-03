import { Routes, Route } from 'react-router-dom'
import Header from './components/header'
import Body from './components/body'
import Footer from './components/Footer'
import SideBar from './components/nav'
import './App.css'


// function App() {
 

//   return (
//       <div className='App'>
//           <Header />
//           <div className="mainContent">
//               <Nav />
//                 <Body />
//               <Footer />
//            </div>

//        </div>
//   )
// }

// export default App

// import React from 'react';
// import Header from './Header';
// import SideBar from './SideBar';
// import Body from './Body';
// import './Layout.css';

function App() {
  return (
      <div className="app-container">
        <header className="header">
          <Header />
        </header>
        <div className="main-container">
          <aside className="sidebar">
            <SideBar />
          </aside>
          <main className="main-content">
            <Body />
          </main>
        </div>
      </div>

  );
}

export default App
