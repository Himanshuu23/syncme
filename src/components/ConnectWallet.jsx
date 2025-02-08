"use client";
import { useState } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";

export default function ConnectWallet() {
  const [walletAddress, setWalletAddress] = useState("");

  const connectWallet = async () => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.BrowserProvider(connection);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setWalletAddress(address);
    } catch (error) {
      console.error("Wallet connection failed:", error);
    }
  };

  return (
    <div>
      <button onClick={connectWallet}>
        {walletAddress ? null : "Connect MetaMask to buy"}
      </button>
    </div>
  );
}