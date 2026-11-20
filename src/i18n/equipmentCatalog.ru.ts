export const ruEquipmentCatalog = {
  intro: 'Наш автопарк позволяет перевозить грузы и выполнять работы в условиях бездорожья.',
  sections: {
    tracked: 'Гусеничные вездеходы',
    lowPressure: 'Вездеходы на шинах низкого давления',
    road: 'Автомобильная техника',
    special: 'Техника специального назначения',
    administrative: 'Административная техника',
  },
  labels: {
    count: 'Количество в нашем автопарке',
    payload: 'Грузоподъёмность',
    platform: 'Габариты площадки',
    cargoUnit: 'Размер грузового звена',
    feature: 'Основная особенность',
    use: 'Идеально для',
    configuration: 'Комплектация',
    terrain: 'Среда эксплуатации',
    passengers: 'Пассажировместимость',
  },
  titles: {
    'vityaz-dt30-mnl': 'Витязь ДТ-30-МНЛ с платформой',
    'vityaz-dt30-pmn': 'Витязь ДТ-30-ПМН плавающий бортовой',
    'vityaz-dt30-pmnk': 'Витязь ДТ-30-ПМНК',
    'vityaz-dt30-pmnke': 'Витязь ДТ-30-ПМНКЭ',
    'vityaz-dt7-p': 'Витязь ДТ-7-П',
    'vityaz-dt30-pnmk': 'Витязь ДТ-30ПНМК',
    'rusak-k8': 'Вездеход Русак К-8',
    'severtrak-profi-max': 'Вездеход Севертрак Профи-Макс',
    'severtrak-pickup-max': 'Вездеход Севертрак Пикап Макс',
    tractors: 'Тягачи Iveco, Mercedes, Astra, Scania',
    trailers: 'Полуприцепы 98131C, 98131D, CAB, тралы Kassbohrer',
    zetros: 'Бортовой Mercedes Zetros с КМУ',
    ivanovets: 'Автокран Ивановец 25 тонн на базе Урал',
    xcmg: 'Погрузчик XCMG-500',
    scania: 'Самосвал Scania 6×6',
    ford: 'Автомобиль Ford F350',
  },
  values: {
    tons15: 'до 15 тонн груза',
    tons7: 'до 7 тонн груза',
    tons25: 'до 2,5 тонн',
    tons2: 'до 2 тонн',
    platformVityaz: '10,5 × 3 м',
    cargoUnit: '6,8 × 2,8 м, высота бортов 1,5 м',
    oversize: 'перевозка негабаритного груза и техники в условиях абсолютного бездорожья',
    enclosed: 'закрытая перевозка грузов с защитой от воздействия внешней среды',
    crane9: 'установлена крановая установка (КМУ) ИФЭ-300С грузоподъёмностью 9 тонн',
    tundra: 'нефтегазовой отрасли, для работы в тундре при любых погодных условиях',
    selfLoading:
      'нефтегазовой отрасли, для работы в тундре при любых погодных условиях с самопогрузкой и саморазгрузкой',
    repairEquipment:
      'на первом звене установлена КМУ ИФЭ-300С грузоподъёмностью 9 тонн, на втором — экскаватор Hitachi 120, а также грязевой насос со сварочным агрегатом',
    emergency:
      'аварийный комплекс для обслуживания и устранения аварий на газопроводах, нефтепроводах и ЛЭП',
    maneuverable: 'манёвренная перевозка грузов',
    crane: 'кран',
    peopleAndCargo: 'перевозка людей и груза',
    terrain: 'бездорожье, снег, тундра, болото, песок, водные преграды',
    profiPassengers: 'до 2+12 человек (6 спальных мест)',
    pickupPassengers: 'от 2 человек',
    platformSevertrak: '6,8 × 2,5 × 3 м',
  },
}

type StringFields<T> = { [Key in keyof T]: string }

export type EquipmentCatalogTranslation = {
  intro: string
  sections: StringFields<typeof ruEquipmentCatalog.sections>
  labels: StringFields<typeof ruEquipmentCatalog.labels>
  titles: StringFields<typeof ruEquipmentCatalog.titles>
  values: StringFields<typeof ruEquipmentCatalog.values>
}
