import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useAddress from "../hooks/useLocation";

const MapContainer = styled.div`
  width: 100%;
  height: 90vh;
`;

const AppContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
`;

const SearchContainer = styled.div`
  position: fixed;
  top: 60px;
  right: 20px;
  background-color: #fff;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 1;
  display: flex; /* 수평 정렬을 위해 flex 사용 */
  align-items: center; /* 수직 중앙 정렬 */
`;

const InputWrapper = styled.div`
  flex: 1; /* 입력창이 확장되도록 함 */
  display: flex; /* 내부 요소를 수평으로 배치하기 위해 flex 사용 */
  align-items: center; /* 수직 중앙 정렬 */
`;

const InfoWindowContainer = styled.div`
  position: fixed;
  top: 140px;
  right: 20px;
  background-color: #fff;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 1;
  width: 260px;
  justify-content: center;
`;

const Input = styled.input`
  width: 100%; /* 입력창이 전체 너비를 차지하도록 함 */
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px;
  cursor: pointer;
  font-size: 14px;
  margin-left: 10px;
`;

const InfoWindowContent = styled.div`
  padding: 10px;
  font-size: 16px;
`;

const KakaoMap = () => {
  const mapRef = useRef(null); // 지도를 담을 영역의 DOM 레퍼런스
  const [searchQuery, setSearchQuery] = useState("");
  const [map, setMap] = useState(null); // 지도 객체
  const [markers, setMarkers] = useState([]); // 마커 배열
  const [selectedPlace, setSelectedPlace] = useState(null); // 선택된 장소
  const { addr, location } = useAddress(); // 커스텀 훅 사용

  useEffect(() => {
    console.log("현재 위치에 대한 주소 : ", addr);
    const container = mapRef.current; // 지도를 담을 영역의 DOM 레퍼런스
    const options = {
      center: new window.kakao.maps.LatLng(location.lat, location.long),
      level: 3,
    };

    const kakaoMap = new window.kakao.maps.Map(container, options);
    setMap(kakaoMap);
  }, [location.lat, location.long]);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchButtonClick = () => {
    if (map && searchQuery) {
      const places = new window.kakao.maps.services.Places(); // 장소 검색 객체 생성

      markers.forEach((marker) => marker.setMap(null)); //  마커 지우기

      places.keywordSearch(searchQuery, (data, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const newMarkers = data.map((place) => {
            const placeMarker = new window.kakao.maps.Marker({
              position: new window.kakao.maps.LatLng(place.y, place.x),
            });

            placeMarker.setMap(map);
            // Kakao Map에서 마커에 대한 이벤트 처리를 하는 표준 함수
            window.kakao.maps.event.addListener(placeMarker, "click", () => {
              setSelectedPlace(place);
            });

            return placeMarker;
          });
          setMarkers(newMarkers);
        }
      });
    }
  };

  return (
    <AppContainer>
      <MapContainer ref={mapRef}></MapContainer>
      <SearchContainer>
        <InputWrapper>
          <Input
            type="text"
            placeholder="검색할 장소를 입력하세요"
            value={searchQuery}
            onChange={handleSearchInputChange}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSearchButtonClick();
              }
            }}
          />
        </InputWrapper>
        <Button onClick={handleSearchButtonClick}>확인</Button>
      </SearchContainer>
      {selectedPlace && (
        <InfoWindowContainer>
          <InfoWindowContent>
            <strong>{selectedPlace.place_name}</strong>
            <br />
            주소: {selectedPlace.address_name}
            <br />
            전화번호: {selectedPlace.phone}
          </InfoWindowContent>
        </InfoWindowContainer>
      )}
    </AppContainer>
  );
};

export default KakaoMap;
