import { useContext, useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link, Navigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";
// 1. IMPORT THE useTranslation HOOK
import { useTranslation } from "react-i18next";
import { FaGlobe } from "react-icons/fa";

const Login = () => {
  // 2. INITIALIZE THE useTranslation HOOK
  const { t, i18n } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { isAuthorized, setIsAuthorized } = useContext(Context);

  // Function to change the language
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        { email, password, role },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      // NOTE: For best practice, these toast messages should be translated as well.
      toast.success(data.message);
      setEmail("");
      setPassword("");
      setRole("");
      setIsAuthorized(true);
    } catch (error) {
      // NOTE: For best practice, these toast messages should be translated as well.
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
            <h3>{t("login.title")}</h3> 
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
                  padding: '0 0px',
                  color: '#333'
                }}
              >
                {lng.toUpperCase()}
              </button>
            ))}
          </div>
          {/* END LANGUAGE SWITCHER */}
          
          <form onSubmit={handleLogin}>
            <div className="inputTag">
              {/* 5. Using Translation Key for Label */}
              <label>{t("login.label_login_as")}</label>
              <div>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  {/* 6. Using Translation Key for Option */}
                  <option value="">{t("login.select_role")}</option>
                  
                  {/* 7. Using Translation Key for Option */}
                  <option value="Job Seeker">{t("login.role_job_seeker")}</option>
                  {/* 8. Using Translation Key for Option */}
                  <option value="Employer">{t("login.role_employer")}</option>
                </select>
                <FaRegUser />
              </div>
            </div>
            <div className="inputTag">
              {/* 9. Using Translation Key for Label */}
              <label>{t("login.label_email")}</label>
              <div>
                <input
                  type="email"
                  // 10. Using Translation Key for Placeholder
                  placeholder={t("login.placeholder_email")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MdOutlineMailOutline />
              </div>
            </div>
            <div className="inputTag">
              {/* 11. Using Translation Key for Label */}
              <label>{t("login.label_password")}</label>
              <div>
                <input
                  type="password"
                  // 12. Using Translation Key for Placeholder
                  placeholder={t("login.placeholder_password")}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <RiLock2Fill />
              </div>
            </div>
            <button type="submit">
              {/* 13. Using Translation Key for Button Text */}
              {t("login.button_login")}
            </button>
            {/* 14. Using Translation Key for Link Text */}
            <Link to={"/register"}>{t("login.link_register")}</Link>
          </form>
        </div>
        <div className="banner">
          <img src= "/login.jpg" alt="image"></img>
        </div>
      </section>
    </>
  );
};

export default Login;