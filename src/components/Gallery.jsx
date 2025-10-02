import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import { motion } from 'framer-motion';

const Gallery = ({
                     images = [
                         { src: '/w1.webp', alt: '사진1' },
                         { src: '/w2.webp', alt: '사진2' },
                         { src: '/w3.webp', alt: '사진3' },
                         { src: '/w4.webp', alt: '사진4' },
                         { src: '/w5.webp', alt: '사진5' },
                         { src: '/w6.webp', alt: '사진6' },
                         { src: '/w7.webp', alt: '사진7' },
                         { src: '/w8.webp', alt: '사진8' },
                         { src: '/w9.webp', alt: '사진9' },
                     ],
                 }) => {
    const [mainSwiper, setMainSwiper] = useState(null);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [activeThumbIndex, setActiveThumbIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalActiveIndex, setModalActiveIndex] = useState(0);
    const modalSwiperRef = useRef(null);

    // 썸네일 페이지당 이미지 수
    const THUMBS_PER_PAGE = 6;

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
                {/* 메인 Swiper */}
                <div className="main-image-wrapper">
                    <Swiper
                        modules={[Thumbs]}
                        spaceBetween={10}
                        slidesPerView={1}
                        thumbs={{ swiper: thumbsSwiper }}
                        onSwiper={setMainSwiper}
                        className="main-swiper"
                        onClick={(swiper) => openModal(swiper.realIndex)}
                        lazyPreloadPrevNext={4}
                    >
                        {images.map((image, index) => (
                            <SwiperSlide key={index}>
                                <img
                                    data-src={image.src}
                                    src={index === 0 ? image.src : image.src}
                                    alt={image.alt}
                                    className="main-image swiper-lazy"
                                    loading={index === 0 ? "eager" : "lazy"} // 첫 슬라이드는 lazy제외
                                    width="800"
                                    height="600"
                                />
                                <div className="swiper-lazy-preloader"></div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* 썸네일 Swiper */}
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
                        lazyPreloadPrevNext={6}
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
                                    <img
                                        data-src={image.src}
                                        src={index < THUMBS_PER_PAGE ? image.src : image.src}
                                        alt={image.alt}
                                        className="thumb-image swiper-lazy"
                                        loading={index < THUMBS_PER_PAGE ? "eager" : "lazy"}
                                        width="100"
                                        height="100"
                                    />
                                    <div className="swiper-lazy-preloader"></div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                <div className="custom-pagination"></div>

                {/* 모달 Swiper */}
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
                                lazyPreloadPrevNext={2}
                            >
                                {images.map((image, index) => (
                                    <SwiperSlide key={index}>
                                        <img
                                            data-src={image.src}
                                            src={image.src}
                                            alt={image.alt}
                                            className="modal-image swiper-lazy"
                                            loading="lazy"
                                            width="1200"
                                            height="800"
                                        />
                                        <div className="swiper-lazy-preloader"></div>
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