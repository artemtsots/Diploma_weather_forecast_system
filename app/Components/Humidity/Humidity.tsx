"use client";
import { useGlobalContext } from "@/app/context/globalContext";
import { droplets } from "@/app/utils/Icons";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function Humidity() {
  const { forecast } = useGlobalContext();

  if (!forecast || !forecast?.main || !forecast?.main?.humidity) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  const { humidity } = forecast?.main;

  const getHumidityText = (humidity: number) => {
    if (humidity < 30) return "Сухо: може викликати подразнення шкіри";
    if (humidity >= 30 && humidity < 50)
      return "Комфортно: ідеально підходить для здоров'я";
    if (humidity >= 50 && humidity < 70)
      return "Помірно: помірний стан вологості";
    if (humidity >= 70) return "Високий: може збільшити кількість алергій";
    return "Дані про вологість недоступні";
  };

  return (
    <div className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">
          {droplets} Вологість
        </h2>
        <p className="pt-4 text-2xl">{humidity}%</p>
      </div>

      <p className="text-sm">{getHumidityText(humidity)}.</p>
    </div>
  );
}

export default Humidity;
