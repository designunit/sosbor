"use client"

import { AppShell, Button, Stack } from "@mantine/core"
import { useDisclosure, useMediaQuery } from "@mantine/hooks"
import Link from "next/link"
import { Suspense, useContext } from "react"
import { Header } from "@/components/Header"
import { SubmissionFeed } from "@/components/SubmissionFeed"
import { NavbarContext } from "@/contexts/navbar"
import { useOpenSurveyModal } from "@/hooks/useOpenSurveyModal"
import { navButtons } from "@/lib/navigation"

export default function MapLayout({ children }: { children: React.ReactNode }) {
    const { drawer, setDrawer } = useContext(NavbarContext)
    const isMobile = useMediaQuery("(max-width: 768px)", true)
    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure()
    const openSurveyModal = useOpenSurveyModal()

    return (
        <AppShell
            header={{
                height: isMobile ? 90 : 120,
            }}
            aside={{ width: "100%", breakpoint: "lg", collapsed: { desktop: true, mobile: !mobileOpened } }}
            navbar={{ width: !drawer ? 400 : 0, breakpoint: "lg", collapsed: { desktop: false, mobile: !drawer } }}
        >
            <Header
                height={isMobile ? 90 : 120}
                mobileOpened={mobileOpened}
                toggleMobile={toggleMobile}
                onSurveyClick={openSurveyModal}
            />

            <AppShell.Navbar
                component="aside"
                style={{
                    transition: "width 0.2s ease, transform 0.2s ease",
                    overflow: "hidden",
                }}
            >
                <Suspense fallback={null}>
                    <SubmissionFeed />
                </Suspense>
            </AppShell.Navbar>

            <Button
                onClick={() => setDrawer(!drawer)}
                hiddenFrom="lg"
                size="compact-xs"
                c="secondary"
                bg="white"
                style={{
                    position: "absolute",
                    top: "8rem",
                    left: 0,
                    zIndex: 10,
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
                }}
            >
                Предложения
            </Button>

            <AppShell.Aside
                component={"nav"}
                style={{
                    background: "transparent",
                }}
            >
                <Stack
                    h={"100%"}
                    mr={0}
                    py="md"
                    bg="white"
                    style={{
                        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
                    }}
                >
                    {navButtons.map((x) =>
                        x.href ? (
                            <Button
                                key={x.href}
                                component={Link}
                                href={x.href}
                                variant="subtle"
                                c="primary"
                                style={{
                                    outline: "none",
                                }}
                                onClick={toggleMobile}
                            >
                                {x.text}
                            </Button>
                        ) : (
                            <Button
                                key={x.text}
                                onClick={() => {
                                    openSurveyModal()
                                    toggleMobile()
                                }}
                                variant="subtle"
                                c="primary"
                                style={{
                                    outline: "none",
                                }}
                            >
                                {x.text}
                            </Button>
                        ),
                    )}
                </Stack>
            </AppShell.Aside>

            <AppShell.Main
                pt={0}
                style={{
                    display: "flex",
                    justifyContent: "stretch",
                    alignItems: "stretch",
                }}
            >
                {children}
            </AppShell.Main>
        </AppShell>
    )
}
