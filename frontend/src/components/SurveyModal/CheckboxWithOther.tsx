import { Fieldset, CheckboxGroup, Stack, Checkbox, TextInput, Text } from '@mantine/core'
import { FC, useState, useEffect, useCallback } from 'react'
import { FieldValues, UseFormSetValue, UseFormWatch } from 'react-hook-form'


export const CheckboxWithOther: FC<{
    field: FieldValues,
    data: string[],
    setValue: UseFormSetValue<FieldValues>
    watch: UseFormWatch<FieldValues>
    label: string
    description?: string
    maxValues?: number
}> = ({ field, data, watch, setValue, label, description, maxValues = data.length }) => {
    const [isShowOtherInput, setIsShowOtherInput] = useState(false)
    const [inputValue, setInputValue] = useState('Другое: ')
    const selectedOptions: string[] = watch(field.name, []) || []

    const handleCheckboxChange = useCallback((event) => {
        setIsShowOtherInput(event.currentTarget.checked)
    }, [])
    const handleOtherInputChange = (event) => {
        const filteredValue = selectedOptions.filter((x) => !x.includes('Другое'))
        setInputValue(`Другое: ${event.currentTarget.value}`)
        setValue(field.name, [...filteredValue, `Другое: ${event.currentTarget.value}`], { shouldValidate: true })
    }

    const getDisabled = (value) => !selectedOptions.includes(value) && selectedOptions.length >= maxValues

    return (
        <Fieldset
            legend={label}
            variant='filled'
        >
            <Text variant='dimmed' mb='xs' size='xs'>
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
                    <Checkbox
                        value={inputValue}
                        label={'Другое'}
                        onChange={handleCheckboxChange}
                        disabled={getDisabled(inputValue)}
                        styles={{
                            input: {
                                '--checkbox-color': 'var(--mantine-color-secondary-0)',
                            }
                        }}
                    />
                    {isShowOtherInput && (
                        <TextInput
                            placeholder='Ваш ответ'
                            onChange={handleOtherInputChange}
                            styles={{
                                wrapper: {
                                    '--input-bd-focus': 'var(--mantine-color-secondary-0)',
                                }
                            }}
                        />
                    )}
                </Stack>
            </CheckboxGroup>
        </Fieldset>
    )
}