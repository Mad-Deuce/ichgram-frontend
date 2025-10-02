import { useSelector } from "react-redux";

import { selectModal } from "/src/redux/modal/modal-selectors";

import styles from "./Modal.module.css";

export default function Modal({
  className,
  variant = "",
}) {
  const {hidden, childrenType} = useSelector(selectModal);

  const fullClassName = `${styles.modal} ${className} ${styles[variant]}`;
  return (
    <div className={fullClassName} hidden={hidden}>
      {childrenType}
    </div>
  );
}
