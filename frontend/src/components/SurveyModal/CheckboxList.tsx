import { Fieldset, CheckboxGroup, Stack, Checkbox, Text } from '@mantine/core'
import { FC } from 'react'
import { FieldValues, UseFormWatch } from 'react-hook-form'

export const CheckboxList: FC<{
    field: FieldValues,
    data: string[],
    watch: UseFormWatch<FieldValues>
    label: string
    description?: string
    maxValues?: number
}> = ({ field, data, watch, label, description, maxValues = data.length }) => {
    const selectedOptions: string[] = watch(field.name, []) || []


    const getDisabled = (value) => !selectedOptions.includes(value) && selectedOptions.length >= maxValues

    return (
        <Fieldset
            legend={label}
            variant='filled'
        >
            <Text variant='dimmed' mb='xs' style={{
                fontSize: 'unset',
            }}>
                {description}
            </Text>
            <CheckboxGroup
                {...field}
            >
                <Stack>
                    {data.map((x, i) => (
                        <Checkbox key={i}
                            value={x}
                            label={x}
                            disabled={getDisabled(x)}
                            styles={{
                                input: {
                                    '--checkbox-color': 'var(--mantine-color-secondary-0)',
                                }
                            }}
                        />
                    ))}
                </Stack>
            </CheckboxGroup>
        </Fieldset>
    )
}