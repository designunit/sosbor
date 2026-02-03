import { TextInput, Text, Select, Button, Textarea, Tabs, Group, Fieldset, Title, Stack, Center, Space, CloseButton, Slider, Box } from '@mantine/core'
import { ContextModalProps, useModals } from '@mantine/modals'
import { FC, useRef, useState } from 'react'
import { Controller, useForm, useWatch } from 'react-hook-form'
import { CheckboxWithOther } from './CheckboxWithOther'
import { CheckboxList } from './CheckboxList'

const states = {
    start: 'Отправить ответ',
    fetch: 'Отправка...',
    ok: 'Готово',
    error: 'Ошибка, еще раз?'
}

const schema: any = [
    // tab 1
    {
        id: 'fe96c27b-b02b-4888-8893-df37594043c2',
        text: 'Вы проживаете на территории МО Заречный?',
        type: 'select',
        data: ['Да', 'Нет'],
    },
    {
        id: '837aafc5-c987-46cc-93c3-6701705a22bf',
        text: 'Где вы проживаете в МО Заречный?',
        type: 'select',
        data: [
            'Город Заречный',
            'Д. Боярка',
            'Д. Гагарка',
            'Д. Курманка',
            'С. Мезенское',
        ],
    },
    {
        id: '7a15648d-c91d-422c-aed6-0b6a8047df17',
        text: 'Если вы не проживаете в МО Заречный, то с какими целями вы посещаете эту территорию?',
        type: 'checkboxOther',
        data: [
            'Работа',
            'Учеба',
            'Получение медицинских услуг',
            'Занятие спортом',
            'Отдых',
            'Встречи с друзьями и родственниками',
        ],
        // maxValues: 3,
        // description: 'Выберите не более трех целей',
    },
    {
        id: 'fec8185f-9538-444c-9cf6-e99a35392237',
        text: 'Какие места и локации МО Заречный вы посещаете?',
        type: 'textarea',
        // secription: '',
        // rows: 3,
    },

    // tab 2
    // '9cf038ba-6b59-4a88-9708-8f2ad93af3da': 'С чем у вас ассоциируется Заречный?',
    // '319a6172-c99a-420f-9f04-d2baaee5181d': 'Вам комфортно жить и работать в Заречном?',
    // 'b7fd8f6e-9f7b-4317-8b77-8c83973f42e1': 'Как вы считаете, чем Заречный лучше других городов?',
    // '66783d9d-1a0f-4874-a636-29c372b707b9': 'Какие недостатки выделяют Заречный среди других городов Свердловской области?',
    // '455ef739-ac9a-491f-bcf5-7d81830e2a98': 'Какие места в Заречном вам нравятся?',
    // 'f44f52c8-a3b3-4c3c-9279-961703bca5c4': 'Какие особенности жизни в Заречном вы можете выделить?',

    // tab 3
    // 'e77f97fb-2f86-49ab-aaf9-5058336e3ce7': 'Где вы предпочитаете проводить свое свободное время вне дома?',
    {
        id: 'e3c30bb9-23a2-4c1c-ab3c-4b16633eff97', // mapped
        text: 'Как часто вы посещали в Заречном следующие объекты за последний год?',
        type: 'selectList',
        list: [
            'Места вблизи водоемов, лесов и других природных объектов',
            'Городской парк, скверы, аллеи и бульвары',
            'Торговые центры и магазины',
            'Медицинские учреждения',
            'Кафе и рестораны',
            'Творческие кружки и секции ',
            'Театр, филармония, музеи',
            'Спорткомплексы, спортзалы и спортивные секции',
            'Детские площадки',
            'Детские развлекательные центры ',
            'Библиотеки',
            'Церковь',
            'Уличные спортивные площадки',
        ],
        data: [
            'Ежедневно',
            'Несколько раз в неделю',
            'Несколько раз в месяц',
            'Несколько раз за полгода',
            'Раз в год',
            'Не посещал(а)',
        ],
    },
    // '7faedf7d-c916-40ed-855a-a4fca6798129': 'Где вы проводили свой отпуск или длинные праздники последние 2 года на территории МО Заречный?',
    // '0212c27c-3094-4063-a966-70032794820e': 'Как вы проводили свой отпуск последние два года на территории МО Заречный?',
    // '7d3de19d-a304-488d-bc56-7a69e13f6d92': 'Если вы принимаете участие в общественных организациях (профсоюзы, НКО, волонтерские организации, группы по интересам), укажите их название и вашу сферу интересов',
    // '79d7e561-8be9-4d70-b8a9-ef15e15bdf4f': 'Каких мероприятий в Заречном вам не хватает?',

    // tab 4
    {
        id: '6b8d4718-ac9d-4b50-8c55-fd8abfbfaa6a',
        text: 'Оцените от 0 до 5, насколько вы удовлетворены следующими сферами жизни в Заречном?',
        type: 'sliderList',
        description: 'Где 1 – абсолютно не удовлетворен(-а), 5 – абсолютно удовлетворен(-а). 0 – не могу оценить (нет таких объектов в городе или не имею представление о развитии данной сферы).',
        list: [
            'Школьное и дошкольное образование (детские сады и школы)',
            'Детский досуг (детские площадки, развлекательные центры, развивающие и спортивные занятия)',
            'Среднее образование (колледж)',
            'Медицина (поликлиника, частные медицинские центры, стоматология)',
            'Культура (ДК Ровесник, ТЮЗ, музеи, библиотека)',
            'Спорт (спортивные комплексы и площадки, залы, секции)',
            'Жилищные условия (состояние дома и благоустройство придомовой территории)',
            'Коммунальные услуги (газ, электричество, водоснабжение и водоотведение)',
            'Детские площадки, места для прогулок и отдыха с детьми',
            'Рекреационные и общественные пространства (парк, бульвар, набережная)',
            'Озеленение города и общественных пространств',
            'Уличное освещение',
            'Безопасность',
            'Общественное питание (кафе, рестораны, столовые)',
            'Объекты бытового обслуживания (аптеки, парикмахерские, салоны красоты, банки, автосервисы, и т.д.)',
            'Объекты розничной торговли (продуктовые магазины, торговые центры, и т.д.)',
            'Экология (чистота воздуха, воды, почвы, радиационное загрязнение)',
            'Сбор, вывоз и утилизация мусора (в том числе несанкционированные свалки)',
        ],
        marks: [0, 1, 2, 3, 4, 5],
    },
    // 41: 'Оцените от 0 до 5, насколько вы удовлетворены следующими сферами жизни в Заречном?', // mapped
    // 42: 'С какими проблемами вы лично сталкивались в Заречном за последние 2 года?',
    // 43: 'Каких объектов в Заречном вам не хватает?',

    // 51: 'Какой транспорт вы чаще всего используете для передвижения по Заречному?',
    // 52: 'Как долго вы обычно добираетесь от дома до места работы/учебы?',
    // 53: 'Вам легко и просто добраться до всех необходимых мест в Заречном?',
    // 54: 'С какими проблемами общественного транспорта вы чаще всего сталкиваете в МО Заречный?',
    {
        id: '4c7d41ba-6d9c-4090-94c6-1f45bb5094bd',
        text: 'С какими транспортными проблемами вы чаще всего сталкиваетесь в МО Заречный?', // checkboxList
        type: 'checkboxList',
        data: [
            'Пробки',
            'Плохое состояние покрытия дорог',
            'Низкое качество уборки дорог (от снега, мусора и др.)',
            'Недостаток парковочных мест',
            'Отсутствие выделенных полос для велосипедов/самокатов',
            'Отсутствие пешеходных тротуаров',
            'Отсутствие указателей и удобной навигации',
            'Не сталкиваюсь с проблемами',
        ],
        maxValues: 4,
        description: 'Укажите 4 наиболее значимых проблемы.',
    }
    // 56: 'Как часто вы выезжаете за пределы Заречного?',
    // 57: 'В какие населенные пункты вы выезжаете?',
    // 58: 'С какими целями Вы выезжаете за пределы МО Заречный?',
    // 59: 'Когда вы выезжаете за пределы Заречного, каким транспортом вы обычно пользуетесь?',

    // 61: 'Вы бы переехали из Заречного, если бы представилась такая возможность?',
    // 62: 'Почему вы хотите переехать из Заречного?',
    // 63: 'В какой город вы хотели бы переехать?',
    // 64: 'Каким вы хотели бы видеть Заречный в ближайшие 10 лет?',
    // 65: 'Какие особенности жизни в Заречном вы бы хотели сохранить?',
    // 66: 'Как вы думаете, какие направления стоит развивать в первую очередь в Заречном?',

    // 71: 'Вы проживаете в Заречном с рождения или переехали в него?',
    // 72: 'Откуда вы приехали в Заречный?',
    // 73: 'Сколько лет вы проживаете в Заречном?',
    // 74: 'Где вы проживаете?',
    // 75: 'Укажите ваш пол',
    // 76: 'Сколько вам полных лет?',
    // 77: 'Укажите ваше семейное положение',
    // 78: 'У вас есть дети до 18 лет?',
    // 79: 'Укажите ваш уровень образования',
    // 710: 'Какое высказывание точнее всего описывает материальное положение вашей семьи?',
    // 711: 'Какой ваш основной род занятий?',
    // 712: 'Укажите направление, специализацию организации, в которой вы работаете',
]

