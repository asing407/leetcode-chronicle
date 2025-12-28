import { Header } from '@/components/Header';
import { StatsSection } from '@/components/StatsSection';
import { SkillsSection } from '@/components/SkillsSection';
import { ProblemsTable } from '@/components/ProblemsTable';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <StatsSection />
        <SkillsSection />
        <ProblemsTable />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
