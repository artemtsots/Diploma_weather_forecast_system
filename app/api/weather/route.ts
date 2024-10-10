

import axios from "axios";
import { MongoClient } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

// URL вашего сервера MongoDB
const mongoUrl = 'mongodb://localhost:27017';

// Имя вашей базы данных
const dbName = 'WeatherHistory';

// Создаем нового клиента MongoDB
const client = new MongoClient(mongoUrl);

export async function GET(req: NextRequest) {
  try {
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;

    const searchParams = req.nextUrl.searchParams;

    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    const res = await axios.get(url);

    // Подключаемся к серверу MongoDB
    await client.connect();

    const db = client.db(dbName);

    // Записываем данные о погоде в базу данных
    const collection = db.collection('Weather');
    await collection.insertOne(res.data);

    // Закрываем соединение с сервером MongoDB
    await client.close();

    return NextResponse.json(res.data);
  } catch (error) {
    console.log("Error fetching forecast data");
    return new Response("Error fetching forecast data", { status: 500 });
  }
}
