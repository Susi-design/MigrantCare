import { useContext, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { FaPencilAlt } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";
// 1. IMPORT THE useTranslation HOOK
import { useTranslation } from "react-i18next";
import { FaGlobe } from "react-icons/fa";

const Register = () => {
  // 2. INITIALIZE THE useTranslation HOOK
  const { t, i18n } = useTranslation();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { isAuthorized, setIsAuthorized } = useContext(Context);

  // Function to change the language
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/register",
        { name, phone, email, role, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      // NOTE: For best practice, these toast messages should also be translated.
      toast.success(data.message);
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setRole("");
      setIsAuthorized(true);
    } catch (error) {
      // NOTE: For best practice, these toast messages should also be translated.
      toast.error(error.response.data.message);
    }
  };

  if (isAuthorized) {
    return <Navigate to={'/'} />
  }

  return (
    <>
      <section className="authPage">
        <div className="container">
          <div className="header">
            <img src="/logo.png" alt="logo" />
            {/* 3. Using Translation Key for Header */}
            <h3>{t("register.title")}</h3>
          </div>

          {/* 4. LANGUAGE SWITCHER BUTTONS (Added) */}
          <div className="language-switcher" style={{ marginBottom: '20px', textAlign: 'right' }}>
            <FaGlobe style={{ marginRight: '5px' }} />
            {['en', 'hi', 'bn', 'ta'].map((lng) => (
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

          <form onSubmit={handleRegister}>
            <div className="inputTag">
              {/* 5. Using Translation Key for Label */}
              <label>{t("register.label_register_as")}</label>
              <div>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  {/* 6. Using Translation Key for Option */}
                  <option value="">{t("register.select_role")}</option>
                  
                  {/* 7. Using Translation Key for Option */}
                  <option value="Employer">{t("register.role_employer")}</option>
                  {/* 8. Using Translation Key for Option */}
                  <option value="Job Seeker">{t("register.role_job_seeker")}</option>
                </select>
                <FaRegUser />
              </div>
            </div>
            <div className="inputTag">
              {/* 9. Using Translation Key for Label */}
              <label>{t("register.label_name")}</label>
              <div>
                <input
                  type="text"
                  // 10. Using Translation Key for Placeholder
                  placeholder={t("register.placeholder_name")}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <FaPencilAlt />
              </div>
            </div>
            <div className="inputTag">
              {/* 11. Using Translation Key for Label */}
              <label>{t("register.label_email")}</label>
              <div>
                <input
                  type="email"
                  // 12. Using Translation Key for Placeholder
                  placeholder={t("register.placeholder_email")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MdOutlineMailOutline />
              </div>
            </div>
            <div className="inputTag">
              {/* 13. Using Translation Key for Label */}
              <label>{t("register.label_phone")}</label>
              <div>
                <input
                  type="number"
                  // 14. Using Translation Key for Placeholder
                  placeholder={t("register.placeholder_phone")}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <FaPhoneFlip />
              </div>
            </div>
            <div className="inputTag">
              {/* 15. Using Translation Key for Label */}
              <label>{t("register.label_password")}</label>
              <div>
                <input
                  type="password"
                  // 16. Using Translation Key for Placeholder
                  placeholder={t("register.placeholder_password")}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <RiLock2Fill />
              </div>
            </div>
            <button type="submit" onClick={handleRegister}>
              {/* 17. Using Translation Key for Button Text */}
              {t("register.button_register")}
            </button>
            {/* 18. Using Translation Key for Link Text */}
            <Link to={"/login"}>{t("register.link_login")}</Link>
          </form>
        </div>
        <div className="banner">
          <img src="/register.png" alt="login" />
        </div>
      </section>
    </>
  );
};

export default Register;