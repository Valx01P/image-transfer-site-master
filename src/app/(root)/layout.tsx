import Header from "../../components/header";
import Footer from "../../components/footer";

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <div className="flex h-screen flex-col">
        <Header />
        <main className="flex flex-1 items-center justify-center relative">{children}</main>
        <Footer />
      </div>
    )
  }
  