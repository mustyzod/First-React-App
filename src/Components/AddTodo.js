import React, { Component } from 'react'
import { PropTypes } from 'prop-types';

export class AddTodo extends Component {
    state = {
        title:''
    }
    UpdateText = (e) => this.setState({ [e.target.name] : e.target.value});

    onSubmit = (e) => {
        e.preventDefault();
        this.props.addTodo(this.state.title);
        this.setState({ title:''});
    }
  render() {
    return (
      <form onSubmit={this.onSubmit} style={{display:'flex'}}>
        <input
            type = "text"
            name = "title"
            style = {{flex:'10'}}
            placeholder = "Add Todo..."
            value = {this.state.title}
            onChange = {this.UpdateText}
        />
        <input
            type="submit"
            value="sumit"
            className="btn"
            style={{flex:'1'}}
        />
      </form>
    )
  }
}
AddTodo.propTypes = {
  addTodo:PropTypes.func.isRequired
}
export default AddTodo
