// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract TaskManager {
    uint public taskCount = 0;
    address payable public immutable ownerAccount; // the account that receives fees

    struct Task {
        uint id;
        string title;
        string description;
        uint status;
        uint priority;
        address assignedTo;
        address createdBy;
        address updatedBy;
        uint createdAt;
        uint updatedAt;
        uint dueBy;
        uint completedAt;
    }

    mapping(uint => Task) public tasks;

    event TaskCreated(
        uint id,
        string title,
        string description,
        uint status,
        uint priority,
        address assignedTo,
        address createdBy,
        address updatedBy,
        uint createdAt,
        uint updatedAt,
        uint dueBy,
        uint completedAt
    );

    event TaskCompleted(
        uint id,
        uint completedAt
    );

    event ChangeStatus(
        uint id,
        uint status
    );

    event ChangePriority(
        uint id,
        uint priority
    );

    event ChangeAssignation(
        uint id,
        address assignedTo
    );
    event UpdatedBy(
        uint id,
        address updatedBy
    );

    constructor() {
        ownerAccount = payable(msg.sender);
    }


    function createTask(string memory _title, string memory _description) public {
        taskCount ++;
        tasks[taskCount] = Task(
            taskCount,
            _title,
            _description,
            0,
            0,
            msg.sender,
            msg.sender,
            msg.sender,
            block.timestamp,
            block.timestamp,
            0,
            0
        );
        emit TaskCreated(taskCount, _title, _description, 0, 0, msg.sender, msg.sender, msg.sender, block.timestamp, block.timestamp, 0, 0);
    }


    function toggleCompleted(uint _id) public {
        Task memory _task = tasks[_id];
        _task.completedAt = block.timestamp;
        tasks[_id] = _task;

        emit TaskCompleted(_id, _task.completedAt);
        emit ChangeStatus(_id, 9);
    }

    function changeStatus(uint _id, uint _status) public {
        Task memory _task = tasks[_id];
        _task.status = _status;
        tasks[_id] = _task;

        emit ChangeStatus(_id, _task.status);
        emit UpdatedBy(_id, msg.sender);
    }

    function changePriority(uint _id, uint _priority) public {
        Task memory _task = tasks[_id];
        _task.priority = _priority;
        tasks[_id] = _task;

        emit ChangePriority(_id, _task.priority);
        emit UpdatedBy(_id, msg.sender);
    }
}
