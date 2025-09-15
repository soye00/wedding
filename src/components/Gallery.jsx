import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import { motion } from 'framer-motion';

const Gallery = ({ images = [
    { src: "/w1.jpg", alt: "사진1" },
    { src: "/w2.jpg", alt: "사진2" },
    { src: "/w3.jpg", alt: "사진3" },
    { src: "/w4.jpg", alt: "사진4" },
    { src: "/w5.jpg", alt: "사진5" },
    { src: "/w6.jpg", alt: "사진6" },
    { src: "/w7.jpg", alt: "사진7" },
    { src: "/w8.jpg", alt: "사진8" },
    { src: "/w9.jpg", alt: "사진9" },
] }) => {
    const [mainSwiper, setMainSwiper] = useState(null);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [activeThumbIndex, setActiveThumbIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalActiveIndex, setModalActiveIndex] = useState(0);
    const modalSwiperRef = useRef(null);

    // 썸네일 페이지당 이미지 수
    const THUMBS_PER_PAGE = 6;
    const totalPages = Math.ceil(images.length / THUMBS_PER_PAGE);

    const handleThumbClick = (index) => {
        if (mainSwiper) {
            mainSwiper.slideTo(index);
        }
        setActiveThumbIndex(index);
    };

    const handleThumbsChange = (swiper) => {
        const pageIndex = swiper.realIndex;
        const thumbIndex = pageIndex * THUMBS_PER_PAGE;
        if (thumbIndex < images.length && mainSwiper) {
            mainSwiper.slideTo(thumbIndex);
            setActiveThumbIndex(thumbIndex);
        }
    };

    // 모달
    const openModal = (index) => {
        setModalActiveIndex(index);
        if (modalSwiperRef.current && modalSwiperRef.current.swiper) {
            modalSwiperRef.current.swiper.slideTo(index);
        }
        setIsModalOpen(true);
    };

    const handleModalSlideChange = (swiper) => {
        const newIndex = swiper.realIndex;
        setModalActiveIndex(newIndex);
        if (mainSwiper) {
            mainSwiper.slideTo(newIndex);
            setActiveThumbIndex(newIndex);
        }
    };

    const closeModal = () => {
        if (mainSwiper) {
            mainSwiper.slideTo(modalActiveIndex);
            setActiveThumbIndex(modalActiveIndex);
        }
        setIsModalOpen(false);
    };

    // 모달 콘텐츠 클릭 시 전파 방지
    const handleModalContentClick = (e) => {
        if (e && typeof e.stopPropagation === 'function') {
            e.stopPropagation();
        }
    };

    return (
        <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="section"
        >
            <h2>갤러리</h2>
            <div className="gallery-container">

                <div className="main-image-wrapper">
                    <Swiper
                        modules={[Thumbs]}
                        spaceBetween={10}
                        slidesPerView={1}
                        thumbs={{ swiper: thumbsSwiper }}
                        onSwiper={setMainSwiper}
                        className="main-swiper"
                        onClick={(swiper) => openModal(swiper.realIndex)}
                    >
                        {images.map((image, index) => (
                            <SwiperSlide key={index}>
                                <img src={image.src} alt={image.alt} className="main-image" />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* 썸네일 */}
                <div className="thumbs-wrapper">
                    <Swiper
                        modules={[Pagination]}
                        spaceBetween={8}
                        slidesPerView={THUMBS_PER_PAGE}
                        slidesPerGroup={THUMBS_PER_PAGE}
                        pagination={{
                            clickable: true,
                            dynamicBullets: true,
                            dynamicMainBullets: 3,
                            el: '.custom-pagination',
                        }}
                        onSwiper={setThumbsSwiper}
                        onSlideChange={handleThumbsChange}
                        className="thumbs-swiper"
                        breakpoints={{
                            768: {
                                slidesPerView: THUMBS_PER_PAGE,
                                slidesPerGroup: THUMBS_PER_PAGE,
                            },
                        }}
                    >
                        {images.map((image, index) => (
                            <SwiperSlide key={index}>
                                <div
                                    className={`thumb-slide ${activeThumbIndex === index ? 'active' : ''}`}
                                    onClick={() => handleThumbClick(index)}
                                >
                                    <img src={image.src} alt={image.alt} className="thumb-image" />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                <div className="custom-pagination"></div>

                {/* 모달 */}
                {isModalOpen && (
                    <div className="modal-overlay" onClick={closeModal}>
                        <div className="modal-content" onClick={handleModalContentClick}>
                            <button className="modal-close" onClick={closeModal}>×</button>
                            <Swiper
                                ref={modalSwiperRef}
                                modules={[Pagination]}
                                spaceBetween={0}
                                slidesPerView={1}
                                pagination
                                className="modal-swiper"
                                initialSlide={modalActiveIndex}
                                onSlideChange={handleModalSlideChange}
                            >
                                {images.map((image, index) => (
                                    <SwiperSlide key={index}>
                                        <img src={image.src} alt={image.alt} className="modal-image" />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                )}
            </div>
        </motion.section>
    );
};

export default Gallery;