import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'


ReactDOM.createRoot(document.getElementById("root")).render(<App />);

// axios.get('http://localhost:3009/api/notes')
//   .then(response => {
//     const notes = response.data
//     ReactDOM.createRoot(document.getElementById('root')).render(<App notes={notes} />)
//   })
//   .catch( (e) => console.log(e));

