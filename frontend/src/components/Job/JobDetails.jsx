import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
// --- Multilingual Feature Import ---
import { useTranslation } from "react-i18next"; 
// -----------------------------------

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const navigateTo = useNavigate();

  const { isAuthorized, user } = useContext(Context);
  // 1. Get translation function (t) and i18n instance
  const { t, i18n } = useTranslation();

  // 2. Function to handle language change
  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/job/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setJob(res.data.job);
      })
      .catch((error) => {
        navigateTo("/notfound", error);
      });
  }, []);

  if (!isAuthorized) {
    navigateTo("/login");
  }

  return (
    <section className="jobDetail page">
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

        <h3>{t("jobdetails.title")}</h3>
        <div className="banner">
          <p>
            {t("jobdetails.label_title")}: <span> {job.title}</span>
          </p>
          <p>
            {t("jobdetails.category")}: <span>{job.category}</span>
          </p>
          <p>
            {t("jobdetails.country")}: <span>{job.country}</span>
          </p>
          <p>
            {t("jobdetails.city")}: <span>{job.city}</span>
          </p>
          <p>
            {t("jobdetails.location")}: <span>{job.location}</span>
          </p>
          <p>
            {t("jobdetails.description_heading")}: <span>{job.description}</span>
          </p>
          <p>
            {t("jobdetails.posted_on")}: <span>{job.jobPostedOn}</span>
          </p>
          <p>
            {t("jobdetails.label_salary")}:{" "}
            {job.fixedSalary ? (
              <span>{job.fixedSalary}</span>
            ) : (
              <span>
                {job.salaryFrom} - {job.salaryTo}
              </span>
            )}
          </p>
          {user && user.role === "Employer" ? (
            <></>
          ) : (
            <Link to={`/application/${job._id}`} className="card-button">
              {t("jobdetails.button_apply")}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobDetails;


