import { FormContext } from '@/contexts/form'
import { Text, Stack, Button, Title, Center, Textarea, Tooltip } from '@mantine/core'
import { ContextModalProps, useModals } from '@mantine/modals'
import { useRouter } from 'next/router'
import { useCallback, useContext, useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useSWRConfig } from 'swr'
import buttonStyles from '@/styles/button.module.css'
import { IdeaModalDefaultValues } from '@/types'

export type IdeaModalProps = {
    defaultValues?: IdeaModalDefaultValues
}

const states = {
    start: 'Оставить предложение',
    fetch: 'Отправка...',
    ok: 'Готово',
    error: 'Ошибка, еще раз?'
}

const formSchema = z.object({
    description: z.string().min(0).max(999),
    coords: z.object({
        lat: z.number(),
        lng: z.number(),
    }, { message: 'Добавьте точку' }),
})

export function IdeaModal({ context, id: modalId, innerProps }: ContextModalProps<IdeaModalProps>) {
    const { mutate } = useSWRConfig()
    const modals = useModals()
    const formContext = useContext(FormContext)

    const { handleSubmit, control, getValues, register, formState: { errors } } = useForm<z.infer<typeof formSchema>>({
        mode: 'onChange',
        resolver: zodResolver(formSchema),
        defaultValues: {
            ...innerProps.defaultValues,
            coords: formContext.data.coords,
        }
    })
    const [text, setText] = useState(states.start)
    const [coordReq, setCoordReq] = useState(false)

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        const { coords } = formContext.data

        setText(states.fetch)

        const body = JSON.stringify({
            content: data.description,
            feature: !Boolean(coords) ? {} : {
                type: 'Feature',
                properties: {},
                geometry: {
                    type: 'Point',
                    coordinates: [
                        coords?.lng,
                        coords?.lat,
                    ]
                }
            },
        })

        await fetch(
            `/api/collections/features/records`,
            {
                method: 'post',
                body,
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        )
            .then(async res => {
                const isResOk = res.status < 300

                setText(isResOk ? states.ok : states.error)

                if (!isResOk) { return }

                formContext.setData({})

                mutate(`/api/collections/features/records?perPage=1000`) // refetch points on map
                mutate('$inf$' + `/api/collections/features/records?page=1`) // refetch submission feed
                modals.closeModal(modalId)
                modals.openModal({
                    centered: true,
                    withCloseButton: false,
                    children: (
                        <Stack>
                            <Center>
                                <Title order={1}>
                                    <Text
                                        inherit
                                    >
                                        Спасибо!
                                    </Text>
                                </Title>
                            </Center>
                            <Center>
                                <Text
                                    size='xl'
                                    ta={'center'}
                                >
                                    Ваше предложение принято.
                                </Text>
                            </Center>
                        </Stack>
                    ),
                    onClose: () => modals.closeAll()
                })
            })
            .catch(async e => {
                setText(states.error)
                console.log(e)
            })
    }

    const onClickCoords = useCallback(
        () => {
            formContext.setData({
                ...formContext.data,
                ...getValues(),
            })
            modals.closeModal(modalId)
            formContext.setAddMode(true)
        },
        [formContext.data]
    )

    // close modal on route
    const router = useRouter()
    useEffect(() => {
        if (router.pathname == '/') {
            modals.closeAll()
        }
    }, [router.pathname])

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
        >
            <Stack
                gap={'lg'}
            >
                <Center>
                    <Title order={2}>
                        <Text
                            inherit
                        >
                            Ваше предложение
                        </Text>
                    </Title>
                </Center>

                <Controller
                    control={control}
                    name='description'
                    rules={{ required: true }}
                    render={({ field, formState }) => (
                        <Textarea
                            {...field}
                            required
                            rows={4}
                            // radius={'xl'}
                            size='lg'
                            color='secondary'
                            placeholder='Опишите ваше предложение *'
                            error={formState.errors.description?.message}
                            styles={{
                                input: {
                                    '--input-bd': 'var(--mantine-color-secondary-filled)',
                                },
                            }}
                        />
                    )}
                />

                <Tooltip
                    label='Точка добавлена'
                    opened={Boolean(formContext.data.coords)}
                    withArrow
                    bg={'secondary'}
                    offset={-18}
                    style={{
                        borderRadius: 6,
                    }}
                >
                    <Button
                        onClick={onClickCoords}
                        variant='outline'
                        disabled={Boolean(formContext.data.coords)}
                        color='secondary'
                        c={'black'}
                        className={buttonStyles.noiseless}
                    >
                        Добавить точку на карте
                    </Button>
                </Tooltip>
                {errors.coords && (
                    <Text
                        c='red'
                    >
                        {errors.coords.message}
                    </Text>
                )}
                <input
                    type='hidden'
                    {...register('coords')}
                />

                <Button
                    disabled={[states.fetch, states.ok].includes(text)}
                    type='submit'
                    bg='secondary'
                    c={'primary'}
                >
                    {text}
                </Button>
            </Stack>
        </form>
    )
}
