import Image from "next/image";
import logoSrc from "../../public/main-logo.svg";

const MainLogo: React.FC = () => {
  return (
    <Image
      src={logoSrc}
      priority
      alt="main logo"
      width={52.96}
      height={52.96}
    />
  );
};
export default MainLogo;
