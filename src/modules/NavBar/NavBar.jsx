import { useDispatch, useSelector } from "react-redux";

import { selectModal } from "/src/redux/modal/modal-selectors";

import {
  showModal,
  hideModal,
  toggleModal,
} from "/src/redux/modal/modal-slice";

import IchgramLogo from "/src/shared/components/IchgramLogo/IchgramLogo";

import Menu from "./Menu/Menu";

import styles from "./NavBar.module.css";

export default function NavBar() {
  const dispatch = useDispatch();
  const { childrenType } = useSelector(selectModal);

  const toggleModalHandle = (title) => {
    if (title === childrenType) {
      dispatch(toggleModal());
    } else {
      dispatch(showModal(title));
    }
  };
  const hideModalHandle = () => {
    dispatch(hideModal());
  };

  return (
    <div className={styles.navBar}>
      <div className={styles.left}>
        <IchgramLogo className={styles.logo} />
        <Menu toggleModal={toggleModalHandle} hideModal={hideModalHandle} />
      </div>
    </div>
  );
}
