import { Button } from '@/components/ui/button'
import { Plus, Minus } from 'lucide-react'

interface IncrementalCounterProps {
  value: number;
  setValue: (value: number) => void;
  min: number;
  max: number;
}

export const IncrementalCounter: React.FC<IncrementalCounterProps> = ({ value, setValue, min, max }) => (
  <div className="flex items-center space-x-2">
    <Button
      variant="outline"
      size="icon"
      onClick={() => setValue(Math.max(min, value - 1))}
      disabled={value <= min}
    >
      <Minus className="h-4 w-4" />
    </Button>
    <span className="w-8 text-center">{value}</span>
    <Button
      variant="outline"
      size="icon"
      onClick={() => setValue(Math.min(max, value + 1))}
      disabled={value >= max}
    >
      <Plus className="h-4 w-4" />
    </Button>
  </div>
);

