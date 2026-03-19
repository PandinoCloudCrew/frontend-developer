import { lazy, Suspense } from 'react';

const AnalyticsDashboard = lazy(() => import('./AnalyticsDashboard'));

function App() {
  return (
    <Suspense fallback={<div className="skeleton" style={{ height: 400 }} />}>
      <AnalyticsDashboard />
    </Suspense>
  );
}
