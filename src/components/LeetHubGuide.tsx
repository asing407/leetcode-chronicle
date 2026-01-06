import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Chrome, 
  Github, 
  Code, 
  CheckCircle2, 
  ChevronRight, 
  ExternalLink,
  Copy,
  Check,
  ArrowRight,
  Puzzle,
  FolderGit2,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface LeetHubGuideProps {
  onClose?: () => void;
}

const steps = [
  {
    id: 1,
    title: 'Install LeetHub 3.0 Extension',
    icon: Chrome,
    description: 'Add the LeetHub 3.0 Chrome extension to your browser',
    details: [
      'Open Chrome Web Store',
      'Search for "LeetHub 3.0" or use the direct link below',
      'Click "Add to Chrome" and confirm the installation',
      'Pin the extension for easy access'
    ],
    link: 'https://chromewebstore.google.com/detail/leethub-v3/kdkgpjpenaeoodajljkflmlnkoihkmda',
    linkText: 'Open Chrome Web Store'
  },
  {
    id: 2,
    title: 'Connect GitHub Account',
    icon: Github,
    description: 'Authorize LeetHub to access your GitHub repositories',
    details: [
      'Click on the LeetHub extension icon in your browser',
      'Click "Authenticate with GitHub"',
      'Review the permissions and authorize the app',
      'You\'ll be redirected back to the extension'
    ]
  },
  {
    id: 3,
    title: 'Create or Select Repository',
    icon: FolderGit2,
    description: 'Choose where your LeetCode solutions will be stored',
    details: [
      'LeetHub will prompt you to create a new repository or use an existing one',
      'For new users: Let LeetHub create a new public/private repo',
      'For existing repos: Select your LeetCode solutions repository',
      'The repo name is typically "leetcode" or "leetcode-solutions"'
    ]
  },
  {
    id: 4,
    title: 'Solve Problems on LeetCode',
    icon: Code,
    description: 'Start solving problems - LeetHub handles the rest',
    details: [
      'Go to leetcode.com and solve any problem',
      'When you submit a successful solution, LeetHub automatically detects it',
      'Your solution code and problem details are pushed to GitHub',
      'Each problem gets its own folder with README and solution files'
    ]
  },
  {
    id: 5,
    title: 'Connect to LeetCode Chronicle',
    icon: Zap,
    description: 'Link your repository to visualize your progress',
    details: [
      'Copy your GitHub repository URL',
      'Paste it in the connection form on this page',
      'Enter your GitHub username',
      'Click "Connect Repository" to start tracking'
    ]
  }
];

const faqs = [
  {
    question: 'What is LeetHub 3.0?',
    answer: 'LeetHub 3.0 is a Chrome extension that automatically syncs your LeetCode submissions to a GitHub repository. Every time you successfully solve a problem, it pushes your solution code along with the problem description to your connected repository.'
  },
  {
    question: 'How does LeetHub organize my solutions?',
    answer: 'LeetHub creates a folder for each problem using the format: "ProblemNumber-Problem-Name/". Inside each folder, you\'ll find a README.md with the problem description and your solution file(s) named by language (e.g., solution.py, solution.js).'
  },
  {
    question: 'Can I use an existing GitHub repository?',
    answer: 'Yes! During LeetHub setup, you can choose to connect an existing repository instead of creating a new one. Just make sure the repository is accessible with your GitHub account.'
  },
  {
    question: 'Does LeetHub work with LeetCode Premium problems?',
    answer: 'Yes, LeetHub works with all LeetCode problems including Premium ones. As long as you have access to solve the problem, LeetHub will sync your solutions.'
  },
  {
    question: 'What if I solve the same problem multiple times?',
    answer: 'LeetHub will update the existing solution file with your latest submission. It keeps track of your most recent accepted solution for each problem.'
  },
  {
    question: 'Is my repository data private?',
    answer: 'You control the privacy settings. During setup, you can choose to create a private or public repository. LeetCode Chronicle only reads your repository data to display statistics - we never modify your code.'
  }
];

export function LeetHubGuide({ onClose }: LeetHubGuideProps) {
  const [activeStep, setActiveStep] = useState(1);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleOpenLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-8 border-b border-border">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-xl bg-primary/20">
              <Puzzle className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                LeetHub 3.0 Setup Guide
              </h2>
              <p className="text-muted-foreground">
                Complete walkthrough to connect your LeetCode solutions
              </p>
            </div>
          </div>
          
          {/* Progress indicator */}
          <div className="flex items-center gap-2 mt-6">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <button
                  onClick={() => setActiveStep(step.id)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                    activeStep === step.id
                      ? 'bg-primary text-primary-foreground'
                      : activeStep > step.id
                      ? 'bg-primary/20 text-primary'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {activeStep > step.id ? <Check className="w-4 h-4" /> : step.id}
                </button>
                {index < steps.length - 1 && (
                  <div className={`w-8 h-0.5 mx-1 ${
                    activeStep > step.id ? 'bg-primary/50' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="p-8">
          <AnimatePresence mode="wait">
            {steps.map((step) => 
              activeStep === step.id && (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-primary/10">
                      <step.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-1">
                        Step {step.id}: {step.title}
                      </h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </div>

                  <div className="bg-muted/30 rounded-xl p-6 mb-6">
                    <ul className="space-y-3">
                      {step.details.map((detail, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs font-medium text-primary">{index + 1}</span>
                          </div>
                          <span className="text-foreground">{detail}</span>
                        </li>
                      ))}
                    </ul>

                    {step.link && (
                      <div className="mt-6 flex flex-wrap gap-3">
                        <Button
                          onClick={() => handleOpenLink(step.link!)}
                          className="gap-2"
                        >
                          <ExternalLink className="w-4 h-4" />
                          {step.linkText}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => handleCopyLink(step.link!)}
                          className="gap-2"
                        >
                          {copiedLink ? (
                            <>
                              <Check className="w-4 h-4" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4" />
                              Copy Link
                            </>
                          )}
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between items-center">
                    <Button
                      variant="ghost"
                      onClick={() => setActiveStep(Math.max(1, activeStep - 1))}
                      disabled={activeStep === 1}
                      className="gap-2"
                    >
                      <ChevronRight className="w-4 h-4 rotate-180" />
                      Previous
                    </Button>
                    
                    {activeStep < steps.length ? (
                      <Button
                        onClick={() => setActiveStep(activeStep + 1)}
                        className="gap-2"
                      >
                        Next Step
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    ) : (
                      <Button onClick={onClose} className="gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        Got it, let's connect!
                      </Button>
                    )}
                  </div>
                </motion.div>
              )
            )}
          </AnimatePresence>
        </div>

        {/* FAQs Section */}
        <div className="border-t border-border p-8">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Frequently Asked Questions
          </h3>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`}>
                <AccordionTrigger className="text-left text-foreground hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </motion.div>
  );
}
