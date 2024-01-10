"use client";
import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { PlusIcon } from "lucide-react";

export function UserNav() {

  const router = useRouter();
  let email: string | null = null;
  let accountType: string | null = null;

  if (typeof window !== "undefined") {
    accountType = localStorage.getItem("accountType");
  }

  function gotoProfile() {
    router.push("/dashboard/profile");
  }

  async function logout() {
    // Make the login request
    try {
      // Check if window is defined to ensure we're on the client side
      if (typeof window !== "undefined") {
        email = localStorage.getItem("email");
      }

      const dataToSend = {
        email: email,
      };

      const response = await axios.post("/api/login/logout", dataToSend);
      if (response.status == 200) {
        // delete the cookies and token
        document.cookie =
          "token" + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        document.cookie =
          "session" + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        router.push("/login");
      }
      console.log(response.status);
    } catch (error) {
      // Toast here
      toast.error("Error login out");
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar>
            <AvatarImage
              src={
                accountType == "SuperAdmin"
                  ? "https://github.com/shadcn.png"
                  : "https://cdn.builtbybit.com/avatars/o/17/17169.jpg?1582201011"
              }
              alt="@shadcn"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              SAM University Dashboard
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              Student Portal
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {((accountType == "Student") || (accountType == "Teacher") && <DropdownMenuItem onClick={gotoProfile}>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          )}
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <PlusIcon className="w-4 h-4 mr-2" />
            New Complaint
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout} className="text-red-500">
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
