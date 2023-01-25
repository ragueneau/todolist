
import { useState, useEffect } from 'react'
//import { ethers } from "ethers"
import { Col, Row, Spinner } from 'react-bootstrap'
import TaskList from '../components/taskList'

const Home = ({ taskManager, networkName, account }) => {
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true)
    const [taskList, setTasks] = useState([])

    // getTaskList -------------------------------------------------------------------------------- //
    const getTaskList = async () => {
        setLoading(true)
        console.log('getTaskList')
        // const nbTasks = await taskManager.taskCount()
        //console.log('Task Count:', nbTasks.toString())

        //get ownerAccount from the smartcontract
        // const ownerAccount = await taskManager.ownerAccount()

        //console.log('tasks', tasks)
        //console.log('Contact: ', taskManager)
        //console.log('Owner Account: ', ownerAccount)

        // //get all tasks
        // const tasks = []
        // for (let i = 1; i <= nbTasks; i++) {
        //    const task = await taskManager.tasks(i)
        //    tasks.push(task)
        // }

        // //console.log('tasks', tasks)
        // setTasks(tasks)
        setLoading(false)
    }

    // useEffect -------------------------------------------------------------------------------- //
    useEffect(() => {
        let timer = setTimeout(() => {
            setCount((count) => count + 1);
            // getTaskList()
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