import { AppContext } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Nav } from "@/types/nav";
import User from "@/components/user";
import { useContext, useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = useContext(AppContext);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigations: Nav[] = [
    { name: "gallery", title: "Gallery", url: "/gallery", target: "_self" },
    // { name: "categories", title: "categories", url: "/categories", target: "_self" },
    { name: "explore", title: "Generate AI Illustration", url: "/explore", target: "_self" },
    { name: "pricing", title: "Pricing", url: "/pricing", target: "_self" },
    // { name: "tags", title: "Tags", url: "/tags", target: "_self" },

    // { name: "blog", title: "Blog", url: "/blog", target: "_self" },
  ];

  return (
    <header className={cn(
      "sticky top-0 z-50 transition-all duration-300",
      isScrolled ? "backdrop-blur-lg bg-white/70 shadow-sm" : "bg-transparent"
    )}>
      <nav className="flex max-w-8xl items-center justify-between h-20 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex-shrink-0">
          <a href="/" className="flex items-center space-x-2">
            <img
              src="/logo.png"
              className="h-8 w-8 rounded-full"
              alt="AI illustration Generator logo"
            />
            <span className="inline-block font-bold text-2xl">
              illustration. <span className="creative-gradient-text">imglab</span>
            </span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 flex-1 justify-center">
          {navigations.map((item: Nav) => (
            <a
              key={item.name}
              href={item.url}
              target={item.target}
              className={cn(
                "text-base font-medium transition-colors hover:text-primary-dark",
                "relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0",
                "after:bg-gradient-to-r after:from-primary-color after:to-secondary-color after:transition-all after:duration-300 hover:after:w-full",
                "px-3 py-2"
              )}
            >
              {item.title}
            </a>
          ))}
        </nav>

        {/* Desktop User Section */}
        <div className="hidden md:flex items-center space-x-4">
          {user === undefined ? (
            <p className="text-sm text-muted-foreground">Loading...</p>
          ) : user ? (
            <>
              {user.credits && (
                <span className="text-sm text-neutral-800 bg-primary-light/30 px-4 py-1.5 rounded-full">
                  Credits:{" "}
                  <span className="font-bold text-primary-dark">
                    {user.credits.left_credits}
                  </span>
                </span>
              )}
              <User user={user} />
            </>
          ) : (
            <a href="/sign-in">
              <Button className="creative-button">Sign In</Button>
            </a>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full hover:bg-primary-light/50">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[80vw] sm:w-[350px]">
              <div className="flex flex-col space-y-4 mt-8">
                {navigations.map((item: Nav) => (
                  <a
                    key={item.name}
                    href={item.url}
                    target={item.target}
                    className="text-base font-medium py-3 hover:text-primary-dark transition-colors"
                  >
                    {item.title}
                  </a>
                ))}

                <div className="border-t pt-4 mt-4">
                  {user === undefined ? (
                    <p className="text-sm text-muted-foreground text-center">Loading...</p>
                  ) : user ? (
                    <div className="flex items-center justify-between px-2">
                      {user.credits && (
                        <span className="text-sm">
                          Credits:{" "}
                          <span className="font-bold text-primary-dark">
                            {user.credits.left_credits}
                          </span>
                        </span>
                      )}
                      <User user={user} />
                    </div>
                  ) : (
                    <a href="/sign-in" className="block">
                      <Button className="w-full creative-button">Sign In</Button>
                    </a>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
