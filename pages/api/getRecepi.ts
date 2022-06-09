import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import cheerio from "cheerio";

type Data = {
	dishName: string;
    menge: string | null;
    zutat: string;
};

async function getData(url: string) {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        let dishName = $("h1").text();
        const ingredients = $(".table-header tbody tr ");
        const table: object[] = [];

        ingredients.each((_, ele) => {
            const food = <Data>{};
			food.dishName = dishName;

            let menge = $(ele).children(".td-left").children("span").text();
			let trimFunciton = menge?.trim().split(" ");
            // weird format thats why this slicing
            if (trimFunciton.length >= 2) {
                let first = trimFunciton[0];
                let last = trimFunciton.pop();
                food.menge = first + " " + last;
            } else {
                let first = trimFunciton[0];
                food.menge = first;
            }

            food.zutat = $(ele).children(".td-right").children("span").text();
			console.log(food.dishName)

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
        res.json(response);
    }
}
