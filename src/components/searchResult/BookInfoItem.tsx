interface BookInfoItemProps {
  kind: string;
  value: string;
}

export function BookInfoItem({ kind, value }: BookInfoItemProps) {
  return (
    <>
      <div>{kind}</div>
      <div className="info">{value}</div>
    </>
  );
}
