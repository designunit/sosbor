'use client'

import { Fieldset, CheckboxGroup, Stack, Checkbox, TextInput, Text } from '@mantine/core'
import { useState, useCallback } from 'react'
import type { FieldValues, UseFormSetValue, UseFormWatch } from 'react-hook-form'

export type CheckboxWithOtherProps = {
    field: FieldValues
    data: string[]
    setValue: UseFormSetValue<FieldValues>
    watch: UseFormWatch<FieldValues>
    label: string
    description?: string
    maxValues?: number
}

export function CheckboxWithOther({ field, data, watch, setValue, label, description, maxValues = data.length }: CheckboxWithOtherProps) {
    const [isShowOtherInput, setIsShowOtherInput] = useState(false)
    const [inputValue, setInputValue] = useState('Другое: ')
    const selectedOptions: string[] = watch(field.name, []) || []

    const handleCheckboxChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setIsShowOtherInput(event.currentTarget.checked)
    }, [])
    const handleOtherInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const filteredValue = selectedOptions.filter((x) => !x.includes('Другое'))
        setInputValue(`Другое: ${event.currentTarget.value}`)
        setValue(field.name, [...filteredValue, `Другое: ${event.currentTarget.value}`], { shouldValidate: true })
    }

    const getDisabled = (value: string) => !selectedOptions.includes(value) && selectedOptions.length >= maxValues

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