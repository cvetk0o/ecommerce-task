import styles from "./Rating.module.css";
import fullStar from "../../public/fullStar.svg";
import halfStar from "../../public/halfStar.svg";
import emptyStar from "../../public/emptyStar.svg";
import Image from "next/image";

interface IRating {
  rating: number;
  numberOfReviews?: number;
}

const Rating: React.FC<IRating> = ({ rating, numberOfReviews }) => {
  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => {
      const starIndex = i + 1;

      const starType =
        starIndex <= Math.floor(rating)
          ? fullStar
          : starIndex - rating === 0.5
          ? halfStar
          : emptyStar;

      return (
        <Image
          alt={`${starType}Star`}
          src={starType}
          width={15}
          height={15}
          key={starIndex}
        />
      );
    });
  };

  return (
    <div className={styles.rating}>
      <p className="small"> {rating}</p>
      {renderStars()}
      <p className={`small ${styles.rating__numberOfReviews}`}>
        {" "}
        ({numberOfReviews} reviews){" "}
      </p>
    </div>
  );
};

export default Rating;
