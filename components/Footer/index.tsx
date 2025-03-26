import MainLogo from "../MainLogo";
import styles from "./Footer.module.css";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <MainLogo />
    </footer>
  );
};
export default Footer;