type SchemaToComponentsProps = {
    schema
    formHook
    renderFilter?
}
const SchemaToComponents: FC<SchemaToComponentsProps> = ({ schema, formHook, renderFilter = {} }) => {
    const { control, setValue, watch, register } = formHook // passed from parent cause it needed for filter
    return schema
        .filter((item) => renderFilter?.[item.id] ?? true)
        .map((item, i) => {
            switch (item.type) {
                case 'select': {
                    return (
                        <Controller
                            name={item.id}
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    label={item.text}
                                    data={item.data}
                                />
                            )}
                        />
                    )
                }
                case 'checkboxOther': {
                    return (
                        <Controller
                            name={item.id}
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <CheckboxWithOther
                                    field={field}
                                    setValue={setValue}
                                    watch={watch}
                                    label={item.text}
                                    description={item?.description}
                                    maxValues={item?.maxValues}
                                    data={[
                                        'Работа',
                                        'Учеба',
                                        'Получение медицинских услуг',
                                        'Занятие спортом',
                                        'Отдых',
                                        'Встречи с друзьями и родственниками',
                                    ]}
                                />
                            )}
                        />
                    )
                }
                case 'textarea': { // is textinput the same??
                    return (
                        <Textarea
                            {...register(item.id, { required: true })}
                            label={item.text}
                            rows={item?.rows ?? 3}
                            description={item?.description}
                        />
                    )
                }
                case 'selectList': {
                    return (
                        <Fieldset
                            legend={item.text}
                            variant='filled'
                        >
                            <Stack>
                                {item.list.map((listItem, index) => (
                                    <Controller
                                        key={listItem}
                                        name={`${item.id}-${index}`}
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                label={listItem}
                                                styles={{
                                                    label: {
                                                        fontWeight: 'lighter',
                                                    }
                                                }}
                                                data={item.data}
                                            />
                                        )}
                                    />
                                ))}
                            </Stack>
                        </Fieldset>
                    )
                }
                case 'sliderList': {
                    return (
                        <Fieldset
                            legend={item.text}
                            variant='filled'
                            styles={{
                                legend: {
                                    fontWeight: 'bold'
                                }
                            }}
                        >
                            <Text c='dimmed' style={{
                                fontSize: 'unset',
                            }}>
                                {item?.description}
                            </Text>
                            <Stack>
                                {item.list.map((listItem, index) => (
                                    <Controller
                                        key={listItem}
                                        name={`${item.id}-${index}`}
                                        control={control}
                                        // rules={{ required: true }}
                                        render={({ field }) => (
                                            <Box my='md'>
                                                <Text style={{
                                                    fontSize: 'unset',
                                                }}>
                                                    {listItem}
                                                </Text>
                                                <Slider
                                                    {...field}
                                                    step={1}
                                                    min={0}
                                                    max={item.marks.length}
                                                    defaultValue={0}
                                                    marks={item.marks.map((x) => ({ value: x, label: String(x) }))}
                                                    label={null}
                                                />
                                            </Box>
                                        )}
                                    />
                                ))}
                            </Stack>
                        </Fieldset>
                    )
                }
                case 'checkboxList': {
                    return (
                        <Controller
                            name={item.id}
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <CheckboxList
                                    field={field}
                                    watch={watch}
                                    label={item.text}
                                    description={item?.description}
                                    maxValues={item?.maxValues}
                                    data={item.data}
                                />
                            )}
                        />
                    )
                }
                default: {
                    console.log('schema map invalid item. id:', item?.id)
                    return null
                }
            }
        })
}

