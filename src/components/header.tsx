import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDigging, faFistRaised, faPeopleGroup, faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import NEXDIG_LOGO from "assets/logo.svg";
export const Header = () => {
  const location = useLocation();
  const [clickedIcon, setClickedIcon] = useState<string | null>(null);

  const isActive = (path: string) => location.pathname === path;

  const handleIconClick = (iconName: string) => {
    setClickedIcon(iconName);
    setTimeout(() => setClickedIcon(null), 300); // Reset the click effect after 300ms
  };

  return (
    <div className="fixed bg-white h-[60px] shadow w-full flex items-center space-x-[30px] px-[30px] py-[10px] text-sm tracking-wide z-50 text-gray-800 font-medium">
     <div className="flex-1">
        <Link to="/">
          <img src={NEXDIG_LOGO} alt="nexdig" className="h-[20px] cursor-pointer" />
        </Link>
      </div>

      <Link to="/" className={`nav-link ${isActive("/") ? "active" : ""}`}>
        <button className="flex items-center space-x-[5px]" onClick={() => handleIconClick("about")}>
          <h1 className={`hidden sm:inline ${isActive("/") ? "text-blue-500" : ""}`}>ABOUT</h1>
        </button>
      </Link>

      <Link to="/people" className={`nav-link ${isActive("/people") ? "active" : ""}`}>
        <button className="flex items-center space-x-[5px]" onClick={() => handleIconClick("people")}>
          <FontAwesomeIcon icon={faPeopleGroup} className={`nav-icon ${isActive("/people") ? "text-blue-500" : ""} ${clickedIcon === "people" ? "clicked" : ""}`} />
          <h1 className={`hidden sm:inline ${isActive("/people") ? "text-blue-500" : ""}`}>TEAM</h1>
        </button>
      </Link>

      <Link to="/research" className={`nav-link ${isActive("/research") ? "active" : ""}`}>
        <button className="flex items-center space-x-[5px]" onClick={() => handleIconClick("research")}>
          <FontAwesomeIcon icon={faDigging} className={`nav-icon ${isActive("/research") ? "text-blue-500" : ""} ${clickedIcon === "research" ? "clicked" : ""}`} />
          <h1 className={`hidden sm:inline ${isActive("/research") ? "text-blue-500" : ""}`}>RESEARCH</h1>
        </button>
      </Link>

      <Link to="/publications" className={`nav-link ${isActive("/publications") ? "active" : ""}`}>
        <button className="flex items-center space-x-[5px]" onClick={() => handleIconClick("publications")}>
          <FontAwesomeIcon icon={faNewspaper} className={`nav-icon ${isActive("/publications") ? "text-blue-500" : ""} ${clickedIcon === "publications" ? "clicked" : ""}`} />
          <h1 className={`hidden sm:inline ${isActive("/publications") ? "text-blue-500" : ""}`}>PUBLICATIONS</h1>
        </button>
      </Link>

      <Link to="/opportunities" className={`nav-link ${isActive("/opportunities") ? "active" : ""}`}>
        <button className="flex items-center space-x-[5px]" onClick={() => handleIconClick("opportunities")}>
          <FontAwesomeIcon icon={faFistRaised} className={`nav-icon ${isActive("/opportunities") ? "text-blue-500" : ""} ${clickedIcon === "opportunities" ? "clicked" : ""}`} />
          <h1 className={`hidden sm:inline ${isActive("/opportunities") ? "text-blue-500" : ""}`}>OPPORTUNITIES</h1>
        </button>
      </Link>
    </div>
  );
};
