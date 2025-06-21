import './index.css'
import { Component } from 'react'
import { Navigate } from 'react-router-dom'


class Edit extends Component {
    state = {titleInput: '', descriptionInput: '', statusInput: 'todo', dueDateInput: '', isTaskUpdated: false}


 fetchTaskDetails = async (taskId) => {
  try {
    const response = await fetch(`http://localhost:4000/task/${taskId}`)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const taskDetails = await response.json()
    this.setState({
      titleInput: taskDetails.title,
      descriptionInput: taskDetails.description,
      statusInput: taskDetails.status,
      dueDateInput: taskDetails.dueDate
    })
  } catch (error) {
    console.error('❌ Fetch failed:', error)
  }
}

   
    componentDidMount() {
  const { id } = this.props.params
  console.log('Task ID:', id, '| Type:', typeof id)

  if (typeof id === 'string') {
    this.fetchTaskDetails(id)
  } else {
    console.error('Invalid taskId:', id)
  }
}

    
    onTitleInput = event => {
        this.setState({titleInput: event.target.value})
    }
    onDescriptionInput = event => {
        this.setState({descriptionInput: event.target.value})
    }
    onStatusInput = event => {
        this.setState({statusInput: event.target.value})    
    }
    onDueDateInput = event => {
        this.setState({dueDateInput: event.target.value})
    }
    onTaskSubmit = async event => {
        event.preventDefault()
        const {titleInput, descriptionInput, statusInput, dueDateInput} = this.state
        const taskDetails = {
            title: titleInput,
            description: descriptionInput,
            status: statusInput,
            dueDate: dueDateInput
        }
        try {
            const response = await fetch(`http://localhost:4000/task/${this.props.params.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(taskDetails),
            })
            if (!response.ok) {
                throw new Error('Failed to update task')
            }
            const data = await response.json()
            console.log(data)
        } catch (error) {
            console.error('Error updating task:', error)
        }
        console.log('Task Submitted:', taskDetails)
        // Here you can add the logic to save the task details
        this.setState({titleInput: '', descriptionInput: '', statusInput: 'todo', dueDateInput: '', isTaskUpdated: true})

    }

  render() {
    const {titleInput, descriptionInput, statusInput, dueDateInput, isTaskUpdated} = this.state
    return (
      <>{isTaskUpdated? <Navigate to='/' replace={true} /> : 
      <div className="main-container">
        <nav>
          <h1>Task Management System</h1>
        </nav>
        <div className="bottom-container">
          <div className="task-button-container">
            <h2  className='task-header'>Edit Task</h2>
          </div>
          <form className="add-task-form" onSubmit={this.onTaskSubmit}>
            <label htmlFor="title">Title:</label>
            <input onChange={this.onTitleInput} value={titleInput} type="text" id="title" placeholder='Title' name="title" required />
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
                placeholder='Description'
                name="description"
                rows="4"
                cols="50"
                onChange={this.onDescriptionInput}
                value={descriptionInput}
                required
                ></textarea>
            <label htmlFor="status">Status:</label>
            <select onChange={this.onStatusInput} value={statusInput} id="status" name="status" required>
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
            </select>
            <label htmlFor="due-date">Due Date:</label>
            <input onChange={this.onDueDateInput} value={dueDateInput} type="date" id="due-date" name="due-date" />
            <button className='add-button' type="submit">Update Task</button>
          </form>
        </div>
      </div>}</>
    )
  }
}

export default Edit