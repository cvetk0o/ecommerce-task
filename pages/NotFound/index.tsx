import Link from "next/link";
import styles from "./not-found.module.css";
import MarkedText from "@/components/MarkedText";
import { MarkedTextElements } from "@/components/MarkedText/types";
import paths from "@/utils/paths";
import MainLogo from "@/components/MainLogo";

const NotFoundPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.heading}>
          <MainLogo />

          <MarkedText text="Page Not Found" element={MarkedTextElements.h1} />
        </div>
        <p className="body">
          We&apos;re sorry, but the page you&apos;re looking for doesn&apos;t
          exist.
        </p>

        <p className="body">
          Please check the URL or{" "}
          <Link href={paths.homePage()}>return to homepage</Link> to continue
          shopping.
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
