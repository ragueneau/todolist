
import { useState  } from 'react'
//import { ethers } from "ethers"
import { Row, Form, Button } from 'react-bootstrap'

const Create = ({ taskManager, networkName, account }) => {

    const [price, setPrice] = useState(null)
    const [name, setName] = useState('')
    const [taskAccount, setTaskAccount] = useState(account)
    const [description, setDescription] = useState('')

    const createTask = async () => {

      console.log('createTask')
      console.log(price)
      console.log(name)
      console.log(description)

      //create task
      const task = await taskManager.createTask(name, description)
      console.log('task:', task)
    }

    // Render ---------------------------------------------------------------------------------------------------------- //
    return (
      <div className="flex justify-center">
        <div className="px-5 py-3 container">
            <h5>New Task</h5>
            <main role="main" className="col-lg-12 mx-auto" style={{ maxWidth: '1000px' }}>
            <div className="content mx-auto">
              <Row className="g-4">
                <Form.Control onChange={(e) => setName(e.target.value)} size="lg" required type="text" placeholder="Task Name" />
                <Form.Control onChange={(e) => setDescription(e.target.value)} size="lg" required as="textarea" placeholder="Description" />
                <Form.Control onChange={(e) => setTaskAccount(e.target.taskAccount)} size="lg" required type="text" placeholder={taskAccount} />
                <Form.Control onChange={(e) => setPrice(e.target.value)} size="lg" required type="number" placeholder="Prize in xETH" />
                <div className="d-grid px-0">
                  <Button onClick={createTask} variant="primary" size="lg">
                    Create Task!!
                  </Button>
                </div>
              </Row>
            </div>
          </main>
        </div>
      </div>
    );
}
export default Create