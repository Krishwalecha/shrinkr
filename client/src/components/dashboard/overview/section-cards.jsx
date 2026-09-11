import {
  CheckCircle2Icon,
  CircleOffIcon,
  Clock3Icon,
  LinkIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function SectionCards({ overview }) {
  const stats = overview?.stats ?? {};

  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card border-border/80 bg-card shadow-none">
        <CardHeader>
          <CardDescription>Total Links</CardDescription>

          <CardTitle className="text-2xl font-semibold tracking-tight tabular-nums text-foreground @[250px]/card:text-3xl">
            {stats.totalUrls ?? 0}
          </CardTitle>

          <CardAction>
            <Badge
              variant="outline"
              className="border-primary/20 bg-primary/5 text-primary"
            >
              <LinkIcon />
              All links
            </Badge>
          </CardAction>
        </CardHeader>

        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="font-medium text-foreground">
            Total shortened links
          </div>

          <div className="text-muted-foreground">
            Links created in your account
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card border-border/80 bg-card shadow-none">
        <CardHeader>
          <CardDescription>Active Links</CardDescription>

          <CardTitle className="text-2xl font-semibold tracking-tight tabular-nums text-foreground @[250px]/card:text-3xl">
            {stats.activeUrls ?? 0}
          </CardTitle>

          <CardAction>
            <Badge
              variant="outline"
              className="border-success/20 bg-success/10 text-success"
            >
              <CheckCircle2Icon />
              Active
            </Badge>
          </CardAction>
        </CardHeader>

        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="font-medium text-foreground">Currently available</div>

          <div className="text-muted-foreground">
            Links available for redirection
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card border-border/80 bg-card shadow-none">
        <CardHeader>
          <CardDescription>Inactive Links</CardDescription>

          <CardTitle className="text-2xl font-semibold tracking-tight tabular-nums text-foreground @[250px]/card:text-3xl">
            {stats.inactiveUrls ?? 0}
          </CardTitle>

          <CardAction>
            <Badge
              variant="outline"
              className="border-warning/20 bg-warning/10 text-warning"
            >
              <CircleOffIcon />
              Inactive
            </Badge>
          </CardAction>
        </CardHeader>

        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="font-medium text-foreground">Currently disabled</div>

          <div className="text-muted-foreground">
            Links unavailable for redirection
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card border-border/80 bg-card shadow-none">
        <CardHeader>
          <CardDescription>Expired Links</CardDescription>

          <CardTitle className="text-2xl font-semibold tracking-tight tabular-nums text-foreground @[250px]/card:text-3xl">
            {stats.expiredUrls ?? 0}
          </CardTitle>

          <CardAction>
            <Badge
              variant="outline"
              className="border-destructive/20 bg-destructive/10 text-destructive"
            >
              <Clock3Icon />
              Expired
            </Badge>
          </CardAction>
        </CardHeader>

        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="font-medium text-foreground">
            Past their expiration date
          </div>

          <div className="text-muted-foreground">
            Links that are no longer available
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
