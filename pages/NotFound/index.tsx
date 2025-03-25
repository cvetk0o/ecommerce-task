import Image from "next/image";
import Link from "next/link";
import styles from "./not-found.module.css";
import mainLogo from "../../public/main-logo.svg";
import MarkedText from "@/components/MarkedText";
import { MarkedTextElements } from "@/components/MarkedText/types";
import paths from "@/utils/paths";

const NotFoundPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.heading}>
          <Image
            src={mainLogo}
            alt="Eccomerce task"
            width={120}
            height={40}
            className={styles.logo}
          />

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
