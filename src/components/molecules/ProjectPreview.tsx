"use client";

import { Tag } from "@/components/atoms";

interface ProjectPreviewProps {
  description: string;
  tags: string[];
  className?: string;
}

export function ProjectPreview({
  description,
  tags,
  className = "",
}: ProjectPreviewProps) {
  return (
    <div className={`flex flex-col gap-[30px] py-[14px] border-t border-gray-200 ${className}`}>
      <p className="text-h3 w-[419px]">{description}</p>
      <div className="flex gap-[2px]">
        {tags.map((tag) => (
          <Tag key={tag} variant="static">
            {tag}
          </Tag>
        ))}
      </div>
    </div>
  );
}

