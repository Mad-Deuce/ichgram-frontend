import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { selectModal } from "/src/redux/modal/modal-selectors";

import {
  showModal,
  hideModal,
  toggleModal,
} from "/src/redux/modal/modal-slice";

import IchgramLogo from "/src/shared/components/IchgramLogo/IchgramLogo";

import Menu from "./Menu/Menu";

import styles from "./Footer.module.css";

export default function Footer() {
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
    <div className={styles.footer}>
      <Menu toggleModal={toggleModalHandle} hideModal={hideModalHandle} />
      <Link to={"/copyright"} className={styles.copyright}>
        {`${String.fromCodePoint(169)} 2024 ICHgram`}
      </Link>
    </div>
  );
}
