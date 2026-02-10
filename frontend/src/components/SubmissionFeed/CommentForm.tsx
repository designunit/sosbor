import { zodResolver } from '@hookform/resolvers/zod'
import { Stack, Button, Textarea } from '@mantine/core'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import type { KeyedMutator } from 'swr'
import { z } from 'zod'
import s from './index.module.css'
import type { Submission } from '@/types/submission'

type CommentFormProps = {
    id: string
    mutate: KeyedMutator<Submission[]>
}

const states = {
    start: 'Оставить комментарий',
    fetch: 'Отправка...',
    error: 'Ошибка, еще раз?'
}

const formSchema = z.object({
    comment: z.string().min(0, { message: 'Комментарий не может быть пустым' }).max(200, { message: 'Комментарий не может быть больше 200 символов' }),
})

export function CommentForm({ id, mutate }: CommentFormProps) {
    const { handleSubmit, control, reset, } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: 'onChange',
    })
    const [text, setText] = useState(states.start)

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setText(states.fetch)

        const dataFormatted = {
            submission: id,
            content: data.comment,
            _status: 'published',
        }

        const body = JSON.stringify(dataFormatted)

        await fetch(
            `/api/comments`,
            {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body,
            }
        )
            .then(async res => {
                if (res.ok) {
                    setText(states.start)
                    reset({ comment: '' })
                    mutate()
                }
                else {
                    setText(states.error)
                }
            })
            .catch(async e => {
                setText(states.error)
                console.error('Comment submission failed:', e)
            })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack>
                <Controller
                    control={control}
                    name='comment'
                    rules={{ required: true }}
                    render={({ field, formState }) => (
                        <Textarea
                            {...field}
                            required
                            placeholder='Ваш комментарий'
                            error={formState.errors.comment?.message}
                            radius='lg'
                            styles={{
                                input: {
                                    '--input-bd': 'var(--mantine-color-secondary-filled)',
                                }
                            }}
                        />
                    )}
                />

                <Button
                    fullWidth
                    disabled={[states.fetch].includes(text)}
                    type='submit'
                    c='white'
                    classNames={{
                        label: s.submitCommentButton,
                    }}
                >
                    {text}
                </Button>
            </Stack>
        </form>
    )
}
