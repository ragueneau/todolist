// ---------------------------------------------------------------------------------------------------- //
//
// ---------------------------------------------------------------------------------------------------- //
import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Spinner } from 'react-bootstrap'
import { ethers } from "ethers"

// Export ------------------------------------------------------------------------------------------- //
import './App.css';
import Navigation from './routes/Navbar';
import Home from './routes/Home.js'
import Create from './routes/Create.js'

// Contract Addresses ------------------------------------------------------------------------------ //
import ContractAbi from './contractsData/TaskManager.json'
import ContractAddress from './contractsData/TaskManager-address.json'

// Functions ---------------------------------------------------------------------------------------- //
function App() {
  const [loading, setLoading] = useState(true)
  const [account, setAccount] = useState(null)
  const [networkName, setNetworkName] = useState('network')
  const [taskManager, setTodoList] = useState(null)

  // MetaMask Login/Connect ----------------------------------------------------------------------- //
  const web3Handler = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(accounts[0])

    // Get provider from Metamask
    const provider = new ethers.providers.Web3Provider(window.ethereum)

    // Set signer
    const signer = provider.getSigner()

    window.ethereum.on('chainChanged', (chainId) => {
      window.location.reload();
    })

    window.ethereum.on('accountsChanged', async function (accounts) {
      setAccount(accounts[0])
      await web3Handler()
    })

    loadContracts(signer)
  }

    // Load contracts -------------------------------------------------------------------------------- //
  const loadNetwork = async () => {
    console.log('CoeptIX network');
    setNetworkName('CoeptIX')
  }

  // Load contracts -------------------------------------------------------------------------------- //
  const loadContracts = async (signer) => {

    // Get deployed copies of contracts
    const taskmanager = new ethers.Contract(ContractAddress.address, ContractAbi.abi, signer)

    setTodoList(taskmanager)
    setLoading(false)
  }

  useEffect(() => {
    loadNetwork()
  }, [])

  // Render ---------------------------------------------------------------------------------------- //
  return (
    <BrowserRouter>
      <div className="App">
        <div>
          <Navigation web3Handler={web3Handler} account={account} networkName={networkName}/>
        </div>
        <div className="container">
        {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
              <Spinner animation="border" style={{ display: 'flex' }} />
              <p className='mx-3 my-0'>Awaiting Metamask Connection...</p>
            </div>
          ) : (
          <Routes>
            <Route exact path="/" element={
              <Home taskManager={taskManager} networkName={networkName} account={account}/>
            } />
            <Route exact path="/profile" element={
              <Home taskManager={taskManager} networkName={networkName} account={account}/>
            } />
            <Route exact path="/create" element={
              <Create taskManager={taskManager} networkName={networkName} account={account}/>
            } />
            <Route path="/task/:taskID" element={
              <Home taskManager={taskManager} networkName={networkName} account={account}/>
            } />
            <Route path="/account/:taskAccount" element={
              <Home taskManager={taskManager} networkName={networkName} account={account}/>
            } />
          </Routes>)}
        </div>
      </div>
    </BrowserRouter>
  );
}
export default App;
