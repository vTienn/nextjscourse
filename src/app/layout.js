export const metadata = {
  title: "VieTie | CourseOn",
  description: "My Website"
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body style={{ margin: 0 }}> {children} </body>{" "}
    </html>
  )
}
