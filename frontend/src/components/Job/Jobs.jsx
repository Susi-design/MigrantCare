import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";
// 1. Add Multilingual Import
import { useTranslation } from "react-i18next";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();
  
  // 2. Get translation function (t) and i18n instance
  const { t, i18n } = useTranslation();

  // 3. Function to handle language change
  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    try {
      axios
        .get("http://localhost:4000/api/v1/job/getall", {
          withCredentials: true,
        })
        .then((res) => {
          setJobs(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  if (!isAuthorized) {
    navigateTo("/");
  }

  return (
    <section className="jobs page">
      <div className="container">
        
        {/* START: Language Switcher Buttons */}
        <div className="language-switcher">
          <button 
            onClick={() => handleLanguageChange('en')}
            className={i18n.language === 'en' ? 'active' : ''}
          >
            English
          </button>
          <button 
            onClick={() => handleLanguageChange('hi')}
            className={i18n.language === 'hi' ? 'active' : ''}
          >
            हिन्दी
          </button>
          <button 
            onClick={() => handleLanguageChange('bn')}
            className={i18n.language === 'bn' ? 'active' : ''}
          >
            বাংলা
          </button>
          <button 
            onClick={() => handleLanguageChange('ta')}
            className={i18n.language === 'ta' ? 'active' : ''}
          >
            தமிழ்
          </button>
        </div>
        {/* END: Language Switcher Buttons */}

        {/* Translate: ALL AVAILABLE JOBS */}
        <h1>{t("jobs.title")}</h1>
        <div className="banner">
          {jobs.jobs &&
            jobs.jobs.map((element) => {
              return (
                <div className="card" key={element._id}>
                  <p>{element.title}</p>
                  <p>{element.category}</p>
                  <p>{element.country}</p>
                  
                  {/* Translate: Job Details and style as button */}
                  <Link 
                    to={`/job/${element._id}`}
                    className="view-details-btn"
                  >
                    {t("jobs.view_details")}
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default Jobs;


