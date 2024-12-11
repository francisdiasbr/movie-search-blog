import React from 'react';

interface BlogSectionProps {
  title: string;
  content: string;
}

export function BlogSection({ title, content }: BlogSectionProps) {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">{title}</h2>
      <p className="text-gray-600 leading-relaxed">{content}</p>
    </section>
  );
}