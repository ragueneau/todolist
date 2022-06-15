import React from "react";
import { Table, Button } from 'react-bootstrap'
import { Link } from "react-router-dom"

//a fonction to get human date from unix timestamp
function getHumanDate(unixTimestamp) {

    if (unixTimestamp <= 0) {
        return ''
    } else {

        const date = new Date(unixTimestamp * 1000);
        const year = date.getFullYear();
        const month = "0" + (date.getMonth() + 1);
        const day = date.getDate();

        const hours = date.getHours();
        const minutes = "0" + date.getMinutes();

        const formattedTime = year+'-'+month+'-'+day+' '+hours + ':' + minutes.substr(-2);
        return formattedTime;
    }
}

//return the a Button from an integer
function getPriority(id) {
    //a case to get the button
    switch (id) {
        case 0:
            return <Button variant="secondary" className="btn-list">none</Button>
        case 1:
            return <Button variant="success" className="btn-list">low</Button>
        case 2:
            return <Button variant="warning" className="btn-list">high</Button>
        case 3:
            return <Button variant="danger" className="btn-list">urgent</Button>
        default:
            return <Button variant="secondary" className="btn-list">text</Button>
    }
}

//return the a Button from an integer
function getStatus(id) {

    //a case to get the button
    switch (id) {
        case 0:
            return <Button variant="secondary" className="btn-list">opened</Button>
        case 1:
            return <Button variant="success" className="btn-list">assigned</Button>
        case 2:
            return <Button variant="danger" className="btn-list">blocked</Button>
        case 3:
            return <Button variant="secondary" className="btn-list">closed</Button>
        default:
            return <Button variant="secondary" className="btn-list">none</Button>
    }
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
}

//function to display a trunked address and a button to copy it
function getAddress(address) {
    const addr = address.slice(0,6) + '...' + address.slice(-4)

    return <div>
        <span className="text-truncate">{address}</span>
        <Button variant="link" className="copy-button" onClick={() => copyToClipboard(address)}>copy</Button>
    </div>
}
function linkAddress(address) {
    const addr = address.slice(0,6) + '...' + address.slice(-4)

    return <div>
        <Link to={`/address/${address}`}>{addr}</Link>
    </div>
}

const TaskList = ({taskList}) => {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Status</th>
                    <th>Priority</th>
                    <th>Created</th>
                    <th>Assigned</th>
                    <th>Updated</th>
                    <th>End date</th>
                </tr>
            </thead>
            <tbody>
                {taskList.map((item, idx) => (
                    <tr key={idx}>
                        <td>{item.id.toString()}</td>
                        <td>{item.title}</td>
                        <td>{getStatus(parseInt(item.status))}</td>
                        <td>{getPriority(parseInt(item.priority))}</td>
                        <td>{linkAddress(item.createdBy)}</td>
                        <td>{linkAddress(item.assignedTo)}</td>
                        <td>{linkAddress(item.updatedBy)}</td>
                        <td>{getHumanDate(item.completedAt)}</td>
                        <td>
                            <Link to={`/task/${item.id}`}>
                                <Button variant="primary" size="sm" className="btn-list">View</Button>
                            </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default TaskList;