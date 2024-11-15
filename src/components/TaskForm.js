import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

const TaskForm = ({ show, handleClose, addTask, editTask, taskToEdit }) => {
    const [task, setTask] = useState({ name: '', priority: 'Medium', status: 'To Do' });

    useEffect(() => {
        if (taskToEdit) {
            setTask(taskToEdit);
        } else {
            setTask({ name: '', priority: 'Medium', status: 'To Do' });
        }
    }, [taskToEdit]);

    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    const handlePriorityChange = (priority) => {
        setTask({ ...task, priority });
    };

    const handleStatusChange = (status) => {
        setTask({ ...task, status });
    };

    const handleSubmit = () => {
        taskToEdit ? editTask(task) : addTask(task);
        setTask({ name: '', priority: 'Medium', status: 'To Do' });
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{taskToEdit ? 'Edit Task' : 'Add Task'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="taskName" className="mb-4">
                        <Form.Label>Task</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={task.name}
                            onChange={handleChange}
                            placeholder="Type your task here..."
                        />
                    </Form.Group>
                    <Form.Group controlId="taskPriority" className="mb-4">
                        <Form.Label>Priority</Form.Label>
                        <div className="d-flex gap-3">
                            <Button 
                                variant={task.priority === 'High' ? 'danger' : 'outline-danger'} 
                                onClick={() => handlePriorityChange('High')}
                            >
                                High
                            </Button>
                            <Button 
                                variant={task.priority === 'Medium' ? 'warning' : 'outline-warning'} 
                                onClick={() => handlePriorityChange('Medium')}
                            >
                                Medium
                            </Button>
                            <Button 
                                variant={task.priority === 'Low' ? 'success' : 'outline-success'} 
                                onClick={() => handlePriorityChange('Low')}
                            >
                                Low
                            </Button>
                        </div>
                    </Form.Group>
                    <Form.Group controlId="taskStatus" className="mb-4">
                        <Form.Label>Status</Form.Label>
                        <div className="d-flex gap-3">
                            <Button
                                variant={task.status === 'To Do' ? 'secondary' : 'outline-secondary'}
                                onClick={() => handleStatusChange('To Do')}
                            >
                                To Do
                            </Button>
                            <Button
                                variant={task.status === 'In Progress' ? 'warning' : 'outline-warning'}
                                onClick={() => handleStatusChange('In Progress')}
                            >
                                In Progress
                            </Button>
                            <Button
                                variant={task.status === 'Done' ? 'success' : 'outline-success'}
                                onClick={() => handleStatusChange('Done')}
                            >
                                Done
                            </Button>
                        </div>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    {taskToEdit ? 'Update Task' : 'Add'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default TaskForm;
