"use client"

import {
    Box,
    Button,
    Center,
    CloseButton,
    Fieldset,
    Group,
    SegmentedControl,
    Select,
    Slider,
    Space,
    Stack,
    Tabs,
    Text,
    Textarea,
    Title,
} from "@mantine/core"
import type { ContextModalProps } from "@mantine/modals"
import { useModals } from "@mantine/modals"
import Image from "next/image"
import { useCallback, useRef, useState } from "react"
import type { UseFormReturn } from "react-hook-form"
import { Controller, useForm, useWatch } from "react-hook-form"
import { API } from "@/api"
import type { SurveyFormData, SurveySchemaItem, TabProps } from "@/types"
import { CheckboxList } from "./CheckboxList"
import { CheckboxWithOther } from "./CheckboxWithOther"

const states = {
    start: "Отправить ответ",
    fetch: "Отправка...",
    ok: "Готово",
    error: "Ошибка, еще раз?",
}

type SchemaToComponentsProps = {
    schema: SurveySchemaItem[]
    formHook: UseFormReturn<SurveyFormData>
    renderFilter?: Record<string, boolean>
}
function SchemaToComponents({ schema, formHook, renderFilter = {} }: SchemaToComponentsProps) {
    const { control, setValue, watch, register } = formHook // passed from parent cause it needed for filter
    return schema
        .filter((item) => renderFilter?.[item.id] ?? true)
        .map((item) => {
            switch (item.type) {
                case "select": {
                    return (
                        <Controller
                            name={item.id}
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    value={typeof field.value === "string" ? field.value : null}
                                    label={item.text}
                                    data={item.data ?? []}
                                    description={item?.description}
                                    styles={{
                                        wrapper: {
                                            "--input-bd-focus": "var(--mantine-color-secondary-0)",
                                        },
                                    }}
                                />
                            )}
                        />
                    )
                }
                case "checkboxOther": {
                    return (
                        <Controller
                            name={item.id}
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <CheckboxWithOther
                                    field={field}
                                    setValue={setValue}
                                    watch={watch}
                                    label={item.text}
                                    description={item?.description}
                                    maxValues={item?.maxValues}
                                    data={item.data ?? []}
                                />
                            )}
                        />
                    )
                }
                case "textarea": {
                    return (
                        <Stack>
                            {item.id === "a7b52f44-cc92-4df5-bf26-f45a66fe5cb0" && (
                                <div
                                    style={{
                                        overflow: "hidden",
                                    }}
                                >
                                    <Image
                                        src={"/question.jpg"}
                                        alt=""
                                        width={2950}
                                        height={2741}
                                        style={{
                                            width: "100%",
                                            height: "auto",
                                            aspectRatio: "2950 / 2741",
                                            scale: 1.5,
                                        }}
                                    />
                                </div>
                            )}
                            <Textarea
                                {...register(item.id, { required: item?.required ?? true })}
                                label={item.text}
                                rows={item?.rows ?? 3}
                                description={item?.description}
                                styles={{
                                    wrapper: {
                                        "--input-bd-focus": "var(--mantine-color-secondary-0)",
                                    },
                                }}
                            />
                        </Stack>
                    )
                }
                case "selectList": {
                    return (
                        <Fieldset legend={item.text} variant="filled">
                            <Stack>
                                {(item.list ?? []).map((listItem: string, index: number) => (
                                    <Controller
                                        key={listItem}
                                        name={`${item.id}-${index}`}
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                value={typeof field.value === "string" ? field.value : null}
                                                label={listItem}
                                                styles={{
                                                    label: {
                                                        fontWeight: "lighter",
                                                    },
                                                    wrapper: {
                                                        "--input-bd-focus": "var(--mantine-color-secondary-0)",
                                                    },
                                                }}
                                                data={item.data ?? []}
                                            />
                                        )}
                                    />
                                ))}
                            </Stack>
                        </Fieldset>
                    )
                }
                case "sliderList": {
                    return (
                        <Fieldset
                            legend={item.text}
                            variant="filled"
                            styles={{
                                legend: {
                                    fontWeight: "bold",
                                },
                            }}
                        >
                            <Text
                                c="dimmed"
                                style={{
                                    fontSize: "unset",
                                }}
                            >
                                {item?.description}
                            </Text>
                            <Stack>
                                {(item.list ?? []).map((listItem: string, index: number) => (
                                    <Controller
                                        key={listItem}
                                        name={`${item.id}-${index}`}
                                        control={control}
                                        // rules={{ required: true }}
                                        render={({ field }) => (
                                            <Box my="md">
                                                <Text
                                                    style={{
                                                        fontSize: "unset",
                                                    }}
                                                >
                                                    {listItem}
                                                </Text>
                                                <Slider
                                                    {...field}
                                                    value={typeof field.value === "number" ? field.value : 0}
                                                    step={1}
                                                    min={0}
                                                    max={(item.marks ?? []).length - 1}
                                                    defaultValue={0}
                                                    marks={(item.marks ?? []).map((x: number) => ({
                                                        value: x,
                                                        label: String(x),
                                                    }))}
                                                    label={null}
                                                    styles={{
                                                        root: {
                                                            "--slider-color": "var(--mantine-color-secondary-0)",
                                                        },
                                                    }}
                                                />
                                            </Box>
                                        )}
                                    />
                                ))}
                            </Stack>
                        </Fieldset>
                    )
                }
                case "checkboxList": {
                    return (
                        <Controller
                            name={item.id}
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <CheckboxList
                                    field={field}
                                    watch={watch}
                                    label={item.text}
                                    description={item?.description}
                                    maxValues={item?.maxValues}
                                    data={item.data ?? []}
                                />
                            )}
                        />
                    )
                }
                case "toggle": {
                    return (
                        <Controller
                            name={item.id}
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <Stack gap={2}>
                                    <Text fw={500} size="sm">
                                        {item.text}
                                    </Text>
                                    {item.description && (
                                        <Text c="dimmed" size="xs">
                                            {item.description}
                                        </Text>
                                    )}
                                    <SegmentedControl
                                        {...field}
                                        value={typeof field.value === "string" ? field.value : ""}
                                        data={item.data ?? []}
                                        color="secondary"
                                    />
                                </Stack>
                            )}
                        />
                    )
                }
                default: {
                    console.log("schema map invalid item. id:", item?.id)
                    return null
                }
            }
        })
}

