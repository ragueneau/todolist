
import { useState, useEffect } from 'react'
//import { ethers } from "ethers"
import { Col, Row, Spinner } from 'react-bootstrap'
import TaskList from './taskList'

const taskList2 = [
    {
        id: 1,
        owner: "0x1234567890123456789012345678901234567890",
        title: "Task 1",
        description: "Description 1",
        taskAccount: "0x1234567890123456789012345678901234567890",
        price: "0.01",
        completed: false,
        started: true,
        assigned: true,
        startDate: "2022-05-01",
        endDate: "2022-06-01"
    },
    {
        id: 2,
        owner: "0x1234567890123456789012345678901234567890",
        title: "Task 2",
        description: "Description 2",
        taskAccount: "0x1234567890123456789012345678901234567890",
        price: "0.01",
        completed: false,
        started: true,
        assigned: true,
        startDate: "2022-04-01",
        endDate: "2022-06-01"
    },
    {
        id: 3,
        owner: "0x1234567890123456789012345678901234567890",
        title: "Task 3",
        description: "Description 3",
        taskAccount: "0x1234567890123456789012345678901234567890",
        price: "0.01",
        completed: true,
        started: true,
        assigned: true,
        startDate: "2022-03-01",
        endDate: "2022-06-01"
    }
]

const Home = ({ taskManager, networkName, account }) => {
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true)
    const [taskList, setTasks] = useState([])


    // getTaskList -------------------------------------------------------------------------------- //
    const getTaskList = async () => {
        setLoading(true)

        const nbTasks = await taskManager.taskCount()
        console.log('Task Count:', nbTasks.toString())

        //get ownerAccount from the smartcontract
        const ownerAccount = await taskManager.ownerAccount()

        //console.log('tasks', tasks)
        console.log('Contact: ', taskManager)
        console.log('Owner Account: ', ownerAccount)

        //get all tasks
        const tasks = []
        for (let i = 1; i <= nbTasks; i++) {
           const task = await taskManager.tasks(i)
           tasks.push(task)
        }

        console.log('tasks', tasks)
        setTasks(tasks)
        setLoading(false)
    }


    // useEffect -------------------------------------------------------------------------------- //
    useEffect(() => {
        let timer = setTimeout(() => {
            setCount((count) => count + 1);
            getTaskList()
            setLoading(false)
        }, 1000);
        return () => clearTimeout(timer)
    })

    if (loading) return (
        <main style={{ padding: "1rem 0" }}>
            <h2>Loading the latest tasks...</h2>
            <Spinner animation="border" style={{ display: 'flex' }} />
        </main>
    )

    // Render ---------------------------------------------------------------------------------------------------------- //
    return (
      <div className="flex justify-center">
        <div className="px-5 py-1 container">
            <h3>Todo Manager</h3>
            <Row className="g-2">
                <Col className="g-2" >
                    <h4>Todo List</h4>
                    <TaskList taskList={taskList} />
                </Col>
            </Row>
        </div>
      </div>
    );
}
export default Home