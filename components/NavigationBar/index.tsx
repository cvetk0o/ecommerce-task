import styles from "./NavigationBar.module.css";
import Link from "next/link";
import paths from "@/utils/paths";
import ThemeToggle from "../ThemeToggle";
import MainLogo from "../MainLogo";

const NavigationBar: React.FC = () => {
  return (
    <nav className={styles.navBar}>
      <Link href={paths.homePage()}>
        <MainLogo />
      </Link>
      <div className={styles.navBar__container}>
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default NavigationBar;
