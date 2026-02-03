import { NewsPage } from '@/components/NewsPage'
import { GetStaticPaths, GetStaticProps } from 'next'

export default function Page({ data }) {

    return (
        <>
            <NewsPage data={data} />
        </>
    )
}

export const getStaticPaths = (async () => {
    const data = await fetch(
        `${process.env.BACKEND_URL}/api/news?limit=1000`,
        {
            method: 'get',

        },
    )
        .then(async res => await res.json())
        .catch(err => console.log(err))


    return {
        paths: data.docs.map(x => ({
            params: {
                id: x.id,
            }
        })),
        fallback: false,
    }
}) satisfies GetStaticPaths

export const getStaticProps = (async (ctx) => {
    let data = await fetch(
        `${process.env.BACKEND_URL}/api/news/${ctx.params.id}`,
        {
            method: 'get',
        },
    )
        .then(async res => await res.json())
        .catch(err => console.log(err))

    data = {
        content_html: data.content_html,
        image: data.image.tablet,
        title: data.title,
    }
    return {
        props: {
            data,
        }
    }
}) satisfies GetStaticProps