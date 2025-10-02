import React from 'react';
import { motion } from 'framer-motion';

const Introduction = () => {
    return (
        <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="section"
        >

            <h2>결혼합니다</h2>
            <div className="intro-container">
                <div style={{textAlign: "center"}}>
                    <div>두 사람이 사랑으로 만나</div>
                    <div>진실과 이해로써 하나를 이루려 합니다</div>
                    <div>이 두 사람을 지성으로 아끼고 돌봐주신</div>
                    <div>여러 어른과 친지분들을 모시고</div>
                    <div>서약을 맺고자 하오니</div>
                    <div>바쁘신 가운데 두 사람의 장래를</div>
                    <div>가까이에서 축복해 주시면 고맙겠습니다</div>
                </div>

                <div className="intro-item">
                    <div>
                        <img src="/bi.webp" alt="신랑" />
                        <p>현빈 손예진 의 장남</p>
                        <p>신랑 : <b>홍길동</b></p>
                    </div>
                    <div>
                        <img src="/bu.webp" alt="신부" />
                        <p>원빈 이나영의 차녀</p>
                        <p>신부 : <b>홍길순</b></p>
                    </div>

                </div>
            </div>
        </motion.section>
    );
};

export default Introduction;