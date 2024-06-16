import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Alert from './components/Alert';
import AddNote from './components/AddNote';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import NoteState from './contexts/notes/NoteState';
import React, {useState} from 'react';

const App = () => {

  const [mode, setMode] = useState('light');
  const [modeText, setModeText] = useState('Enable Dark Mode');
  const [alert, setAlert] = useState(null);
  
  const toggleMode = () => {
    if (mode === 'dark') {
      setMode('light');
      document.body.style.backgroundColor = "#ffffff";
      setModeText('Enable Dark Mode');
    } else {
      setMode('dark');
      document.body.style.backgroundColor = "#909090";
      setModeText('Disable Dark Mode');
    }
  };

  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  return (
    <div style={{backgroundColor: mode==="light"?"#fcf6e9":"", height: "100vh"}}>
      <NoteState>
        <Router>
          <Navbar modeText={modeText} mode={mode} toggleMode={toggleMode} />
          <Alert alert={alert} />
          <div className='container'>
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert} mode={mode} />} />
              <Route exact path="/about" element={<About mode={mode} />} />
              <Route exact path="/signin" element={<SignIn showAlert={showAlert} mode={mode} />} />
              <Route exact path="/signup" element={<SignUp showAlert={showAlert} mode={mode} />} />
              <Route exact path="/addNote" element={<AddNote showAlert={showAlert} mode={mode} />} />
              <Route exact path="/back" element={<Home mode={mode} />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </div>
  );
}

export default App;
