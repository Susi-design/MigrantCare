import axios from "axios";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";
// --- START: Updated Multilingual Import ---
import { useTranslation } from "react-i18next";
// --- END: Updated Multilingual Import ---

const MyJobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  // --- START: Get Translation Function and i18n ---
  const { t, i18n } = useTranslation();
  // --- END: Get Translation Function and i18n ---

  // Function to handle language change
  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);
  };

  //Fetching all jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/job/getmyjobs",
          { withCredentials: true }
        );
        setMyJobs(data.myJobs);
      } catch (error) {
        // Core functionality: error toast is maintained.
        toast.error(error.response.data.message);
        setMyJobs([]);
      }
    };
    fetchJobs();
  }, []);
  
  // Authorization check (core logic maintained)
  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigateTo("/");
  }

  //Function For Enabling Editing Mode (core logic maintained)
  const handleEnableEdit = (jobId) => {
    setEditingMode(jobId);
  };

  //Function For Disabling Editing Mode (core logic maintained)
  const handleDisableEdit = () => {
    setEditingMode(null);
  };

  //Function For Updating The Job (core logic maintained)
  const handleUpdateJob = async (jobId) => {
    const updatedJob = myJobs.find((job) => job._id === jobId);
    await axios
      .put(`http://localhost:4000/api/v1/job/update/${jobId}`, updatedJob, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setEditingMode(null);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  //Function For Deleting Job (core logic maintained)
  const handleDeleteJob = async (jobId) => {
    await axios
      .delete(`http://localhost:4000/api/v1/job/delete/${jobId}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setMyJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  // Handle input change (core logic maintained)
  const handleInputChange = (jobId, field, value) => {
    // Update the job object in the jobs state with the new value
    setMyJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === jobId ? { ...job, [field]: value } : job
      )
    );
  };

  return (
    <>
      <div className="myJobs page">
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

          <h1>{t("myjobs.posted_jobs_title")}</h1> 
          {myJobs.length > 0 ? (
            <>
              <div className="banner">
                {myJobs.map((element) => (
                  <div className="card" key={element._id}>
                    <div className="content">
                      <div className="short_fields">
                        <div>
                          {/* Translated: Title */}
                          <span>{t("myjobs.label_title")}:</span> 
                          <input
                            type="text"
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                            value={element.title}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "title",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div>
                          {" "}
                          {/* Translated: Country */}
                          <span>{t("myjobs.label_country")}:</span> 
                          <input
                            type="text"
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                            value={element.country}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "country",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div>
                          {/* Translated: City */}
                          <span>{t("myjobs.label_city")}:</span> 
                          <input
                            type="text"
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                            value={element.city}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "city",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div>
                          {/* Translated: Category */}
                          <span>{t("myjobs.label_category")}:</span> 
                          <select
                            value={element.category}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "category",
                                e.target.value
                              )
                            }
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                          >
                            {/* CATEGORIES NEED TO BE TRANSLATED IN THE JSON FILE IF REQUIRED */}
                            
                            <option value="Construction & Infrastructure">{t("categories.construction_infrastructure")}</option>
                            <option value="Textile & Garment Industry">{t("categories.textile_garment")}</option>
                            <option value="Hospitality & Food Services">{t("categories.hospitality_food")}</option>
                            <option value="Service & Maintenance">{t("categories.service_maintenance")}</option>
                            <option value="Domestic & Other Trades">{t("categories.domestic_trades")}</option>
                            <option value="Port & Logistics">{t("categories.port_logistics")}</option>
                            <option value="Fishing & Aquaculture">{t("categories.fishing_aquaculture")}</option>
                            <option value="Engineering & Technical Trades">{t("categories.engineering_trades")}</option>
                          </select>
                        </div>
                        <div>
                          <span>
                            {/* Translated: Salary */}
                            {t("myjobs.label_salary")}:{" "}
                            {element.fixedSalary ? (
                              <input
                                type="number"
                                disabled={
                                  editingMode !== element._id ? true : false
                                }
                                value={element.fixedSalary}
                                onChange={(e) =>
                                  handleInputChange(
                                    element._id,
                                    "fixedSalary",
                                    e.target.value
                                  )
                                }
                              />
                            ) : (
                              <div>
                                <input
                                  type="number"
                                  disabled={
                                    editingMode !== element._id ? true : false
                                  }
                                  value={element.salaryFrom}
                                  onChange={(e) =>
                                    handleInputChange(
                                      element._id,
                                      "salaryFrom",
                                      e.target.value
                                    )
                                  }
                                />
                                <input
                                  type="number"
                                  disabled={
                                    editingMode !== element._id ? true : false
                                  }
                                  value={element.salaryTo}
                                  onChange={(e) =>
                                    handleInputChange(
                                      element._id,
                                      "salaryTo",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            )}
                          </span>
                        </div>
                        <div>
                          {" "}
                          {/* Translated: Expired */}
                          <span>{t("myjobs.label_expired")}:</span> 
                          <select
                            value={element.expired}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "expired",
                                e.target.value
                              )
                            }
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                          >
                            <option value={true}>{t("myjobs.option_true")}</option>
                            <option value={false}>{t("myjobs.option_false")}</option>
                          </select>
                        </div>
                      </div>
                      <div className="long_field">
                        <div>
                          {/* Translated: Description */}
                          <span>{t("myjobs.label_description")}:</span>{" "}
                          <textarea
                            rows={5}
                            value={element.description}
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "description",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div>
                          {/* Translated: Location */}
                          <span>{t("myjobs.label_location")}: </span>
                          <textarea
                            value={element.location}
                            rows={5}
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "location",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                    {/* Out Of Content Class */}
                    <div className="button_wrapper">
                      <div className="edit_btn_wrapper">
                        {editingMode === element._id ? (
                          <>
                            <button
                              onClick={() => handleUpdateJob(element._id)}
                              className="check_btn"
                              title={t("myjobs.button_update")}
                            >
                              <FaCheck />
                            </button>
                            <button
                              onClick={() => handleDisableEdit()}
                              className="cross_btn"
                              title={t("myjobs.button_cancel")}
                            >
                              <RxCross2 />
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => handleEnableEdit(element._id)}
                            className="edit_btn"
                          >
                            {t("myjobs.button_edit")} {/* Translated: Edit */}
                          </button>
                        )}
                      </div>
                      <button
                        onClick={() => handleDeleteJob(element._id)}
                        className="delete_btn"
                      >
                        {t("myjobs.button_delete")} {/* Translated: Delete */}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p>
              {/* Translated: Not Posted Job Message */}
              {t("myjobs.no_jobs_message")} 
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default MyJobs;