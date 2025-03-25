import Image from "next/image";
import styles from "./NavigationBar.module.css";
import logoSrc from "../../public/main-logo.svg";
import Link from "next/link";
import paths from "@/utils/paths";

const NavigationBar: React.FC = () => {
  return (
    <nav className={styles.navBar}>
      <Link href={paths.homePage()}>
        <Image
          src={logoSrc}
          priority
          alt="main logo"
          width={52.96}
          height={52.96}
        />
      </Link>
      <div className={styles.navBar__container}>Navigation Bar</div>
    </nav>
  );
};

export default NavigationBar;
