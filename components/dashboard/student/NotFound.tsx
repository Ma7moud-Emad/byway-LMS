export default function NotFound({
  msg,
  msgColor,
  msgSize,
}: {
  msg: string;
  msgColor?: string;
  msgSize?: string;
}) {
  return (
    <div className="text-center text-gray-900 min-h-[80vh] flex flex-col gap-2 justify-center items-center">
      <p
        className="text-xl"
        style={{ fontSize: `${msgSize}px`, color: `${msgColor}` }}
      >
        {msg}
      </p>
    </div>
  );
}
