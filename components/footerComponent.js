import styles from "./footerComponent.module.css";
export default function FooterComponent() {
  return (
    <footer className={styles.footer}>
      <p>&copy; 2024 IDP Portal. All rights reserved.</p>
      {/* <div className="icons8">
        <a
          target="_blank"
          href="https://icons8.com/icon/xrwE2Qxg9XYK/hand-cursor"
        >
          Cursor
        </a>
        icon by{" "}
        <a target="_blank" href="https://icons8.com">
          Icons8
        </a>
      </div> */}
    </footer>
  );
}
