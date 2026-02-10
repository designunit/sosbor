'use client'

import { BackgroundImage, Box, Button, Group, Space, Stack, Text, Title } from '@mantine/core'
import Link from 'next/link'
import { useMediaQuery } from '@mantine/hooks'

export function MapCTA() {
    const isMobile = useMediaQuery('(max-width: 768px)', true)
    const isTablet = useMediaQuery('(max-width: 1024px)', true)

    return (
        <>
            <Space h={isMobile ? 80 : 60} />
            <Box
                style={{
                    position: 'relative',
                    overflow: 'visible',
                    zIndex: 1,
                    outlineOffset: 2,
                    outline: 'solid 2px var(--mantine-color-secondary-1)',
                }}
            >
                {!isTablet && (
                    <>
                        <div style={{
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
                        <div style={{
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
                    style={{
                        width: '100%',
                        aspectRatio: !isMobile ? '1240 / 762' : undefined,
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
                            ta={isTablet ? 'center' : undefined}
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
        </>
    )
}
