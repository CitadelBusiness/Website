import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import "./styles.css";

function useHeaderHeightVar(headerRef) {
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const setVar = () => {
      const h = Math.round(el.getBoundingClientRect().height);
      document.documentElement.style.setProperty("--header-h", `${h}px`);
    };
    setVar();
    const ro = new ResizeObserver(setVar);
    ro.observe(el);
    return () => ro.disconnect();
  }, [headerRef]);
}

export function TabItemMain({ tabs }) {
  const location = useLocation();
  const headerRef = useRef(null);
  const topbarRef = useRef(null);
  const submenuRef = useRef(null);

  useHeaderHeightVar(headerRef);
  //const isMobile = useIsMobile(768);

  const [phase, setPhase] = useState("closed"); // "closed" | "opening" | "open" | "closing"
  const [expandedLink, setExpandedLink] = useState(null);
  const [clickedLink, setClickedLink] = useState(null);
  const [isReady, setIsReady] = useState(false);

  const isBarVisible = phase !== "closed";

  /** =============== SKUPNE LOGIKE =============== */
  useEffect(() => {
    if (phase !== "closed") closeMenu();
  }, [location]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && closeMenu();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!isBarVisible) return;
    const headerEl = headerRef.current;
    const topbarEl = topbarRef.current;
    const onDocPointerDown = (e) => {
      const path = e.composedPath ? e.composedPath() : [];
      if (!path.includes(headerEl) && !path.includes(topbarEl)) closeMenu();
    };
    document.addEventListener("pointerdown", onDocPointerDown, true);
    return () =>
      document.removeEventListener("pointerdown", onDocPointerDown, true);
  }, [isBarVisible]);

  const toggleMenu = () =>
    phase === "closed" || phase === "closing" ? openMenu() : closeMenu();

  const openMenu = () => {
    if (phase === "opening" || phase === "open") return;
    setIsReady(false);
    setPhase("opening");
    setTimeout(() => {
      setPhase("open");
      setTimeout(() => setIsReady(true), 0);
    }, 900);
  };

  const closeMenu = () => {
    if (phase === "closed" || phase === "closing") return;
    setIsReady(false);
    if (expandedLink) setExpandedLink(null);
    setPhase("closing");
    setTimeout(() => {
      setPhase("closed");
      setClickedLink(null);
    }, 600);
  };

  const handleMainLinkClick = (link) => (e) => {
    if (link.submenuColumns && link.submenuColumns.length > 0) {
      e.preventDefault();
      if (expandedLink && expandedLink.text === link.text) {
        setExpandedLink(null);
        setClickedLink(null);
        return;
      }
      if (expandedLink && expandedLink.text !== link.text) {
        setExpandedLink(null);
        setTimeout(() => {
          setExpandedLink(link);
          setClickedLink(link.text);
        }, 650);
        return;
      }
      setExpandedLink(link);
      setClickedLink(link.text);
    } else closeMenu();
  };

  /** ================== DESKTOP RENDER ================== */
  const renderDesktop = () => (
    <>
      {/* 🔹 Dodali smo gumb v levo in dodali .shifted animacijo */}
      <header
        className={`site-header ${isBarVisible ? "shifted" : ""}`}
        ref={headerRef}
      >
        <Link to="/" aria-label="Domov" className="logo-link">
          <div className="image-container" />
        </Link>

        {/* 🔹 gumb + burger skupaj na desni */}
        <div className="header-controls">
         {/*  <Button />*/}
          <button
            className={`burger ${isBarVisible ? "is-open" : ""}`}
            aria-label={isBarVisible ? "Zapri meni" : "Odpri meni"}
            aria-expanded={isBarVisible}
            onClick={toggleMenu}
          >
            <span className="burger-line" />
            <span className="burger-line" />
            <span className="burger-line" />
          </button>
        </div>
      </header>

      <nav
        className={`topbar ${phase}${
          expandedLink && phase === "open" ? " expanded" : ""
        }`}
        ref={topbarRef}
        aria-label="Glavna navigacija"
      >
        <ul className={`main-links ${isReady ? "visible" : "hidden"}`}>
          {tabs.map((link) => (
            <li key={link.text} className="main-link">
              <NavLink
                to={link.url}
                className={`main-link-a ${link.text === clickedLink ? "expanded" : ""}`}
                onClick={handleMainLinkClick(link)}
              >
                {link.text}
                {link.submenuColumns?.length > 0 && (
                  <span className="submenu-indicator" aria-hidden="true"></span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <hr className="divider-line" />

        <CSSTransition
          in={!!expandedLink && phase === "open"}
          timeout={500}
          classNames="submenu"
          unmountOnExit
          nodeRef={submenuRef}
        >
          <div ref={submenuRef} className="submenu-wrapper">
            {expandedLink &&
              expandedLink.submenuColumns.map((col) => (
                <div key={col.title} className="submenu-column">
                  <h4 className="submenu-title">{col.title}</h4>
                  {col.items.map((it) => (
                    <NavLink
                      key={it.text}
                      to={it.url}
                      className="submenu-item"
                      onClick={closeMenu}
                    >
                      {it.text}
                    </NavLink>
                  ))}
                </div>
              ))}
          </div>
        </CSSTransition>
      </nav>

      <div
        className={`topbar-backdrop ${isBarVisible ? "show" : ""}`}
        aria-hidden={!isBarVisible}
      />
    </>
  );

  /** ================== MOBILE RENDER ================== */
  // const renderMobile = () => (
  //   <>
  //     <header className="site-header" ref={headerRef}>
  //       <Link to="/" aria-label="Domov" className="logo-link">
  //         <div className="image-container" />
  //       </Link>

  //       <button
  //         className={`burger ${isBarVisible ? "is-open" : ""}`}
  //         aria-label={isBarVisible ? "Zapri meni" : "Odpri meni"}
  //         aria-expanded={isBarVisible}
  //         onClick={toggleMenu}
  //       >
  //         <span className="burger-line" />
  //         <span className="burger-line" />
  //         <span className="burger-line" />
  //       </button>
  //     </header>

  //     <nav
  //       className={`topbar ${phase}${
  //         expandedLink && phase === "open" ? " expanded" : ""
  //       }`}
  //       ref={topbarRef}
  //     >
  //       <div className="topbar-inner">
  //         {expandedLink && (
  //           <div className="submenu-left">
  //             {expandedLink.submenuColumns.map((col) => (
  //               <div key={col.title} className="submenu-column">
  //                 <h4 className="submenu-title">{col.title}</h4>
  //                 {col.items.map((it) => (
  //                   <NavLink
  //                     key={it.text}
  //                     to={it.url}
  //                     className="submenu-item"
  //                     onClick={closeMenu}
  //                   >
  //                     {it.text}
  //                   </NavLink>
  //                 ))}
  //               </div>
  //             ))}
  //           </div>
  //         )}

  //         <ul className={`main-links ${isReady ? "visible" : "hidden"}`}>
  //           {tabs.map((link) => (
  //             <li key={link.text} className="main-link">
  //               <NavLink
  //                 to={link.url}
  //                 className={`main-link-a ${
  //                   link.text === clickedLink ? "expanded" : ""
  //                 }`}
  //                 onClick={handleMainLinkClick(link)}
  //               >
  //                 {link.text}
  //               </NavLink>
  //             </li>
  //           ))}
  //         </ul>
  //       </div>
  //     </nav>

  //     <div
  //       className={`topbar-backdrop ${isBarVisible ? "show" : ""}`}
  //       aria-hidden={!isBarVisible}
  //     />
  //   </>
  //);

  return renderDesktop();
}
