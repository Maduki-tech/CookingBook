import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import cheerio from "cheerio";

let dishName: string;
type Data = {
    menge: string | null;
    zutat: string;
};

async function getData(url: string) {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        dishName = $("h1").text();
        const ingredients = $(".table-header tbody tr ");
        const table: object[] = [];

        ingredients.each((_, ele) => {
            const food = <Data>{};

            let menge = $(ele).children(".td-left").children("span").text();
            // weird format thats why this slicing
            let first = menge?.trim().split(" ")[0];
            let last = menge?.trim().split(" ").pop();

            food.menge = first + " " + last;

            food.zutat = $(ele).children(".td-right").children("span").text();

            table.push(food);
        });
        return table;
    } catch (err) {
		return err;
    }
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        const url = req.body.URL;
        const response = await getData(url);
		res.json(response)
    }
}
