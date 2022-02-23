import React, { Suspense } from 'react';

const RemoteEntry = React.lazy(() => import('remote/RemoteEntry'));
export function App() {
  return (
    <>
      Shell App
      <Suspense fallback={<div>Loading...</div>}>
        <RemoteEntry></RemoteEntry>
      </Suspense>
    </>
  );
}

export default App;
