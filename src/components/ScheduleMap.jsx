import React, { useState } from 'react';
import { Map, MapMarker, useKakaoLoader } from 'react-kakao-maps-sdk';
import { motion } from 'framer-motion';

const ScheduleMap = () => {
    const mapKey = import.meta.env.VITE_KAKAO_MAP_KEY;
    const [isMapLocked, setIsMapLocked] = useState(true);

    const [loading, error] = useKakaoLoader({
        appkey: mapKey,
        libraries: ['services'],
    });

    if (loading) return <div className="section">지도 로딩 중...</div>;
    if (error) return <div className="section">지도 로드 에러: {error.message}</div>;

    const toggleMapLock = () => {
        setIsMapLocked(!isMapLocked);
    };

    return (
        <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="section"
        >
            <h2>오시는 길</h2>
            <div style={{textAlign: "center"}}>
                <div style={{textDecoration:"underline",marginBottom:"0.5rem"}}>수성스퀘어 3F 피오니홀</div>
                <div style={{marginBottom:"0.2rem"}}>대구광역시 수성구 용학로 92-4 수성스퀘어 3층</div>
                <div style={{marginBottom:"3rem"}}>
                    전화문의 : <a href="tel:053-755-5555" style={{textDecoration:"none",color:"black"}} >053-755-5555</a></div>
            </div>

            <div style={{ position: 'relative' }}>
                <Map
                    center={{ lat: 35.8252, lng: 128.6201 }}
                    style={{ width: '100%', height: '300px' }}
                    level={3}
                    draggable={!isMapLocked}
                    zoomable={!isMapLocked}
                >
                    <MapMarker position={{ lat: 35.8252, lng: 128.6201 }}>
                        <div style={{ padding: '3px', color: '#000' }}>수성스퀘어 3F 피오니홀</div>
                    </MapMarker>
                </Map>
                <button
                    onClick={toggleMapLock}
                    className={`map-lock-button ${isMapLocked ? '' : 'unlocked'}`}
                    title={isMapLocked ? '지도 잠금 해제' : '지도 잠금'}
                    style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        zIndex: 10,
                    }}
                >
                    {isMapLocked ? (
                        <svg className="lock-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    ) : (
                        <svg className="lock-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V7a4 4 0 018 0v4m4 0v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6a2 2 0 012-2h12a2 2 0 012 2z" />
                        </svg>
                    )}
                </button>
            </div>

            <div className="schedule-block">
                <div className="schedule-text">지하철</div>
                <div className="schedule-text">지상철 3호선 수성못역 하차 → 도보 10분</div>
            </div>

            <div className="schedule-block">
                <div className="schedule-text">버스</div>
                <div className="schedule-text">410-1, 401 (호텔수성 앞)
                    <br/> 또는
                    <br/> 수성1-1, 수성3-1, 814 (TBC방송국 앞) 하차</div>
            </div>

            <div className="schedule-block">
                <div className="schedule-text">자가용</div>
                <div className="schedule-text">수성구 용학로 106-7 → 수성스퀘어 주차장 (약 1,400대, 3시간 무료)</div>
            </div>

        </motion.section>
    );
};

export default ScheduleMap;