import { useSelector } from "react-redux";

import { selectModal } from "/src/redux/modal/modal-selectors";

import Notifications from "/src/modules/Notifications/Notifications";
import Search from "/src/modules/Search/Search";
import CreatePost from "/src/modules/CreatePost/CreatePost";

import styles from "./Modal.module.css";

export default function Modal({ className, variant = "" }) {
  const { hidden, childrenType } = useSelector(selectModal);

  const fullClassName = `${styles.modal} ${className} ${styles[variant]}`;
  return (
    <div className={fullClassName} hidden={hidden}>
      {childrenType === "Notifications" && <Notifications />}
      {childrenType === "Search" && <Search />}
      {childrenType === "Create" && <CreatePost />}
    </div>
  );
}
