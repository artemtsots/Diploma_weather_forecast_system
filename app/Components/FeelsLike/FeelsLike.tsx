"use client";
import { useGlobalContext } from "@/app/context/globalContext";
import { thermometer } from "@/app/utils/Icons";
import { kelvinToCelsius } from "@/app/utils/misc";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function FeelsLike() {
  const { forecast } = useGlobalContext();

  if (!forecast || !forecast?.main || !forecast?.main?.feels_like) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  const { feels_like, temp_min, temp_max } = forecast?.main;

  const feelsLikeText = (
    feelsLike: number,
    minTemo: number,
    maxTemp: number
  ) => {
    const avgTemp = (minTemo + maxTemp) / 2;

    if (feelsLike < avgTemp - 5) {
      return "На відчуття значно холодніше, ніж фактична температура.";
    }
    if (feelsLike > avgTemp - 5 && feelsLike <= avgTemp + 5) {
      return "За відчуттями близька до фактичної температури.";
    }
    if (feelsLike > avgTemp + 5) {
      return "За відчуттями близька до фактичної температури.";
    }

    return "За відчуттями близька до фактичної температури.";
  };

  const feelsLikeDescription = feelsLikeText(feels_like, temp_min, temp_max);

  return (
    <div className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none">
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">
          {thermometer} Відчувається як
        </h2>
        <p className="pt-4 text-2xl">{kelvinToCelsius(feels_like)}°</p>
      </div>

      <p className="text-sm">{feelsLikeDescription}</p>
    </div>
  );
}

export default FeelsLike;
