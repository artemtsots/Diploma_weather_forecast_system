"use client";
import { useGlobalContext } from "@/app/context/globalContext";
import { gauge } from "@/app/utils/Icons";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function Pressure() {
  const { forecast } = useGlobalContext();

  if (!forecast || !forecast?.main || !forecast?.main?.pressure) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  const { pressure } = forecast?.main;

  const getPressureDescription = (pressure: number) => {
    if (pressure < 1000) return "Дуже низький тиск";

    if (pressure >= 1000 && pressure < 1015)
      return "Низький тиск";

    if (pressure >= 1015 && pressure < 1025)
      return "Нормальний тиск";

    if (pressure >= 1025 && pressure < 1040)
      return "Високий тиск";

    if (pressure >= 1040) return "Дуже високий тиск";

    return "Немає даних про тиск";
  };

  return (
    <div className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">
          {gauge} Тиск
        </h2>
        <p className="pt-4 text-2xl">{pressure} hPa</p>
      </div>

      <p className="text-sm">{getPressureDescription(pressure)}.</p>
    </div>
  );
}

export default Pressure;
