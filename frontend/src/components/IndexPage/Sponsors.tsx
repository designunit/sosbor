import { Group, Image } from '@mantine/core'
import Link from 'next/link'
import classes from './Sponsors.module.css'

const sponsors = [
    {
        src: '/sponsors/sb.png',
        href: 'https://sbor.ru/power/administration',
    },
    {
        src: '/sponsors/lenobl.png',
        href: 'https://www.govvrn.ru/',
    },
    {
        src: '/sponsors/urbanika.svg',
        href: 'https://www.urbanica.spb.ru',
    },
    {
        src: '/sponsors/rstm.svg',
        href: 'https://www.rosenergoatom.ru/index.html',
    },
    {
        src: '/sponsors/rosatom.svg',
        href: 'https://www.rosenergoatom.ru/index.html',
    },
    {
        src: '/sponsors/unit.svg',
        href: 'https://unit4.io',
    },
]

export function Sponsors() {
    return (
        <Group
            p={{ base: 50, sm: 70 }}
            align={'center'}
            justify='space-between'
            bg={'secondary'}
            style={{
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
                position: 'relative',
                zIndex: 0,
                overflow: 'visible'
            }}
            wrap={'nowrap'}
            className={classes.sponsors}
        >
            {sponsors.map(x => (
                <Link
                    href={x.href}
                    key={x.src}
                    target='_blank'
                >
                    <Image
                        src={x.src}
                        alt={x.href}
                        style={{
                            maxHeight: 87,
                        }}
                    />
                </Link>
            ))}
        </Group>
    )
}
