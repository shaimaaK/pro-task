import './App.css';
import REACT from 'react';
import HomePage from './screens/Home'
//importing components 
import Form from "./components/Form"
import TodoList from "./components/TodoList"
import { Container } from '@mui/material';
function App() {
  return (
    <div className="App"  style={{'backgroundColor':'#85FFBD',
    'backgroundImage':'linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%'}} >
        <h1 role="header" >To Do List</h1>
        <Container>
          <TodoList role="todolist-layout"/>
        </Container>
        
    </div>
  );
}

export default App;
