import { Heart } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="healthcare-gradient-primary p-4 rounded-xl animate-pulse">
          <Heart className="h-8 w-8 text-white" />
        </div>
        <div className="text-center">
          <h2 className="text-lg font-semibold text-foreground">Loading Mediflow</h2>
          <p className="text-sm text-muted-foreground">Please wait while we prepare your healthcare dashboard</p>
        </div>
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
}