const Tab1 = ({ onSubmit, submitText, onSubmitData }) => {
    const formHook = useForm()
    const { handleSubmit, control } = formHook
    const onSubmitWrapped = async (data) => {
        if (value11 == 'Нет') {
            onSubmitData(data)
            return
        }
        onSubmit(data)
    }

    const [value11] = useWatch({
        control,
        name: [schema[0].id]
    })

    const renderFilter = {
        [schema[1].id]: value11 == 'Да',
        [schema[2].id]: value11 == 'Нет',
        [schema[3].id]: value11 == 'Нет',
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmitWrapped)}
        >
            <Stack>
                <SchemaToComponents
                    schema={schema.slice(0, 4)}
                    formHook={formHook}
                    renderFilter={renderFilter}
                />
                <Group align='flex-start'>
                    <Button type='submit' disabled={submitText == states.fetch} bg='secondary'>
                        {value11 == 'Нет' ? submitText : 'Следующий раздел'}
                    </Button>
                </Group>
            </Stack>
        </form>
    )
}

const Tab2 = ({ onSubmit, setTabIndex }) => {
    const { handleSubmit, register, control, setValue, watch } = useForm()
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
        >
            <Stack>
                <Textarea
                    {...register('21', { required: true })}
                    label={schema[21]}
                    description='Напишите несколько слов, которые приходят на ум, когда вы думаете о городе'
                    rows={3}
                />
                <Controller
                    name='22'
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <Select
                            {...field}
                            label={schema[22]}
                            data={[
                                'Комфортно',
                                'Скорее да ',
                                'Скорее нет',
                                'Не комфортно',
                                'Затрудняюсь ответить',
                            ]}
                        />
                    )}
                />
                <Controller
                    name='23'
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <CheckboxWithOther
                            field={field}
                            setValue={setValue}
                            watch={watch}
                            label={schema[23]}
                            description='Укажите 5 наиболее значимых момента'
                            maxValues={5}
                            data={[
                                'Доступность и качество образования',
                                'Доступность и качество медицины',
                                'Разнообразие культурных и спортивных мероприятий',
                                'Транспортная связанность с другими населенными пунктами',
                                'Доступность и качество жилья',
                                'Качество городской среды и благоустройство',
                                'Историческое наследие',
                                'Сильное сообщество жителей города и дух соседства',
                                'Спокойная и безопасная обстановка',
                                'Уникальная природа',
                                'Экологическая чистота',
                                'Высокий уровень заработных плат',
                                'Уровень развития малого и среднего бизнеса ',
                                'Уровень развития промышленности',
                                'Уровень развития туризма',
                            ]}
                        />
                    )}
                />
                <Controller
                    name='24'
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <CheckboxWithOther
                            field={field}
                            setValue={setValue}
                            watch={watch}
                            label={schema[24]}
                            description='Укажите 3 наиболее значимых момента'
                            maxValues={3}
                            data={[
                                'Доступность и качество образования',
                                'Доступность и качество медицины',
                                'Разнообразие культурных и спортивных мероприятий',
                                'Транспортная связанность с другими населенными пунктами',
                                'Доступность и качество жилья',
                                'Качество городской среды и благоустройство',
                                'Историческое наследие',
                                'Сильное сообщество жителей города и дух соседства',
                                'Спокойная и безопасная обстановка',
                                'Уникальная природа',
                                'Экологическая чистота',
                                'Высокий уровень заработных плат',
                                'Уровень развития малого и среднего бизнеса ',
                                'Уровень развития промышленности',
                                'Уровень развития сельского хозяйства',
                                'Уровень развития туризма',
                            ]}
                        />
                    )}
                />
                <TextInput
                    {...register('25', { required: true })}
                    label={schema[25]}
                    description='Вы можете указать любое место или заведение в городе, в котором вам нравится проводить свое время или которое вызывает у вас приятные ощущения'
                />
                <Textarea
                    {...register('26', { required: true })}
                    label={schema[26]}
                    description='Это могут быть любые значимые для вас или просто интересные особенности города (в том числе в людях), которые отличают Заречный от других городов'
                    rows={3}
                />

                <Group align='flex-start'>
                    <Button onClick={() => setTabIndex(x => x - 1)} bg='secondary' >
                        Предыдущий раздел
                    </Button>
                    <Button type='submit' bg='secondary' >
                        Следующий раздел
                    </Button>
                </Group>
            </Stack>
        </form>
    )
}

