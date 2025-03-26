import NavigationBar from "@/components/NavigationBar";
import styles from "./page.module.css";
import Footer from "@/components/Footer";
interface PrimaryLayoutProps {
  children: React.ReactNode;
}

export default function PrimaryLayout({ children }: PrimaryLayoutProps) {
  return (
    <div id="primary-layout" className={styles.primaryLayout}>
      <NavigationBar />
      <main className={styles.primaryLayout__main}>{children}</main>
      <Footer />
    </div>
  );
}
