import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './Components/Layout/Header';
import AddTodo from './Components/AddTodo';
import Todos from './Components/Todos';
import About from './Components/pages/About';
//import uuid from 'uuid';

import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    todos:[
      /*{
        id: uuid.v4(),
        title: 'Take out the trash',
        completed: false
      },
      {
        id: uuid.v4(),
        title: 'Take out the box',
        completed: false
      },
      {
        id: uuid.v4(),
        title: 'Take out the plates',
        completed: true
      },*/
    ]
  }

  componentDidMount(){
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
  .then(response=> this.setState({todos:response.data}))
  }
  markComplete = (id) =>{
    this.setState({ todos:this.state.todos.map(todo=>{
      if(todo.id===id){
        todo.completed=!todo.completed
      }
      return todo;
    }) 
    });
  }
  delTodo = (id) =>{
    axios.delete('https://jsonplaceholder.typicode.com/todos/{id}')
    .then(response=>this.setState({todos:[...this.state.todos.filter(todo=>todo.id !==id)]}));
  }
  //addTodo
  addTodo = (title) =>{
    axios.post('https://jsonplaceholder.typicode.com/todos',{
      title,
      completed:false
    })
    /*const newTodo = {
      id:uuid.v4(),
      title,
      completed:false
    }*/
    .then(response=>this.setState({todos:[...this.state.todos, response.data] }));
  }
  render() {
    return (
      <Router>
        <div className="container">
          <Header />
          <Route exact path="/" render={props =>(
            <React.Fragment>
              <AddTodo addTodo={this.addTodo} />
              <Todos todos={this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo}/>
            </React.Fragment>
          )} />
          <Route path="/about" component={About}/>
        </div>
      </Router>
    );
  }
}

export default App;
