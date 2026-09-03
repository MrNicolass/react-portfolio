import Reveal from "./reveal";

type SectionHeadingProps = {
  index: string;
  title: string;
  description?: string;
};

export default function SectionHeading({
  index,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <Reveal>
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-sm text-violet-500 dark:text-violet-400">
          {index}
        </span>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {title}
        </h2>
      </div>
      {description && (
        <p className="mt-4 max-w-2xl text-foreground/70">{description}</p>
      )}
    </Reveal>
  );
}
