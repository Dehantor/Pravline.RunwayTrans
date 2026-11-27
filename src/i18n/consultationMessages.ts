import type { ConsultationField } from '@/consultation/contract'
import type { AppLocale } from './locales'

export type ConsultationMessages = {
  title: string
  imageAlt: string
  points: string[]
  labels: Record<Exclude<ConsultationField, 'consent'>, string>
  consentStandalone: string
  consentPrefix: string
  policy: string
  policyUnavailable: string
  javascriptRequired: string
  contacts: string
  submit: string
  submitting: string
  success: string
  failed: string
  invalid: string
  tooLarge: string
  errors: Record<ConsultationField, string>
}

export const consultationMessages: Record<AppLocale, ConsultationMessages> = {
  ru: {
    title: 'Начните работать с нами',
    imageAlt: 'Гусеничный вездеход «Витязь»',
    points: [
      'Расчёт стоимости перевозки',
      'Сроки доставки',
      'Консультация специалистов',
      'Прочие вопросы',
    ],
    labels: { name: 'Ваше имя', phone: 'Телефон', email: 'E-mail', message: 'Сообщение' },
    consentStandalone: 'Я даю согласие на обработку моих персональных данных.',
    consentPrefix: 'Я согласен с',
    policy: 'политикой обработки персональных данных',
    policyUnavailable: 'Онлайн-заявки временно недоступны.',
    javascriptRequired: 'Включите JavaScript, чтобы отправить онлайн-заявку.',
    contacts: 'Свяжитесь с нами',
    submit: 'Отправить',
    submitting: 'Отправляем…',
    success: 'Заявка принята. Мы свяжемся с вами.',
    failed: 'Не удалось отправить заявку. Попробуйте ещё раз.',
    invalid: 'Проверьте отмеченные поля.',
    tooLarge: 'Заявка слишком длинная. Сократите сообщение и отправьте ещё раз.',
    errors: {
      name: 'Укажите имя до 120 символов.',
      phone: 'Укажите телефон с 7–15 цифрами.',
      email: 'Проверьте адрес электронной почты.',
      message: 'Сообщение должно содержать не более 2000 символов.',
      consent: 'Подтвердите согласие на обработку персональных данных.',
    },
  },
  en: {
    title: 'Start working with us',
    imageAlt: 'Vityaz tracked all-terrain vehicle',
    points: ['Freight cost estimate', 'Delivery times', 'Expert advice', 'Other questions'],
    labels: { name: 'Your name', phone: 'Phone', email: 'Email', message: 'Message' },
    consentStandalone: 'I consent to the processing of my personal data.',
    consentPrefix: 'I agree to the',
    policy: 'personal data processing policy',
    policyUnavailable: 'Online enquiries are temporarily unavailable.',
    javascriptRequired: 'Enable JavaScript to send an online enquiry.',
    contacts: 'Contact us',
    submit: 'Send',
    submitting: 'Sending…',
    success: 'We received your enquiry and will be in touch.',
    failed: 'We could not send your enquiry. Please try again.',
    invalid: 'Check the marked fields.',
    tooLarge: 'Your enquiry is too long. Shorten your message and try again.',
    errors: {
      name: 'Enter your name, up to 120 characters.',
      phone: 'Enter a phone number with 7–15 digits.',
      email: 'Check your email address.',
      message: 'Use no more than 2,000 characters.',
      consent: 'Confirm your consent to the processing of your personal data.',
    },
  },
  fr: {
    title: 'Commencez à travailler avec nous',
    imageAlt: 'Véhicule tout-terrain chenillé Vityaz',
    points: [
      'Estimation du coût du transport',
      'Délais de livraison',
      'Conseils d’experts',
      'Autres questions',
    ],
    labels: { name: 'Votre nom', phone: 'Téléphone', email: 'E-mail', message: 'Message' },
    consentStandalone: 'Je consens au traitement de mes données personnelles.',
    consentPrefix: 'J’accepte la',
    policy: 'politique de traitement des données personnelles',
    policyUnavailable: 'Les demandes en ligne sont temporairement indisponibles.',
    javascriptRequired: 'Activez JavaScript pour envoyer une demande en ligne.',
    contacts: 'Contactez-nous',
    submit: 'Envoyer',
    submitting: 'Envoi en cours…',
    success: 'Votre demande a été reçue. Nous vous contacterons.',
    failed: 'Votre demande n’a pas pu être envoyée. Réessayez.',
    invalid: 'Vérifiez les champs signalés.',
    tooLarge: 'Votre demande est trop longue. Raccourcissez votre message, puis réessayez.',
    errors: {
      name: 'Indiquez votre nom dans la limite de 120 caractères.',
      phone: 'Indiquez un numéro de téléphone de 7 à 15 chiffres.',
      email: 'Vérifiez votre adresse e-mail.',
      message: 'Le message doit contenir au maximum 2 000 caractères.',
      consent: 'Confirmez votre consentement au traitement de vos données personnelles.',
    },
  },
  kk: {
    title: 'Бізбен жұмысты бастаңыз',
    imageAlt: '«Витязь» шынжыр табанды жол талғамайтын көлігі',
    points: [
      'Тасымалдау құнын есептеу',
      'Жеткізу мерзімдері',
      'Мамандардың кеңесі',
      'Басқа сұрақтар',
    ],
    labels: { name: 'Атыңыз', phone: 'Телефон', email: 'Электрондық пошта', message: 'Хабарлама' },
    consentStandalone: 'Мен дербес деректерімді өңдеуге келісім беремін.',
    consentPrefix: 'Мен дербес деректерді',
    policy: 'өңдеу саясатымен келісемін',
    policyUnavailable: 'Онлайн өтінім беру уақытша қолжетімсіз.',
    javascriptRequired: 'Онлайн өтінім жіберу үшін JavaScript қосыңыз.',
    contacts: 'Бізбен байланысыңыз',
    submit: 'Жіберу',
    submitting: 'Жіберіліп жатыр…',
    success: 'Өтінім қабылданды. Біз сізбен хабарласамыз.',
    failed: 'Өтінімді жіберу мүмкін болмады. Қайталап көріңіз.',
    invalid: 'Белгіленген өрістерді тексеріңіз.',
    tooLarge: 'Өтінім тым ұзын. Хабарламаны қысқартып, қайта жіберіңіз.',
    errors: {
      name: '120 таңбадан аспайтын атыңызды енгізіңіз.',
      phone: '7–15 цифрдан тұратын телефон нөмірін енгізіңіз.',
      email: 'Электрондық пошта мекенжайын тексеріңіз.',
      message: 'Хабарлама 2000 таңбадан аспауы керек.',
      consent: 'Дербес деректеріңізді өңдеуге келісіміңізді растаңыз.',
    },
  },
  zh: {
    title: '开始与我们合作',
    imageAlt: '“勇士”履带式全地形车',
    points: ['估算运输费用', '交付时间', '专家咨询', '其他问题'],
    labels: { name: '您的姓名', phone: '电话', email: '电子邮箱', message: '留言' },
    consentStandalone: '我同意处理我的个人信息。',
    consentPrefix: '我同意',
    policy: '个人数据处理政策',
    policyUnavailable: '在线申请暂不可用。',
    javascriptRequired: '请启用 JavaScript 以在线提交申请。',
    contacts: '联系我们',
    submit: '发送',
    submitting: '正在发送…',
    success: '已收到您的申请，我们会与您联系。',
    failed: '无法发送申请，请重试。',
    invalid: '请检查标记的字段。',
    tooLarge: '申请内容过长，请缩短留言后重试。',
    errors: {
      name: '请输入不超过 120 个字符的姓名。',
      phone: '请输入包含 7 至 15 位数字的电话号码。',
      email: '请检查电子邮箱地址。',
      message: '留言不能超过 2000 个字符。',
      consent: '请确认您同意处理您的个人信息。',
    },
  },
}
