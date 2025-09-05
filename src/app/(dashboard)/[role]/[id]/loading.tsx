import { Heart } from 'lucide-react';

export default function UserDashboardLoading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center space-y-4">
        <div className="healthcare-gradient-primary p-3 rounded-lg animate-pulse">
          <Heart className="h-6 w-6 text-white" />
        </div>
        <div className="text-center">
          <h3 className="text-md font-medium text-foreground">Loading Dashboard</h3>
          <p className="text-xs text-muted-foreground">Preparing your personalized healthcare data</p>
        </div>
        <div className="flex space-x-1">
          <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"></div>
          <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
}