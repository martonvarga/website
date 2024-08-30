"use client";

import Image from "next/image";
import profilePicture from "../../public/images/vargamarton.webp";
import logo from "../../public/images/logo.webp";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import LanguageSwitcher from "@/components/language-switcher";
import Input from "@/components/input";
import SnackBar from "@/components/snackbar";

enum CourseType {
  KEDD_PERSONAL_16_00_17_30 = "Kedd 16:00-17:30 Személyes",
  KEDD_ONLINE_18_00_19_30 = "Kedd 18:00-19:30 Online",
  CSUTORTOK_PERSONAL_16_00_17_30 = "Csütörtök 16:00-17:30 Személyes",
  CSUTORTOK_ONLINE_18_00_19_30 = "Csütörtök 18:00-19:30 Online",
  SZOMBAT_PERSONAL_10_00_11_30 = "Szombat 10:00-11:30 Személyes",
  VASARNAP_ONLINE_10_00_11_30 = "Vasárnap 10:00-11:30 Online",
}

type CourseSignUpFormType = {
  firstName: string;
  lastName: string;
  email: string;
  course: CourseType | "";
};

const defaultSignUpToCourseFormValues: CourseSignUpFormType = {
  firstName: "",
  lastName: "",
  email: "",
  course: "",
};

export default function MainPage() {
  const [isMobileMenuOpen, setIsMobilemenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [signUpCourseFormValues, setSignUpCourseFormValues] =
    useState<CourseSignUpFormType>(defaultSignUpToCourseFormValues);

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [showSnackBar, setShowSnackBar] = useState(false);

  useEffect(() => {
    const allFieldsFilled = Object.values(signUpCourseFormValues).every(
      (value) => value.trim() !== ""
    );

    setIsButtonDisabled(!allFieldsFilled);
  }, [signUpCourseFormValues]);

  useEffect(() => {
    console.log({ showSnackBar });
  }, [showSnackBar]);

  const { t } = useTranslation("common");

  function onSignUpValueChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setSignUpCourseFormValues({
      ...signUpCourseFormValues,
      [event.target.name]: event.target.value,
    });
  }

  async function onSubmit() {
    if (email.trim() == "") {
      setErrorMessage(t("errors.mandatory_field"));
      return;
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setErrorMessage(t("errors.wrong_email_format"));
      return;
    }
    setErrorMessage("");
    const res = await fetch("/api/email-list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: name,
        },
        tags: ["subscriber"],
      }),
    });

    if (res.status == 500) {
      setErrorMessage(t("errors.general"));
      return;
    }
    setErrorMessage("");
    setSuccessMessage(t("errors.success"));
    setEmail("");
  }

  function handleMobileMenuItemOnClick(route: string) {
    window.location.href = `#${route}`;
    setIsMobilemenuOpen(false);
  }

  async function onSubmitSignUpForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch("/api/sign-up-to-course", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: signUpCourseFormValues.email,
        status: "subscribed",
        merge_fields: {
          FNAME:
            signUpCourseFormValues.firstName +
            " " +
            signUpCourseFormValues.lastName,
        },
        tags: [signUpCourseFormValues.course],
      }),
    });

    if (response.status == 500) {
      setErrorMessage(t("errors.general"));
      return;
    }

    setShowSnackBar(true);
    setSignUpCourseFormValues(defaultSignUpToCourseFormValues);
  }

  return (
    <>
      <header className="header">
        <div className="logo">
          <Image src={logo} alt="logo" className="logo" />
        </div>
        <button
          onClick={() => setIsMobilemenuOpen(!isMobileMenuOpen)}
          className="hamburger-menu-btn"
          id="menu-icon"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
          >
            <title>Main navigation button</title>
            <rect x="6" y="9" width="20" height="2" />
            <rect x="6" y="15" width="20" height="2" />
            <rect x="6" y="21" width="20" height="2" />
          </svg>
        </button>
        {isMobileMenuOpen && window.innerWidth <= 1024 && (
          <nav className="mobile-menu" id="mobile-menu">
            <ul className="mobile-nav-links">
              <li>
                <a onClick={() => handleMobileMenuItemOnClick("introduction")}>
                  {t("navigation.introduction")}
                </a>
              </li>
              <li>
                <a
                  onClick={() => handleMobileMenuItemOnClick("courses-classes")}
                >
                  {t("navigation.courses_classes")}
                </a>
              </li>
              <li>
                <a onClick={() => handleMobileMenuItemOnClick("myself")}>
                  {t("navigation.myself")}
                </a>
              </li>
              <li>
                <a onClick={() => handleMobileMenuItemOnClick("contact")}>
                  {t("navigation.contact")}
                </a>
              </li>
              <LanguageSwitcher />
            </ul>
          </nav>
        )}

        {
          <nav className="navigation">
            <ul className="nav-links">
              <li>
                <a href="#introduction">{t("navigation.introduction")}</a>
              </li>
              <li>
                <a href="#courses-classes">{t("navigation.courses_classes")}</a>
              </li>
              <li>
                <a href="#myself">{t("navigation.myself")}</a>
              </li>
              <li>
                <a href="#contact">{t("navigation.contact")}</a>
              </li>
              <li>
                <a href="#next-group-courses">{t("navigation.contact")}</a>
              </li>
              <LanguageSwitcher />
            </ul>
          </nav>
        }
      </header>
      {showSnackBar && (
        <SnackBar
          text={t("snackbar.success")}
          setShowSnackBar={setShowSnackBar}
        />
      )}

      <section id="introduction" className="hero">
        <div className="hero-content">
          <Image
            src={profilePicture}
            alt={"Profile picture"}
            className="profile-picture"
          />
          <div className="hero-titles">
            <h1 className="section-title-main hero-title-name">
              {t("hero.name")}
            </h1>
            <h2 className="section-title">{t("hero.title")}</h2>
            <div className="email-list-container">
              <h3 className="course-title">{t("hero.email_list_title")}</h3>
              <div className="email-list-form">
                <div className="email-input-container">
                  <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`email-input ${
                      errorMessage ? "email-input-error" : ""
                    }
                    ${successMessage ? "email-input-success" : ""}
                    `}
                  />
                  {errorMessage && (
                    <span className="email-field-error"> {errorMessage} </span>
                  )}
                  {successMessage && (
                    <span className="email-field-success">
                      {" "}
                      {successMessage}{" "}
                    </span>
                  )}
                </div>
                <button onClick={onSubmit} className="email-submit-btn">
                  {t("hero.subscribe")}
                </button>
              </div>
            </div>
          </div>
        </div>
        <Image
          src={profilePicture}
          alt={"Profile picture"}
          className="mobile-profile-picture"
        />
        <div className="hero-description-container">
          <p className="hero-description">{t("hero.myself_description_one")}</p>
          <p className="hero-description">{t("hero.myself_description_two")}</p>
        </div>
      </section>

      <section className="courses-classes" id="courses-classes">
        <h2 className="section-title classes-title">
          {t("courses_classes.main_title")}
        </h2>
        <div className="course">
          <div className="course-details">
            <h3 className="course-title">
              {" "}
              {t("courses_classes.individual_classes.individual_classes_title")}
            </h3>
            <div>
              <p>
                {t(
                  "courses_classes.individual_classes.individual_classes_description_one"
                )}
                <br />
                <br />
                {t(
                  "courses_classes.individual_classes.individual_classes_description_two"
                )}
              </p>
            </div>
            <div className="course-info">
              <span>
                {t(
                  "courses_classes.individual_classes.individual_course_duration"
                )}
              </span>
            </div>
          </div>
        </div>
        <div className="course">
          <div className="course-details">
            <h3 className="course-title">
              {t(
                "courses_classes.small_group_courses.small_group_courses_title"
              )}
            </h3>
            <div className="course-details-container">
              <p>
                {t(
                  "courses_classes.small_group_courses.small_group_courses_description"
                )}
              </p>
              <div className="course-info">
                <span>
                  {t(
                    "courses_classes.small_group_courses.small_group_courses_duration"
                  )}
                </span>
                <span>
                  {" "}
                  |{" "}
                  {t(
                    "courses_classes.small_group_courses.small_group_courses_base_price"
                  )}
                </span>
                <span>
                  {" "}
                  |{" "}
                  {t(
                    "courses_classes.small_group_courses.small_group_courses_discounted_price"
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="courses-details" id="next-group-courses">
          <ul>
            <li>{t("course_options_list.title")}</li>
            <br />
            <li>
              {t("course_options_list.days.tuesday")}:
              <ol>
                <li>16:00-17:30 {t("course_options_list.personal")}</li>
                <li>18:00-19:30 {t("course_options_list.online")}</li>
              </ol>
            </li>
            <li>
              {t("course_options_list.days.thursday")}:
              <ol>
                <li>16:00-17:30 {t("course_options_list.personal")}</li>
                <li>18:00-19:30 {t("course_options_list.online")}</li>
              </ol>
            </li>
            <li>
              {t("course_options_list.days.saturday")}:
              <ol>
                <li>10:00-11:30 {t("course_options_list.personal")}</li>
              </ol>
            </li>
            <li>
              {t("course_options_list.days.sunday")}:
              <ol>
                <li>10:00-11:30 {t("course_options_list.online")}</li>
              </ol>
            </li>
          </ul>
          <p>{t("group_courses_texts.first")}</p>
          <p>{t("group_courses_texts.second")}</p>
        </div>

        <div className="course-sign-up-container">
          <form action="submit" onSubmit={onSubmitSignUpForm}>
            <Input
              name="firstName"
              type="text"
              label={t("form.first_name")}
              value={signUpCourseFormValues.firstName}
              onChange={onSignUpValueChange}
              className="sign-up-form-input"
            />
            <Input
              name="lastName"
              type="text"
              label={t("form.last_name")}
              value={signUpCourseFormValues.lastName}
              onChange={onSignUpValueChange}
              className="sign-up-form-input"
            />
            <Input
              name="email"
              type="email"
              label={t("form.email")}
              value={signUpCourseFormValues.email}
              onChange={onSignUpValueChange}
              className="sign-up-form-input"
            />
            <label>
              {t("form.course")}
              <select
                name="course"
                value={signUpCourseFormValues.course}
                onChange={onSignUpValueChange}
                className="courses-options-dropdown"
              >
                <option value="">{""}</option>
                <option value="SZ1">{t("course_options.first")}</option>
                <option value="O1">{t("course_options.second")}</option>
                <option value="SZ2">{t("course_options.third")}</option>
                <option value="O2">{t("course_options.fourth")}</option>
                <option value="SZ3">{t("course_options.fifth")}</option>
                <option value="O3">{t("course_options.sixth")}</option>
              </select>
            </label>

            <button
              type="submit"
              disabled={isButtonDisabled}
              className="sign-up-form-submit-button"
            >
              {t("sign_up")}
            </button>
          </form>
        </div>
      </section>

      <section className="myself" id="myself">
        <h2 className="section-title classes-title">
          {t("myself.main_title")}
        </h2>
        <div>
          <p>{t("myself.description1")}</p>
          <p>{t("myself.description2")}</p>
          <p>{t("myself.description3")}</p>
        </div>
      </section>

      <footer id="contact" className="footer">
        <h2 className="section-title">{t("footer.contact")}</h2>
        <div className="contact-container">
          <p className="contact-item">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
              style={{ width: "24px", height: "24px" }}
            >
              <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
              <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
            </svg>
            {t("footer.email")}:
            <a href="mailto:vargamarton2002@icloud.com" className="wrap-text">
              vargamarton2002@icloud.com
            </a>
          </p>
          <p className="contact-item">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
              style={{ width: "24px", height: "24px" }}
            >
              <path d="M10.5 18.75a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" />
              <path
                fillRule="evenodd"
                d="M8.625.75A3.375 3.375 0 0 0 5.25 4.125v15.75a3.375 3.375 0 0 0 3.375 3.375h6.75a3.375 3.375 0 0 0 3.375-3.375V4.125A3.375 3.375 0 0 0 15.375.75h-6.75ZM7.5 4.125C7.5 3.504 8.004 3 8.625 3H9.75v.375c0 .621.504 1.125 1.125 1.125h2.25c.621 0 1.125-.504 1.125-1.125V3h1.125c.621 0 1.125.504 1.125 1.125v15.75c0 .621-.504 1.125-1.125 1.125h-6.75A1.125 1.125 0 0 1 7.5 19.875V4.125Z"
                clipRule="evenodd"
              />
            </svg>
            {t("footer.phone")}:<a href="tel:+36204508521">+36 20 450 8521</a>
          </p>
        </div>
      </footer>
    </>
  );
}
