import { Box, Image, Space, Stack, Title } from "@mantine/core"
import classes from "./TimelineSection.module.css"

export function TimelineSection() {
    return (
        <>
            <Space h={80} />
            <Stack
                flex={"2 1 auto"}
                className={classes.stack}
                style={{
                    position: "relative",
                }}
            >
                <span
                    id="timeline"
                    style={{
                        position: "absolute",
                        top: "-180px",
                    }}
                />
                <Title order={2} ta={{ base: "center", sm: undefined }}>
                    ГРАФИК ПРОЕКТА
                </Title>
                <Box hiddenFrom="sm">
                    <Image src="indexRoadmapMobile.svg" alt="" />
                </Box>
                <Box visibleFrom="sm">
                    <Image src="indexRoadmap.svg" alt="" />
                </Box>
            </Stack>
        </>
    )
}
