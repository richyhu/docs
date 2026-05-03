import HeroSection from "@/components/Home/HeroSection"
import Header from "@/components/Layout/Header"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50/50 to-white">
      <Header />
      <HeroSection />
      <footer className="py-12 text-center text-slate-400 text-sm">
        <p>AI 智能帮助文档系统 · 让知识获取更高效</p>
      </footer>
    </div>
  )
}
