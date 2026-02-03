import type { AppProps } from 'next/app'
import { AppShell, Box, Burger, Button, Center, createTheme, Drawer, Fieldset, Flex, Group, MantineColorsTuple, MantineProvider, Space, Stack, Text, Title } from '@mantine/core'
import Link from 'next/link'
import { NextSeo } from 'next-seo'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'
import { ModalsProvider, useModals } from '@mantine/modals'
import { IdeaModal } from '@/components/IdeaModal'
import { SurveyModal } from '@/components/SurveyModal'
import { MapProvider } from 'react-map-gl/maplibre'
import { useRouter } from 'next/router'
import { SWRConfig } from 'swr'
import { NavbarContext, NavbarContextProvider } from '@/contexts/navbar'
import { useContext } from 'react'
import { SubmissionFeed } from '@/components/SubmissionFeed'
import { Golos_Text, Manrope } from 'next/font/google'
const fontVar = Golos_Text({ weight: ['400', '700'], subsets: ['latin', 'cyrillic'] })
import mobileMenu from '../styles/mobileMenu.module.css'
import groupStyles from '../styles/group.module.css'
import textStyles from '../styles/text.module.css'
import titleStyles from '../styles/title.module.css'
import buttonStyles from '../styles/button.module.css'
import appShellStyles from '../styles/appShell.module.css'

import '@mantine/core/styles.css'
import { FormContextProvider } from '@/contexts/form'

const theme = createTheme({
    colors: {
        primary: Array(10).fill('#34488D') as unknown as MantineColorsTuple,
        secondary: Array(10).fill('#A6CA9F') as unknown as MantineColorsTuple,
        third: Array(10).fill('#AF404B') as unknown as MantineColorsTuple,
        black: Array(10).fill('#1E1928') as unknown as MantineColorsTuple,
    },
    defaultRadius: 40,
    headings: {
        fontWeight: '600',
        sizes: {
            h1: {
                fontSize: '60px',
                lineHeight: '80px',
            },
            h2: {
                fontSize: '48px',
                lineHeight: '48px',
            },
        },
    },
    components: {
        AppShell: AppShell.extend({
            styles: {
                root: fontVar.style,
            },
        }),
        Title: Title.extend({
            styles: {
                root: {
                    ...fontVar.style,
                    fontWeight: '400',
                },
            },
            classNames: titleStyles
        }),
        Text: Text.extend({
            classNames: textStyles,
            defaultProps: {
                size: '20px',
            },
            styles: {
                root: {
                    color: '#1E1928CC',
                    lineHeight: '28px',
                },
            }
        }),
        Button: Button.extend({
            defaultProps: {
                radius: 'xl',
                c: 'white',
            },
            styles: {
                root: {
                    minHeight: 64,
                },
                label: {
                    fontSize: '20px',
                    lineHeight: '20px',
                    padding: '0px 30px',
                    fontWeight: 700,
                },
            },
            classNames: buttonStyles
        }),
        Group: Group.extend({
            classNames: groupStyles,
        }),
        Fieldset: Fieldset.extend({
            styles: {
                legend: {
                    fontWeight: 'bold',
                }
            }
        })
    },
    fontSizes: {
        lg: '20px',
        xs: '14px',
        base: '14px',
    },
    lineHeights: {
        lg: '29px',
        xs: '18px',
        base: '18px',
    },
})

const navButtons = [
    {
        text: 'График проекта',
        href: '/#timeline',
    },
    {
        text: 'Карта идей',
        href: '/map',
    },
    {
        text: 'Пройти опрос',
        href: 'https://anketolog.ru/service/survey/fill/direct/984771/uU1n2c9K',
    },
]

