
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

export function Header() {
  const { user, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 md:px-6">
      <div className="hidden md:block">
        <h2 className="font-semibold text-lg">Crop Growth Compass</h2>
      </div>
      <div className="ml-auto flex items-center gap-4">
        {user && (
          <div className="flex items-center gap-4">
            <div className="text-sm">
              {user.email}
            </div>
            <Button variant="ghost" size="sm" onClick={signOut}>
              Sign Out
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