function Tab1({ schema, onSubmit, submitText, onSubmitData }: TabProps): React.ReactElement {
    const formHook = useForm()
    const { handleSubmit, control } = formHook
    const onSubmitWrapped = async (data: SurveyFormData) => {
        if (questoin0Value === "Нет") {
            onSubmitData?.(data)
            return
        }
        onSubmit?.(data)
    }

    const [questoin0Value] = useWatch({
        control,
        name: [schema[0].id],
    })

    const renderFilter = {
        [schema[1].id]: questoin0Value === "Да",
        [schema[2].id]: questoin0Value === "Нет",
        [schema[3].id]: questoin0Value === "Нет",
    }

    return (
        <form onSubmit={handleSubmit(onSubmitWrapped)}>
            <Stack>
                <SchemaToComponents schema={schema.slice(0, 4)} formHook={formHook} renderFilter={renderFilter} />
                <Group align="flex-start">
                    <Button type="submit" disabled={submitText === states.fetch} bg="secondary">
                        {questoin0Value === "Нет" ? submitText : "Следующий раздел"}
                    </Button>
                </Group>
            </Stack>
        </form>
    )
}

function Tab2({ schema, onSubmit = () => {}, setTabIndex }: TabProps): React.ReactElement {
    const formHook = useForm()
    const { handleSubmit } = formHook
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack>
                <SchemaToComponents schema={schema.slice(4, 10)} formHook={formHook} />

                <Group align="flex-start">
                    <Button onClick={() => setTabIndex?.((x) => x - 1)} bg="secondary">
                        Предыдущий раздел
                    </Button>
                    <Button type="submit" bg="secondary">
                        Следующий раздел
                    </Button>
                </Group>
            </Stack>
        </form>
    )
}

function Tab3({ schema, onSubmit = () => {}, setTabIndex }: TabProps): React.ReactElement {
    const formHook = useForm()
    const { handleSubmit } = formHook
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack>
                <SchemaToComponents schema={schema.slice(10, 16)} formHook={formHook} />

                <Group align="flex-start">
                    <Button onClick={() => setTabIndex?.((x) => x - 1)} bg="secondary">
                        Предыдущий раздел
                    </Button>
                    <Button type="submit" bg="secondary">
                        Следующий раздел
                    </Button>
                </Group>
            </Stack>
        </form>
    )
}

function Tab4({ schema, onSubmit = () => {}, setTabIndex }: TabProps): React.ReactElement {
    const formHook = useForm()
    const { handleSubmit, control } = formHook

    const [questoinValue] = useWatch({
        control,
        name: [schema[24].id],
    })

    const renderFilter = {
        [schema[25].id]: questoinValue === "Никогда",
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack>
                <SchemaToComponents schema={schema.slice(16, 19)} formHook={formHook} renderFilter={renderFilter} />

                <Group align="flex-start">
                    <Button onClick={() => setTabIndex?.((x) => x - 1)} bg="secondary">
                        Предыдущий раздел
                    </Button>
                    <Button type="submit" bg="secondary">
                        Следующий раздел
                    </Button>
                </Group>
            </Stack>
        </form>
    )
}

