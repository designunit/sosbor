import { Card, Image, Text } from "@mantine/core"
import Link from "next/link"
import type { NewsData } from "@/types"

export type NewsCardProps = {
    x: NewsData
}

export function NewsCard({ x }: NewsCardProps) {
    return (
        <Card key={x.id} withBorder radius="md" component={Link} href={`/news/${x.id}`}>
            <Card.Section>
                <Image
                    width={x.image.thumbnail.width}
                    height={x.image.thumbnail.height}
                    src={x.image.thumbnail.url}
                    alt={x.image.alt ?? ""}
                />
            </Card.Section>
            <Text size="lg" fw="bold">
                {x.title}
            </Text>
        </Card>
    )
}
