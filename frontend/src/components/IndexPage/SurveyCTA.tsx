'use client'

import { Box, Button, Group, Space, Stack, Text, Title } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { useOpenSurveyModal } from '@/hooks/useOpenSurveyModal'

export function SurveyCTA() {
    const isMobile = useMediaQuery('(max-width: 768px)', true)
    const isTablet = useMediaQuery('(max-width: 1024px)', true)
    const openSurveyModal = useOpenSurveyModal()

    return (
        <>
            <Space h={isMobile ? 80 : 160} />
            <Box
                style={{
                    position: 'relative',
                    overflow: 'visible',
                    zIndex: 0,
                }}
            >
                {!isTablet && <div style={{
                    position: 'absolute',
                    top: '-10%',
                    right: '0%',
                    width: 'min(313px * 1, 100vw)',
                    height: 'min(841px * 1, 150vw)',
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
                {!isTablet && <div style={{
                    position: 'absolute',
                    top: '0%',
                    right: '20%',
                    width: 'min(276px * 1, 100vw)',
                    height: 'min(280px * 1, 150vw)',
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
                    pb={!isTablet ? 100 : undefined}
                >
                    <Stack
                        maw={'min(90vw, 900px)'}
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
                                ta={isMobile ? 'center' : undefined}
                            >
                                ЧТО ВЫ ХОТИТЕ <br /> ИЗМЕНИТЬ?
                            </Title>
                            <Group p={6}>
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
                    </Stack>
                </Box>

                {isTablet && (
                    <Space h={isMobile ? 80 : 160} />
                )}
            </Box>
        </>
    )
}
