import React from 'react';

// This layout applies to all pages within the /training route group
// including /training, /training/modules, /training/modules/[moduleId]

export default function TrainingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* Can add specific headers, breadcrumbs, or context providers for the training section here */}
      {children}
    </div>
  );
}
