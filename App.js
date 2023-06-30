import React, { useState, useEffect } from "react"
import "./App.css"

import CustomNFT_ABI from "./abi.json"

const provider = new ethers.AlchemyProvider("sepolia", window.env.ALCHEMY_API)
const signer = new ethers.Wallet(window.env.PRIVATE_KEY, provider)

function App() {
  const [address, setAddress] = useState("")
  const [amount, setAmount] = useState("")
  const [message, setMessage] = useState("")
  const [txDetails, setTxDetails] = useState(null)
  const [blockNumber, setBlockNumber] = useState(null)
  const [balance, setBalance] = useState(null)
  const [transactionCount, setTransactionCount] = useState(null)
  const [gasPrice, setGasPrice] = useState(null)
  const [animateGasPrice, setAnimateGasPrice] = useState(false)
  const contractAddress = "0xad58c36D0f4dFBaA25a823f4a264BAC082B360F7"
  const [metadataLink, setMetadataLink] = useState("")
  const [imageUrl, setImageUrl] = useState("")

  useEffect(() => {
    const fetchAccountDetails = async () => {
      const blockNumber = await provider.getBlockNumber()
      const balance = await provider.getBalance(signer.address)
      const transactionCount = await provider.getTransactionCount(
        signer.address
      )
      setBlockNumber(blockNumber)
      setBalance(balance)
      setTransactionCount(transactionCount)
    }
    fetchAccountDetails()
    const fetchGasPrice = async () => {
      const gasp0 = await (await provider.getFeeData()).gasPrice
      const gasp = ethers.formatUnits(gasp0, "gwei")
      setGasPrice(gasp)
      setAnimateGasPrice(true)
      setTimeout(() => setAnimateGasPrice(false), 1000)
    }

    fetchGasPrice()
    const gasPriceInterval = setInterval(fetchGasPrice, 10000)

    return () => clearInterval(gasPriceInterval)
  }, [])

  const sendEther = async () => {
    setMessage("Sending Ether...")

    try {
      const gasp0 = await (await provider.getFeeData()).gasPrice
      const tx = await signer.sendTransaction({
        to: address,
        value: ethers.parseEther(amount),
        gasPrice: gasp0,
      })

      await tx.wait()
      setMessage("Transaction Completed")
      setTxDetails(tx)
      // Update account details after transaction
      const updatedBalance = await provider.getBalance(signer.address)
      const updatedTransactionCount = await provider.getTransactionCount(
        signer.address
      )
      setBalance(updatedBalance)
      setTransactionCount(updatedTransactionCount)
    } catch (error) {
      console.error("Error:", error)
      setMessage("Error: Transaction Failed")
    }
  }

  const updateBlockNumber = async () => {
    const blockNumber = await provider.getBlockNumber()
    setBlockNumber(blockNumber)
  }

  const mintNFT = async () => {
    if (contractAddress === "") {
      setMessage("Error: Contract address is required.")
      return
    }

    try {
      setMessage("Minting NFT...")

      const contract = new ethers.Contract(
        contractAddress,
        CustomNFT_ABI,
        signer
      )

      const mintTx = await contract.mintNFT(address, metadataLink)
      setMessage(`Transaction Sent: ${mintTx.hash}`)
      const confirms = 2
      const receipt = await provider.waitForTransaction(mintTx.hash, confirms)

      if (receipt) {
        setMessage("NFT Minted!")
        setImageUrl(metadataLink)
      } else {
        setMessage("Error: NFT Minting Failed")
      }
    } catch (error) {
      console.error("Error:", error)
      setMessage("Error: NFT Minting Failed")
    }
  }

  return (
    <div className="App">
      <h1>Send Ether</h1>
      <input
        type="text"
        placeholder="Recipient Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <input
        type="text"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={sendEther}>Send</button>
      <p>{message}</p>
      {txDetails && (
        <pre>
          <code>{JSON.stringify(txDetails, null, 2)}</code>
        </pre>
      )}

      <hr />
      <h2>Account Details</h2>
      <p>Address: {signer.address}</p>
      <p>Balance: {balance && ethers.formatEther(balance)} Ether</p>
      <p>Transaction Count: {transactionCount}</p>
      <hr />

      <h2>Current Block Number</h2>
      <p>{blockNumber}</p>
      <button onClick={updateBlockNumber}>Update Block Number</button>

      <h2>Current Gas Price</h2>
      <p className={animateGasPrice ? "animate-gas-price" : ""}>
        {gasPrice} Gwei
      </p>

      <hr />
      <h2>Mint NFT</h2>
      <input
        type="text"
        placeholder="Recipient Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <input
        type="text"
        placeholder="Metadata Link"
        value={metadataLink}
        onChange={(e) => setMetadataLink(e.target.value)}
      />
      <button onClick={mintNFT}>Mint</button>
      <p>{message}</p>

      {imageUrl && (
        <div>
          <h3>NFT Image</h3>
          <img
            src={imageUrl}
            alt="NFT"
            style={{ maxWidth: "100%", maxHeight: "400px" }}
          />
        </div>
      )}
    </div>
  )
}

export default App
