import { Checkbox, CheckboxGroup, Fieldset, Stack, Text } from "@mantine/core"
import type { FieldValues, UseFormWatch } from "react-hook-form"

export type CheckboxListProps = {
    field: FieldValues
    data: string[]
    watch: UseFormWatch<FieldValues>
    label: string
    description?: string
    maxValues?: number
    hasError?: boolean
}

export function CheckboxList({
    field,
    data,
    watch,
    label,
    description,
    maxValues = data.length,
    hasError,
}: CheckboxListProps) {
    const selectedOptions: string[] = watch(field.name, []) || []

    const getDisabled = (value: string) => !selectedOptions.includes(value) && selectedOptions.length >= maxValues

    return (
        <Fieldset
            legend={label}
            variant="filled"
            style={{
                border: hasError ? "2px solid tomato" : undefined,
                borderRadius: "8px",
                padding: hasError ? "8px" : undefined,
            }}
        >
            <Text
                variant="dimmed"
                mb="xs"
                style={{
                    fontSize: "unset",
                }}
            >
                {description}
            </Text>
            <CheckboxGroup {...field}>
                <Stack>
                    {data.map((x, i) => (
                        <Checkbox
                            key={i}
                            value={x}
                            label={x}
                            disabled={getDisabled(x)}
                            styles={{
                                input: {
                                    "--checkbox-color": "var(--mantine-color-secondary-0)",
                                },
                            }}
                        />
                    ))}
                </Stack>
            </CheckboxGroup>
        </Fieldset>
    )
}
