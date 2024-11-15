import React, { useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import { BsPencil, BsTrash } from "react-icons/bs";

const TaskList = ({ tasks, deleteTask, showEditForm }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);

    const handleDeleteClick = (task) => {
        setTaskToDelete(task);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (taskToDelete) {
            deleteTask(taskToDelete.id);
        }
        setShowDeleteModal(false);
    };

    const cancelDelete = () => {
        setTaskToDelete(null);
        setShowDeleteModal(false);
    };

    const getPriorityStyle = (priority) => {
        switch (priority) {
            case "Hard":
                return { color: "red", fontWeight: "bold" };
            case "Medium":
                return { color: "orange", fontWeight: "bold" };
            case "Low":
                return { color: "green", fontWeight: "bold" };
            default:
                return {};
        }
    };

    const getStatusButton = (status) => {
        const statusColors = {
            "To Do": "secondary",
            "In Progress": "warning",
            Done: "success",
        };

        return (
            <Button
                variant={statusColors[status]}
                className="status-button"
                disabled
            >
                {status}
            </Button>
        );
    };

    return (
        <div>
            {tasks.map((task, index) => (
                <Card className="mb-3 shadow-sm border-0 rounded-3" key={index}>
                    <Card.Body className="d-flex justify-content-between align-items-center">
                        {/* Left: Task Details */}
                        <div className="d-flex flex-column flex-md-row align-items-center w-100">
                            <div className="me-md-4 mb-2 mb-md-0 me-4">
                                <strong>Task:</strong>
                                <div>{task.name}</div>
                            </div>
                            <div className="me-md-4 mb-2 mb-md-0 me-4">
                                <strong>Priority:</strong>
                                <div style={getPriorityStyle(task.priority)}>{task.priority}</div>
                            </div>
                            <div className="me-4">
                                <strong>Status:</strong>
                                <div>{getStatusButton(task.status)}</div>
                            </div>
                        </div>

                        {/* Right: Action Buttons */}
                        <div className="d-flex align-items-center">
                            <Button
                                variant="outline-primary"
                                className="me-2 d-flex align-items-center"
                                onClick={() => showEditForm(task)}
                            >
                                <BsPencil />
                            </Button>
                            <Button
                                variant="outline-danger"
                                className="d-flex align-items-center"
                                onClick={() => handleDeleteClick(task)}
                            >
                                <BsTrash />
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            ))}

            {/* Delete Confirmation Modal */}
            <Modal show={showDeleteModal} onHide={cancelDelete} centered>
                <Modal.Body className="text-center">
                    <h5>Are you sure you want to delete this task?</h5>
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-center">
                    <Button
                        onClick={confirmDelete}
                        style={{
                            backgroundColor: "#6C63FF",
                            border: "none",
                            borderRadius: "20px",
                            fontWeight: "bold",
                            padding: "10px 20px",
                            color: "white",
                        }}
                    >
                        Delete
                    </Button>
                    <Button
                        onClick={cancelDelete}
                        variant="outline-secondary"
                        style={{
                            borderRadius: "20px",
                            fontWeight: "bold",
                            padding: "10px 20px",
                        }}
                    >
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default TaskList;