const Tab3 = ({ onSubmit, setTabIndex }) => {
    const formHook = useForm()
    const { handleSubmit, register, control, watch, setValue } = formHook

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
        >
            <Stack>
                <SchemaToComponents
                    schema={schema.slice(4, 7)}
                    formHook={formHook}
                />
                <Group align='flex-start'>
                    <Button onClick={() => setTabIndex(x => x - 1)} bg={'secondary'}>
                        Предыдущий раздел
                    </Button>
                    <Button type='submit' bg={'secondary'}>
                        Следующий раздел
                    </Button>
                </Group>
            </Stack>
        </form>
    )
}

const Tab4 = ({ onSubmit, setTabIndex }) => {
    const { handleSubmit, register, control, watch, setValue } = useForm()

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
        >
            <Stack>
                <Controller
                    name='42'
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <CheckboxWithOther
                            field={field}
                            label={schema[42]}
                            description='Выберите не более 5 наиболее значимых проблем'
                            watch={watch}
                            setValue={setValue}
                            maxValues={5}
                            data={[
                                'Сложность получения мест в детских садах',
                                'Недоступность услуг здравоохранения',
                                'Низкое качество услуг здравоохранения',
                                'Недостаточность инфраструктуры для занятий спортом и физической культурой',
                                'Недостаток услуг в сфере культуры и досуга',
                                'Недостаточность или низкое качество работы общественного транспорта',
                                'Недоступность качественного жилья',
                                'Высокая стоимость покупки и аренды жилья',
                                'Низкое качество услуг ЖКХ (вода, газ, отопление, сбор и вывоз мусора)',
                                'Низкое качество содержания улиц и придомовых территорий',
                                'Недостаточность или низкое качество дорог',
                                'Низкое качество подключения к сети Интернет',
                                'Недоступность государственных услуг в цифровом (онлайн) формате или их неудовлетворительная работа',
                                'Недостаточный ассортимент или низкое качество продуктов питания',
                                'Плохая экологическая обстановка',
                                'Недостаток возможностей получения профессионального образования, прохождения курсов повышения квалификации ',
                                'Сложности ведения предпринимательской деятельности',
                                'Сложности с поиском работы на местном рынке труда',
                                'Не сталкивался с подобными проблемами',
                            ]}
                        />
                    )}
                />
                <Controller
                    name='43'
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <CheckboxWithOther
                            field={field}
                            label={schema[43]}
                            description='Укажите 5 наиболее значимых объектов'
                            watch={watch}
                            setValue={setValue}
                            maxValues={5}
                            data={[
                                'Школы и детские сады',
                                'Колледжи и университеты ',
                                'Медицинские учреждения',
                                'Общественные пространства, парки и зеленые зоны',
                                'Места общественного питания (кафе/рестораны)',
                                'Спортивные объекты (спортзалы, клубы, бассейны, стадионы)',
                                'Велодорожки',
                                'Уличные спортивные площадки',
                                'Культурные и досуговые объекты (театры, музеи, библиотеки, концертные залы)',
                                'Торговые центры',
                                'Развлекательные объекты (кинотеатры, парки аттракционов, развлекательные центры)',
                                'Детские развлекательные объекты (площадки, игровые комнаты, детские клубы)',
                                'Бытовые услуги (мастерские, салоны красоты, химчистки, ателье)',
                                'Специализированные услуги (банки, нотариус, фото)',
                                'Санатории, СПА-комплексы, бани',
                                'Благоустроенные места на природе (места для рыбалок, купания и пляжного отдыха)',
                                'Парковки и гаражи',
                                'Всего хватает',
                            ]}
                        />
                    )}
                />
                <Group align='flex-start'>
                    <Button onClick={() => setTabIndex(x => x - 1)} bg='secondary'>
                        Предыдущий раздел
                    </Button>
                    <Button type='submit' bg='secondary'>
                        Следующий раздел
                    </Button>
                </Group>
            </Stack>
        </form>
    )
}

