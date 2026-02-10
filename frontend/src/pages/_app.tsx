import type { AppProps } from 'next/app'
import { AppShell, Box, Button, Center, Drawer, Flex, Group, MantineProvider, Stack, Text } from '@mantine/core'
import Link from 'next/link'
import { NextSeo } from 'next-seo'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'
import { ModalsProvider } from '@mantine/modals'
import { IdeaModal } from '@/components/IdeaModal'
import { SurveyModal } from '@/components/SurveyModal'
import { MapProvider } from 'react-map-gl/maplibre'
import { useRouter } from 'next/router'
import { SWRConfig } from 'swr'
import { NavbarContext, NavbarContextProvider } from '@/contexts/navbar'
import { useContext } from 'react'
import { SubmissionFeed } from '@/components/SubmissionFeed'

import '@mantine/core/styles.css'
import { FormContextProvider } from '@/contexts/form'

import { theme, fontVar, mobileMenu, appShellStyles } from '@/theme'
import { navButtons } from '@/lib/navigation'
import { useOpenSurveyModal } from '@/hooks/useOpenSurveyModal'
import { Header } from '@/components/Header'

const MapPageLayout = ({ children }: { children: React.ReactNode }) => {
    const { drawer, setDrawer } = useContext(NavbarContext)
    const isMobile = useMediaQuery('(max-width: 768px)', true)
    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure()
    const openSurveyModal = useOpenSurveyModal()

    return (
        <AppShell
            className={fontVar.className}
            header={{
                height: isMobile ? 108 : 160,
            }}

            // mantine nav is always left and asied always right, so navigation is in Mantine.Aside
            aside={{ width: '100%', breakpoint: 'lg', collapsed: { desktop: true, mobile: !mobileOpened } }}
            navbar={{ width: !drawer ? 400 : 0, breakpoint: 'lg', collapsed: { desktop: false, mobile: !drawer } }}
        >
            <Header
                height={isMobile ? 108 : 160}
                mobileOpened={mobileOpened}
                toggleMobile={toggleMobile}
                onSurveyClick={openSurveyModal}
            />

            <AppShell.Navbar
                component='aside'
                style={{
                    transition: 'width 0.2s ease, transform 0.2s ease',
                    overflow: 'hidden',
                }}
            >
                <SubmissionFeed />
            </AppShell.Navbar>

            <Button
                onClick={() => setDrawer(!drawer)}
                hiddenFrom='lg'
                size='compact-xs'
                c='secondary'
                bg='white'
                style={{
                    position: 'absolute',
                    top: '8rem',
                    left: 0,
                    zIndex: 10,
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
                }}
            >
                Предложения
            </Button>

            <AppShell.Aside
                component={'nav'}
                style={{
                    background: 'transparent',
                }}
            >
                <Stack
                    h={'100%'}
                    mr={0}
                    py='md'
                    bg='white'
                    style={{
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
                    }}
                >
                    {navButtons.map(x => x.href ? (
                        <Button
                            key={x.href}
                            component={Link}
                            href={x.href}
                            variant='subtle'
                            c='primary'
                            style={{
                                outline: 'none',
                            }}
                            onClick={toggleMobile}
                        >
                            {x.text}
                        </Button>
                    ) : (
                        <Button
                            key={x.href}
                            onClick={() => {
                                openSurveyModal()
                                toggleMobile()
                            }}
                            variant='subtle'
                            c='primary'
                            style={{
                                outline: 'none',
                            }}
                        >
                            {x.text}
                        </Button>
                    ))}
                </Stack>
            </AppShell.Aside>

            <AppShell.Main
                pt={0}
                style={{
                    display: 'flex',
                    justifyContent: 'stretch',
                    alignItems: 'stretch',
                }}
            >
                {children}
            </AppShell.Main>
        </AppShell >
    )
}

const PageLayout = ({ children }: { children: React.ReactNode }) => {
    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure()
    const router = useRouter()

    const isMapPage = router.pathname == '/map'

    const isMobile = useMediaQuery('(max-width: 768px)')
    const openSurveyModal = useOpenSurveyModal()

    if (isMapPage) {
        return (
            <MapPageLayout>
                {children}
            </MapPageLayout>
        )
    }

    return (
        <AppShell
            className={fontVar.className}
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

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <NextSeo
                title="Мастер-план Сосновоборского городского округа"
                description="Приветствуем вас на сайте, посвящённом разработке мастер-плана Соснового бора."
            />
            <SWRConfig
                value={{
                    fetcher: (resource, init) => fetch(resource, init).then(res => res.json()),
                }}
            >
                <MapProvider>
                    <FormContextProvider>
                        <NavbarContextProvider>
                            <MantineProvider theme={theme}>
                                <ModalsProvider
                                    modals={{
                                        idea: IdeaModal,
                                        survey: SurveyModal,
                                    }}
                                >
                                    <PageLayout>
                                        <Component {...pageProps} />
                                    </PageLayout>
                                </ModalsProvider>
                            </MantineProvider>
                        </NavbarContextProvider>
                    </FormContextProvider>
                </MapProvider>
            </SWRConfig>
        </>
    )
}
