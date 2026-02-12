"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Center, Stack, Text, Textarea, Title, Tooltip } from "@mantine/core"
import type { ContextModalProps } from "@mantine/modals"
import { useModals } from "@mantine/modals"
import { usePathname } from "next/navigation"
import { useContext, useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { useSWRConfig } from "swr"
import { z } from "zod"
import { API } from "@/api"
import { FormContext } from "@/contexts/form"
import buttonStyles from "@/styles/button.module.css"
import type { IdeaModalDefaultValues } from "@/types"

export type IdeaModalProps = {
    defaultValues?: IdeaModalDefaultValues
}

const states = {
    start: "Оставить предложение",
    fetch: "Отправка...",
    ok: "Готово",
    error: "Ошибка, еще раз?",
}

const formSchema = z.object({
    description: z.string().min(0).max(999),
    coords: z.object(
        {
            lat: z.number(),
            lng: z.number(),
        },
        { error: "Добавьте точку" },
    ),
})

export function IdeaModal({ id: modalId, innerProps }: ContextModalProps<IdeaModalProps>) {
    const { mutate } = useSWRConfig()
    const modals = useModals()
    const formContext = useContext(FormContext)

    const {
        handleSubmit,
        control,
        getValues,
        register,
        formState: { errors },
    } = useForm<z.infer<typeof formSchema>>({
        mode: "onChange",
        resolver: zodResolver(formSchema),
        defaultValues: {
            ...innerProps.defaultValues,
            coords: formContext.data.coords,
        },
    })
    const [text, setText] = useState(states.start)

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        const { coords } = formContext.data

        setText(states.fetch)

        const body = JSON.stringify({
            content: data.description,
            feature: !coords
                ? {}
                : {
                      type: "Feature",
                      properties: {},
                      geometry: {
                          type: "Point",
                          coordinates: [coords?.lng, coords?.lat],
                      },
                  },
        })

        await fetch(API.features, {
            method: "post",
            body,
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(async (res) => {
                const isResOk = res.status < 300

                setText(isResOk ? states.ok : states.error)

                if (!isResOk) {
                    return
                }

                formContext.setData({})

                mutate(`${API.features}?perPage=1000`) // refetch points on map
                mutate(`$inf$${API.features}?page=1`) // refetch submission feed
                modals.closeModal(modalId)
                modals.openModal({
                    centered: true,
                    withCloseButton: false,
                    children: (
                        <Stack>
                            <Center>
                                <Title order={1}>
                                    <Text inherit>Спасибо!</Text>
                                </Title>
                            </Center>
                            <Center>
                                <Text size="xl" ta={"center"}>
                                    Ваше предложение принято.
                                </Text>
                            </Center>
                        </Stack>
                    ),
                    onClose: () => modals.closeAll(),
                })
            })
            .catch(async (e) => {
                setText(states.error)
                console.error("IdeaModal submission failed:", e)
            })
    }

    const onClickCoords = () => {
        formContext.setData({
            ...formContext.data,
            ...getValues(),
        })
        modals.closeModal(modalId)
        formContext.setAddMode(true)
    }

    // close modal on route
    const pathname = usePathname()
    useEffect(() => {
        if (pathname === "/") {
            modals.closeAll()
        }
    }, [pathname, modals])

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={"lg"}>
                <Center>
                    <Title order={2}>
                        <Text inherit>Ваше предложение</Text>
                    </Title>
                </Center>

                <Controller
                    control={control}
                    name="description"
                    rules={{ required: true }}
                    render={({ field, formState }) => (
                        <Textarea
                            {...field}
                            required
                            rows={4}
                            // radius={'xl'}
                            size="lg"
                            color="secondary"
                            placeholder="Опишите ваше предложение *"
                            error={formState.errors.description?.message}
                            styles={{
                                input: {
                                    "--input-bd": "var(--mantine-color-secondary-filled)",
                                },
                            }}
                        />
                    )}
                />

                <Tooltip
                    label="Точка добавлена"
                    opened={Boolean(formContext.data.coords)}
                    withArrow
                    bg={"secondary"}
                    offset={-18}
                    style={{
                        borderRadius: 6,
                    }}
                >
                    <Button
                        onClick={onClickCoords}
                        variant="outline"
                        disabled={Boolean(formContext.data.coords)}
                        color="secondary"
                        c={"black"}
                        className={buttonStyles.root}
                    >
                        Добавить точку на карте
                    </Button>
                </Tooltip>
                {errors.coords && <Text c="red">{errors.coords.message}</Text>}
                <input type="hidden" {...register("coords")} />

                <Button disabled={[states.fetch, states.ok].includes(text)} type="submit" bg="secondary" c={"primary"}>
                    {text}
                </Button>
            </Stack>
        </form>
    )
}
