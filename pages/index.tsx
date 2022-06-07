import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import { FormEvent, useState } from "react";

const Home: NextPage = () => {
    const [url, setUrl] = useState("");
    const callAPI = (e: FormEvent, url: string) => {
        e.preventDefault();
        axios({
            method: "post",
            url: "./api/getRecepi",
            data: {
                URL: url,
            },
        })
            .then((res) => console.log(res))
            .then((data) => console.log(data));
    };
    return (
        <div className="h-screen w-screen">
            <Head>
                <title>Cooking Book</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <form
                onSubmit={(e) => callAPI(e, url)}
                className="flex flex-col justify-center items-center w-full h-full space-y-5"
            >
                <label>
                    Input the side you want to scrape
                    <input
                        type="url"
                        onChange={(e) => setUrl(e.target.value)}
                        className=" border-b-2 border-black ml-4"
                        placeholder="Website"
                    />
                </label>
                <input
                    type="submit"
                    className="border-2 rounded-md px-4 py-2 "
                />
            </form>
        </div>
    );
};

export default Home;
