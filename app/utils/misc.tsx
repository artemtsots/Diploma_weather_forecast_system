import moment from "moment";

import "moment/locale/uk"; // Додаємо українську локаль
moment.locale("uk"); // Встановлюємо українську мову як локаль

export const kelvinToCelsius = (kelvin: number) => {
  return Math.round(kelvin - 273.15);
};

export const unixToTime = (unix: number, timezone: number) => {
  return moment
    .unix(unix)
    .utcOffset(timezone / 60)
    .format("HH:mm");
};

export const unixToDay = (unix: number) => {
  return moment.unix(unix).format("dddd");// 4 д поставил

};

export const formatNumber = (num: number) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  } else {
    return num;
  }
};

export const airQulaityIndexText = [
  {
    rating: 10,
    description: "відмінно",
  },
  {
    rating: 20,
    description: "добре",
  },
  {
    rating: 30,
    description: "чисто",
  },
  {
    rating: 40,
    description: "задовільно",
  },
  {
    rating: 50,
    description: "помірно",
  },
  {
    rating: 60,
    description: "помірно",
  },
  {
    rating: 70,
    description: "погано",
  },
  {
    rating: 80,
    description: "погано",
  },
  {
    rating: 90,
    description: "дуже погано",
  },
  {
    rating: 100,
    description: "дуже погано",
  },
];
