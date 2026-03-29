"use client"

import { Avatar, Center, Group, Menu, Text } from "@mantine/core"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { getPocketBase, logoutSuperuser } from "@/lib/pocketbase"

export function AdminHeader() {
    const router = useRouter()
    const [email, setEmail] = useState<string | null>(null)

    useEffect(() => {
        const pb = getPocketBase()
        if (pb.authStore.isValid) {
            const model = pb.authStore.record
            const userEmail = model?.email as string | undefined
            setEmail(userEmail ?? null)
        }
    }, [])

    const handleLogout = (): void => {
        logoutSuperuser()
        router.push("/login")
    }

    return (
        <Center
            style={{
                borderBottomLeftRadius: 35,
                borderBottomRightRadius: 35,
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
                background: "var(--mantine-color-secondary-1)",
                border: "solid 2px white",
                borderTop: "solid 2px transparent",
            }}
        >
            <Group w="100%" px={{ base: 24, sm: 40 }} py={{ base: 6, sm: 10 }} justify="space-between" wrap="nowrap">
                <Text
                    lh="27px"
                    fw={700}
                    fz={34}
                    component={Link}
                    href="/"
                    c="white"
                    style={{ fontFamily: "nasalization, sans-serif" }}
                >
                    СОСНОВЫЙ{"\u00A0"}БОР
                </Text>
                {email && (
                    <Menu position="bottom-end" withArrow>
                        <Menu.Target>
                            <Avatar
                                style={{ cursor: "pointer" }}
                                color="white"
                                variant="filled"
                                bg="var(--mantine-color-secondary-3)"
                            >
                                {email.charAt(0).toUpperCase()}
                            </Avatar>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Label>{email}</Menu.Label>
                            <Menu.Item color="red" onClick={handleLogout}>
                                Выйти
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                )}
            </Group>
        </Center>
    )
}
