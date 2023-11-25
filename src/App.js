// Core
import React from 'react';
// import ReactDOM from 'react-dom/client';
//import { createRoot } from 'react-dom/client';

// utils

//components
import Header from './components/header/header';
import Main from './components/main/main';

// styles
//import './index.css';

// const container = document.getElementById('root');
// const root = createRoot(container);
// root.render(
//   <section className="todoapp">
//     <Header />
//     <Main />
//   </section>
// );

const App = (props) => {
   
    return (
        <section className="todoapp">
            <Header />
            <Main />
        </section>
    );
};
export default App;