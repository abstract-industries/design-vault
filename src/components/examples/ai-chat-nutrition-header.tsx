import { Button } from '@/components/ui/button';

interface AIChatNutritionHeaderProps {
  currentView: 'chat' | 'ui';
  onViewChange: (view: 'chat' | 'ui') => void;
}

export function AIChatNutritionHeader({ currentView, onViewChange }: AIChatNutritionHeaderProps) {
  return (
    <div className="h-14 border-b flex items-center justify-end px-4">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onViewChange(currentView === 'chat' ? 'ui' : 'chat')}
      >
        {currentView === 'chat' ? 'UI' : 'Chat'}
      </Button>
    </div>
  );
}