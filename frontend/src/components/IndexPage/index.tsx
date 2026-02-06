import { BackgroundImage, Box, Group, Space, Stack, Text, Title, Image, Button, Overlay } from '@mantine/core'
import Link from 'next/link'
import s from '../../styles/index.module.css'
import { useMedia } from 'react-use'
import { useModals } from '@mantine/modals'

const sponsors = [
    {
        src: '/sponsors/sb.png',
        href: 'https://sbor.ru/power/administration',
    },
    {
        src: '/sponsors/lenobl.png',
        href: 'https://www.govvrn.ru/',
    },
    {
        src: '/sponsors/urbanika.svg',
        href: 'https://www.urbanica.spb.ru',
    },
    {
        src: '/sponsors/rstm.svg',
        href: 'https://www.rosenergoatom.ru/index.html',
    },
    {
        src: '/sponsors/rosatom.svg',
        href: 'https://www.rosenergoatom.ru/index.html',
    },
    {
        src: '/sponsors/unit.svg',
        href: 'https://unit4.io',
    },
]

export function IndexPage() {
    const isMobile = useMedia('(max-width: 768px)', true)
    const isTablet = useMedia('(max-width: 1024px)', true)
    const modals = useModals()
    const openSurveyModal = () => {
        modals.openContextModal(
            'survey',
            {
                centered: true,
                size: 'min(100%, 900px)',
                withCloseButton: false,
                closeOnEscape: false,
                closeOnClickOutside: false,
                innerProps: {
                    defaultValues: {},
                },
            }
        )
    }
    return (
        <>
            <Space h={20} />
            <Box
                style={{
                    position: 'relative',
                    zIndex: 0,
                    overflow: 'visible',
                }}
            >
                {!isTablet && <div style={{ // картинка
                    position: 'absolute',
                    top: isMobile ? '-12.5%' : '-20%',
                    right: isMobile ? '-40%' : '-60%',
                    width: isMobile ? '150vw' : 'min(1239px * 1, 100vw)',
                    height: isMobile ? '125%' : 'min(1320px * 1, 120vw)',
                    background: 'url(/hero.png)',
                    aspectRatio: '1239 / 1320',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'contain',
                    borderRadius: '40px',
                    backgroundPosition: 'bottom center',
                }} />}
                {!isTablet && <div style={{ // картинка
                    position: 'absolute',
                    bottom: isMobile ? '0%' : '0%',
                    right: isMobile ? '-40%' : '10%',
                    width: isMobile ? '150vw' : 'min(339px * 1.5, 100vw)',
                    height: isMobile ? '125%' : 'min(137px * 1.5, 120vw)',
                    background: 'url(/wstar.png)',
                    aspectRatio: '339 / 137',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'contain',
                    borderRadius: '40px',
                    backgroundPosition: 'bottom center',
                }} />}
                <Stack
                    pt={isMobile ? '100px' : '150px'}
                    maw={'min(90vw, 1050px)'}
                    justify={'flex-start'}
                    gap={70}
                    style={{
                        position: 'relative',
                        zIndex: 201,
                    }}
                >
                    <Title
                        order={1}
                        ta={isMobile ? 'center' : null}
                        c='primary'
                        style={{
                            fontSize: isMobile ? 32 : '80px',
                            lineHeight: isMobile ? '40px' : '86px',
                            letterSpacing: '.05em',
                        }}
                    >
                        МАСТЕР-ПЛАН РАЗВИТИЯ
                        <br />
                        СОСНОВОГО БОРА
                    </Title>
                    <Text
                        pb={20}
                        maw={'min(100%, 660px)'}
                        c='white'
                    >
                        Уважаемые жители Соснового бора! Администрация городского округа совместно с госкорпорацией «Росатом» приступила к разработке Мастер-плана развития нашего города. Это масштабный проект, который определит принципы и направления развития Соснового бора на годы вперед.
                        <br /><br />
                        Чтобы план стал по-настоящему полезным и отразил интересы горожан, нам очень важно услышать ваше мнение. Что вас волнует? Что нужно улучшить в первую очередь? Каким вы видите Сосновый бор будущего?
                        <br /><br />
                        Поделитесь своими оценками, предложениями и пожеланиями в анонимной анкете. Это займет у вас не более 15 минут, а ваши искренние ответы станут основой для реальных изменений.
                        <br /><br />
                        Давайте вместе построим город, в котором хочется жить!
                    </Text>
                    <Group>
                        <Group
                            gap={30}
                            p={isMobile ? '24px 16px' : 2}
                            variant={isMobile ? null : 'noflip'}
                            style={{
                                // boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
                            }}
                        >
                            <Button
                                component={Link}
                                href='/map'
                                size={isMobile ? 'xl' : 'md'}
                                w={isMobile ? '100%' : 'fit-content'}
                                bg={'secondary'}
                            >
                                Карта идей
                            </Button>
                            <Button
                                onClick={openSurveyModal}
                                size={isMobile ? 'xl' : 'md'}
                                w='fit-content'
                                bg={'secondary'}
                                c='primary'
                            >
                                Пройти опрос
                            </Button>
                        </Group>
                        {/* <Text>
                            Опрос будет проходить с 23 ноября по 22 декабря
                        </Text> */}
                    </Group>
                </Stack>
            </Box >

            <Space
                h={80}
            />

            <Stack
                flex={'2 1 auto'}
                gap={isMobile ? 22 : 0}
                style={{
                    position: 'relative',
                }}
            >
                <span
                    id='timeline'
                    style={{
                        position: 'absolute',
                        top: '-180px',
                    }}
                />
                <Title
                    order={2}
                    ta={isMobile ? 'center' : null}
                >
                    ГРАФИК ПРОЕКТА
                </Title>
                <Image
                    src={isMobile ? 'indexRoadmapMobile.svg' : 'indexRoadmap.svg'}
                    alt=''
                />
            </Stack>

            <Space
                h={isMobile ? 80 : 60}
            />
            <Box
                style={{
                    position: 'relative',
                    overflow: 'visible',
                    zIndex: 1,
                    outlineOffset: 2,
                    outline: 'solid 2px var(--mantine-color-secondary-1)',
                    // boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
                }}
            >
                {!isTablet && (
                    <>
                        <div style={{ // картинка
                            position: 'absolute',
                            top: '0%',
                            right: '100%',
                            width: '100%',
                            height: '100%',
                            background: 'url(/star.svg)',
                            backgroundRepeat: 'no-repeat',
                            aspectRatio: '153 / 150',
                            transform: 'scale(3)',
                            backgroundSize: 'contain',
                            backgroundPosition: 'right bottom',
                            maxWidth: '153px',
                            maxHeight: '150px',
                            zIndex: -1,
                            opacity: .25,
                        }} />
                        <div style={{ // картинка
                            position: 'absolute',
                            top: '50%',
                            right: '-10%',
                            width: '100%',
                            height: '100%',
                            background: 'url(/star.svg)',
                            backgroundRepeat: 'no-repeat',
                            aspectRatio: '153 / 150',
                            backgroundSize: 'contain',
                            backgroundPosition: 'right bottom',
                            maxWidth: '153px',
                            maxHeight: '150px',
                            zIndex: -1,
                            opacity: .25,
                        }} />
                    </>
                )}
                <BackgroundImage
                    src={'/indexMap.jpg'}
                    bgr={'no-repeat'}
                    pos={'relative'}
                    // p={isMobile ? 8 : 28}
                    // pl={isMobile ? 8 : 19}
                    style={{
                        width: '100%',
                        aspectRatio: !isMobile && '1240 / 762',
                        backgroundSize: isMobile ? 'auto' : 'contain',
                    }}
                >
                    <Stack
                        align='flex-start'
                        justify='center'
                        variant='noflip'
                        h='100%'
                        maw={isTablet ? '100%' : 'min(100%, 500px)'}
                        p={isTablet ? 24 : 38}
                        bg={'rgba(255,255,255, 0.9)'}
                        style={{
                            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
                        }}
                    >
                        <Title
                            order={2}
                            c={'primary'}
                            mb={24}
                            ta={isTablet ? 'center' : null}
                            w={'100%'}
                            style={{
                                fontSize: isMobile ? undefined : '42px',
                            }}
                        >
                            ПОДЕЛИТЕСЬ<br /> СВОИМ МНЕНИЕМ
                        </Title>

                        <Text
                            fw={'bold'}
                            style={{
                                fontSize: 16,
                            }}
                        >
                            Выберите, что вы хотите отметить и укажите точку на карте, после чего оставьте комментарий<br /> во всплывающем окне.
                        </Text>
                        <Text
                            style={{
                                fontSize: 16,
                            }}
                        >
                            <b>Идеи и предложения</b>: Что может появиться в городе? Чего вам здесь не хватает? Что хочется изменить или наоборот, оставить как есть?
                        </Text>
                        <Text
                            style={{
                                fontSize: 16,
                            }}

                            mb={24}
                        >
                            <b>Проблемы</b>: Что вас беспокоит в городе? Какие трудности встречаются?
                        </Text>
                        <Group
                            p={6}
                            mx={'auto'}
                            style={{
                                // borderRadius: '40px',
                                // boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
                            }}
                        >
                            <Button
                                component={Link}
                                href='/map'
                                size={isMobile ? 'xl' : 'sm'}
                                bg={'secondary'}
                            >
                                Карта идей
                            </Button>
                        </Group>
                    </Stack>
                </BackgroundImage>
            </Box>

            <Space
                h={isMobile ? 80 : 160}
            />

            <Box
                style={{
                    position: 'relative',
                    overflow: 'visible',
                    zIndex: 0,
                }}
            >
                {!isTablet && <div style={{ // картинка
                    position: 'absolute',
                    top: '-10%',
                    right: '0%',
                    width: isMobile ? '150vw' : 'min(313px * 1, 100vw)',
                    height: isMobile ? '125%' : 'min(841px * 1, 150vw)',
                    background: 'url(/indexSurveyBlock.png)',
                    aspectRatio: '313 / 841',
                    transform: 'scale(1.5)',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'contain',
                    borderRadius: '40px',
                    backgroundPosition: 'bottom center',
                    borderBottomLeftRadius: 0,
                    borderTopRightRadius: 0,
                }} />}
                {!isTablet && <div style={{ // картинка
                    position: 'absolute',
                    top: '0%',
                    right: '20%',
                    width: isMobile ? '150vw' : 'min(276px * 1, 100vw)',
                    height: isMobile ? '125%' : 'min(280px * 1, 150vw)',
                    background: 'url(/dstar.png)',
                    aspectRatio: '276 / 280',
                    transform: 'scale(1.25)',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'contain',
                    borderRadius: '40px',
                    backgroundPosition: 'bottom center',
                    borderBottomLeftRadius: 0,
                    borderTopRightRadius: 0,
                }} />}
                <Box
                    style={{
                        position: 'relative',
                        zIndex: 0,
                        overflow: 'visible',
                    }}
                    pb={!isTablet && 100}
                >
                    {/* {!isTablet && (
                        <div style={{ // картинка
                            position: 'absolute',
                            bottom: '-20%',
                            right: '-20%',
                            // width: '100%',
                            // height: '100%',
                            background: 'url(/indexSurveyBlock.svg)',
                            backgroundRepeat: 'no-repeat',
                            aspectRatio: '1022 / 1225',
                            backgroundSize: 'contain',
                            backgroundPosition: 'right bottom',
                            maxWidth: '1022px',
                            maxHeight: '1225px',
                            zIndex: -1,
                        }} />
                    )} */}
                    <Stack
                        maw={'min(90vw, 900px)'}
                        // mih={'min(100vh, 900px)'}
                        justify='flex-start'
                        gap={70}
                        style={{
                            position: 'relative',
                            zIndex: 201,
                        }}
                    >
                        <Group
                            gap={isMobile ? '4rem' : '8rem'}
                            justify='space-between'
                        >
                            <Title
                                order={1}
                                ta={isMobile ? 'center' : null}
                            >
                                ЧТО ВЫ ХОТИТЕ <br /> ИЗМЕНИТЬ?
                            </Title>
                            <Group
                                p={6}
                                style={{
                                    // boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
                                }}
                            >
                                <Button
                                    onClick={openSurveyModal}
                                    size={isMobile ? 'xl' : 'sm'}
                                    bg='secondary'
                                >
                                    Пройти опрос
                                </Button>
                            </Group>
                        </Group>
                        <Text
                            pb={20}
                            maw={'min(100%, 850px)'}
                            c='white'
                        >
                            Эта платформа создана для обсуждения перспектив развития с горожанами, экспертами, предпринимателями, представителями культурных и образовательных учреждений перспектив развития Соснового бора.
                            <br /><br />
                            Нам важно узнать, что волнует жителей города и как, по их мнению, должен развиваться Сосновый бор в будущем. Предложения и пожелания жителей будут учтены при разработке Мастер-плана.
                            <br /><br />
                            Чем больше жителей города предложат свои идеи и предложения по улучшению жизни в своем городе, или, наоборот, озвучат его актуальные проблемы – тем более реализуемым и полезным для каждого жителя получится итоговый документ.
                            <br /><br />
                            Прохождение анкеты займет около 15 минут, анонимно.
                        </Text>
                    </Stack >
                </Box >

                {isTablet && (
                    <Space
                        h={isMobile ? 80 : 160}
                    />
                )}

                <Group
                    p={isMobile ? 50 : 70}
                    align={'center'}
                    justify='space-between'
                    bg={'secondary'}
                    style={{
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
                        position: 'relative',
                        zIndex: 0,
                        overflow: 'visible'
                    }}
                    wrap={'nowrap'}
                    gap={isMobile ? '80px' : '40px'}
                >
                    {sponsors.map(x => (
                        <Link
                            href={x.href}
                            key={x.src}
                            target='_blank'
                        >
                            <Image
                                src={x.src}
                                alt={x.href}
                                style={{
                                    maxHeight: 87,
                                }}
                            />
                        </Link>
                    ))
                    }
                </Group >
            </Box>
        </>
    )
}