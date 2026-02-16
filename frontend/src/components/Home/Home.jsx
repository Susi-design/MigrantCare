import { useContext } from "react";
import { Context } from "../../main";
import { Navigate } from "react-router-dom";
// Icons used across all sections
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus, FaGlobe } from "react-icons/fa"; // Added FaGlobe for the switcher
import { FaUserPlus as FaUserPlusHow } from "react-icons/fa"; 
import { MdFindInPage, MdFoodBank, MdOutlineConstruction, MdPrecisionManufacturing, MdOutlineAirportShuttle } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import { LiaHandsHelpingSolid } from "react-icons/lia";
import { GrHostMaintenance } from "react-icons/gr";
import { GiTravelDress, GiTrade} from "react-icons/gi";
// --- Multilingual Feature Import ---
import { useTranslation } from "react-i18next";


// =====================================================================
// 1. HeroSection Component Logic (Multilingual)
// =====================================================================
const HeroSection = () => {
  const { t } = useTranslation();
  const details = [
    {
      id: 1,
      title: "1,23,441",
      subTitle: t("hero.stats_live_job_key"),
      icon: <FaSuitcase />,
    },
    {
      id: 2,
      title: "91220",
      subTitle: t("hero.stats_companies_key"),
      icon: <FaBuilding />,
    },
    {
      id: 3,
      title: "2,34,200",
      subTitle: t("hero.stats_job_seekers_key"),
      icon: <FaUsers />,
    },
    {
      id: 4,
      title: "1,03,761",
      subTitle: t("hero.stats_employers_key"),
      icon: <FaUserPlus />,
    },
  ];
  return (
    <>
      <div className="heroSection">
        <div className="container">
          <div className="title">
            <h1>{t("hero.headline_p1")}</h1>
            <h1>{t("hero.headline_p2")}</h1>
            <p>
              {t("hero.paragraph")}
            </p>
          </div>
          <div className="image">
            <img src="/heroS.jpg" alt="hero" />
          </div>
        </div>
        <div className="details">
          {details.map((element) => {
            return (
              <div className="card" key={element.id}>
                <div className="icon">{element.icon}</div>
                <div className="content">
                  <p>{element.title}</p>
                  <p>{element.subTitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

// =====================================================================
// 2. HowItWorks Component Logic (Multilingual)
// =====================================================================
const HowItWorks = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="howitworks">
        <div className="container">
          <h3>{t("howitworks.main_title")}</h3>
          <div className="banner">
            <div className="card">
              <FaUserPlusHow />
              <p>{t("howitworks.step1_title")}</p>
              <p>
                {t("howitworks.step1_description")}
              </p>
            </div>
            <div className="card">
              <MdFindInPage />
              <p>{t("howitworks.step2_title")}</p>
              <p>
                {t("howitworks.step2_description")}
              </p>
            </div>
            <div className="card">
              <IoMdSend />
              <p>{t("howitworks.step3_title")}</p>
              <p>
                {t("howitworks.step3_description")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// =====================================================================
// 3. PopularCategories Component Logic (Multilingual)
// =====================================================================
const PopularCategories = () => {
  const { t } = useTranslation();
  const categories = [
    {
      id: 1,
      title: t("categories.food_services"),
      icon: <MdFoodBank />,
    },
    {
      id: 2,
      title: t("categories.construction"),
      icon: <MdOutlineConstruction />,
    },
    {
      id: 3,
      title: t("categories.manufacturing"),
      icon: <MdPrecisionManufacturing />,
    },
    {
      id: 4,
      title: t("categories.textile"),
      icon: <GiTravelDress />,
    },
    {
      id: 5,
      title: t("categories.hospitality"),
      icon: <LiaHandsHelpingSolid />,
    },
    {
      id: 6,
      title: t("categories.service_maintenance"),
      icon: <GrHostMaintenance />,
    },
    {
      id: 7,
      title: t("categories.domestic_trades"),
      icon: <GiTrade />,
    },
    {
      id: 8,
      title: t("categories.port_logistics"),
      icon: <MdOutlineAirportShuttle />,
    },
  ];
  return (
    <div className="categories">
      <h3>{t("categories.main_title")}</h3>
      <div className="banner">
        {categories.map((element) => {
          return (
            <div className="card" key={element.id}>
              <div className="icon">{element.icon}</div>
              <div className="text">
                <p>{element.title}</p>
                {/* Note: Original code had element.subTitle but it wasn't defined. Keeping the structure. */}
                <p>{element.subTitle}</p> 
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// =====================================================================
// 4. PopularCompanies Component Logic (Multilingual)
// =====================================================================
const PopularCompanies = () => {
  const { t } = useTranslation();
  const companies = [
    {
      id: 1,
      title: t("companies.company1_title"),
      location: t("companies.company1_location"),
      openPositions: 10, 
    },
    {
      id: 2,
      title: t("companies.company2_title"),
      location: t("companies.company2_location"),
      openPositions: 5,
    },
    {
      id: 3,
      title: t("companies.company3_title"),
      location: t("companies.company3_location"),
      openPositions: 20,
    },
  ];
  return (
    <div className="companies">
      <div className="container">
        <h3>{t("companies.main_title")}</h3>
        <div className="banner">
          {companies.map((element) => {
            return (
              <div className="card" key={element.id}>
                <div className="content">
                  <div className="icon">{element.icon}</div>
                  <div className="text">
                    <p>{element.title}</p>
                    <p>{element.location}</p>
                  </div>
                </div>
                <button>{t("companies.open_positions")} {element.openPositions}</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};


// =====================================================================
// 5. Home Component (Main Wrapper & Language Switcher)
// =====================================================================
const Home = () => {
  const { isAuthorized } = useContext(Context);
  const { i18n } = useTranslation();

  // Function to change the language
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  
  if (!isAuthorized) {
    return <Navigate to={"/login"} />;
  }
  
  return (
    <>
      <section className="homePage page" style={{ position: 'relative' }}>
        
        {/* LANGUAGE SWITCHER BUTTONS (Common for all sections) */}
        <div className="language-switcher" style={{ 
          position: 'absolute', 
          top: '20px', 
          right: '20px', 
          display: 'flex', 
          alignItems: 'center',
          zIndex: 100, 
          backgroundColor: 'white',
          padding: '5px',
          borderRadius: '5px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
        }}>
          <FaGlobe style={{ marginRight: '5px', color: '#333' }} />
          {['en', 'hi', 'bn','ta'].map((lng) => (
            <button
              key={lng}
              onClick={() => changeLanguage(lng)}
              style={{
                fontWeight: i18n.language === lng ? 'bold' : 'normal',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0 5px',
                color: '#333'
              }}
            >
              {lng.toUpperCase()}
            </button>
          ))}
        </div>
        {/* END LANGUAGE SWITCHER */}
        
        <HeroSection />
        <HowItWorks />
        <PopularCategories />
        <PopularCompanies />
      </section>
    </>
  );
};

export default Home;