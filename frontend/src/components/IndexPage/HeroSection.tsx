import { Box, Space, Stack, Text, Title } from '@mantine/core'
import { HeroCTAButtons } from './HeroCTAButtons'
import classes from './HeroSection.module.css'

export function HeroSection() {
    return (
        <>
            <Space h={20} />
            <Box
                style={{
                    position: 'relative',
                    zIndex: 0,
                    overflow: 'visible',
                }}
            >
                <Box visibleFrom='md'>
                    <div style={{
                        position: 'absolute',
                        top: '-20%',
                        right: '-60%',
                        width: 'min(1239px * 1, 100vw)',
                        height: 'min(1320px * 1, 120vw)',
                        background: 'url(/hero.png)',
                        aspectRatio: '1239 / 1320',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'contain',
                        borderRadius: '40px',
                        backgroundPosition: 'bottom center',
                    }} />
                    <div style={{
                        position: 'absolute',
                        bottom: '0%',
                        right: '10%',
                        width: 'min(339px * 1.5, 100vw)',
                        height: 'min(137px * 1.5, 120vw)',
                        background: 'url(/wstar.png)',
                        aspectRatio: '339 / 137',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'contain',
                        borderRadius: '40px',
                        backgroundPosition: 'bottom center',
                    }} />
                </Box>
                <Stack
                    pt={{ base: '100px', sm: '150px' }}
                    maw={'min(90vw, 1050px)'}
                    justify={'flex-start'}
                    gap={70}
                    style={{
                        position: 'relative',
                        zIndex: 201,
                    }}
                >
                    <Title
                        order={1}
                        ta={{ base: 'center', sm: undefined }}
                        c='primary'
                        className={classes.heroTitle}
                    >
                        МАСТЕР-ПЛАН РАЗВИТИЯ
                        <br />
                        СОСНОВОГО БОРА
                    </Title>
                    <Text
                        pb={20}
                        maw={'min(100%, 660px)'}
                        c='white'
                    >
                        Уважаемые жители Соснового бора! Администрация городского округа совместно с госкорпорацией «Росатом» приступила к разработке Мастер-плана развития нашего города. Это масштабный проект, который определит принципы и направления развития Соснового бора на годы вперед.
                        <br /><br />
                        Чтобы план стал по-настоящему полезным и отразил интересы горожан, нам очень важно услышать ваше мнение. Что вас волнует? Что нужно улучшить в первую очередь? Каким вы видите Сосновый бор будущего?
                        <br /><br />
                        Поделитесь своими оценками, предложениями и пожеланиями в анонимной анкете. Это займет у вас не более 15 минут, а ваши искренние ответы станут основой для реальных изменений.
                        <br /><br />
                        Давайте вместе построим город, в котором хочется жить!
                    </Text>
                    <HeroCTAButtons />
                </Stack>
            </Box>
        </>
    )
}
