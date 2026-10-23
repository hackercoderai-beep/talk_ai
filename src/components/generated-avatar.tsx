import { botttsNeutral, initials } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type Props = {
  seed: string;
  className?: string;
  variant?: "botttsNeutral" | "initials";
};

export function GeneratedAvatar(props: Props) {
  let avatar: ReturnType<typeof createAvatar>;

  if (props.variant === "botttsNeutral") {
    avatar = createAvatar(botttsNeutral, {
      seed: props.seed,
      size: 128,
    });
  } else {
    avatar = createAvatar(initials, {
      fontSize: 42,
      fontWeight: 500,
      seed: props.seed,
      size: 128,
    });
  }
  return (
    <Avatar className={cn(props.className)}>
      <AvatarImage alt={`${props.seed} avatar`} src={avatar.toDataUri()} />
      <AvatarFallback>
        {props.seed.charAt(0).toUpperCase() || "?"}
      </AvatarFallback>
    </Avatar>
  );
}
