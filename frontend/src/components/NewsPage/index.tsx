import { Stack, Title, Image, Box } from '@mantine/core'
import s from './index.module.css'

export const NewsPage = ({ data }) => {
    return (
        <Stack>
            <Box>
                <Image
                    src={data.image.url}
                    width={data.image.width}
                    height={data.image.height}
                    alt={data.title}
                />
            </Box>
            <Title>
                {data.title}
            </Title>

            <div
                className={s.content}
                dangerouslySetInnerHTML={{ __html: data.content_html }}
            />
        </Stack>
    )
}