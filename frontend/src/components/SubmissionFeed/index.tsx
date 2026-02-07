import { Stack, ScrollArea, Skeleton, Box, Button, ActionIcon, Group, Text, Alert } from '@mantine/core'
import { useHasMounted } from '@/contexts/hasMounted'
import { Item } from './Item'
import useSWRInfinite from 'swr/infinite'
import { NavbarContext } from '@/contexts/navbar'
import { useContext } from 'react'
import s from './index.module.css'
import { useRouter } from 'next/router'
import { useEffectOnce } from 'react-use'
import { AddButton } from '../AddButton'
import { useMediaQuery } from '@mantine/hooks'
import type { Feature, Submission, SubmissionResponse } from '@/types/submission'

export type { Feature, Submission, SubmissionResponse }

export function SubmissionFeed() {
    const router = useRouter()
    const hasMounted = useHasMounted()
    const isMobile = useMediaQuery('(max-width: 768px)', true)
    const { data, error, isLoading, size, setSize } = useSWRInfinite(
        (pageIndex, previousPageData) => {
            if (previousPageData && !previousPageData.hasNextPage) return null
            return `/api/collections/features/records?page=${pageIndex + 1}` // swr starts at 0, pb at 1
        },
        (url) => fetch(
            url,
            {
                method: 'get',
            }
        ).then(async res => await res.json()),
    )
    const dataFlat = (isLoading || error || !data)
        ? []
        : data
            .flatMap(x => x.items)
            .sort((a, b) => {
                if (!router.query?.pointId) return 0
                if (a.id == router.query?.pointId) return -1
                if (b.id == router.query?.pointId) return 1
                return 0
            })

    // on query.pointId fetch up to amount of items in /index
    useEffectOnce(() => {
        if (router.query?.pointId) {
            if (!dataFlat.find(x => x.id == router.query?.pointId)) {
                setSize(10)
            }
        }
    })

    const { setDrawer } = useContext(NavbarContext)

    if (!hasMounted || isLoading) {
        return (
            <Stack p='md'>
                <Skeleton height={'300px'} width={'100%'} />
                <Skeleton height={'200px'} width={'100%'} />
                <Skeleton height={'200px'} width={'100%'} />
                <Skeleton height={'300px'} width={'100%'} />
                <Skeleton height={'400px'} width={'100%'} />
            </Stack>
        )
    }

    if (hasMounted && (error || Boolean(data?.[0]?.error))) {
        return (
            <Alert color='red' m='md'>
                Ошибка, что-то поломалось ):
            </Alert>
        )
    }

    return (
        <>
            <Box
                p='md'
                pt={isMobile ? 16 : 20}
            >
                <Group
                    justify='space-between'
                    variant='noflip'
                >
                    <Text
                        // order={3}
                        fw='bold'
                        // component={Text}
                        className={s.title}
                    >
                        Предложения жителей
                    </Text>
                    <ActionIcon
                        hiddenFrom='lg' // 'md'
                        onClick={() => setDrawer(drawer => !drawer)}
                        size='lg'
                        variant='light'
                        bg='secondary'
                        c='white'
                        style={{
                            borderRadius: 40,
                        }}
                    >
                        {'<-'}
                    </ActionIcon>
                </Group>
            </Box>
            <ScrollArea
                scrollbars='y'
                p='md'
            >
                {Boolean(!isLoading && !error) && dataFlat.length == 0 && (
                    <Stack
                        justify='center'
                        align='center'
                        style={{
                            height: '75vh',
                        }}>
                        <Text style={{ textAlign: 'center' }}>
                            Пока нет предложений. Сделайте первое!
                        </Text>
                        <AddButton
                            style={{
                                width: 'fit-content',
                                marginBottom: 12,
                            }}
                        />
                    </Stack>
                )}
                <Stack
                    gap='md'
                    pb={12}
                    className={s.scrollAreaStack}
                >
                    {dataFlat.map((x) => (
                        <Item
                            key={x.id}
                            data={x}
                        />
                    ))}
                    {!isLoading && data && data[0]?.totalItems != dataFlat.length && (
                        <Button
                            onClick={() => setSize(size + 1)}
                            bg='primary'
                        >
                            Загрузить больше предложений
                        </Button>
                    )}
                </Stack>
            </ScrollArea>
        </>
    )
}
