import { IMarkedText, MarkedTextElements } from "./types";
import styles from "./MarkedText.module.css";

const elementMap = {
  [MarkedTextElements.h1]: (text: string) => <h1>{text}</h1>,
  [MarkedTextElements.h2]: (text: string) => <h2>{text}</h2>,
  [MarkedTextElements.h3]: (text: string) => <h3>{text}</h3>,
  [MarkedTextElements.small]: (text: string) => <p className="small">{text}</p>,
  [MarkedTextElements.subtitle]: (text: string) => (
    <p className="subtitle">{text}</p>
  ),
  default: (text: string) => <p>{text}</p>,
};

const resolveElement = (text: string, element: MarkedTextElements) => {
  return (elementMap[element] || elementMap.default)(text);
};

const MarkedText: React.FC<IMarkedText> = ({ text, element }) => {
  return (
    <div className={styles.container}>{resolveElement(text, element)}</div>
  );
};

export default MarkedText;
