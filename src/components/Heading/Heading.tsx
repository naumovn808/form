import styles from "./Heading.module.css";
import { HeadingProps } from "./Heading.props";

function Heading({ children }: HeadingProps) {
  return (
    <h3 className={styles["h3"] }>
      {children}
    </h3>
  );
}

export default Heading;
