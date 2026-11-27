import type { AppLocale } from './locales'

export const managementFactKeys = ['birthDate', 'birthPlace', 'residence', 'education'] as const
export const managementBiographyKeys = ['earlyYears', 'pilot', 'business'] as const

export const managementHobbyPhotos = {
  motorcycle: 'vlad-1.jpg',
  skiing: 'vlad-3.jpg',
  hiking: 'vlad-2.jpg',
  fitness: 'vlad-4.jpg',
  hockey: 'vlad-5.jpg',
} as const

type ManagementProfileMessages = {
  fullName: string
  role: string
  metadataDescription: string
  facts: Record<(typeof managementFactKeys)[number], { label: string; value: string }>
  biography: Record<(typeof managementBiographyKeys)[number], { title: string; text: string }>
  hobbiesTitle: string
  hobbies: Record<keyof typeof managementHobbyPhotos, { title: string; alt: string; caption: string }>
}

export const managementProfileMessages: Record<AppLocale, ManagementProfileMessages> = {
  ru: {
    fullName: 'Владислав Николаевич Пимонов',
    role: 'Генеральный директор и основатель Runway Trans',
    metadataDescription: 'Биография Владислава Пимонова, генерального директора и основателя Runway Trans.',
    facts: {
      birthDate: { label: 'Дата рождения', value: '11 марта 1971 года' },
      birthPlace: {
        label: 'Место рождения',
        value: 'с. Ванавара, Эвенкийский муниципальный округ Красноярского края',
      },
      residence: { label: 'Город проживания', value: 'Красноярск' },
      education: { label: 'Образование', value: 'Кременчугская авиационная школа' },
    },
    biography: {
      earlyYears: {
        title: 'Ранние годы и образование',
        text: 'Родился в селе Ванавара Эвенкийского муниципального округа. Окончил школу с отличием, затем учился в Кременчугской авиационной школе.',
      },
      pilot: {
        title: 'Работа пилотом',
        text: 'Летал на Ми-8 по всей России и участвовал в спасательных операциях. Налетал более 15 000 часов.',
      },
      business: {
        title: 'Предпринимательская деятельность',
        text: 'Начал с торговли в Ванаваре, затем занялся недвижимостью.',
      },
    },
    hobbiesTitle: 'Увлечения',
    hobbies: {
      motorcycle: {
        title: 'Мотопоездки',
        alt: 'Владислав рядом с мотоциклом Ducati',
        caption: 'На своём мотоцикле Ducati Multistrada V4 интересно заезжать в самые укромные места нашей страны',
      },
      skiing: {
        title: 'Горные лыжи',
        alt: 'Владислав на лыжах на заснеженном склоне',
        caption: 'Привлекает мощь гор и скорость',
      },
      hiking: {
        title: 'Горы, скалы и походы',
        alt: 'Владислав на скале над лесом',
        caption: 'Высота и опасность — то, что сопровождает всю жизнь',
      },
      fitness: {
        title: 'Фитнес-зал',
        alt: 'Владислав с гирей в фитнес-зале',
        caption: 'Всегда быть в форме — обязательное условие в нашей работе',
      },
      hockey: {
        title: 'Хоккей',
        alt: 'Владислав на катке с хоккейной клюшкой',
        caption: 'В детстве тренировался в хоккейной школе г. Омска «Авангард». Вернулся на каток в 2024.',
      },
    },
  },
  en: {
    fullName: 'Vladislav Nikolaevich Pimonov',
    role: 'CEO and founder of Runway Trans',
    metadataDescription: 'Biography of Vladislav Pimonov, CEO and founder of Runway Trans.',
    facts: {
      birthDate: { label: 'Date of birth', value: '11 March 1971' },
      birthPlace: {
        label: 'Place of birth',
        value: 'Vanavara, Evenki Municipal District, Krasnoyarsk Krai',
      },
      residence: { label: 'Residence', value: 'Krasnoyarsk' },
      education: { label: 'Education', value: 'Kremenchuk Aviation School' },
    },
    biography: {
      earlyYears: {
        title: 'Early years and education',
        text: 'He was born in the village of Vanavara in the Evenki Municipal District. He graduated from school with honors and went on to study at Kremenchuk Aviation School.',
      },
      pilot: {
        title: 'Career as a pilot',
        text: 'He flew Mi-8 helicopters across Russia, took part in rescue operations, and logged more than 15,000 flight hours.',
      },
      business: {
        title: 'Entrepreneurship',
        text: 'He started out in trade in Vanavara and later went into real estate.',
      },
    },
    hobbiesTitle: 'Interests',
    hobbies: {
      motorcycle: {
        title: 'Motorcycle trips',
        alt: 'Vladislav beside his Ducati motorcycle',
        caption: 'I enjoy taking my Ducati Multistrada V4 to the most secluded corners of our country',
      },
      skiing: {
        title: 'Alpine skiing',
        alt: 'Vladislav skiing on a snowy slope',
        caption: 'I am drawn to the power of the mountains and the speed',
      },
      hiking: {
        title: 'Mountains, rocks, and hiking',
        alt: 'Vladislav on a rocky outcrop above a forest',
        caption: 'Heights and danger have been part of my life all along',
      },
      fitness: {
        title: 'Fitness training',
        alt: 'Vladislav holding a kettlebell in the gym',
        caption: 'Staying in shape is essential in our line of work',
      },
      hockey: {
        title: 'Ice hockey',
        alt: 'Vladislav on the ice with a hockey stick',
        caption: 'As a child, I trained at the Avangard hockey school in Omsk. I returned to the ice in 2024.',
      },
    },
  },
  fr: {
    fullName: 'Vladislav Nikolaïevitch Pimonov',
    role: 'Directeur général et fondateur de Runway Trans',
    metadataDescription: 'Biographie de Vladislav Pimonov, directeur général et fondateur de Runway Trans.',
    facts: {
      birthDate: { label: 'Date de naissance', value: '11 mars 1971' },
      birthPlace: {
        label: 'Lieu de naissance',
        value: 'Vanavara, district municipal des Evenks, kraï de Krasnoïarsk',
      },
      residence: { label: 'Lieu de résidence', value: 'Krasnoïarsk' },
      education: { label: 'Formation', value: 'École d’aviation de Krementchouk' },
    },
    biography: {
      earlyYears: {
        title: 'Jeunesse et formation',
        text: 'Il est né dans le village de Vanavara, dans le district municipal des Evenks. Après avoir terminé ses études secondaires avec mention, il a étudié à l’école d’aviation de Krementchouk.',
      },
      pilot: {
        title: 'Carrière de pilote',
        text: 'Il a piloté des hélicoptères Mi-8 dans toute la Russie, participé à des opérations de sauvetage et totalisé plus de 15 000 heures de vol.',
      },
      business: {
        title: 'Parcours entrepreneurial',
        text: 'Il a commencé dans le commerce à Vanavara avant de se tourner vers l’immobilier.',
      },
    },
    hobbiesTitle: 'Centres d’intérêt',
    hobbies: {
      motorcycle: {
        title: 'Voyages à moto',
        alt: 'Vladislav à côté de sa moto Ducati',
        caption: 'J’aime explorer les coins les plus reculés de notre pays au guidon de ma Ducati Multistrada V4',
      },
      skiing: {
        title: 'Ski alpin',
        alt: 'Vladislav à skis sur une pente enneigée',
        caption: 'La puissance des montagnes et la vitesse m’attirent',
      },
      hiking: {
        title: 'Montagne, rochers et randonnée',
        alt: 'Vladislav sur un rocher au-dessus de la forêt',
        caption: 'L’altitude et le danger m’accompagnent depuis toujours',
      },
      fitness: {
        title: 'Entraînement en salle',
        alt: 'Vladislav tient un poids dans une salle de sport',
        caption: 'Rester en forme est indispensable dans notre métier',
      },
      hockey: {
        title: 'Hockey sur glace',
        alt: 'Vladislav sur la glace avec une crosse de hockey',
        caption: 'Enfant, je m’entraînais à l’école de hockey Avangard d’Omsk. Je suis retourné sur la glace en 2024.',
      },
    },
  },
  kk: {
    fullName: 'Владислав Николаевич Пимонов',
    role: 'Runway Trans компаниясының бас директоры және негізін қалаушы',
    metadataDescription: 'Runway Trans компаниясының бас директоры және негізін қалаушы Владислав Пимоновтың өмірбаяны.',
    facts: {
      birthDate: { label: 'Туған күні', value: '1971 жылғы 11 наурыз' },
      birthPlace: {
        label: 'Туған жері',
        value: 'Красноярск өлкесінің Эвенкі муниципалдық округіндегі Ванавара ауылы',
      },
      residence: { label: 'Тұратын қаласы', value: 'Красноярск' },
      education: { label: 'Білімі', value: 'Кременчуг авиация мектебі' },
    },
    biography: {
      earlyYears: {
        title: 'Балалық шағы мен білімі',
        text: 'Эвенкі муниципалдық округіндегі Ванавара ауылында туған. Мектепті үздік бітіріп, кейін Кременчуг авиация мектебінде оқыған.',
      },
      pilot: {
        title: 'Ұшқыш қызметі',
        text: 'Ми-8 тікұшағымен Ресейдің түкпір-түкпіріне ұшқан, құтқару операцияларына қатысқан. Ұшу уақыты 15 000 сағаттан асқан.',
      },
      business: {
        title: 'Кәсіпкерлік қызметі',
        text: 'Ванаварада саудадан бастап, кейін жылжымайтын мүлік саласына көшкен.',
      },
    },
    hobbiesTitle: 'Қызығушылықтары',
    hobbies: {
      motorcycle: {
        title: 'Мотоциклмен саяхат',
        alt: 'Владислав Ducati мотоциклінің жанында',
        caption: 'Ducati Multistrada V4 мотоцикліммен еліміздің ең оңаша жерлеріне барған қызық',
      },
      skiing: {
        title: 'Тау шаңғысы',
        alt: 'Владислав қарлы беткейде шаңғы теуіп жүр',
        caption: 'Таулардың айбыны мен жылдамдық өзіне тартады',
      },
      hiking: {
        title: 'Таулар, жартастар және жорықтар',
        alt: 'Владислав орман үстіндегі жартаста тұр',
        caption: 'Биіктік пен қауіп — өмір бойы серігім',
      },
      fitness: {
        title: 'Фитнес залы',
        alt: 'Владислав спорт залында кір тасын ұстап тұр',
        caption: 'Үнемі бабында болу — жұмысымыздың міндетті шарты',
      },
      hockey: {
        title: 'Хоккей',
        alt: 'Владислав мұз айдынында хоккей таяғымен тұр',
        caption: 'Бала кезімде Омбыдағы «Авангард» хоккей мектебінде жаттықтым. 2024 жылы мұз айдынына қайта оралдым.',
      },
    },
  },
  zh: {
    fullName: '弗拉季斯拉夫·尼古拉耶维奇·皮莫诺夫',
    role: 'Runway Trans 首席执行官兼创始人',
    metadataDescription: 'Runway Trans 首席执行官兼创始人弗拉季斯拉夫·皮莫诺夫的生平。',
    facts: {
      birthDate: { label: '出生日期', value: '1971年3月11日' },
      birthPlace: { label: '出生地', value: '克拉斯诺亚尔斯克边疆区埃文基市政区瓦纳瓦拉村' },
      residence: { label: '居住地', value: '克拉斯诺亚尔斯克' },
      education: { label: '教育背景', value: '克列缅丘格航空学校' },
    },
    biography: {
      earlyYears: {
        title: '早年经历与教育',
        text: '他出生于埃文基市政区的瓦纳瓦拉村，以优异的成绩中学毕业后，进入克列缅丘格航空学校学习。',
      },
      pilot: {
        title: '飞行生涯',
        text: '他驾驶米-8直升机飞遍俄罗斯，参加过救援行动，累计飞行超过15,000小时。',
      },
      business: {
        title: '创业经历',
        text: '他最初在瓦纳瓦拉从事贸易，后来进入房地产行业。',
      },
    },
    hobbiesTitle: '兴趣爱好',
    hobbies: {
      motorcycle: {
        title: '摩托车旅行',
        alt: '弗拉季斯拉夫坐在杜卡迪摩托车旁',
        caption: '我喜欢骑着自己的 Ducati Multistrada V4 探访我们国家最偏僻的角落',
      },
      skiing: {
        title: '高山滑雪',
        alt: '弗拉季斯拉夫在雪坡上滑雪',
        caption: '群山的力量和滑行的速度都吸引着我',
      },
      hiking: {
        title: '山峰、岩石与徒步',
        alt: '弗拉季斯拉夫站在森林上方的岩石上',
        caption: '高处和危险始终伴随着我的人生',
      },
      fitness: {
        title: '健身训练',
        alt: '弗拉季斯拉夫在健身房举壶铃',
        caption: '保持良好的体能是我们工作中的必要条件',
      },
      hockey: {
        title: '冰球',
        alt: '弗拉季斯拉夫手持冰球杆站在冰面上',
        caption: '我小时候在鄂木斯克的先锋冰球学校训练，2024年重返冰场。',
      },
    },
  },
}
