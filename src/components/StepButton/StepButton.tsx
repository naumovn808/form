import styles from "./StepButton.module.css";
import HeadStepsButton from "./StepButton.props";

export default function StepButton({ count, ...props }: HeadStepsButton) {
  return (
    <button
      type="button"
      disabled={count === 0 ? true : false}
      className={styles["form-step__btn"]}
      {...props}
    >
      <svg
        width="18"
        height="15"
        viewBox="0 0 18 15"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.5 7H2.5M2.5 7L8 1.5M2.5 7L8 13"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}
