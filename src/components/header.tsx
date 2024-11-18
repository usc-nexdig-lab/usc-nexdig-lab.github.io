import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen } from "@fortawesome/free-regular-svg-icons";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import { faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import NEXDIG_LOGO from "assets/logo.svg";
export const Header = () => {
  return (
    <div className="fixed bg-white h-[60px] shadow w-full flex items-center space-x-[30px] px-[30px] py-[10px] text-sm tracking-wide z-50 text-gray-800 font-medium">
      <div className="flex-1">
        <Link to="/">
          <div className="flex items-center">
            <img src={NEXDIG_LOGO} alt="nexdig" className="h-[20px]" />
            <div className="ml-[5px]">| NEXDIG</div>
          </div>
        </Link>
      </div>
      <Link to="/people">
        <button className="flex items-center space-x-[5px]">
          <FontAwesomeIcon icon={faPeopleGroup} />
          <h1 className="hidden sm:inline">PEOPLE</h1>
        </button>
      </Link>
      <Link to="/research">
        <button className="flex items-center space-x-[5px]">
          <FontAwesomeIcon icon={faFolderOpen} />
          <h1 className="hidden sm:inline">RESEARCH</h1>
        </button>
      </Link>
      <Link to="/publications">
        <button className="flex items-center space-x-[5px]">
          <FontAwesomeIcon icon={faNewspaper} />
          <h1 className="hidden sm:inline">PUBLICATIONS</h1>
        </button>
      </Link>
      <Link to="/videos">
        <button className="flex items-center space-x-[5px]">
          <FontAwesomeIcon icon={faVideo} />
          <h1 className="hidden sm:inline">VIDEOS</h1>
        </button>
      </Link>
    </div>
  );
};
