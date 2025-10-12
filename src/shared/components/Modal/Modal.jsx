import { useSelector, useDispatch } from "react-redux";

import { selectModal } from "/src/redux/modal/modal-selectors";
import { hideModal } from "/src/redux/modal/modal-slice";

import Notifications from "/src/modules/Notifications/Notifications";
import Search from "/src/modules/Search/Search";
import CreatePost from "/src/modules/CreatePost/CreatePost";
import ViewPost from "/src/modules/ViewPost/ViewPost";

import styles from "./Modal.module.css";

export default function Modal({ className, variant = "" }) {
  const { hidden, childrenType, childrenId } = useSelector(selectModal);
  const dispatch = useDispatch();

  const onClickHandle = () => {
    dispatch(hideModal());
  };

  const fullClassName = `${styles.modal} ${className} ${styles[variant]}`;
  return (
    <div className={fullClassName} hidden={hidden} onClick={onClickHandle}>
      {childrenType === "Notifications" && <Notifications />}
      {childrenType === "Search" && <Search />}
      {childrenType === "Create" && <CreatePost />}
      {childrenType === "Post" && <ViewPost postId={childrenId} />}
    </div>
  );
}
