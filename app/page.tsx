"use client";
import { useState } from "react";

import phone from "../public/icons8-phone.svg";
import Image from "next/image";

interface PhoneData {
  valid: boolean;
  number: string;
  local_format: string;
  international_format: string;
  country_prefix: string;
  country_name:string;
  carrier:string;
  line_type:string;



}

interface ButtonProps {
  fetchData: () => void; // Adjust the type based on the fetchData function signature
}

async function getData(number: string | Boolean) {
  const res = await fetch(
    `https://api.numlookupapi.com/v1/validate/${number}?apikey=num_live_NXBEBEfew0T5wpnvsXzjZnLlkgGbvo3vs1F89wTs`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default function Page() {
  const [number, setNumber] = useState("");
  const [data, setData] = useState<PhoneData | null>(null);

  const fetchData = async () => {
    try {
      const result = await getData(number);

      setData(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="bg-[url('../public/backImg.jpg')] min-h-screen flex items-center justify-center h-screen flex-col">
      <div className="backdrop-blur-lg md:p-2 rounded-xl">
        <div className="flex">
          <span>
            <Image width={50} height={50} alt="phone" src={phone}  />
          </span>{" "}
          <span className="text-4xl ps-2">Phone Validation</span>
        </div>
        <div className="max-w-md ">
          <input
            className="border border-gray-300 rounded p-2 w-3/4 text-[black]"
            type="tel"
            placeholder="+2348100185232"
            value={number}
            name="phone"
            onChange={(e) => setNumber(e.target.value)}
          />

<button className="font-bold bg-red-700  text-white py-2 mt-2 my-1 rounded w-3/12" onClick={fetchData}>Validate</button>

        </div>
        {data && (
          <ul className=" p-2  max-w-md">
            <li className="flex justify-between max-w-md">
              {" "}
              <span className="md:text-xl text-lg font-bold me-5">
                Phone Valid?
              </span>
              <span>{data.valid ? "Valid" : "invalid"}</span>{" "}
            </li>
            <li className="flex justify-between max-w-md">
              {" "}
              <span className="md:text-xl text-lg font-bold ">
                Phone Number:
              </span>{" "}
              <span>{data.number}</span>{" "}
            </li>
            <li className="flex justify-between max-w-md">
              {" "}
              <span className="md:text-xl text-lg font-bold">
                Local Format:{" "}
              </span>{" "}
              <span>{data.local_format}</span>{" "}
            </li>
            <li className="flex justify-between max-w-md">
              {" "}
              <span className="md:text-xl text-lg font-bold">
                International Format:
              </span>
              <span>{data.international_format}</span>{" "}
            </li>
            <li className="flex justify-between max-w-md">
              {" "}
              <span className="md:text-xl text-lg font-bold">
                Country Prefix:
              </span>{" "}
              <span>{data.country_prefix}</span>{" "}
            </li>
            <li className="flex justify-between max-w-md">
              {" "}
              <span className="md:text-xl text-lg font-bold">
                Country Name:{" "}
              </span>
              <span>{data.country_name}</span>
            </li>
            <li className="flex justify-between max-w-md">
              {" "}
              <span className="md:text-xl text-lg font-bold">Carrier</span>
              <span>{data.carrier}</span>
            </li>
            <li className="flex justify-between max-w-md">
              {" "}
              <span className="md:text-xl text-lg font-bold">
                <span>Line Type:</span>{" "}
              </span>{" "}
              {data.line_type}
            </li>
          </ul>
        )}
      </div>
    </main>
  );
}
