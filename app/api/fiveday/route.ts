import axios from "axios";
import { MongoClient } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'WeatherHistory';
const client = new MongoClient(mongoUrl);

export async function GET(req: NextRequest) {
  try {
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;
    const searchParams = req.nextUrl.searchParams;

    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    const dailyUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    const dailyRes = await axios.get(dailyUrl);

    const dailyData = dailyRes.data;


    await client.connect();
    const db = client.db(dbName);


    const collection = db.collection('fiveDay');
    await collection.insertOne(dailyData);


    await client.close();

    return NextResponse.json(dailyData);
  } catch (error) {
    console.log("Error in getting daily data ");
    return new Response("Error in getting daily data ", { status: 500 });
  }
}