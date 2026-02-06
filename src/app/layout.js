import "./globals.css";

export const metadata = {
  title: "Worker Hiring Dashboard",
  description:
    "Find your tutor or student through this app smoothly and professionally.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
