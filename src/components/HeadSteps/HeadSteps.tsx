import HeadStepsProps from "./HeadSteps.props";
import styles from './HeadSteps.module.css'

function Steps({ currentStep }: HeadStepsProps) {
  const steps = 5;

  return (
    <div className={styles["head-steps"]}>
      {Array.from({ length: steps }).map((_, index) => (
        <span
          key={index}
          className={index === currentStep ? styles["active"] : ""}
        ></span>
      ))}
    </div>
  );
}

export default Steps;
