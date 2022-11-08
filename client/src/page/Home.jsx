import React, { useState } from "react";
import { useEffect } from "react";
import { PageHoc, CustomInput, CustomButton } from "../components";
import { useGlobalContext } from "../context";

const Home = () => {
  const { contract, walletAdress, setShowAlert, navigate } = useGlobalContext();
  const [playerName, setPlayerName] = useState("");

  const handleClick = async () => {
    try {
      const playerExists = await contract.isPlayer(walletAdress);

      if (!playerExists) {
        const res = await contract.registerPlayer(playerName, playerName);

        setShowAlert({
          status: true,
          type: "info",
          message: `${playerName} is being summoned!`,
        });
      }
    } catch (error) {
      setShowAlert({
        status: true,
        type: "failure",
        message:
          error?.message || error?.code === 4001
            ? "User rejected the request"
            : "Authorization error",
      });
    }
  };

  useEffect(() => {
    const checkForPlayerToken = async () => {
      const playerExists = await contract.isPlayer(walletAdress);
      const playerTokenExist = await contract.isPlayerToken(walletAdress);
      if (playerExists && playerTokenExist) navigate("/create-battle");
    };

    contract && checkForPlayerToken();
  }, []);
  return (
    <div className="flex flex-col">
      <CustomInput
        label="Name"
        placeholder="Enter your player name"
        value={playerName}
        handleValueChange={setPlayerName}
      />
      <CustomButton
        title="Register"
        handleClick={handleClick}
        restStyles="mt-6"
      />
    </div>
  );
};

export default PageHoc(
  Home,
  <>
    Welcome to Avax Gods <br /> a Web3 NFT Card Game
  </>,
  <>
    Connect your wallet to start playing <br /> the ultimate Web3 Battle Card
    Game
  </>
);
