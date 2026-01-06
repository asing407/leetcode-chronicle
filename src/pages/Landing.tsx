import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Github, 
  Chrome, 
  ArrowRight, 
  Check, 
  ExternalLink,
  Zap,
  BarChart3,
  GitBranch,
  Sun,
  Moon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { VantaBackground } from '@/components/VantaBackground';

type OnboardingOption = 'existing' | 'setup' | null;

export default function Landing() {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [selectedOption, setSelectedOption] = useState<OnboardingOption>(null);

  // If user is logged in and has completed onboarding, redirect to dashboard
  if (user && profile?.onboarding_completed) {
    navigate('/dashboard');
    return null;
  }

  return (
    <div className="min-h-screen bg-background/80 relative">
      <VantaBackground />
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
                <span className="font-bold text-lg text-primary-foreground">LC</span>
              </div>
              <div>
                <h1 className="font-semibold text-lg text-foreground">LeetCode Chronicle</h1>
                <p className="text-xs text-muted-foreground">Track your coding journey</p>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-lg"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </Button>
              
              {user ? (
                <Button onClick={() => navigate('/dashboard')}>
                  Go to Dashboard
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={() => navigate('/auth')}>
                  Sign In
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Your LeetCode Journey,
              <span className="block text-primary">Beautifully Tracked</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Connect your GitHub repository powered by LeetHub 3.0 and visualize your 
              coding progress with stunning analytics and insights.
            </p>

            {/* Feature Highlights */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border">
                <BarChart3 className="w-4 h-4 text-primary" />
                <span className="text-sm text-foreground">Real-time Stats</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border">
                <GitBranch className="w-4 h-4 text-primary" />
                <span className="text-sm text-foreground">GitHub Sync</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border">
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-sm text-foreground">Activity Heatmap</span>
              </div>
            </div>

            {!user && (
              <Button 
                size="lg" 
                onClick={() => navigate('/auth')}
                className="h-14 px-8 text-lg gap-2"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Button>
            )}
          </motion.div>
        </div>
      </section>

      {/* Onboarding Options - Show only if logged in but not onboarded */}
      {user && !profile?.onboarding_completed && (
        <section className="py-16 bg-card/50">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                How would you like to get started?
              </h3>
              <p className="text-muted-foreground">
                Choose the option that best describes your current setup
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* Option A: Already using LeetHub */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <button
                  onClick={() => setSelectedOption('existing')}
                  className={`w-full p-6 rounded-2xl border-2 transition-all text-left ${
                    selectedOption === 'existing'
                      ? 'border-primary bg-primary/5'
                      : 'border-border bg-card hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Github className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-foreground mb-2">
                        I already use LeetHub
                      </h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Connect your existing LeetHub 3.0 GitHub repository to start tracking
                      </p>
                      <div className="flex items-center gap-2 text-sm text-primary">
                        <Check className="w-4 h-4" />
                        Quick setup in under 1 minute
                      </div>
                    </div>
                  </div>
                </button>
              </motion.div>

              {/* Option B: New to LeetHub */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <button
                  onClick={() => setSelectedOption('setup')}
                  className={`w-full p-6 rounded-2xl border-2 transition-all text-left ${
                    selectedOption === 'setup'
                      ? 'border-primary bg-primary/5'
                      : 'border-border bg-card hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Chrome className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-foreground mb-2">
                        I don't use LeetHub yet
                      </h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        We'll guide you through setting up LeetHub 3.0 to start tracking
                      </p>
                      <div className="flex items-center gap-2 text-sm text-primary">
                        <Check className="w-4 h-4" />
                        Step-by-step setup guide
                      </div>
                    </div>
                  </div>
                </button>
              </motion.div>
            </div>

            {/* Selected Option Content */}
            {selectedOption && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-8 max-w-2xl mx-auto"
              >
                {selectedOption === 'existing' ? (
                  <div className="bg-card border border-border rounded-2xl p-6">
                    <h4 className="text-lg font-semibold text-foreground mb-4">
                      Connect Your LeetHub Repository
                    </h4>
                    <p className="text-muted-foreground mb-6">
                      You'll be able to connect your GitHub repository in the dashboard.
                    </p>
                    <Button 
                      onClick={() => navigate('/dashboard')}
                      className="w-full"
                    >
                      Go to Dashboard
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                ) : (
                  <div className="bg-card border border-border rounded-2xl p-6">
                    <h4 className="text-lg font-semibold text-foreground mb-4">
                      Set Up LeetHub 3.0
                    </h4>
                    <p className="text-muted-foreground mb-6">
                      LeetHub is a Chrome extension that automatically saves your solved LeetCode 
                      problems to GitHub. Follow these steps:
                    </p>
                    
                    <ol className="space-y-4 mb-6">
                      <li className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-medium flex items-center justify-center shrink-0">
                          1
                        </span>
                        <div>
                          <p className="text-foreground font-medium">Install the Extension</p>
                          <a 
                            href="https://chromewebstore.google.com/detail/leethub-v3/kdkgpjpenaeoodajljkflmlnkoihkmda"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                          >
                            Get LeetHub 3.0 from Chrome Web Store
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-medium flex items-center justify-center shrink-0">
                          2
                        </span>
                        <div>
                          <p className="text-foreground font-medium">Authorize GitHub</p>
                          <p className="text-sm text-muted-foreground">
                            Sign in with GitHub and authorize LeetHub to create a repository
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-medium flex items-center justify-center shrink-0">
                          3
                        </span>
                        <div>
                          <p className="text-foreground font-medium">Solve a Problem</p>
                          <p className="text-sm text-muted-foreground">
                            Solve any LeetCode problem - it will be automatically pushed to GitHub
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-medium flex items-center justify-center shrink-0">
                          4
                        </span>
                        <div>
                          <p className="text-foreground font-medium">Connect to Chronicle</p>
                          <p className="text-sm text-muted-foreground">
                            Come back here and connect your repository
                          </p>
                        </div>
                      </li>
                    </ol>

                    <Button 
                      onClick={() => navigate('/dashboard')}
                      className="w-full"
                    >
                      I've Set Up LeetHub
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Everything You Need to Track Progress
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Beautiful visualizations and insights powered by your actual coding data
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-6 bg-card rounded-2xl border border-border"
            >
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-green-500" />
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">Real Statistics</h4>
              <p className="text-muted-foreground text-sm">
                Accurate counts of Easy, Medium, and Hard problems - directly from your GitHub repository
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-6 bg-card rounded-2xl border border-border"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-orange-500" />
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">Activity Heatmap</h4>
              <p className="text-muted-foreground text-sm">
                GitHub-style contribution graph showing your daily problem-solving activity
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="p-6 bg-card rounded-2xl border border-border"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4">
                <GitBranch className="w-6 h-6 text-blue-500" />
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">Auto Sync</h4>
              <p className="text-muted-foreground text-sm">
                Data refreshes automatically whenever you solve new problems via LeetHub
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
          <p>LeetCode Chronicle — Track your coding journey beautifully</p>
        </div>
      </footer>
    </div>
  );
}
