"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Alert, Button, Center, PasswordInput, Stack, TextInput, Title } from "@mantine/core"
import { useRouter } from "next/navigation"
import type { ReactElement } from "react"
import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { getPocketBase, loginAsSuperuser } from "@/lib/pocketbase"

const loginSchema = z.object({
    email: z.string().email("Введите корректный email"),
    password: z.string().min(1, "Введите пароль"),
})

type LoginFormData = z.infer<typeof loginSchema>

export function LoginPageContent(): ReactElement {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    })

    useEffect(() => {
        if (getPocketBase().authStore.isValid) {
            router.push("/export")
        }
    }, [router])

    const onSubmit = async (data: LoginFormData): Promise<void> => {
        setLoading(true)
        setError(null)
        try {
            await loginAsSuperuser(data.email, data.password)
            setLoading(false)
            router.push("/export")
        } catch (err) {
            setLoading(false)
            setError(err instanceof Error ? err.message : "Ошибка входа")
        }
    }

    return (
        <Center mih="calc(100vh - 120px)">
            <Stack maw={400} w="100%">
                <Title order={2}>Вход для суперпользователя</Title>
                {error && (
                    <Alert color="red" title="Ошибка">
                        {error}
                    </Alert>
                )}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack>
                        <Controller
                            control={control}
                            name="email"
                            render={({ field }) => (
                                <TextInput {...field} label="Email" type="email" error={errors.email?.message} />
                            )}
                        />
                        <Controller
                            control={control}
                            name="password"
                            render={({ field }) => (
                                <PasswordInput {...field} label="Пароль" error={errors.password?.message} />
                            )}
                        />
                        <Button type="submit" loading={loading}>
                            Войти
                        </Button>
                    </Stack>
                </form>
            </Stack>
        </Center>
    )
}
