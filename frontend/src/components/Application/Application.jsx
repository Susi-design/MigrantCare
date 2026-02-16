import axios from "axios";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../main";
// --- Multilingual Feature Import ---
import { useTranslation } from "react-i18next"; 
// -----------------------------------

const Application = () => {
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileError, setFileError] = useState("");

  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();
  const { id } = useParams();

  // 1. Get translation function (t) and i18n instance
  const { t, i18n } = useTranslation();

  // 2. Function to handle language change
  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);
  };


  // Function to handle file input changes with validation
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileError("");
    
    if (!file) {
      setResume(null);
      return;
    }
    
    // Check file type
    const allowedTypes = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      // Use translation key for error message
      setFileError(t("application.error_invalid_file_type"));
      setResume(null);
      return;
    }
    
    // Check file size (limit to 2MB)
    if (file.size > 2 * 1024 * 1024) {
      // Use translation key for error message
      setFileError(t("application.error_file_too_large"));
      setResume(null);
      return;
    }
    
    setResume(file);
  };

  const handleApplication = async (e) => {
    e.preventDefault();
    
    // Validate form - Using translated messages for toast
    if (!name || !email || !phone || !address || !coverLetter) {
      toast.error(t("application.error_fill_all_fields"));
      return;
    }
    
    if (!resume) {
      // Use translation key for error message
      setFileError(t("application.error_upload_resume"));
      return;
    }
    
    setLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("coverLetter", coverLetter);
    formData.append("resume", resume);
    formData.append("jobId", id);

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/application/post",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setName("");
      setEmail("");
      setCoverLetter("");
      setPhone("");
      setAddress("");
      setResume(null);
      toast.success(data.message);
      navigateTo("/job/getall");
    } catch (error) {
      // Error handling logic remains the same, but the generic error is now translated.
      const defaultErrorMessage = t("application.error_generic");
      const errorMessage = error.response?.data?.message || defaultErrorMessage;
      toast.error(errorMessage);
      
      // Show specific message for Cloudinary errors (translated)
      if (errorMessage.includes("Cloudinary") || errorMessage.includes("api_key")) {
        toast.error(t("application.error_file_upload_service"));
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthorized || (user && user.role === "Employer")) {
    navigateTo("/");
  }

  return (
    <section className="application">
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
          className={i18n.language ==='ta' ? 'active':''}
          >
            தமிழ்
          </button>
        </div>
        {/* END: Language Switcher Buttons */}

        <h3>{t("application.main_title")}</h3>
        <form onSubmit={handleApplication}>
          <input
            type="text"
            placeholder={t("application.placeholder_name")}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder={t("application.placeholder_email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder={t("application.placeholder_phone")}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder={t("application.placeholder_address")}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <textarea
            placeholder={t("application.placeholder_cover_letter")}
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            required
          />
          <div>
            <label
              style={{ textAlign: "start", display: "block", fontSize: "20px" }}
            >
              {t("application.label_upload_aadhar and PAN card")} 
              <p style={{ color: "red", fontSize: "12px", margin: "5px 0 0 0" }}>
                {t("application.supported_formats")}
              </p>
            </label>
            <input
              type="file"
              accept=".png,.jpg,.jpeg,.webp"
              onChange={handleFileChange}
              style={{ width: "100%" }}
            />
            {fileError && (
              <p style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>
                {fileError}
              </p>
            )}
          </div>
          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "not-allowed" : "pointer" 
            }}
          >
            {loading ? t("application.button_submitting") : t("application.button_send")}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Application;


