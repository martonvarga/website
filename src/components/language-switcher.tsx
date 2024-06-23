"use client";

import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";

// export async function getStaticProps({ locale }: any) {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale, ["common"])),
//       // Will be passed to the page component as props
//     },
//   };
// }

function LanguageSwitcher() {
  const router = useRouter();

  const { t } = useTranslation("common");

  return (
    <div className="language-switcher">
      <select
        defaultValue={router.locale}
        onChange={(e) =>
          router.push(
            {
              pathname: router.pathname,
              query: router.query,
            },
            undefined,
            { locale: e.target.value }
          )
        }
        className="language-switcher-select"
      >
        <option value="en">{t("language.en")}</option>
        <option value="hu">{t("language.hu")}</option>
      </select>
    </div>
  );
}

export default LanguageSwitcher;
