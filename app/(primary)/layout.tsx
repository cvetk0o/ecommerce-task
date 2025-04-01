import NavigationBar from "@/components/NavigationBar";
import styles from "./page.module.css";
import Footer from "@/components/Footer";
import { getAllCategories } from "@/services/categories";
interface PrimaryLayoutProps {
  children: React.ReactNode;
}

export default async function PrimaryLayout({ children }: PrimaryLayoutProps) {
  const categories = await getAllCategories();
  return (
    <div id="primary-layout" className={styles.primaryLayout}>
      <NavigationBar categories={categories} />
      <main className={styles.primaryLayout__main}>{children}</main>
      <Footer />
    </div>
  );
}
