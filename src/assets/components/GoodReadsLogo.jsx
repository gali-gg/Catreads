import logo from "../images/goodreads_logo.svg";
import {Link} from "react-router-dom";

export default function GoodReadsLogo(props) {
  return (
    <Link to="/">
      <img
        src={logo}
        alt="goodreads-logo"
        height={props.height || "50px"}
        width={props.width || "auto"}
        className={props.className}
      />
    </Link>
  );
}
