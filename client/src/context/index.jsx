import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { useNavigate } from "react-router-dom";

import { ABI, ADDRESS } from "../contract";
import { createEventListener } from "./CreateEventListener";

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [walletAdress, setWalletAdress] = useState("");
  const [provider, setProvider] = useState("");
  const [contract, setContract] = useState("");
  const [showAlert, setShowAlert] = useState({
    status: false,
    type: "info",
    message: "",
  });
  const [battleName, setBattleName] = useState("");

  const navigate = useNavigate();

  const updateCurrentWalletAdress = async () => {
    const accounts = await window?.ethereum.request({
      method: "eth_accounts",
    });
    if (accounts) setWalletAdress(accounts[0]);
  };

  //* Set the wallet address to the state
  useEffect(() => {
    updateCurrentWalletAdress();

    window?.ethereum.on("accountsChanged", updateCurrentWalletAdress);
  }, []);

  //* Set the smart contract the provider to the state
  useEffect(() => {
    const setSmartContractAndProvider = async () => {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const newProvider = new ethers.providers.Web3Provider(connection);
      const signer = newProvider.getSigner();
      const newContract = new ethers.Contract(ADDRESS, ABI, signer);
      setProvider(newProvider);
      setContract(newContract);
    };

    setSmartContractAndProvider();
  }, []);

  useEffect(() => {
    if (contract)
      createEventListener({
        navigate,
        contract,
        provider,
        walletAdress,
        setShowAlert,
      });
  }, [contract]);

  useEffect(() => {
    if (showAlert?.status) {
      const timer = setTimeout(() => {
        setShowAlert({ status: false, type: "info", message: "" });
      }, [5000]);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  return (
    <GlobalContext.Provider
      value={{
        contract,
        walletAdress,
        showAlert,
        setShowAlert,
        navigate,
        battleName,
        setBattleName,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
