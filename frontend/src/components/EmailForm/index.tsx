import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Center, Group, Overlay, Stack, Text, Textarea, TextInput, Title } from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const states = {
    start: "Отправить вопрос",
    fetch: "Отправка...",
    ok: "Готово",
    error: "Ошибка, еще раз?",
}

const formSchema = z.object({
    name: z.string().min(1, "Имя обязательно").max(40, "Слишком длинное имя"),
    email: z.string().email("Некорректная почта"),
    text: z.string().min(1, "Сообщение обязательно").max(999, "Слишком длинное сообщение"),
})

export function EmailForm() {
    const isMobile = useMediaQuery("(max-width: 1024px)") ?? false
    const { handleSubmit, register, formState } = useForm<z.infer<typeof formSchema>>({
        mode: "onChange",
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            text: "",
        },
    })
    const [text, setText] = useState(states.start)

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setText(states.fetch)

        const dataFormatted = JSON.stringify(data)

        await fetch(`/api/indexFeedback`, {
            method: "post",
            body: dataFormatted,
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(async (res) => {
                setText(res.ok ? states.ok : states.error)

                if (!res.ok) {
                    return
                }
            })
            .catch(async (e) => {
                setText(states.error)
                console.error("EmailForm submission failed:", e)
            })
    }

    return (
        <Group
            component={"form"}
            onSubmit={handleSubmit(onSubmit)}
            p={{
                base: "lg",
                sm: "46px 80px",
            }}
            style={{
                borderRadius: 22,
            }}
            justify="space-between"
            align={"stretch"}
            wrap="nowrap"
            gap={isMobile ? 48 : 48 * 2}
            pos={"relative"}
        >
            <span
                id="feedback"
                style={{
                    position: "absolute",
                    top: isMobile ? -100 : -160,
                }}
            />
            <Stack maw={500} flex={"0 1 50%"} c="white" gap={isMobile ? 42 : 62}>
                <Title order={2}>У Вас все еще есть вопросы?</Title>
                <Text
                    lh={1.2}
                    fw={"bold"}
                    c="white"
                    style={{
                        fontSize: isMobile ? "1.2em " : "1.5em",
                    }}
                >
                    Вы можете написать нам письмо, воспользовавшись формой обратной связи.
                </Text>
                <Title order={2} component={Text} fw={"normal"} c="white">
                    Ждем Ваши идеи
                    <br />
                    <span
                        style={{
                            fontSize: "1.2em",
                        }}
                    >
                        до конца июля 2024 года
                    </span>
                </Title>
            </Stack>
            <Stack flex={"0 1 50%"} pos={"relative"}>
                {text === states.ok && (
                    <Overlay
                        color="var(--mantine-color-secondary-filled)"
                        backgroundOpacity={1}
                        style={{
                            borderRadius: 22,
                            transform: "scale(1.05)",
                        }}
                    >
                        <Center
                            style={{
                                height: "100%",
                            }}
                        >
                            <Title component={"span"} c="white">
                                {states.ok}
                            </Title>
                        </Center>
                    </Overlay>
                )}
                <TextInput
                    placeholder="Ваше имя"
                    {...register("name")}
                    radius={"xl"}
                    size="lg"
                    error={formState.errors.name?.message}
                />
                <TextInput
                    placeholder="Ваша электронная почта"
                    {...register("email")}
                    radius={"xl"}
                    size="lg"
                    error={formState.errors.email?.message}
                />
                <Textarea
                    placeholder="Ваш вопрос"
                    {...register("text")}
                    radius={"xl"}
                    size="lg"
                    error={formState.errors.text?.message}
                    rows={4}
                    h="100%"
                    styles={{
                        wrapper: {
                            height: "100%",
                        },
                        input: {
                            height: "100%",
                            "--input-bd": "var(--mantine-color-secondary-filled)",
                        },
                    }}
                />
                <Button
                    disabled={[states.fetch, states.ok].includes(text)}
                    type="submit"
                    bg={"white"}
                    w="fit-content"
                    ml={"auto"}
                    style={{
                        flex: "1 0 auto",
                    }}
                >
                    {text}
                </Button>
            </Stack>
        </Group>
    )
}