const Tab5 = ({ onSubmit, setTabIndex }) => {
    const { handleSubmit, register, control, watch, setValue } = useForm()

    const [value56] = useWatch({
        control,
        name: ['56']
    })
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
        >
            <Stack>
                <Controller
                    name='51'
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <CheckboxWithOther
                            field={field}
                            watch={watch}
                            setValue={setValue}
                            label={schema[51]}
                            description='Укажите 2 наиболее часто используемых варианта'
                            // maxValues={2}
                            data={[
                                'Общественный транспорт (автобус, маршрутка и т.д.)',
                                'Личный автомобиль или автомобиль семьи',
                                'Автомобиль друзей/коллег/служебный',
                                'Мопед/мотоцикл/скутер',
                                'Такси',
                                'Велосипед/самокат',
                                'Хожу пешком',
                            ]}
                        />
                    )}
                />
                <Controller
                    name='52'
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <Select
                            {...field}
                            label={schema[52]}
                            description='Если вы не работаете или работаете удаленно, то укажите время до места, куда вы чаще всего ездите'
                            data={[
                                'Меньше 5 минут ',
                                '5 – 15 минут',
                                '15 – 30 минут',
                                '30 – 1 час',
                                '1 час – 1,5 часа',
                                'более 1,5 часов',
                            ]}
                        />
                    )}
                />
                <Controller
                    name='53'
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <Select
                            {...field}
                            label={schema[53]}
                            data={[
                                'Полностью согласен',
                                'Скорее согласен',
                                'Скорее не согласен',
                                'Полностью не согласен',
                                'Затрудняюсь ответить',
                            ]}
                        />
                    )}
                />
                <Controller
                    name='54'
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <CheckboxWithOther
                            field={field}
                            watch={watch}
                            setValue={setValue}
                            label={schema[54]}
                            data={[
                                'Низкая частота отправления общественного транспорта',
                                'Ограниченное время работы общественного транспорта',
                                'Отсутствие расписания движения общественного транспорта',
                                'Несоблюдение расписания общественным транспортом',
                                'Низкая скорость движения общественного транспорта',
                                'Переполненность общественного транспорта пассажирами',
                                'Высокая стоимость проезда',
                                'Неудобное расположение остановок общественного транспорта',
                                'Неудовлетворительное состояние остановочных пунктов',
                                'Невозможность оплаты проезда удобным способом (наличными и безналичным расчетом)',
                                'Грубое обращение водителей общественного транспорта',
                            ]}
                        />
                    )}
                />
                <Controller
                    name='55'
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <CheckboxList
                            field={field}
                            watch={watch}
                            label={schema[55]}
                            description='Укажите 4 наиболее значимых проблемы.'
                            maxValues={4}
                            data={[
                                'Пробки',
                                'Плохое состояние покрытия дорог',
                                'Низкое качество уборки дорог (от снега, мусора и др.)',
                                'Недостаток парковочных мест',
                                'Отсутствие выделенных полос для велосипедов/самокатов',
                                'Отсутствие пешеходных тротуаров',
                                'Отсутствие указателей и удобной навигации',
                                'Не сталкиваюсь с проблемами',
                            ]}
                        />
                    )}
                />
                <Controller
                    name='56'
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <Select
                            {...field}
                            label={schema[56]}
                            data={[
                                'Ежедневно',
                                'Несколько раз в неделю',
                                'Несколько раз в месяц',
                                'Несколько раз за полгода',
                                'Реже 1-2 раз в год',
                                'Никогда',
                            ]}
                        />
                    )}
                />
                {value56 != 'Никогда' && (
                    <Textarea
                        {...register('57', { required: true })}
                        label={schema[57]}
                        description='Это могут быть города или села, не входящие в МО Заречный, которые вы посещаете чаще всего'
                        rows={3}
                    />
                )}
                <Controller
                    name='57'
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <CheckboxWithOther
                            field={field}
                            watch={watch}
                            setValue={setValue}
                            label={schema[57]}
                            data={[
                                'Работа',
                                'Учеба',
                                'Занятия спортом',
                                'Отдых на природе',
                                'Общение с родственниками/друзьями и знакомыми',
                                'Проведение времени с детьми',
                                'Посещение медицинских учреждений',
                                'Посещение магазинов',
                                'Посещение кафе/баров/ресторанов',
                                'Посещение культурных мероприятий',
                                'Посещение развлекательных мероприятий',
                                'Посещение детских развлекательных центров и мероприятий',
                            ]}
                        />
                    )}
                />
                <Controller
                    name='58'
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <CheckboxWithOther
                            field={field}
                            watch={watch}
                            setValue={setValue}
                            label={schema[58]}
                            data={[
                                'Общественный транспорт (автобус, маршрутка и т.д.)',
                                'Личный автомобиль или автомобиль семьи',
                                'Автомобиль друзей/коллег/служебный',
                                'Поезд (пригородные электрички)',
                                'Мопед/мотоцикл/скутер',
                                'Такси',
                                'Велосипед',
                            ]}
                        />
                    )}
                />

                <Group align='flex-start'>
                    <Button onClick={() => setTabIndex(x => x - 1)} bg='secondary'>
                        Предыдущий раздел
                    </Button>
                    <Button type='submit' bg='secondary'>
                        Следующий раздел
                    </Button>
                </Group>
            </Stack>
        </form>
    )
}

