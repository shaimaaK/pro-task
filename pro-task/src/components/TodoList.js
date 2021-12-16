import { Container, Stack,TextField, Box, Button,IconButton  } from "@mui/material";
import React, {useState, useEffect} from "react";
import BasicCard from './BasicCard'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Form from "./Form";
import { InputLabel, Select,MenuItem,FormControl } from "@mui/material";


const TodoList = () => {
    useEffect(()=> {getLocalTodo();}, []);
    const [inputText, setInputText]= useState(""); /* initally the string is empty */
    const [todos, setTodos] = useState([]); //initially empty array
    const [status, setStatus]= useState("all")
    const [filteredTodo, setFilteredTodo] = useState([])
    useEffect(()=> {filterHandler();saveLocalTodo();}, [todos,status]);
    const inputTextHandler = (e) =>{
        setInputText(e.target.value);
    };
    const submitTodoHandler = (e) => {
        e.preventDefault();
        setTodos([...todos, {text: inputText, completed:false, id:Math.random()*10000}]);
        setInputText("");
    }
    const statusHandler =(event)=>{
        //setStatus()
        setStatus(event.target.value)

    }
    const filterHandler=()=>{
        switch(status){
            case 'completed':
                setFilteredTodo(todos.filter(todo => todo.completed === true))
                break;
            case 'not completed':
                setFilteredTodo(todos.filter(todo => todo.completed === false))
                break;
            default:
                setFilteredTodo(todos)
                break;
        }
    }
    const saveLocalTodo =() =>{
        localStorage.setItem("todos",JSON.stringify(todos))
    }
    const getLocalTodo =() =>{
        if (localStorage.getItem('todos')===null){
            localStorage.setItem('todos', JSON.stringify([]))
        }else{
            const todoLocal =JSON.parse(localStorage.getItem('todos'));
            setTodos(todoLocal)
        }
    }

    return (
        <div className="container">
            <TextField aria-label="new-task" id="outlined-basic" label="new task" variant="outlined" value ={inputText} onChange={inputTextHandler} sx={{'backgroundColor':'white', 'marginBottom':'20px'}}/> 
            <IconButton aria-label="add"  onClick={submitTodoHandler}><AddCircleIcon /></IconButton>
            <FormControl >
                    <InputLabel  id="filter">filter</InputLabel>
                    <Select
                    labelId="filter"
                    label="select"
                    onChange={statusHandler}>
                <MenuItem  value={"all"}>all</MenuItem>
                <MenuItem  value={"completed"}>completed</MenuItem>
                <MenuItem  value={"not completed"}>not completed</MenuItem>
                </Select>
                
            </FormControl>
            <BasicCard todos={todos} setTodos={setTodos} filteredTodo={filteredTodo}/>
        </div>

   
    )
}
export default TodoList;