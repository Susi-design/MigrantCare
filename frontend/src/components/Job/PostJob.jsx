import { useContext,useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
// --- START: Updated Multilingual Import ---
import { useTranslation } from "react-i18next";
// --- END: Updated Multilingual Import ---

const PostJob = () => {
 const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
 const [category, setCategory] = useState("");
 const [country, setCountry] = useState("");
 const [city, setCity] = useState("");
 const [location, setLocation] = useState("");
 const [salaryFrom, setSalaryFrom] = useState("");
 const [salaryTo, setSalaryTo] = useState("");
 const [fixedSalary, setFixedSalary] = useState("");
 const [salaryType, setSalaryType] = useState("default");

 const { isAuthorized, user } = useContext(Context);
 // --- START: Get Translation Function and i18n ---
 const { t, i18n } = useTranslation();
 // --- END: Get Translation Function and i18n ---

 // Function to handle language change
 const handleLanguageChange = (lng) => {
   i18n.changeLanguage(lng);
 };

 const handleJobPost = async (e) => {
 e.preventDefault();
if (salaryType === "Fixed Salary") {
 // Core logic preserved
 setSalaryFrom("");
 setSalaryTo(""); // Fixed typo/logic: should be setSalaryTo
 } else if (salaryType === "Ranged Salary") {
 // Core logic preserved
 setFixedSalary("");
} else {
 // Core logic preserved
 setSalaryFrom("");
 setSalaryTo("");
 setFixedSalary("");
  }
await axios
.post(
"http://localhost:4000/api/v1/job/post",
fixedSalary.length >= 4
? {
 title,
 description,
 category,
country,
 city,
  location,
 fixedSalary,
}
: {
 title,
  description,
 category,
 country,
 city,
 location,
 salaryFrom,
 salaryTo,
},
{
 withCredentials: true,
 headers: {
"Content-Type": "application/json",
},
 }
)
 .then((res) => {
 toast.success(res.data.message);
 })
 .catch((err) => {
 toast.error(err.response.data.message);
 });
 };


 const navigateTo = useNavigate();
  if (!isAuthorized || (user && user.role !== "Employer")) {
navigateTo("/");
 }

 return (
   <>
 <div className="job_post page">
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

<h3>{t("postjob.title")}</h3>
 <form onSubmit={handleJobPost}>
<div className="wrapper">
 <input
 type="text"
 value={title}
onChange={(e) => setTitle(e.target.value)}
 placeholder={t("postjob.placeholder_job_title")}
 />
 <select
value={category}
 onChange={(e) => setCategory(e.target.value)}
>
   <option value="">{t("postjob.select_category_default")}</option>
 <option value="Graphics & Design">{t("categories.graphics_design")}</option> 
 <option value="Mobile App Development">{t("categories.mobile_app_dev")}</option>
 <option value="Frontend Web Development">{t("categories.frontend_web_dev")}</option>
 <option value="MERN Stack Development">{t("categories.mern_dev")}</option>
 <option value="Account & Finance">{t("categories.account_finance")}</option>
 <option value="Artificial Intelligence">{t("categories.ai")}</option>
 <option value="Video Animation">{t("categories.video_animation")}</option>
 <option value="MEAN Stack Development">{t("categories.mean_dev")}</option>
 <option value="MEVN Stack Development">{t("categories.mevn_dev")}</option>
 <option value="Data Entry Operator">{t("categories.data_entry")}</option>
 <option value="Manufacturing & Automobile">{t("categories.manufacturing_automobile")}</option>
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
 <div className="wrapper">
  <input
type="text"
 value={country}
 onChange={(e) => setCountry(e.target.value)}
placeholder={t("postjob.placeholder_country")}
 />
<input
 type="text"
 value={city}
 onChange={(e) => setCity(e.target.value)}
 placeholder={t("postjob.placeholder_city")}
/>
</div>
 <input
 type="text"
value={location}
 onChange={(e) => setLocation(e.target.value)}
  placeholder={t("postjob.placeholder_location")}
/>
 <div className="salary_wrapper">
 <select
 value={salaryType}
  onChange={(e) => setSalaryType(e.target.value)}
 >
  <option value="default">{t("postjob.select_salary_type_default")}</option>
<option value="Fixed Salary">{t("postjob.option_fixed_salary")}</option>
<option value="Ranged Salary">{t("postjob.option_ranged_salary")}</option>
</select>
<div>
  {salaryType === "default" ? (
 <p>{t("postjob.salary_type_required_message")}</p>
) : salaryType === "Fixed Salary" ? (
   <input
 type="number"
placeholder={t("postjob.placeholder_fixed_salary")}
 value={fixedSalary}
 onChange={(e) => setFixedSalary(e.target.value)}
 />
 ) : (
 <div className="ranged_salary">
 <input
 type="number"
 placeholder={t("postjob.placeholder_salary_from")}
 value={salaryFrom}
 onChange={(e) => setSalaryFrom(e.target.value)}
 />
 <input
 type="number"
 placeholder={t("postjob.placeholder_salary_to")}
 value={salaryTo}
 onChange={(e) => setSalaryTo(e.target.value)}
 />
 </div>
 )}
 </div>
 </div>
 <textarea
 rows="10"
  value={description}
 onChange={(e) => setDescription(e.target.value)}
 placeholder={t("postjob.placeholder_description")}
 />
 <button type="submit">{t("postjob.button_create_job")}</button>
</form>
 </div>
</div>
 </>
 );
};

export default PostJob;


