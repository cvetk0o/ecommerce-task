import Image from "next/image";
import Heart from "../../public/heart.svg";
import FilledHeart from "../../public/filledHeart.svg";
import styles from "./AddToFavouritesButton.module.css";

interface IAddToFavourites {
  inFavourites: boolean;
}
const AddToFavourites: React.FC<IAddToFavourites> = ({ inFavourites }) => {
  return (
    <button className={styles.addToFavouritesButton}>
      <Image
        src={inFavourites ? FilledHeart : Heart}
        alt={inFavourites ? "Favourite" : "Add to favourite"}
        width={24}
        height={24}
      />
    </button>
  );
};

export default AddToFavourites;
