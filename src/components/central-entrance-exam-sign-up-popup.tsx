"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import Popup from "reactjs-popup";
import Input from "@/components/input";
import {
  WorkbookOrderFormType,
  defaultWorkbookOrderFormValues,
} from "@/types/workbook-order";

function CentralEntranceExamSignUpPopup() {
  const { t } = useTranslation("common");

  const [formValues, setFormValues] = useState<WorkbookOrderFormType>(
    defaultWorkbookOrderFormValues,
  );
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const allFieldsFilled = Object.values(formValues).every(
      (value) => value.trim() !== "",
    );

    setIsButtonDisabled(!allFieldsFilled);
  }, [formValues]);

  function onClose(close: () => void) {
    setFormValues(defaultWorkbookOrderFormValues);
    setErrorMessage("");
    setSuccessMessage("");
    close();
  }

  function onValueChange(event: React.ChangeEvent<HTMLInputElement>) {
    setErrorMessage("");
    setSuccessMessage("");
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValues.email)) {
      setErrorMessage(t("errors.wrong_email_format"));
      return;
    }

    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/order-workbook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email_address: formValues.email,
          status: "subscribed",
          merge_fields: {
            FNAME: `${formValues.firstName} ${formValues.lastName}`,
            ZIP: formValues.zip,
            CITY: formValues.city,
            ADDRESS: formValues.address,
          },
          tags: ["workbook_order"],
        }),
      });

      if (response.status === 500) {
        setErrorMessage(t("errors.general"));
        return;
      }

      setSuccessMessage(t("central-entrance-exam_signup-form.success"));
      setFormValues(defaultWorkbookOrderFormValues);
    } catch {
      setErrorMessage(t("errors.general"));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Popup
      trigger={
        <button className="email-submit-btn">
          {t("central-entrance-exam_signup-form.order_button")}
        </button>
      }
      modal
      nested
      lockScroll
      closeOnDocumentClick={false}
    >
      {
        ((close: any) => (
          <div className="central-entrance-exam-sign-up-container">
            <form action="submit" onSubmit={onSubmit}>
              <Input
                name="firstName"
                type="text"
                label={t("central-entrance-exam_signup-form.first_name")}
                value={formValues.firstName}
                onChange={onValueChange}
                className="sign-up-form-input"
              />
              <Input
                name="lastName"
                type="text"
                label={t("central-entrance-exam_signup-form.last_name")}
                value={formValues.lastName}
                onChange={onValueChange}
                className="sign-up-form-input"
              />
              <Input
                name="email"
                type="email"
                label={t("central-entrance-exam_signup-form.email")}
                value={formValues.email}
                onChange={onValueChange}
                className="sign-up-form-input"
              />
              <Input
                name="zip"
                type="text"
                label={t("central-entrance-exam_signup-form.zip")}
                value={formValues.zip}
                onChange={onValueChange}
                className="sign-up-form-input"
              />
              <Input
                name="city"
                type="text"
                label={t("central-entrance-exam_signup-form.city")}
                value={formValues.city}
                onChange={onValueChange}
                className="sign-up-form-input"
              />
              <Input
                name="address"
                type="text"
                label={t("central-entrance-exam_signup-form.address")}
                value={formValues.address}
                onChange={onValueChange}
                className="sign-up-form-input"
              />

              {errorMessage && (
                <span className="email-field-error">{errorMessage}</span>
              )}
              {successMessage && (
                <span className="email-field-success">{successMessage}</span>
              )}

              <button
                type="submit"
                disabled={isButtonDisabled || isSubmitting}
                className="sign-up-form-submit-button"
              >
                {t("send")}
              </button>
              <button
                onClick={() => onClose(close)}
                className="central-entrance-exam-sign-up-close-button"
              >
                {t("close")}
              </button>
            </form>
          </div>
        )) as any
      }
    </Popup>
  );
}

export default CentralEntranceExamSignUpPopup;
