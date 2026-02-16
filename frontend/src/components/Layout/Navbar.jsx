import { useContext, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
// --- START: Added Multilingual Import ---
import { useTranslation } from "react-i18next"; 
// --- END: Added Multilingual Import ---

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();
  // --- START: Get Translation Function ---
  const { t } = useTranslation();
  // --- END: Get Translation Function ---

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/user/logout",
        {
          withCredentials: true,
        }
      );
      // Note: For full multilingual support, toast messages should also be translated,
      // but we keep this part as is to avoid altering core network logic.
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response.data.message), setIsAuthorized(true);
    }
  };

  return (
    <nav className={isAuthorized ? "navbarShow" : "navbarHide"}>
      <div className="container">
        <div className="logo">
          <img src="/logo.png" alt="logo" />
        </div>
        <ul className={!show ? "menu" : "show-menu menu"}>
          <li>
            <Link to={"/"} onClick={() => setShow(false)}>
              {t("nav.home")} {/* Translated: HOME */}
            </Link>
          </li>
          <li>
            <Link to={"/job/getall"} onClick={() => setShow(false)}>
              {t("nav.jobs")} {/* Translated: ALL JOBS */}
            </Link>
          </li>
          <li>
            <Link to={"/applications/me"} onClick={() => setShow(false)}>
              {/* Conditional text replaced with translation keys */}
              {user && user.role === "Employer"
                ? t("nav.applicant_applications")
                : t("nav.my_applications")}
            </Link>
          </li>
          {user && user.role === "Employer" ? (
            <>
              <li>
                <Link to={"/job/post"} onClick={() => setShow(false)}>
                  {t("nav.post_job")} {/* Translated: POST NEW JOB */}
                </Link>
              </li>
              <li>
                <Link to={"/job/me"} onClick={() => setShow(false)}>
                  {t("nav.my_jobs")} {/* Translated: VIEW YOUR JOBS */}
                </Link>
              </li>
            </>
          ) : null}

          <button onClick={handleLogout}>{t("nav.logout")}</button> {/* Translated: LOGOUT */}
        </ul>
        <div className="hamburger" onClick={() => setShow(!show)}>
          {show ? <AiOutlineClose /> : <GiHamburgerMenu />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;