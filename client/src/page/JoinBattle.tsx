import React, { useEffect } from "react";
import { useGlobalContext } from "../context";

import { CustomButton, PageHoc } from "../components";
import styles from "../styles";

const JoinBattle = () => {
  const { navigate } = useGlobalContext();
  return (
  <>
    <h2 className={styles.joinHeadText}>Available Battles:</h2>
    <p className={styles.infoText} onClick={() => navigate('/create-battle')}>Or create a new battle</p>
  </>
  );
};

export default PageHoc(
  JoinBattle,
  <>
    Join <br /> a Battle
  </>,
  <>Join already existing battles</>
);
