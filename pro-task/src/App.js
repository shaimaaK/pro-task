import './App.css';
import REACT , {useState, useEffect} from 'react';
import HomePage from './screens/Home'
//importing components 
import Form from "./components/Form"
import TodoList from "./components/TodoList"
import { Container } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import { IconButton } from '@material-ui/core';
//import tensorflow dependencies
import * as tf from "@tensorflow/tfjs"
import * as speech from "@tensorflow-models/speech-commands"
function App() {
  //create the model, action, and label states
  const {model, setModel}= useState(null);
  const {action, setAction}= useState(null);
  const {labels, setLabels}= useState(null);//command

  //create the Recognizer
  const loadModel = async()=>{
    const reconizer = await speech.create('BROWSER_FFT');
    console.log("Model Loaded");
    await reconizer.ensureModelLoaded();
    console.log(reconizer.wordLabels())
    setModel(reconizer)
    setLabels(reconizer.wordLabels())
  }
  useEffect(()=> {loadModel()},[]);
  
  //listen for actions
  function argMax(arr){
    return arr.map((x,i)=>[x, i]).reduce((r,a)=> (a[0] > r[0]? a:r))[1];
  }
  const recognizeCommands=async()=>{
    console.log('Listening for commands')
    model.listen(results=>{
      console.log(results)
      setAction(labels[argMax(Object.values(results.scores))])
    }, {includeSpectrogram:true, probabilityThreshold:0.9})
    setTimeout(()=> model.stopListening(), 10e3)
  }
  return (
    <div className="App"  style={{'backgroundColor':'#85FFBD',
    'backgroundImage':'linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%'}} >
        <h1 role="header" >To Do List</h1>
        <Container>
          <TodoList role="todolist-layout"/>
        </Container>
        <Container>
        <IconButton aria-label="speak" onClick={recognizeCommands}>command<MicIcon/></IconButton>
        {action ?<div>{action}</div>:<div>No Action Detected</div>}
        </Container>
        
    </div>
  );
}

export default App;
