"use client";

import Image from "next/image";
import profilePicture from "../../public/images/vargamarton.webp";
import logo from "../../public/images/logo.webp";
import { useState } from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import LanguageSwitcher from "@/components/language-switcher";

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      // Will be passed to the page component as props
    },
  };
}

export default function Home() {
  const [isMobileMenuOpen, setIsMobilemenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { t } = useTranslation("common");

  async function onSubmit() {
    console.log(email);
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
      }),
    });

    if (res.status == 500) {
      setErrorMessage(t("errors.general"));
      return;
    }
    setSuccessMessage(t("errors.success"));
    setEmail("");
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
              <LanguageSwitcher />
            </ul>
          </nav>
        )}

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
            <LanguageSwitcher />
          </ul>
        </nav>
      </header>

      <section id="introduction" className="hero">
        <div className="hero-content">
          <Image
            src={profilePicture}
            alt={"Profile picture"}
            className="profile-picture"
          />
          <div className="hero-titles">
            <h1 className="section-title-main">{t("hero.name")}</h1>
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
          className="profile-picture mobile-profile-picture"
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
              <span>
                {t(
                  "courses_classes.individual_classes.individual_course_price"
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
                  |{" "}
                  {t(
                    "courses_classes.small_group_courses.small_group_courses_base_price"
                  )}
                </span>
                <span>
                  |{" "}
                  {t(
                    "courses_classes.small_group_courses.small_group_courses_discounted_price"
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="myself" id="myself">
        <h2 className="section-title classes-title">
          {t("myself.main_title")}
        </h2>
        <div>
          <p>{t("myself.description")}</p>
        </div>
      </section>

      <footer id="contact">
        <h2 className="section-title">{t("footer.contact")}</h2>
        <div>
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
            <a href="mailto:vargamarton2002@icloud.com">
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
