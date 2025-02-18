import styles from "./FormContainer.module.css";
import { FormContainerProps } from "./FormContainer.props";

export default function FormContainer({ children }: FormContainerProps) {
  return <div className={styles["form-container"]}>{children}</div>;
}
