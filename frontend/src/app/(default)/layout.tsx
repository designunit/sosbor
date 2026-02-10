'use client'

import { AppShell, Box, Button, Center, Drawer, Flex, Group, Stack, Text } from '@mantine/core'
import Link from 'next/link'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'
import { useOpenSurveyModal } from '@/hooks/useOpenSurveyModal'
import { Header } from '@/components/Header'
import { mobileMenu, appShellStyles } from '@/theme'
import { navButtons } from '@/lib/navigation'

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure()
    const isMobile = useMediaQuery('(max-width: 768px)')
    const openSurveyModal = useOpenSurveyModal()

    return (
        <AppShell
            header={{
                height: 0,
            }}
        >
            <Header
                height={0}
                position='sticky'
                mobileOpened={mobileOpened}
                toggleMobile={toggleMobile}
                onSurveyClick={openSurveyModal}
            />

            <Drawer
                withCloseButton={false}
                opened={mobileOpened}
                onClose={toggleMobile}
                classNames={{
                    close: mobileMenu.close,
                    header: mobileMenu.header,
                }}
                styles={{
                    body: {
                        padding: 0,
                    }
                }}
            >
                <Drawer.Header
                    p='14px 26px'
                >
                    <Flex gap={20} align={'center'}>
                        <Text
                            lh={'27px'}
                            fw={'700'}
                            style={{
                                fontFamily: 'Nasalization, sans-serif',
                            }}
                            variant='subtle'
                            component={Link}
                            href={'/'}
                            c={'primary'}
                        >
                            СОСНОВЫЙ БОР
                        </Text>
                    </Flex>
                    <Drawer.CloseButton />
                </Drawer.Header>
                <Drawer.Body>
                    <Stack>
                        {navButtons.map(x => x.href ? (
                            <Button
                                key={x.text}
                                component={Link}
                                href={x.href}
                                variant='subtle'
                                c='primary'
                                size='md'
                                onClick={toggleMobile}
                                {...x.props}
                                style={{
                                    fontFamily: 'Nasalization, sans-serif',
                                    outline: 'none',
                                }}
                            >
                                {x.text}
                            </Button>
                        ) : (
                            <Button
                                key={x.text}
                                variant='subtle'
                                c='primary'
                                size='md'
                                onClick={() => {
                                    toggleMobile()
                                    openSurveyModal()
                                }}
                                {...x.props}
                                style={{
                                    fontFamily: 'Nasalization, sans-serif',
                                    outline: 'none',
                                }}
                            >
                                {x.text}
                            </Button>
                        ))}
                    </Stack>
                </Drawer.Body>
            </Drawer>

            <AppShell.Main
                style={{
                    position: 'relative',
                    overflowX: 'hidden',
                    overflowY: 'hidden',
                }}
                className={appShellStyles.root}
            >
                <div className={appShellStyles.filter} />
                <Box
                    w={'100%'}
                    maw={1440}
                    mx={'auto'}
                    px={{
                        base: 20,
                        sm: 100,
                    }}
                >
                    {children}
                </Box>
                <Center py={36}
                    style={{
                        position: 'relative',
                        zIndex: 1,
                    }}
                >
                    <Group
                        w={'100%'}
                        maw={1440}
                        px={{ base: 20, lg: 100 }}
                        py={{ base: 26, lg: 54 }}
                        justify={'space-between'}
                        wrap='wrap'
                    >
                        <Text
                            fs={'16px'}
                            lh={'20px'}
                            fw={'500'}
                            c='white'
                        >
                            Мастер-план Сосновоборского городского округа
                        </Text>
                        <Text
                            fs={'16px'}
                            lh={'20px'}
                            fw={'500'}
                            c='white'
                            style={{
                                textAlign: isMobile ? 'center' : undefined,
                            }}
                        >
                            Copyright © 2026 design unit 4 & creators
                        </Text>
                    </Group>
                </Center>
            </AppShell.Main>
        </AppShell>
    )
}
