import styles from "./topicsLoader.module.css";
export default function TopicsLoader(){
    return(
        <section className={styles.container}>
            <div className={styles.first}>
                <div className={styles.mover}>
                    <div className={styles.leftMover}></div>
                    <div className={styles.rightMover}></div>
                </div>
            </div>
            <div className={styles.first}>
                <div className={styles.mover}>
                    <div className={styles.leftMover}></div>
                    <div className={styles.rightMover}></div>
                </div>
            </div>
            <div className={styles.first}>
                <div className={styles.mover}>
                    <div className={styles.leftMover}></div>
                    <div className={styles.rightMover}></div>
                </div>
            </div>
        </section>
    )
}