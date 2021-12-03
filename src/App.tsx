import React from 'react';
import Logo from '@/assets/logo.svg';

const App: React.FC = () => {
  return (
    <div>
      <Logo style={{ width: 100, height: 100 }} />
      <h1>My React and TypeScript App!</h1>
    </div>
  );
};

export default App;
