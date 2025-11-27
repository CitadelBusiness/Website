import React from "react";
import { Outlet } from "react-router-dom";
import { TabItemMain } from "./TabItem.jsx";
import "./styles.css";

export default function TabContainer() {
  // VSEBINA (podatki)
  const tabs = [
    { text: "Domov", url: "/", submenuColumns: [] },

    {
      text: "Storitve",
      url: "/storitve",
      submenuColumns: [
        {
          title: "MARKETING",
          items: [
            { text: "Digitalni marketing", url: "/digitalni_marketing", icon: 'SeoImage', desc: "Perfecto majkemi moje" },
          ],
        },
        {
          title: "MANAGEMENT",
          items: [
            { text: "Vodenje socialnih medijev", url: "/vodenje_s_m", icon: 'SeoImage', desc: "Najebu si ga" },
            { text: "AI za upravljanje socialnih medijev", url: "/vodenje_s_m_ai", icon: 'SeoImage', desc: "Najebu si ga" },
          ],
        },
        {
          title: "DRUGO",
          items: [
            { text: "Spletne strani ", url: "/spletna_stran", icon: 'SeoImage', desc: "Na vrh z vašo spletno stranjo." },
            { text: "Spletne trgovine", url: "/spletna_trgovina", icon: 'SeoImage', desc: "Na vrh z vašo spletno stranjo." },
            { text: "Avtomatizacije", url: "/avtomatizacije", icon: 'SeoImage', desc: "Na vrh z vašo spletno stranjo." },
          ],
        },
      ],
      submenuCta: {
        title: "Marjanca as prpravlena",
        subtitle: "Marjanca zakurblej",
        buttonText: "Marjanca požen",
        buttonUrl: "/pojej_se",
      },
    },

    { text: "Stopimo v stik", url: "/stopimo_v_stik", submenuColumns: [] },

    {
      text: "O nas",
      url: "/o_nas",
      submenuColumns: [
        {
          title: "BLOG1.1",
          items: [
            {
              text: "Blog1",
              url: "/o_nas",
              icon: 'SeoImage',
              desc: "Kvaje a si kej prebral do zdej?",
            },
          ],
        },
      ],
    },
  ];

  return (
    <div className="tab-shell">
      {/* LOGIKA + UI navbara je v TabItemMain */}
      <TabItemMain tabs={tabs} />
    </div>
  );
}
