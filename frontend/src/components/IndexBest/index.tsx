import { Alert, Badge, Box, Button, Card, Group, Space, Stack, Text, Title } from '@mantine/core'
import useSWR from 'swr'
import s from './index.module.css'
import Link from 'next/link'
import Masonry from 'react-masonry-css'

export const IndexBest: React.FC<{ isMobile: boolean }> = ({ isMobile }) => {
    const { data, error, isLoading, mutate } = useSWR(
        `/api/submissions/best`,
        (url) => fetch(
            url,
            {
                method: 'get',
            }
        ).then(async res => await res.json())
    )

    if (isLoading) {
        return (
            <Text>
                Загрузка...
            </Text>
        )
    }

    if (error || Boolean(data?.error) || !data) {
        console.log('<IndexBest> error')
        return (
            null
        )
    }

    if (data.length == 0) {
        return (
            null
        )
    }

    return (
        <>
            <Stack>
                <Space
                    h={76}
                />
                <Title
                    order={2}
                    pb='md'
                >
                    Лучшие идеи
                </Title>
                <Masonry
                    breakpointCols={{
                        default: 4,
                        1024: 3,
                        768: 2,
                        450: 1,
                    }}
                    className={s.masonry}
                    columnClassName={s.masonryCol}
                >
                    {data.map((x: any) => (
                        <Card
                            key={x.id}
                            withBorder
                            padding='md'
                            radius='lg'
                            style={{
                                borderColor: '#0D7337',
                                borderWidth: '3px',
                            }}
                        >
                            <Stack
                                h='100%'
                                justify='space-between'
                            >
                                <Text>
                                    {x.description}
                                </Text>
                                <Group
                                    variant='noflip'
                                    wrap='nowrap'
                                    justify='space-between'
                                >
                                    {x.isPoint ? (
                                        <Button
                                            c='white'
                                            classNames={{
                                                label: s.mapButton,
                                                root: s.mapButtonRoot,
                                            }}
                                            component={Link}
                                            href={`/map?preview=${x.isPoint[0]},${x.isPoint[1]}&pointId=${x.id}`}
                                        >
                                            Посмтореть детали
                                        </Button>
                                    ) : (
                                        <Box h={{
                                            base: 30,
                                            md: 38,
                                        }} />
                                    )}
                                    <Badge
                                        variant='outline'
                                        size='lg'
                                        radius={'xl'}
                                        style={{
                                            border: 'solid 2px #0D7337',
                                            borderRadius: '22px',
                                        }}
                                        leftSection={(
                                            <svg xmlns='http://www.w3.org/2000/svg' width={12} height={12} style={{ margin: 'auto' }} viewBox='0 0 32 32' version='1.1'>
                                                <g id='Page-1' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd' >
                                                    <g id='Icon-Set' transform='translate(-100.000000, -255.000000)' fill='#0D7337'>
                                                        <path d='M116,281 C114.832,281 113.704,280.864 112.62,280.633 L107.912,283.463 L107.975,278.824 C104.366,276.654 102,273.066 102,269 C102,262.373 108.268,257 116,257 C123.732,257 130,262.373 130,269 C130,275.628 123.732,281 116,281 L116,281 Z M116,255 C107.164,255 100,261.269 100,269 C100,273.419 102.345,277.354 106,279.919 L106,287 L113.009,282.747 C113.979,282.907 114.977,283 116,283 C124.836,283 132,276.732 132,269 C132,261.269 124.836,255 116,255 L116,255 Z' id='comment-1'>
                                                        </path>
                                                    </g>
                                                </g>
                                            </svg>
                                        )}
                                    >
                                        <span
                                            style={{ color: '#0D7337' }}
                                        >
                                            {x.comments}
                                        </span>
                                    </Badge>
                                </Group>
                            </Stack>
                        </Card>
                    ))}
                </Masonry>
            </Stack>
        </>
    )
}
