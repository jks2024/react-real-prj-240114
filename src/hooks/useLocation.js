import React, { useState, useEffect } from "react";
import axios from "axios";

const useAddress = () => {
  const [location, setLocation] = useState({ lat: 0, long: 0 }); // 위도, 경도
  const [addr, setAddr] = useState(""); // 주소

  // 현재 위치 가져오기
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  const onSuccess = (position) => {
    setLocation({
      lat: position.coords.latitude,
      long: position.coords.longitude,
    });
  };
  const onError = (e) => {
    console.log(e);
  };

  useEffect(() => {
    console.log(location.lat, location.long);
    if (location.lat !== 0 && location.long !== 0) {
      getGeocodeKakao(location.lat, location.long);
    }
  }, [location.lat, location.long]);

  // 주소 가져 오기
  const getGeocodeKakao = async (lat, lng) => {
    try {
      const response = await axios.get(
        `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lng}&y=${lat}`,
        {
          headers: {
            Authorization: `KakaoAK 2dda918f299fb6e8325412499bf9a08a`,
          },
        }
      );
      const fullAddress = response.data.documents[0].address;
      const neighborhoodAddress = `${fullAddress.region_1depth_name} ${fullAddress.region_2depth_name} ${fullAddress.region_3depth_name}`;
      setAddr(neighborhoodAddress);
    } catch (e) {
      console.log(e);
    }
  };
  return { addr, location };
};

export default useAddress;
