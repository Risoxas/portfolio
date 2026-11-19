import { CloudArchitecture } from "@/components/CloudArchitecture";
import { ContactSection } from "@/components/ContactSection";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProjectsSection } from "@/components/ProjectsSection";
import { SkillsMatrix } from "@/components/SkillsMatrix";
import { getGitHubRepos } from "@/lib/github";

export default async function HomePage() {
  const { repos, source } = await getGitHubRepos("Risoxas");

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <CloudArchitecture />
        <ExperienceTimeline />
        <ProjectsSection repos={repos} repoSource={source} />
        <SkillsMatrix />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
