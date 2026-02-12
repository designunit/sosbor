import { Box, Image, Stack, Title } from "@mantine/core"
import type { NewsData } from "@/types"
import s from "./index.module.css"

export type NewsPageProps = {
    data: NewsData
}

export function NewsPage({ data }: NewsPageProps) {
    return (
        <Stack>
            <Box>
                <Image src={data.image.url} width={data.image.width} height={data.image.height} alt={data.title} />
            </Box>
            <Title>{data.title}</Title>

            <div className={s.content} dangerouslySetInnerHTML={{ __html: data.content_html }} />
        </Stack>
    )
}
