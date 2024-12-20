import axios from "axios";
import React, { useState, useEffect } from "react";
interface ICurrenweather {
  location: {
    name: string;
    localtime: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
    };
  };
}

const Data = () => {
  const [currenWeather, setCurrenWeather] = useState(null);

  const featchData = async () => {
    const response = await axios.get(
      " https://api.weatherapi.com/v1/forecast.json?key=c9a0ca46550648b29ce125849232709&q=Danang&days=1&aqi=no&alerts=no&lang=vi"
    );
    setCurrenWeather(response.data);
  };
  // featchData();
  function ClickShow() {}

  return (
    <>
      <div class="menu-box">
        <button id="walletAddress" class="menu-button">
          Wallet Address
        </button>
        <button id="disconnectWallet" class="menu-button">
          Disconnect
        </button>
      </div>
      <div class="container">
        <h1>Wearther</h1>
        <button id="addUser" class="action-button">
          Xem dữ liệu
        </button>
        <div id="toast" class="toast"></div>
        <div id="userList" class="user-list"></div>
      </div>
    </>
  );
};

export default Data;
