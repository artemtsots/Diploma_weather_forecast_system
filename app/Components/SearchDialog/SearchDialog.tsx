"use client";
import React from "react";
import axios from "axios";
import {
  useGlobalContext,
  useGlobalContextUpdate,
} from "@/app/context/globalContext";
import { Button } from "@/components/ui/button";
import { Command, CommandInput } from "@/components/ui/command";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

function SearchDialog() {
  const { geoCodedList, inputValue, handleInput } = useGlobalContext();
  const { setActiveCityCoords } = useGlobalContextUpdate();
  const [hoveredIndex, setHoveredIndex] = React.useState<number>(0);

  const getClickedCoords = (lat: number, lon: number) => {
    setActiveCityCoords([lat, lon]);
  };

  const handleSearch = async () => {
    try {
      const apiKey = process.env.OPENWEATHERMAP_API_KEY;
      const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${inputValue}&limit=5&appid=${apiKey}`;
      const geoRes = await axios.get(geoUrl);
      const { lat, lon } = geoRes.data[0];
      
      // Отправляем запрос на запись геоданных в базу данных
      const serverUrl = 'http://localhost:5000/geocodedata';
      await axios.post(serverUrl, { name: inputValue, lat, lon });

      // Устанавливаем активные координаты
      setActiveCityCoords(lat, lon);
    } catch (error) {
      console.error("Error fetching geocoded data:", error);
    }
  };

  return (
    <div className="search-btn">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="border inline-flex items-center justify-center text-sm font-medium hover:dark:bg-[#131313] hover:bg-slate-100  ease-in-out duration-200"
          >
            <p className="text-sm text-muted-foreground">Пошук</p>
            <div className="command dark:bg-[#262626] bg-slate-200  rounded-sm ml-[10rem] flex items-center gap-2">

            </div>
          </Button>
        </DialogTrigger>

        <DialogContent className="p-0">
          <Command className=" rounded-lg border shadow-md">
            <CommandInput
              value={inputValue}
              onChangeCapture={handleInput}
              placeholder="Введіть назву населеного пункта або міста"
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  handleSearch();
                }
              }}
            />
            <ul className="px-3 pb-2">
              <p className="p-2 text-sm text-muted-foreground"></p>

              {geoCodedList?.length === 0 ||
                (!geoCodedList && <p>Немає результатів</p>)}

              {geoCodedList &&
                geoCodedList.map(
                  (
                    item: {
                      name: string;
                      country: string;
                      state: string;
                      lat: number;
                      lon: number;
                    },
                    index: number
                  ) => {
                    const { country, state, name } = item;
                    return (
                      <li
                        key={index}
                        onMouseEnter={() => setHoveredIndex(index)}
                        className={`py-3 px-2 text-sm  rounded-sm cursor-default
                        ${hoveredIndex === index ? "bg-accent" : ""}
                      `}
                        onClick={() => {
                          getClickedCoords(item.lat, item.lon);
                        }}
                      >
                        <p className=" text">
                          {name}, {state && state + ","} {country}
                        </p>
                      </li>
                    );
                  }
                )}
            </ul>
          </Command>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default SearchDialog;
