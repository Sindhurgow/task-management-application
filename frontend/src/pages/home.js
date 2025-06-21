import {Component} from "react";
import './index.css'; 
import {Link} from "react-router-dom";


class Home extends Component {
  state = {
    tasks: []
  };
  componentDidMount() {
    this.getTasks();
  }
  getTasks = async () => {
    try {
      const response = await fetch('http://localhost:4000/task');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const tasks = await response.json();
      console.log(tasks);
      this.setState({ tasks });
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  deleteTask = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/task/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      this.getTasks(); // Refresh the task list after deletion
    } catch (error) {
      console.error('There was a problem with the delete operation:', error);
    }
  };

  render() {
    const { tasks } = this.state;
    return (
      <div className="main-container">
        <nav>
            <Link className="text-link" to='/'>
                <h1>Task Management System</h1>
            </Link>
        </nav>
        <div className="bottom-container">
            <div className="task-button-container">
                <h2>Tasks</h2>
                <Link className="text-link" to='/add'>
                    <button className="add-task-button">+  Add Task</button>
                </Link>
            </div>
            <div className="task-list-container">
                <div className="task-element-container">
                    <p>TITLE</p>
                    <p>STATUS</p>
                    <p>DUE DATE</p>
                    <p>ACTION</p>
                </div>
                {tasks.map(task => (
                    <div className="task-element-container" key={task.id}>
                        <p className="task-element">{task.title}</p>
                        <p className="task-element">{task.status}</p>
                        <p className="task-element">{task.dueDate}</p>
                        <div className="task-element">
                          <Link className="text-link" to={`/edit/${task.id}`}>
                            <button className="edit-task-button">Edit</button>
                        </Link>
                        <button className="delete-task-button" onClick={() => this.deleteTask(task.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    );
  }
}

export default Home;