function Tab5({ schema, onSubmit = () => {}, setTabIndex }: TabProps): React.ReactElement {
    const formHook = useForm()
    const { handleSubmit, control } = formHook

    const [questoinValue] = useWatch({
        control,
        name: [schema[24].id],
    })

    const renderFilter = {
        [schema[25].id]: [
            "Ежедневно",
            "Несколько раз в неделю",
            "Несколько раз в месяц",
            "Несколько раз за полгода",
            "Реже 1-2 раз в год",
        ].includes(questoinValue),
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack>
                <SchemaToComponents schema={schema.slice(19, 28)} formHook={formHook} renderFilter={renderFilter} />

                <Group align="flex-start">
                    <Button onClick={() => setTabIndex?.((x) => x - 1)} bg="secondary">
                        Предыдущий раздел
                    </Button>
                    <Button type="submit" bg="secondary">
                        Следующий раздел
                    </Button>
                </Group>
            </Stack>
        </form>
    )
}

function Tab6({ schema, onSubmit = () => {}, setTabIndex }: TabProps): React.ReactElement {
    const formHook = useForm()
    const { handleSubmit, control } = formHook

    const [questoinValue] = useWatch({
        control,
        name: [schema[28].id],
    })

    const renderFilter = {
        [schema[29].id]: ["Да, планирую уехать через 1–2 года", "Да, хотел(-а) бы уехать в будущем"].includes(
            questoinValue,
        ),
        [schema[30].id]: ["Да, планирую уехать через 1–2 года", "Да, хотел(-а) бы уехать в будущем"].includes(
            questoinValue,
        ),
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack>
                <SchemaToComponents schema={schema.slice(28, 34)} formHook={formHook} renderFilter={renderFilter} />

                <Group align="flex-start">
                    <Button onClick={() => setTabIndex?.((x) => x - 1)} bg="secondary">
                        Предыдущий раздел
                    </Button>
                    <Button type="submit" bg="secondary">
                        Следующий раздел
                    </Button>
                </Group>
            </Stack>
        </form>
    )
}

function Tab7({ schema, setTabIndex, globalFormValues, onSubmitData, submitText }: TabProps): React.ReactElement {
    const formHook = useForm()
    const { handleSubmit, control } = formHook
    const onSubmit = async (data: SurveyFormData) => {
        onSubmitData?.({ ...globalFormValues, ...data })
        return
    }

    const [questoinValue] = useWatch({
        control,
        name: [schema[34].id],
    })

    const renderFilter = {
        [schema[35].id]: [
            "Переехал",
            "Проживаю временно (приехал (-а) на работу / по другим обстоятельствам)",
        ].includes(questoinValue),
        [schema[36].id]: ["Проживаю с рождения"].includes(questoinValue),
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack>
                <SchemaToComponents schema={schema.slice(34, 46)} formHook={formHook} renderFilter={renderFilter} />

                <Group align="flex-start">
                    <Button onClick={() => setTabIndex?.((x) => x - 1)} bg="secondary">
                        Предыдущий раздел
                    </Button>
                    <Button type="submit" disabled={submitText === states.fetch} bg="secondary">
                        {submitText}
                    </Button>
                </Group>
            </Stack>
        </form>
    )
}

export type SurveyModalProps = {
    schema: SurveySchemaItem[]
}

