import React, { useState } from "react";
import "./Todo.css"; // Import custom CSS for animations

function Todo() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState(""); // success, warning, danger

    const [editIndex, setEditIndex] = useState(null);
    const [editedTask, setEditedTask] = useState("");

    const showAlert = (message, type) => {
        setAlertMessage(message);
        setAlertType(type);
        setTimeout(() => setAlertMessage(""), 3000); // Hide alert after 3 seconds
    };

    const addTask = (e) => {
        e.preventDefault();
        if (newTask.trim()) {
            setTasks([...tasks, newTask]);
            showAlert(`Task "${newTask}" has been added successfully!`, "success");
            setNewTask("");
        }
    };

    const deleteTask = (index) => {
        const task = tasks[index];
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
        showAlert(`Task "${task}" has been deleted.`, "danger");
    };

    const startEditing = (index, task) => {
        setEditIndex(index);
        setEditedTask(task);
    };

    const saveTask = (index) => {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? editedTask : task
        );
        setTasks(updatedTasks);
        showAlert(`Task has been updated to "${editedTask}".`, "success");
        cancelEdit();
    };

    const cancelEdit = () => {
        setEditIndex(null);
        setEditedTask("");
    };

    return (
        <div className="animated-background">
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6 bg-light p-4 rounded shadow">
                        <h2 className="text-center mb-4">Todo List</h2>

                        {/* Alert Message */}
                        {alertMessage && (
                            <div
                                className={`alert alert-${alertType} alert-dismissible fade show animated-alert d-flex align-items-center`}
                                role="alert"
                            >
                                <span
                                    className={`me-2 ${
                                        alertType === "success"
                                            ? "text-success"
                                            : "text-danger"
                                    }`}
                                >
                                    {alertType === "success" ? "✔️" : "❌"}
                                </span>
                                <div>{alertMessage}</div>
                                <button
                                    type="button"
                                    className="btn-close ms-auto"
                                    aria-label="Close"
                                    onClick={() => setAlertMessage("")}
                                ></button>
                            </div>
                        )}

                        {/* Add Task Form */}
                        <form onSubmit={addTask} className="mb-4">
                            <div className="input-group">
                                <input
                                    type="text"
                                    value={newTask}
                                    className="form-control"
                                    onChange={(e) => setNewTask(e.target.value)}
                                    placeholder="Add a new task"
                                />
                                <button
                                    className="btn btn-primary"
                                    type="submit"
                                >
                                    Add
                                </button>
                            </div>
                        </form>

                        {/* Task List */}
                        <ul className="list-group">
                            {tasks.map((task, index) => (
                                <li
                                    key={index}
                                    className="list-group-item d-flex justify-content-between align-items-center"
                                >
                                    {editIndex === index ? (
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={editedTask}
                                                onChange={(e) =>
                                                    setEditedTask(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <button
                                                className="btn btn-success"
                                                onClick={() => saveTask(index)}
                                            >
                                                Save
                                            </button>
                                            <button
                                                className="btn btn-secondary ms-2"
                                                onClick={cancelEdit}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <span>{task}</span>
                                            <div>
                                                <button
                                                    className="btn btn-danger btn-sm me-2"
                                                    onClick={() =>
                                                        deleteTask(index)
                                                    }
                                                >
                                                    Delete
                                                </button>
                                                <button
                                                    className="btn btn-warning btn-sm"
                                                    onClick={() =>
                                                        startEditing(index, task)
                                                    }
                                                >
                                                    Edit
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Todo;
