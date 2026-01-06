import { Bird, Network, Waves, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { BackgroundStyle } from './VantaBackground';

interface BackgroundSelectorProps {
  value: BackgroundStyle;
  onChange: (style: BackgroundStyle) => void;
}

const backgrounds: { value: BackgroundStyle; label: string; icon: React.ReactNode }[] = [
  { value: 'birds', label: 'Birds', icon: <Bird className="w-4 h-4" /> },
  { value: 'net', label: 'Network', icon: <Network className="w-4 h-4" /> },
  { value: 'waves', label: 'Waves', icon: <Waves className="w-4 h-4" /> },
  { value: 'none', label: 'None', icon: <X className="w-4 h-4" /> },
];

export const BackgroundSelector = ({ value, onChange }: BackgroundSelectorProps) => {
  const current = backgrounds.find(bg => bg.value === value) || backgrounds[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-lg" title="Change background">
          {current.icon}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {backgrounds.map((bg) => (
          <DropdownMenuItem
            key={bg.value}
            onClick={() => onChange(bg.value)}
            className="flex items-center gap-2"
          >
            {bg.icon}
            <span>{bg.label}</span>
            {value === bg.value && (
              <span className="ml-auto text-primary">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
