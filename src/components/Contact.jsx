import React from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
    const groomDetails = [
        { name: '신랑 홍길동', account: '010-1234-4567' },
        { name: '아버님 현빈', account: '010-1234-4567' },
        { name: '어머님 손예진', account: '010-1234-4567' },
    ];
    const brideDetails = [
        { name: '신부 홍길순', account: '010-1234-4567' },
        { name: '아버님 원빈', account: '010-1234-4567' },
        { name: '어머님 이나영', account: '010-1234-4567' },
    ];

    return (
        <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="section"
        >

            <h2>연락처</h2>
            <div className="card-container">
                <div className="card-group">
                    {groomDetails.map((detail, index) => (
                        <div key={index}>
                            <div className="contact-row">
                                <span className="contact-name">{detail.name}</span>
                                <div className="con-account-details">
                                    <a
                                        href={`tel:${detail.account}`}
                                        className="contact-button"
                                        title={`${detail.name}에게 전화 걸기`}
                                    >
                                        <svg className="contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </a>
                                    <a
                                        href={`sms:${detail.account}`}
                                        className="contact-button"
                                        title={`${detail.name}에게 메시지 보내기`}
                                    >
                                        <svg className="contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                            {index < groomDetails.length - 1 && <div className="light-separator" />}
                        </div>
                    ))}
                </div>
                <div className="card-group">
                    {brideDetails.map((detail, index) => (
                        <div key={index}>
                            <div className="contact-row">
                                <span className="contact-name">{detail.name}</span>
                                <div className="con-account-details">
                                    <a
                                        href={`tel:${detail.account}`}
                                        className="contact-button"
                                        title={`${detail.name}에게 전화 걸기`}
                                    >
                                        <svg className="contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </a>
                                    <a
                                        href={`sms:${detail.account}`}
                                        className="contact-button"
                                        title={`${detail.name}에게 메시지 보내기`}
                                    >
                                        <svg className="contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                            {index < brideDetails.length - 1 && <div className="light-separator" />}
                        </div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
};

export default Contact;