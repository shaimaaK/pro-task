import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
// checkbox stuff
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import { Container, Stack } from '@mui/material';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Grid from '@mui/material/Grid';

export default function BasicCard({todos, setTodos, filteredTodo}) {
  const deleteHandler = (task)  => {
    setTodos(todos.filter((element) => element.id !== task.id));
  };
 

  const handleChange = (task) => {

      //pass the element and change
      setTodos(todos.map((element) => {
        if (element.id === task.id){
          return{
            ...element, completed:!element.completed
          }
        }
        return element;
      }));

    
  };
  
  
  return (
    <Stack spacing={1}>
    {filteredTodo.map(task => 
      <item key={task.id}>
        <Card ariab-label="card-task" sx={{ maxWidth: 400, borderRadius:4, width:'auto', margin:'auto',boxShadow: 5}}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Wednesday, 22 Nov
            </Typography>
              <Grid container columns={16}>
                <Grid item lg={2}>
                {(task.completed )?<IconButton aria-label="TASK-COMPLETED" onClick={()=> handleChange(task)}><CheckCircleIcon /></IconButton>: <IconButton aria-label="TASK-NOT-COMPLETED" onClick={()=> handleChange(task)}><RadioButtonUncheckedIcon /></IconButton>}
                </Grid>
                <Grid item lg={14}>
                <Typography  style={{textDecoration:task.completed&&'line-through'}} >{task.text}</Typography>
                </Grid>        
                <Grid item lg={2}>
                <IconButton aria-label="TASK-delete" onClick={()=>deleteHandler(task)}><DeleteIcon /></IconButton>
                </Grid>
              </Grid>
            
          </CardContent>
        </Card>
      </item>
      )
    }</Stack>

  );
}
