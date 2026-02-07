import { FormContext } from '@/contexts/form';
import { Popover, Button, Center, Box } from '@mantine/core';
import { useModals } from '@mantine/modals';
import { useCallback, useContext } from 'react';
import { FormData } from '@/types';

export type AddButtonProps = {
    style?: React.CSSProperties
}

export function AddButton({ style = {
    position: 'absolute',
    zIndex: 1,
    bottom: '3rem',
    left: '50%',
    transform: 'translateX(-50%)',
} }: AddButtonProps) {
    const modals = useModals()
    const { data, setData } = useContext(FormContext)
    const { addMode, setAddMode } = useContext(FormContext)
    const onClick = useCallback((data: FormData) => {
        if (Object.keys(data).length == 0) {
            setData({})
        }

        modals.openContextModal(
            'idea',
            {
                centered: true,
                size: 'min(100%, 650px)',
                // radius: 'xl',
                withCloseButton: false,
                innerProps: {
                    defaultValues: data,
                },
            }
        )
    }, [])

    return (
        <div style={style}>
            <Popover
                opened={addMode}
                position='top'
                zIndex={0}
            >
                <Popover.Target>
                    {addMode ? (
                        <Button
                            onClick={() => {
                                setAddMode(false)
                                onClick(data)
                            }}
                            style={{
                                background: 'tomato',
                            }}
                        >
                            Отмена
                        </Button>
                    ) : (
                        <Box
                            p={4}
                            style={{
                                // boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
                            }}
                        >

                            <Button
                                size='md'
                                onClick={() => onClick({})}
                                bg='secondary'
                                c='primary'
                                style={{
                                    outlineOffset: '2px',
                                    outline: '1px solid var(--mantine-color-secondary-1)',
                                }}
                            >
                                Предложить идею
                            </Button>
                        </Box>
                    )}
                </Popover.Target>
                <Popover.Dropdown
                    maw='calc(100vw - 2rem)'
                    style={{
                        borderRadius: 40,
                    }}
                >
                    <Center ta='center'>
                        Выберите место на карте для своего предложения
                    </Center>
                </Popover.Dropdown>
            </Popover>
        </div>
    )
}
