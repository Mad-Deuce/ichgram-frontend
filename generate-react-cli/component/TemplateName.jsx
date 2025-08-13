import styles from "./TemplateName.module.css";

export default function TemplateName({ className, variant = "" }) {
  const fullClassName = `${styles.templateName} ${className} ${styles[variant]}`;
  return <div className={fullClassName}>TemplateName</div>;
}
