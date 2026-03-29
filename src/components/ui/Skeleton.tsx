interface SkeletonProps {
  className?: string;
}

export const Skeleton = ({ className = "h-5 w-full" }: SkeletonProps) => (
  <div className={`animate-pulse rounded bg-slate-700/60 ${className}`} />
);
