import { BackgroundImage, Box, Group, Space, Stack, Text, Title } from "@mantine/core"
import classes from "./MapCTA.module.css"
import { MapCTAButton } from "./MapCTAButton"

export function MapCTA() {
    return (
        <>
            <Space h={{ base: 80, sm: 60 }} />
            <Box
                style={{
                    position: "relative",
                    overflow: "visible",
                    zIndex: 1,
                    outlineOffset: 2,
                    outline: "solid 2px var(--mantine-color-secondary-1)",
                }}
            >
                <Box visibleFrom="md">
                    <div
                        style={{
                            position: "absolute",
                            top: "0%",
                            right: "100%",
                            width: "100%",
                            height: "100%",
                            background: "url(/star.svg)",
                            backgroundRepeat: "no-repeat",
                            aspectRatio: "153 / 150",
                            transform: "scale(3)",
                            backgroundSize: "contain",
                            backgroundPosition: "right bottom",
                            maxWidth: "153px",
                            maxHeight: "150px",
                            zIndex: -1,
                            opacity: 0.25,
                        }}
                    />
                    <div
                        style={{
                            position: "absolute",
                            top: "50%",
                            right: "-10%",
                            width: "100%",
                            height: "100%",
                            background: "url(/star.svg)",
                            backgroundRepeat: "no-repeat",
                            aspectRatio: "153 / 150",
                            backgroundSize: "contain",
                            backgroundPosition: "right bottom",
                            maxWidth: "153px",
                            maxHeight: "150px",
                            zIndex: -1,
                            opacity: 0.25,
                        }}
                    />
                </Box>
                <BackgroundImage
                    src={"/indexMap.jpg"}
                    bgr={"no-repeat"}
                    pos={"relative"}
                    className={classes.backgroundImage}
                >
                    <Stack
                        align="flex-start"
                        justify="center"
                        variant="noflip"
                        h="100%"
                        maw={{ base: "100%", md: "min(100%, 500px)" }}
                        p={{ base: 24, md: 38 }}
                        bg={"rgba(255,255,255, 0.9)"}
                        style={{
                            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
                        }}
                    >
                        <Title
                            order={2}
                            c={"primary"}
                            mb={24}
                            ta={{ base: "center", md: undefined }}
                            w={"100%"}
                            className={classes.mapTitle}
                        >
                            ПОДЕЛИТЕСЬ
                            <br /> СВОИМ МНЕНИЕМ
                        </Title>

                        <Text
                            fw={"bold"}
                            style={{
                                fontSize: 16,
                            }}
                        >
                            Выберите, что вы хотите отметить и укажите точку на карте, после чего оставьте комментарий
                            <br /> во всплывающем окне.
                        </Text>
                        <Text
                            style={{
                                fontSize: 16,
                            }}
                        >
                            <b>Идеи и предложения</b>: Что может появиться в городе? Чего вам здесь не хватает? Что
                            хочется изменить или наоборот, оставить как есть?
                        </Text>
                        <Text
                            style={{
                                fontSize: 16,
                            }}
                            mb={24}
                        >
                            <b>Проблемы</b>: Что вас беспокоит в городе? Какие трудности встречаются?
                        </Text>
                        <Group p={6} mx={"auto"}>
                            <MapCTAButton />
                        </Group>
                    </Stack>
                </BackgroundImage>
            </Box>
        </>
    )
}