export function SurveyModal({ innerProps }: ContextModalProps<SurveyModalProps>) {
    const schema = innerProps.schema
    const modals = useModals()
    const [tabIndex, setTabIndex] = useState(0)
    const [globalFormValues, setGlobalFormValues] = useState<SurveyFormData | null>(null)

    const ref = useRef<HTMLDivElement>(null)

    const [text, setText] = useState(states.start)

    const titles: Record<number, string> = {
        0: "Приветствие",
        1: "Общие вопросы",
        2: "Идентичность Соснового Бора",
        3: "Досуг",
        4: "Городская среда",
        5: "Транспорт",
        6: "Планы на будущее",
        7: "Социально-демографические характеристики",
    }

    const onSubmitStep = async (data: SurveyFormData) => {
        setGlobalFormValues((x) => ({ ...x, ...data }))
        setTabIndex((x) => x + 1)
        ref.current?.scrollIntoView()
    }

    const getSelectListText = useCallback(
        (key: string) => {
            // its a selectList question with "id-i" pattern
            const splited = key.split("-")
            const i = splited.pop()
            const id = splited.join("-")
            const schemaQuestion = schema.find((x) => id === x.id)

            return schemaQuestion ? `${schemaQuestion.text}: ${schemaQuestion.list?.[Number(i)]}` : ""
        },
        [schema],
    )

    const onSubmitData = async (data: SurveyFormData) => {
        const body = JSON.stringify({
            data: Object.entries(data)
                .filter(([_, value]) => !!value)
                .map(([key, value]) => ({
                    id: key,
                    text: schema.find((x) => x.id === key)?.text ?? getSelectListText(key),
                    value,
                })),
        })

        await fetch(API.surveys, {
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
                modals.closeContextModal("survey")
                modals.openModal({
                    centered: true,
                    withCloseButton: false,
                    children: (
                        <Stack>
                            <Center>
                                <Title order={1}>
                                    <Text pt="lg" inherit>
                                        Спасибо!
                                    </Text>
                                </Title>
                            </Center>
                            <Center>
                                <Text size="xl" ta={"center"}>
                                    Опрос окончен.
                                </Text>
                            </Center>
                        </Stack>
                    ),
                    onClose: () => modals.closeAll(),
                })
            })
            .catch(async (e) => {
                setText(states.error)
                console.error("Survey submission failed:", e)
            })
    }

    return (
        <Tabs
            value={String(tabIndex)}
            onChange={() => null}
            variant="pills"
            color="secondary"
            styles={{
                tab: {
                    borderRadius: "40px",
                },
            }}
        >
            <div ref={ref} />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Text size="lg" fw="bold">
                    {tabIndex === 0
                        ? titles[tabIndex]
                        : `${tabIndex}/${Object.keys(titles).length - 1} ${titles[tabIndex]} `}
                </Text>
                <CloseButton radius={"40px"} onClick={modals.closeAll} />
            </div>

            <Space h="xl" />

            <Tabs.Panel value="0">
                <Stack gap="md">
                    <Text size="xl" fw="bold">
                        Уважаемый участник опроса!
                    </Text>
                    <Text>
                        Администрация Соснового Бора совместно с госкорпорацией «Росатом» разрабатывает Мастер-план г.
                        Сосновый Бор, который позволит определить общие принципы и направления развития территории.
                        <br />
                        <br />
                        Нам важно узнать, что волнует жителей города и как должен развиваться Сосновый Бор в будущем.
                        Ваши предложения и пожелания будут учтены в разработке Мастер-плана.
                        <br />
                        <br />
                        Анкета содержит перечень вопросов о современном состоянии городской среды и перспективах
                        развития территории. Заполнение анкеты займет около 15 минут. Мы не собираем личные данные
                        участников опроса и гарантируем полную конфиденциальность.
                        <br />
                        <br />
                    </Text>
                    <Center>
                        <Button
                            bg="secondary"
                            onClick={() => {
                                setTabIndex((x) => x + 1)
                                ref.current?.scrollIntoView()
                            }}
                        >
                            Начать опрос
                        </Button>
                    </Center>
                </Stack>
            </Tabs.Panel>
            <Tabs.Panel value="1">
                <Tab1 schema={schema} onSubmit={onSubmitStep} submitText={text} onSubmitData={onSubmitData} />
            </Tabs.Panel>
            <Tabs.Panel value="2">
                <Tab2 schema={schema} onSubmit={onSubmitStep} setTabIndex={setTabIndex} />
            </Tabs.Panel>
            <Tabs.Panel value="3">
                <Tab3 schema={schema} onSubmit={onSubmitStep} setTabIndex={setTabIndex} />
            </Tabs.Panel>
            <Tabs.Panel value="4">
                <Tab4 schema={schema} onSubmit={onSubmitStep} setTabIndex={setTabIndex} />
            </Tabs.Panel>
            <Tabs.Panel value="5">
                <Tab5 schema={schema} onSubmit={onSubmitStep} setTabIndex={setTabIndex} />
            </Tabs.Panel>
            <Tabs.Panel value="6">
                <Tab6 schema={schema} onSubmit={onSubmitStep} setTabIndex={setTabIndex} />
            </Tabs.Panel>
            <Tabs.Panel value="7">
                <Tab7
                    schema={schema}
                    setTabIndex={setTabIndex}
                    globalFormValues={globalFormValues ?? undefined}
                    onSubmitData={onSubmitData}
                    submitText={text}
                />
            </Tabs.Panel>
        </Tabs>
    )
}
