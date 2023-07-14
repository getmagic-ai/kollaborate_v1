"use client";
import axios from 'axios';

const GetData = () => {
  const getData = async () => {
    const response = await axios.get("/api/brands");
    console.log(response);
  };
  return (
    <div>
      <button onClick={getData}>GET</button>
    </div>
  );
};

export default GetData;
