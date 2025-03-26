"use client";
import styles from "./NavigationBar.module.css";
import Link from "next/link";
import paths from "@/utils/paths";
import ThemeToggle from "../ThemeToggle";
import MainLogo from "../MainLogo";
import { Category } from "@/services/categories/types";
import { useState } from "react";

interface INavigationBar {
  categories: Category[];
}

const NavigationBar: React.FC<INavigationBar> = ({ categories }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const renderCategories = () => {
    return categories.map((category) => {
      return (
        <Link
          href={paths.category(category.slug)}
          key={category.slug}
          className={styles.navBar__link}
          onClick={() => setIsMenuOpen(false)}
        >
          {category.name}
        </Link>
      );
    });
  };
  return (
    <nav className={styles.navBar}>
      <Link href={paths.homePage()}>
        <MainLogo />
      </Link>
      <div className={styles.navBar__container}>
        <button
          className={`${styles.hamburger} ${
            isMenuOpen ? styles.hamburger_active : ""
          }`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div
          className={`${styles.navBar__links} ${
            isMenuOpen ? styles.navBar__links_active : ""
          }`}
        >
          {renderCategories()}
        </div>
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default NavigationBar;