const MapPageLayout = ({ children }: { children: React.ReactNode }) => {
    const [opened, { toggle }] = useDisclosure()
    const { selected, drawer, setDrawer } = useContext(NavbarContext)
    const isMobile = useMediaQuery('(max-width: 768px)', true)
    const isTablet = useMediaQuery('(max-width: 1024px)', true)
    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure()
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
        <AppShell
            className={fontVar.className}
            header={{
                height: isMobile ? 108 : 160,
            }}

            // mantine nav is always left and asied always right, so navigation is in Mantine.Aside
            aside={{ width: '100%', breakpoint: 'lg', collapsed: { desktop: true, mobile: !mobileOpened } }}
            navbar={{ width: !drawer ? 400 : 0, breakpoint: 'lg', collapsed: { desktop: false, mobile: !drawer } }}
        >
            <AppShell.Header
                withBorder={false}
                style={{
                    // position: 'sticky',
                    background: 'transparent',
                }}
                px={isTablet ? 16 : 102}
                maw={1440}
                mx={'auto'}
            >
                <Center
                    bg={'white'}
                    style={{
                        borderBottomLeftRadius: isMobile ? 35 : 50,
                        borderBottomRightRadius: isMobile ? 35 : 50,
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
                        backgroundColor: 'white',
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
                            {/* <Image
                                src={'/logo.svg'}
                                alt=''
                                width={isMobile ? 34 : 88}
                                height={isMobile ? 38 : 96}
                            /> */}
                            <Text
                                lh={'27px'}
                                fw={'700'}
                                style={{
                                    fontSize: isMobile ? undefined : 42,
                                    fontFamily: 'LXGW Marker Gothic, sans-serif',
                                }}
                                variant='subtle'
                                component={Link}
                                href={'/'}
                                c='primary'
                            >
                                УДОМЛЯ
                            </Text>
                        </Flex>
                        <Burger
                            opened={mobileOpened}
                            onClick={toggleMobile}
                            hiddenFrom='lg' // 'md'
                            size='sm'
                            color={'black'}
                            ml={'auto'}
                        />
                        <Group
                            component={'nav'}
                            gap={0}
                            visibleFrom='lg'// 'md'
                            variant='noflip'
                            wrap='nowrap'
                        >
                            {navButtons.map(x => (
                                <Button
                                    key={x.text}
                                    component={Link}
                                    href={x.href}
                                    variant='transparent'
                                    c='primary'
                                    styles={{
                                        label: {
                                            fontSize: '24px',
                                            fontFamily: 'BebasNeue, sans-serif',
                                        },
                                    }}
                                    className={buttonStyles.noiseless}
                                >
                                    {x.text}
                                </Button>
                            ))}
                        </Group>
                    </Group>
                </Center>
            </AppShell.Header>

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
                hiddenFrom='lg' // 'md'
                size='compact-xs'
                c='primary'
                bg='white'
                style={{
                    position: 'absolute',
                    top: '8rem',
                    left: 0,
                    zIndex: 10,
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
                }}
                className={buttonStyles.noiseless}
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
                    // m={16}
                    mr={0}
                    py='md'
                    bg='white'
                    style={{
                        // borderTopLeftRadius: 50,
                        // borderBottomLeftRadius: 50,
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
                    }}
                >
                    {navButtons.map(x => (
                        <Button
                            key={x.href}
                            component={Link}
                            href={x.href}
                            variant='subtle'
                            c='primary'
                            className={buttonStyles.noiseless}
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
        </AppShell>
    )
}

const PageLayout = ({ children }: { children: React.ReactNode }) => {
    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure()
    const router = useRouter()

    const isMapPage = router.pathname == '/map'
    const isIndexPage = router.pathname == '/'

    const isMobile = useMediaQuery('(max-width: 768px)')
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

            <AppShell.Header
                withBorder={false}
                style={{
                    position: 'sticky',
                }}
                px={isMobile ? 16 : 102}
                maw={1440}
                mx={'auto'}
            >
                <Center
                    style={{
                        borderBottomLeftRadius: isMobile ? 35 : 50,
                        borderBottomRightRadius: isMobile ? 35 : 50,
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
                        backgroundColor: 'white',
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
                            {/* <Image
                                src={'/logo.svg'}
                                alt=''
                                width={isMobile ? 34 : 88}
                                height={isMobile ? 38 : 96}
                            /> */}
                            <Text
                                lh={'27px'}
                                fw={'700'}
                                style={{
                                    fontSize: isMobile ? undefined : 42,
                                    fontFamily: 'LXGW Marker Gothic, sans-serif',
                                }}
                                variant='subtle'
                                component={Link}
                                href={'/'}
                                c='primary'
                            >
                                УДОМЛЯ
                            </Text>
                        </Flex>
                        <Burger
                            opened={mobileOpened}
                            onClick={toggleMobile}
                            hiddenFrom='lg' // 'md'
                            size='sm'
                            color={'black'}
                            ml={'auto'}
                        />
                        <Group
                            component={'nav'}
                            gap={0}
                            visibleFrom='lg' // 'md'
                            variant='noflip'
                            wrap='nowrap'
                        >
                            {navButtons.map(x => (
                                <Button
                                    key={x.text}
                                    component={Link}
                                    href={x.href}
                                    variant='transparent'
                                    c='primary'
                                    styles={{
                                        label: {
                                            fontSize: '24px',
                                            fontFamily: 'BebasNeue, sans-serif',
                                        },
                                    }}
                                    className={buttonStyles.noiseless}
                                >
                                    {x.text}
                                </Button>
                            ))}
                        </Group>
                    </Group>
                </Center>
            </AppShell.Header>

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
                        {/* <Image
                            src={'/logo.svg'}
                            alt=''
                            width={isMobile ? 34 : 88}
                            height={isMobile ? 38 : 96}
                        /> */}
                        <Text
                            lh={'27px'}
                            fw={'700'}
                            style={{
                                fontFamily: 'LXGW Marker Gothic, sans-serif',
                            }}
                            variant='subtle'
                            component={Link}
                            href={'/'}
                            c={'primary'}
                        >
                            УДОМЛЯ
                        </Text>
                    </Flex>
                    <Drawer.CloseButton />
                </Drawer.Header>
                <Drawer.Body>
                    <Stack>
                        {navButtons.map(x => (
                            <Button
                                key={x.text}
                                component={Link}
                                href={x.href}
                                variant='subtle'
                                c='primary'
                                size='md'
                                onClick={toggleMobile}
                                // @ts-ignore
                                {...x.props}
                                className={buttonStyles.noiseless}
                                style={{
                                    fontFamily: 'BebasNeue, sans-serif',
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
                    {/* <ModalsProvider modals={{ idea: IdeaModal, survey: SurveyModal }}>
                    </ModalsProvider> */}
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
                            @Udomla-masterplan

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
                            Copyright © 2025 design unit 4 & creators
                        </Text>
                    </Group>
                </Center>
            </AppShell.Main>

            {/* <AppShell.Footer
                withBorder={false}
                // visibleFrom='lg'
                style={{
                    position: 'relative',
                    bottom: 0,
                }}
            >
                
            </AppShell.Footer> */}
        </AppShell>
    )
}

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <NextSeo
                title="МАСТЕР-ПЛАН РАЗВИТИЯ УДОМЛИ"
                description="Приветствуем вас на сайте, посвящённом разработке мастер-плана города Удомля."
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
