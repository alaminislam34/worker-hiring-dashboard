import "./globals.css";
import en from "@/i18n/locales/en.json";
import I18nProvider from "@/app/providers/I18nProvider";

export const metadata = {
  title: en.app.title,
  description: en.app.description,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
