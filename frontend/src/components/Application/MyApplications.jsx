import { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModal";
// --- Multilingual Feature Import ---
import { useTranslation } from "react-i18next";
// -----------------------------------

const MyApplications = () => {
  const { user } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");

  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  // 1. Get translation function (t) and i18n instance
  const { t, i18n } = useTranslation();

  // 2. Function to handle language change
  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);
  };


  useEffect(() => {
    try {
      if (user && user.role === "Employer") {
        axios
          .get("http://localhost:4000/api/v1/application/employer/getall", {
            withCredentials: true,
          })
          .then((res) => {
            setApplications(res.data.applications);
          });
      } else {
        axios
          .get("http://localhost:4000/api/v1/application/jobseeker/getall", {
            withCredentials: true,
          })
          .then((res) => {
            setApplications(res.data.applications);
          });
      }
    } catch (error) {
      // Use translation key for error message
      toast.error(t("myapplications.error_fetch_applications"));
    }
  }, [isAuthorized, user]); // Added user to dependency array to fix warning and ensure data fetch on user change

  if (!isAuthorized) {
    navigateTo("/");
  }

  const deleteApplication = (id) => {
    try {
      axios
        .delete(`http://localhost:4000/api/v1/application/delete/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          toast.success(res.data.message);
          setApplications((prevApplication) =>
            prevApplication.filter((application) => application._id !== id)
          );
        });
    } catch (error) {
      toast.error(t("myapplications.error_delete_application"));
    }
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section className="my_applications page">
      {/* 🌟 WRAPPED ALL CONTENT INSIDE A SINGLE CONTAINER DIV */}
      <div className="container"> 
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
            onClick={()=> handleLanguageChange('ta')}
            className={i18n.language === 'ta' ? 'active' :''}
          >
            தமிழ்
          </button>
        </div>
        
        {user && user.role === "Job Seeker" ? (
          <div className="job-seeker-view"> {/* Changed inner div for clarity */}
            <center>
              <h1>{t("myapplications.seeker_title")}</h1>
            </center>
            {applications.length <= 0 ? (
              <>
                {" "}
                <center>
                  <h4>{t("myapplications.no_applications")}</h4>
                </center>{" "}
              </>
            ) : (
              applications.map((element) => {
                return (
                  <JobSeekerCard
                    element={element}
                    key={element._id}
                    deleteApplication={deleteApplication}
                    openModal={openModal}
                    t={t} // Pass translation function
                  />
                );
              })
            )}
          </div>
        ) : (
          <div className="employer-view"> {/* Changed inner div for clarity */}
            <center>
              <h1>{t("myapplications.employer_title")}</h1>
            </center>
            {applications.length <= 0 ? (
              <>
                <center>
                  <h4>{t("myapplications.no_applications")}</h4>
                </center>
              </>
            ) : (
              applications.map((element) => {
                return (
                  <EmployerCard
                    element={element}
                    key={element._id}
                    openModal={openModal}
                    t={t} // Pass translation function
                  />
                );
              })
            )}
          </div>
        )}
      </div> 
      {/* 🌟 END OF CONTAINER WRAPPER */}

      {/* NOTE: ResumeModal component should also be updated to use 't' if it contains static text */}
      {modalOpen && (
        <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
      )}
    </section>
  );
};

export default MyApplications;

// --- Helper Components Updated for Translation ---

// Added 't' as a prop
const JobSeekerCard = ({ element, deleteApplication, openModal, t }) => {
  return (
    <>
      <div className="job_seeker_card">
        <div className="detail">
          <p>
            <span>{t("myapplications.label_name")}:</span> {element.name}
          </p>
          <p>
            <span>{t("myapplications.label_email")}:</span> {element.email}
          </p>
          <p>
            <span>{t("myapplications.label_phone")}:</span> {element.phone}
          </p>
          <p>
            <span>{t("myapplications.label_address")}:</span> {element.address}
          </p>
          <p>
            <span>{t("myapplications.label_cover_letter")}:</span> {element.coverLetter}
          </p>
        </div>
        <div className="resume">
          <img
            src={element.resume.url}
            alt={t("myapplications.alt_resume")}
            onClick={() => openModal(element.resume.url)}
          />
        </div>
        <div className="btn_area">
          <button onClick={() => deleteApplication(element._id)}>
            {t("myapplications.button_delete")}
          </button>
        </div>
      </div>
    </>
  );
};

// Added 't' as a prop
const EmployerCard = ({ element, openModal, t }) => {
  return (
    <>
      <div className="job_seeker_card">
        <div className="detail">
          <p>
            <span>{t("myapplications.label_name")}:</span> {element.name}
          </p>
          <p>
            <span>{t("myapplications.label_email")}:</span> {element.email}
          </p>
          <p>
            <span>{t("myapplications.label_phone")}:</span> {element.phone}
          </p>
          <p>
            <span>{t("myapplications.label_address")}:</span> {element.address}
          </p>
          <p>
            <span>{t("myapplications.label_cover_letter")}:</span> {element.coverLetter}
          </p>
        </div>
        <div className="resume">
          <img
            src={element.resume.url}
            alt={t("myapplications.alt_resume")}
            onClick={() => openModal(element.resume.url)}
          />
        </div>
      </div>
    </>
  );
};