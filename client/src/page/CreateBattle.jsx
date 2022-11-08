import React, { useEffect, useState } from "react";

import styles from "../styles";
import { useGlobalContext } from "../context";
import { PageHoc, CustomButton, CustomInput } from "../components";

const CreateBattle = () => {
  const { navigate, battleName, setBattleName, contract } = useGlobalContext();


  const handleClick = async () => {
    if(!battleName || !battleName.trim()) return null;

    try {
      await contract.createBattle(battleName);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <div className="flex flex-col mb-5">
        <CustomInput
          label="Battle"
          placeholder="Enter battle name"
          value={battleName}
          handleValueChange={setBattleName}
        />
        <CustomButton 
          title={'Create battle'}
          handleClick={handleClick}
          restStyles="mt-6"
        />
      </div>

      <p className={styles.infoText} onClick={() => navigate('/join-battle')}>Or join already existing battle</p>
    </>
  );
};

export default PageHoc(
  CreateBattle,
  <>
    Create <br /> a new Battle
  </>,
  <>Create your own battle and wait for other players to join you</>
);
