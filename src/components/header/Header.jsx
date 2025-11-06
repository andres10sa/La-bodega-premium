import React from "react";
import { MENU_ITEMS } from ".";
import "./Header.scss";

export const Header = ({ toggleCart, itemCount }) => {
  return (
    <header className="header bg-primary">
      <div className="header__container">
        <h1 className="header__logo text-white">
          <i className="fa-solid fa-wine-bottle text-golden"></i> La Bodega{" "}
          <span>Premium</span>
        </h1>
        <input type="checkbox" id="menu-toggle" className="header__toggle" />
        <label htmlFor="menu-toggle" className="header__burger">
          <i className="fas fa-bars"></i>
        </label>
        <nav className="header__nav">
          <ul className="header__menu">
            {MENU_ITEMS.map(({ name, href }) => (
              <li key={name} className="header__menu-item text-white">
                <a href={href}>{name}</a>
              </li>
            ))}
          </ul>
        </nav>
        <a
          onClick={toggleCart}
          className="header__cart text-white cursor-pointer relative"
        >
          <i className="fas fa-shopping-cart"></i>
          <span
            className="absolute -top-2 left-2 
                  transform translate-x-1/4 -translate-y-1/4 
                  bg-[#D4B753] text-zinc-900 
                  text-xs font-bold 
                  h-5.5 w-5.5 flex items-center justify-center 
                  rounded-full 
                  shadow-md"
          >
            {itemCount}
          </span>
        </a>
      </div>
    </header>
  );
};
