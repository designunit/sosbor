'use client'

import { AppShell, Burger, Button, Center, Flex, Group, Text } from '@mantine/core'
import Link from 'next/link'
import { useMediaQuery } from '@mantine/hooks'
import { navButtons, scrollToHash } from '@/lib/navigation'
import type { MouseEvent } from 'react'

export type HeaderProps = {
    height: number
    position?: 'sticky' | undefined
    mobileOpened: boolean
    toggleMobile: () => void
    onSurveyClick: () => void
    navButtonColor?: string
}

export function Header({ height, position, mobileOpened, toggleMobile, onSurveyClick, navButtonColor = 'white' }: HeaderProps) {
    const isMobile = useMediaQuery('(max-width: 768px)', true)
    const isTablet = useMediaQuery('(max-width: 1024px)', true)

    return (
        <AppShell.Header
            withBorder={false}
            style={{
                position: position,
                background: height === 0 ? undefined : 'transparent',
            }}
            px={isTablet ? 16 : 102}
            maw={1440}
            mx={'auto'}
        >
            <Center
                bg={'secondary'}
                style={{
                    borderBottomLeftRadius: isMobile ? 35 : 50,
                    borderBottomRightRadius: isMobile ? 35 : 50,
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
                    background: 'var(--mantine-color-secondary-1)',
                    border: 'solid 2px white',
                    borderTop: 'solid 2px transparent',
                }}
            >
                <Group
                    w={'100%'}
                    px={{ base: 36, sm: 52 }}
                    py={{ base: 14, sm: 30 }}
                    gap={isMobile ? 20 : 80}
                    variant='noflip'
                    justify='space-between'
                    wrap='nowrap'
                >
                    <Flex gap={20} align={'center'}>
                        <Text
                            lh={'27px'}
                            fw={'700'}
                            style={{
                                fontSize: isMobile ? undefined : 34,
                            }}
                            variant='subtle'
                            component={Link}
                            href={'/'}
                            c='white'
                        >
                            СОСНОВЫЙ БОР
                        </Text>
                    </Flex>
                    <Burger
                        opened={mobileOpened}
                        onClick={toggleMobile}
                        hiddenFrom='lg'
                        size='sm'
                        color={'white'}
                        ml={'auto'}
                    />
                    <Group
                        component={'nav'}
                        gap={0}
                        visibleFrom='lg'
                        variant='noflip'
                        wrap='nowrap'
                    >
                        {navButtons.map(x => x.href ? (
                            <Button
                                key={x.text}
                                component={Link}
                                href={x.href}
                                onClick={x.href.includes('#') ? (e: MouseEvent) => scrollToHash(x.href!, e) : undefined}
                                variant='transparent'
                                c={navButtonColor}
                                styles={{
                                    label: {
                                        fontSize: '20px',
                                        fontFamily: 'nasalization, sans-serif',
                                    },
                                }}
                            >
                                {x.text}
                            </Button>
                        ) : (
                            <Button
                                key={x.text}
                                onClick={onSurveyClick}
                                variant='transparent'
                                c={navButtonColor}
                                styles={{
                                    label: {
                                        fontSize: '20px',
                                        fontFamily: 'nasalization, sans-serif',
                                    },
                                }}
                            >
                                {x.text}
                            </Button>
                        ))}
                    </Group>
                </Group>
            </Center>
        </AppShell.Header>
    )
}
