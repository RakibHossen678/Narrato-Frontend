interface AvatarProps {
  src?: string;
  name: string;
}

export const Avatar = ({ src, name }: AvatarProps) => {
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className="h-10 w-10 rounded-full object-cover"
      />
    );
  }

  return (
    <div className="grid h-10 w-10 place-items-center rounded-full bg-slate-700 text-sm font-bold text-slate-100">
      {name.slice(0, 1).toUpperCase()}
    </div>
  );
};
