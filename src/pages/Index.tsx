import { Header } from '@/components/Header';
import { StatsSection } from '@/components/StatsSection';
import { SkillsSection } from '@/components/SkillsSection';
import { ProblemsTable } from '@/components/ProblemsTable';
import { ActivityHeatmap } from '@/components/ActivityHeatmap';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <StatsSection />
        
        {/* Activity Heatmap Section */}
        <section id="activity" className="py-8 pb-16">
          <div className="container mx-auto px-6">
            <ActivityHeatmap />
          </div>
        </section>
        
        <SkillsSection />
        <ProblemsTable />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
