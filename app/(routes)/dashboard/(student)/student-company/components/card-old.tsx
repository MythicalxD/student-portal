import { cn } from "@/lib/utils";
import Image from "next/image";
import { Company } from "../components/columns";

interface AlbumArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
  company: Company;
  aspectRatio?: "portrait" | "square";
  width?: number;
  height?: number;
}

export function AlbumArtwork({
  company,
  aspectRatio = "portrait",
  width,
  height,
  className,
  ...props
}: AlbumArtworkProps) {
  return (
    <div className={cn("space-y-3", className)} {...props}>
      <div className="overflow-hidden rounded-md bg-gray-100 min-h-[150px] min-w-[100px] flex items-center justify-center">
        <Image
          src={company.company_logo}
          alt={company.name}
          width={width}
          height={height}
          className={cn(
            "h-auto w-auto transition-all hover:scale-105 object-cover",
            aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
          )}
        />
      </div>
      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none">{company.name}</h3>
        <p className="text-xs text-muted-foreground">
          {company.company_industry}
        </p>
      </div>
    </div>
  );
}