export const OrDivider = ({ text = "or Sign up with Email" }: { text?: string }) => (
    <div className="my-6 flex items-center gap-3">
      <div className="h-px flex-1 bg-gray-200" />
      <span className="text-xs font-medium text-gray-500">{text}</span>
      <div className="h-px flex-1 bg-gray-200" />
    </div>
  );
  