import React from "react";
import { Suspense } from "react";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { useTranslation } from "react-i18next";

const translationsEn = {
  welcome: "Welcome to React",
  description:
    "I was born in the friendship District of the Jizzakh region on may 20, 2006, the son of Yunusbek Khabibullayev Yusuf.",
};
const translationsUz = {
  welcome: "Xush kelibsiz",
  description:
    "Men Yunusbek Xabibullayev Yusuf o'g'li 2006 yil 20 may kunni Jizzax viloyati Do'stlik tumannida tug'ilganman.",
};

const translationsRu = {
  welcome: "Добро пожаловать",
  description:
    "Я Юнусбек Хабибуллаев Юсуф оглы родился 20 мая 2006 года в дружественном районе Джизакской области.",
};

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: translationsEn },
    uz: { translation: translationsUz },
    ru: { translation: translationsRu },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValues: false },
});

export default function Translations() {
  const { t } = useTranslation();
  const onChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };
  return (
    <div>
      <Suspense fallback="Loading...">
        <div className="yunus">
          <h1>{t("welcome")}</h1>
          <p>{t("description")}</p>
          <select name="language" onChange={onChange}>
            <option value={"uz"}>Uzbek</option>
            <option value={"en"}>English</option>
            <option value={"ru"}>Russia</option>
          </select>
        </div>
      </Suspense>
    </div>
  );
}