const Tab6 = ({ onSubmit, setTabIndex }) => {
    const { handleSubmit, register, control, watch } = useForm()

    const [value61] = useWatch({
        control,
        name: ['61']
    })
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
        >
            <Stack>
                <Controller
                    name='61'
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <Select
                            {...field}
                            label={schema[61]}
                            data={[
                                'Да, планирую уехать через 1–2 года',
                                'Да, хотел(-а) бы уехать в будущем',
                                'Нет, хочу остаться жить в г. Заречный',
                                'Затрудняюсь ответить',
                            ]}
                        />
                    )}
                />
                {value61 != 'Нет, хочу остаться жить в г. Заречный' && (
                    <>
                        <TextInput
                            {...register('62', { required: true })}
                            label={schema[62]}
                        />
                        <TextInput
                            {...register('63', { required: true })}
                            label={schema[63]}
                        />
                    </>
                )}
                <Textarea
                    {...register('64', { required: true })}
                    label={schema[64]}
                    description='Вы можете написать самые смелые пожелания по развитию города'
                    rows={3}
                />
                <Textarea
                    {...register('65', { required: true })}
                    label={schema[65]}
                    rows={3}
                />
                <Controller
                    name='66'
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <CheckboxList
                            field={field}
                            watch={watch}
                            label={schema[66]}
                            description='Выберите не более 4-х вариантов.'
                            maxValues={4}
                            data={[
                                'Образование',
                                'Благоустройство городских пространств',
                                'Благоустройство двора и прилегающей к дому территории',
                                'Развитие общественного транспорта',
                                'Доступность и качество жилья, коммунальных услуг',
                                'Повышение социальной активности граждан, создание городского сообщества',
                                'Повышение информированности жителей о городских событиях',
                                'Физическая культура и спорт',
                                'Культура и досуг',
                                'Рынок труда и карьерные возможности',
                                'Сотовая и интернет-связь',
                                'Здравоохранение',
                                'Промышленное производство',
                                'Малое и среднее предпринимательство',
                                'Экология',
                                'Туризм',
                                'Социальная поддержка населения',
                            ]}
                        />
                    )}
                />

                <Group align='flex-start'>
                    <Button onClick={() => setTabIndex(x => x - 1)} bg='secondary'>
                        Предыдущий раздел
                    </Button>
                    <Button type='submit' bg='secondary'>
                        Следующий раздел
                    </Button>
                </Group>
            </Stack>
        </form>
    )
}

