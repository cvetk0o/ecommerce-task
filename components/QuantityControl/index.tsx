import styles from "./QuantityControl.module.css";

interface IQuantityControlProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

const QuantityControl: React.FC<IQuantityControlProps> = ({
  quantity,
  onIncrease,
  onDecrease,
}) => {
  return (
    <div className={styles.quantityControl}>
      <button
        className={styles.quantityControl__button}
        onClick={onDecrease}
        disabled={quantity <= 1}
      >
        -
      </button>
      <span className={styles.quantityControl__value}>{quantity}</span>
      <button className={styles.quantityControl__button} onClick={onIncrease}>
        +
      </button>
    </div>
  );
};

export default QuantityControl;
