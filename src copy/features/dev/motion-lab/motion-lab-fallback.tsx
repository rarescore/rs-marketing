import styles from "./motion-lab.module.css";

export function MotionLabFallback() {
  return (
    <div className={styles.fallback} data-final-composition>
      <div className={styles.fallbackWall} />
      <div className={styles.fallbackLight} />
      <div className={styles.fallbackFrameBack} />
      <div className={styles.fallbackFrameMid} />
      <div className={styles.fallbackInstrument} />
      <div className={styles.fallbackPier} />
      <div className={styles.fallbackFloor} />
    </div>
  );
}