const Tab7 = ({ setTabIndex, globalFormValues, onSubmitData, submitText }) => {
    const { handleSubmit, register, control, watch, setValue } = useForm()
    const onSubmit = async (data) => {
        onSubmitData({ ...globalFormValues, ...data })
        return
    }
    const [value71] = useWatch({
        control,
        name: ['71']
    })
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
        >
            <Stack>
                <Controller
                    name='71'
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <Select
                            {...field}
                            label={schema[71]}
                            data={[
                                'Проживаю с рождения',
                                'Переехал',
                                'Проживаю временно (приехал (-а) на работу / по другим обстоятельствам)',
                            ]}
                        />
                    )}
                />
                {value71 != 'Проживаю с рождения' && (
                    <TextInput
                        {...register('72', { required: true })}
                        label={schema[72]}
                    />
                )}
                {!['Переехал', 'Проживаю временно (приехал (-а) на работу / по другим обстоятельствам)'].includes(value71) && (
                    <TextInput
                        {...register('73', { required: true })}
                        label={schema[73]}
                        description='Если вы уезжали из города и вернулись, отметьте суммарное количество прожитых в городе лет'
                    />
                )}
                <Controller
                    name='74'
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <Select
                            {...field}
                            label={schema[74]}
                            data={[
                                'В собственной квартире',
                                'В собственном доме',
                                'Живу в квартире / доме родителей',
                                'В арендованном жилье',
                                'В арендованном жилье с компенсацией проживания',
                            ]}
                        />
                    )}
                />
                <Controller
                    name='75'
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <Select
                            {...field}
                            label={schema[75]}
                            data={[
                                'Мужской',
                                'Женский',
                            ]}
                        />
                    )}
                />
                <TextInput
                    {...register('76', { required: true })}
                    label={schema[76]}
                />
                <Controller
                    name='77'
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <Select
                            {...field}
                            label={schema[77]}
                            data={[
                                'Холост',
                                'Есть партнер',
                                'Состою в официальном браке',
                                'Разведен(-а)',
                                'Вдовец/вдова',
                            ]}
                        />
                    )}
                />
                <Controller
                    name='78'
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <Select
                            {...field}
                            label={schema[78]}
                            data={[
                                'Нет',
                                '1 ребенок',
                                '2 ребенка',
                                '3 ребенка и более',
                            ]}
                        />
                    )}
                />
                <Controller
                    name='79'
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <Select
                            {...field}
                            label={schema[79]}
                            data={[
                                'Основное общее образование (5–9 классы)',
                                'Среднее общее образование (10–11 классы)',
                                'Среднее профессиональное образование (колледж, техникум)',
                                'Высшее образование (бакалавриат, магистратура, специалитет)',
                                'Ученая степень',
                            ]}
                        />
                    )}
                />
                <Controller
                    name='710'
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <Select
                            {...field}
                            label={schema[710]}
                            data={[
                                'Денег не хватает на продукты питания',
                                'На продукты денег хватает, но покупка одежды вызывает финансовые затруднения',
                                'Денег хватает на продукты и одежду, но покупка крупной бытовой техники (телевизора, холодильника) является проблемой̆',
                                'Могу без труда покупать крупную бытовую технику (телевизор, холодильник), но на дорогие вещи (автомобиль, квартиру) денег не хватает',
                                'Могу позволить себе достаточно дорогостоящие вещи (автомобиль, квартиру, дачу и др.)',
                            ]}
                        />
                    )}
                />
                <Controller
                    name='711'
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <CheckboxWithOther
                            field={field}
                            watch={watch}
                            setValue={setValue}
                            label={schema[711]}
                            data={[
                                'Наемный работник (специалист)',
                                'Наемный работник (руководитель)',
                                'Предприниматель, владелец бизнеса',
                                'Самозанятый/фрилансер',
                                'Студент/учащийся',
                                'Декретный отпуск/Домохозяйка (домохозяин)',
                                'Не работающий пенсионер',
                                'Работающий пенсионер',
                                'Временно безработный/в поиске работы',
                                'Не работаю',
                            ]}
                        />
                    )}
                />
                <Controller
                    name='712'
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <CheckboxWithOther
                            field={field}
                            watch={watch}
                            setValue={setValue}
                            label={schema[712]}
                            data={[
                                'Торговля',
                                'Транспорт и логистика',
                                'Сельское хозяйство и производство продуктов питания',
                                'Машиностроение',
                                'Электроэнергетика (работа на атомной АЭС)',
                                'Банки, страхование, финансы, бухгалтерия',
                                'Медицина и здравоохранение',
                                'Образование',
                                'Наука',
                                'Культура и искусство',
                                'Красота, фитнес, спорт',
                                'Туризм и досуг',
                                'Строительство и недвижимость',
                                'Средства массовой информации, медиа и маркетинг',
                                'Управление персоналом, кадры',
                                'Юриспруденция',
                                'Информационные технологии',
                                'Государственная и муниципальная служба',
                                'Я не работаю',
                            ]}
                        />
                    )}
                />

                <Group align='flex-start'>
                    <Button onClick={() => setTabIndex(x => x - 1)} bg='secondary'>
                        Предыдущий раздел
                    </Button>
                    <Button type='submit' disabled={submitText == states.fetch} bg='secondary'>
                        {submitText}
                    </Button>
                </Group>
            </Stack>
        </form>
    )
}

