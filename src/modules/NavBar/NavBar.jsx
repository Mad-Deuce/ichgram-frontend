import { useState } from "react";

import IchgramLogo from "/src/shared/components/IchgramLogo/IchgramLogo";
import Modal from "/src/shared/components/Modal/Modal";

import Menu from "./Menu/Menu";

import styles from "./NavBar.module.css";

export default function NavBar() {
  const [modalHidden, setModalHidden] = useState(true);
  const [modalChild, setModalChild] = useState(null);

  const toggleModal = (title) => {
    if (title === modalChild) {
      setModalHidden((prev) => !prev);
    } else {
      setModalChild(title);
      setModalHidden(false);
    }
  };
  const hideModal = () => {
    setModalHidden(true);
    setModalChild(null);
  };

  return (
    <div className={styles.navBar}>
      <div className={styles.left}>
        <IchgramLogo className={styles.logo} />
        <Menu
          toggleModal={toggleModal}
          hideModal={hideModal}
          modalHidden={modalHidden}
        />
      </div>
      <Modal hidden={modalHidden}>
        <div className={styles.temp}>
          {modalChild === "Search" && modalChild}
          {modalChild === "Notification" && modalChild}
          {modalChild === "Create" && modalChild}
        </div>
      </Modal>
    </div>
  );
}
