import React from "react";
import { Table, Button } from 'react-bootstrap'
import { Link } from "react-router-dom"

const TaskList = ({taskList}) => {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>taskAccount</th>
                    <th>Owner</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Actions</th>


                </tr>
            </thead>
            <tbody>
                {taskList.map((item, idx) => (
                    <tr key={idx}>
                        <td>{item.id.toString()}</td>
                        <td>{item.title}</td>
                        <td>{item.priority.toString()}</td>
                        <td>{item.status.toString()}</td>
                        <td>{}</td>
                        <td>{}</td>
                        <td>{}</td>
                        <td>{item.dueBy.toString()}</td>
                        <td>
                            <Link to={`/task/${item.id}`}>
                                <Button variant="primary" size="sm">View</Button>
                            </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default TaskList;