export const SurveyModal: FC<ContextModalProps> = () => {
    const modals = useModals()
    const [tabIndex, setTabIndex] = useState(0)
    const [globalFormValues, setGlobalFormValues] = useState(null)

    const ref = useRef<HTMLDivElement>(null)

    const [text, setText] = useState(states.start)

    const titles = {
        0: 'Приветствие',
        1: 'Общие вопросы',
        2: 'Идентичность Заречного',
        3: 'Досуг',
        4: 'Городская среда',
        5: 'Транспорт',
        6: 'Планы на будущее',
        7: 'Социально-демографические характеристики',
    }

    const onSubmitStep = async (data) => {
        setGlobalFormValues(x => ({ ...x, ...data }))
        setTabIndex(x => x + 1)
        ref.current.scrollIntoView()

        console.log(globalFormValues)
    }

    const onSubmitData = async (data) => {
        const body = JSON.stringify({
            data: {}
        })

        await fetch(
            `/collections/surveys/records`,
            {
                method: 'post',
                body,
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        )
            .then(async res => {
                const isResOk = res.status < 300

                setText(isResOk ? states.ok : states.error)

                if (!isResOk) { return }
                modals.closeContextModal('survey')
                modals.openModal({
                    centered: true,
                    withCloseButton: false,
                    children: (
                        <Stack>
                            <Center>
                                <Title order={1}>
                                    <Text
                                        inherit
                                    >
                                        Спасибо!
                                    </Text>
                                </Title>
                            </Center>
                            <Center>
                                <Text
                                    size='xl'
                                    ta={'center'}
                                >
                                    Опрос окончен.
                                </Text>
                            </Center>
                        </Stack>
                    ),
                    onClose: () => modals.closeAll()
                })
            })
            .catch(async e => {
                setText(states.error)
                console.log(e)
            })
    }

    return (
        <Tabs
            value={String(tabIndex)}
            onChange={() => null}
            variant='pills'
            color='secondary'
            styles={{
                tab: {
                    borderRadius: '40px'
                }
            }}

        >
            <div ref={ref} />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text
                    size='lg'
                    fw='bold'
                >
                    {tabIndex == 0
                        ? (titles[tabIndex])
                        : (`${tabIndex}/${Object.keys(titles).length} ${titles[tabIndex]} `)
                    }
                </Text>
                <CloseButton
                    radius={'40px'}
                    onClick={modals.closeAll}
                />
            </div>

            <Space h='xl' />

            <Tabs.Panel value='0'>
                <Stack gap='md'>
                    <Title>
                        Уважаемый участник опроса!
                    </Title>
                    <Text>
                        Администрация МО Заречный совместно с госкорпорацией «Росатом» разрабатывает Мастер-план МО Заречный, который позволит определить общие принципы и направления развития территории до 2040 года.
                        Нам важно узнать, что волнует жителей города и как должен развиваться Заречный в будущем. Предложения и пожелания жителей будут учтены в разработке Мастер-плана.
                        Анкета содержит перечень вопросов о современном состоянии городской среды и перспективах развития территории. Прохождение анкеты займет около 15 минут. Мы гарантируем полную конфиденциальность.

                    </Text>
                    <Center>
                        <Button
                            bg='secondary'
                            onClick={() => {
                                setTabIndex(x => x + 1)
                                ref.current.scrollIntoView()
                            }}
                        >
                            Начать опрос
                        </Button>
                    </Center>
                </Stack>
            </Tabs.Panel>
            <Tabs.Panel value='1'>
                <Tab1
                    onSubmit={onSubmitStep}
                    submitText={text}
                    onSubmitData={onSubmitData}
                />
            </Tabs.Panel>
            {/* <Tabs.Panel value='2'>
                <Tab2
                    onSubmit={onSubmitStep}
                    setTabIndex={setTabIndex}
                />
            </Tabs.Panel> */}
            <Tabs.Panel value='2'>
                <Tab3
                    onSubmit={onSubmitStep}
                    setTabIndex={setTabIndex}
                />
            </Tabs.Panel>
            {/* <Tabs.Panel value='4'>
                <Tab4
                    onSubmit={onSubmitStep}
                    setTabIndex={setTabIndex}
                />
            </Tabs.Panel>
            <Tabs.Panel value='5'>
                <Tab5
                    onSubmit={onSubmitStep}
                    setTabIndex={setTabIndex}
                />
            </Tabs.Panel>
            <Tabs.Panel value='6'>
                <Tab6
                    onSubmit={onSubmitStep}
                    setTabIndex={setTabIndex}
                />
            </Tabs.Panel>
            <Tabs.Panel value='7'>
                <Tab7
                    setTabIndex={setTabIndex}
                    globalFormValues={globalFormValues}
                    onSubmitData={onSubmitData}
                    submitText={text}
                />
            </Tabs.Panel> */}
        </Tabs>
    )
}
