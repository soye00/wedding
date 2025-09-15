import React, { useState } from 'react';
import { motion } from 'framer-motion';

const AccountInfo = () => {
    const [openStates, setOpenStates] = useState({});


    const groomDetails = [
        { name: '신랑 홍길동', account: '국민은행 123-456789-123' },
        { name: '부) 현빈', account: 'IM뱅크 123-456789-123' },
        { name: '모) 손예진', account: '신한은행 123-456789-123' },
    ];
    const brideDetails = [
        { name: '신부 홍길순', account: '카카오뱅크 123-456789-123' },
        { name: '부) 원빈', account: '우리은행 123-456789-123' },
        { name: '모) 이나영', account: '하나은행 123-456789-123' },
    ];


    const handleCopy = (account) => {
        navigator.clipboard.writeText(account);
        alert('계좌번호가 복사되었습니다!');
    };


    const toggleAccount = (index) => {
        setOpenStates((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    return (
        <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="section"
        >
            <h2>축하의 마음 전하기</h2>
            <div style={{textAlign: 'center', marginBottom:"2rem"}}>
                <div>축하의 마음을 담아 축의금을 전달해 보세요</div>
                <div>복사 버튼을 클릭해 계좌번호를 복사할 수 있습니다</div>
            </div>

            <div className="card-container">
                <div className="card-group">
                    {groomDetails.map((detail, index) => (
                        <div key={index}>
                            <div className="account-toggle" onClick={() => detail.account && toggleAccount(index)}>
                                <p>{detail.name}</p>
                                {detail.account && (openStates[index] ? '︿' : '﹀')}
                            </div>
                            {detail.account && openStates[index] && (
                                <>
                                    <div className="light-separator"></div>
                                    <div className="account-details">
                                        <p className="account-details-text">{detail.account}</p>
                                        <button className="copy-button" onClick={() => handleCopy(detail.account)}>
                                            복사
                                        </button>
                                    </div>
                                </>
                            )}
                            <div className="separator"></div>
                        </div>
                    ))}
                </div>
                <div className="card-group" >

                    {brideDetails.map((detail, index) => (
                        <div key={index + groomDetails.length}>
                            <div className="account-toggle" onClick={() => detail.account && toggleAccount(index + groomDetails.length)}>
                                <p>{detail.name}</p>
                                {detail.account && (openStates[index + groomDetails.length] ? '﹀' : '︿')}
                            </div>
                            {detail.account && openStates[index + groomDetails.length] && (
                                <>
                                    <div className="light-separator"></div>
                                    <div className="account-details">
                                        <p className="account-details-text">{detail.account}</p>
                                        <button className="copy-button" onClick={() => handleCopy(detail.account)}>
                                            복사
                                        </button>
                                    </div>
                                </>
                            )}
                            <div className="separator"></div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
};

export default AccountInfo;