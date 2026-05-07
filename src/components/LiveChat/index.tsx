import Script from 'next/script'

export function LiveChat() {
  const widgetId = process.env.NEXT_PUBLIC_JIVO_CHAT_WIDGET_ID

  if (!widgetId) {
    return null
  }

  return (
    <Script
      id="jivo-live-chat"
      src={`https://code.jivo.ru/widget/${widgetId}`}
      strategy="afterInteractive"
    />
  )
}
