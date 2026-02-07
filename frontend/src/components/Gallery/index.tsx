import { ActionIcon, CloseButton, Image, Modal } from '@mantine/core'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import s from '../../styles/index.module.css'
import { useDisclosure } from '@mantine/hooks'
import { useState } from 'react'
import NextImage from 'next/image'
import { useMedia } from 'react-use'

function PrevButton() {
    const swiper = useSwiper()

    return (
        <ActionIcon
            size={68}
            radius={12}
            style={{
                background: 'linear-gradient(129.54deg, #8000FF 15.57%, #0E165E 95.03%)',
            }}
            onClick={() => swiper.slideNext()}
        >
            <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 3L3.32575 9.15634C2.70826 9.54929 2.70825 10.4507 3.32575 10.8437L13 17" stroke="#FEFEFE" strokeWidth="5" strokeLinecap="round" />
            </svg>
        </ActionIcon>
    )
}

export type GalleryProps = {
    galleryImages: any[]
}

export function Gallery({ galleryImages }: GalleryProps) {
    const [imageOpened, { toggle: close, open }] = useDisclosure()
    const [image, setImage] = useState(0)
    const isMobile = useMedia('(max-width: 576px)', false)
    return (
        <>
            <Swiper
                spaceBetween={isMobile ? 30 : 30 + (68 / 2)}
                slidesPerView={isMobile ? 2.01 : 2.5}
                autoHeight
                loop
                slidesOffsetBefore={isMobile ? 10 : 68 / 2}
                className={s.swiper}
                centeredSlides={isMobile}
                onClick={(swiper, e) => {
                    setImage((swiper.clickedIndex) % galleryImages.length)
                    open()
                }}
            >
                {galleryImages.map((x: any, i: number) => (
                    <SwiperSlide
                        key={x.src}
                    >
                        {({ isActive, isNext }) => (
                            <Image
                                src={x.src}
                                alt=''
                                h={'100%'}
                                className={`${s.slide} ${(isMobile ? isActive : isNext) ? s.slideActive : ''}`}
                            />
                        )}

                    </SwiperSlide>
                ))}
                {!isMobile && (
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: 0,
                        transform: 'translate(0%, -50%)',
                        zIndex: 1,
                    }}>
                        <PrevButton />
                    </div>
                )}
            </Swiper>

            <Modal
                centered
                size={'auto'}
                fullScreen={isMobile}
                opened={imageOpened}
                onClose={() => null}
                withCloseButton={false}
                overlayProps={{
                    backgroundOpacity: .75,
                }}
                // this shit autoclicks on second img opening
                // onClick={(e) => {
                //     console.log('modal')
                //     if (imageOpened) {
                //         close()
                //     }
                // }}
                styles={{
                    content: {
                        background: 'transparent',
                        border: 'none',
                        borderRadius: 0,
                        overflow: 'hidden',
                        position: 'relative',
                        height: '100%',
                        width: '100%',
                        boxShadow: 'none',
                    },
                    body: {
                        padding: 0,
                        height: '100%',
                        display: 'flex',
                        background: 'transparent',
                        border: 'none',
                        borderRadius: 0,
                        transform: 'scale(1.01)',
                    }
                }}
            >
                <CloseButton
                    style={{
                        position: 'fixed',
                        top: 8,
                        right: 8,
                        zIndex: 2,
                        color: 'white',
                        background: 'linear-gradient(129.54deg, #8000FF 15.57%, #0E165E 95.03%)',
                    }}
                    onClick={() => {
                        close()
                    }}
                />
                <Image
                    component={NextImage}
                    src={galleryImages[image].src}
                    alt=''
                    fill
                    objectFit='contain'
                />
            </Modal>
        </>
    )
}
