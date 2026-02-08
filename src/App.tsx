import { useState } from 'react';
import { AppRouter } from './presentation/router/AppRouter';
import { SplashScreen } from './presentation/components/ui/SplashScreen';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      <AppRouter />
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
    </>
  );
}

export default App;
