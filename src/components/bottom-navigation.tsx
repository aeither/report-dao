import { BookAIcon, EyeIcon, PlusIcon } from "lucide-react";

const BottomNavigation = ({ disable }: { disable?: boolean }) => {
  if (disable) return <></>;

  return (
    <nav className="fixed bottom-0 left-0 right-0 flex items-center justify-around border-t bg-background/95 py-2 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <a href="/request-report" className="flex flex-col items-center">
        <PlusIcon />
        <span className="text-xs">Request</span>
      </a>
      <a href="/" className="flex flex-col items-center">
        <BookAIcon />
        <span className="text-xs">Reports</span>
      </a>
      <a href="/" className="flex flex-col items-center">
        <EyeIcon />
        <span className="text-xs">View</span>
      </a>
    </nav>
  );
};

export default BottomNavigation;
