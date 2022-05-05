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

                </tr>
            </thead>
            <tbody>
                {taskList.map((item, idx) => (
                    <tr key={idx}>
                        <td>{item.id.toString()}</td>
                        <td>{item.title}</td>
                        <td>{item.priority.toString()}</td>


                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default TaskList;