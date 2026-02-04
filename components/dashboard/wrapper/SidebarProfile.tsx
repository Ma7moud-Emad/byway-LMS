import Image from "next/image";

type SidebarProfileProps = {
  username?: string;
  avatar_url?: string;
  isOpen: boolean;
};

export default function SidebarProfile({
  username,
  avatar_url,
  isOpen,
}: SidebarProfileProps) {
  return (
    <div className="flex gap-2 items-center mt-auto">
      <div className="w-10 h-10 rounded-full overflow-hidden relative">
        <Image
          src={avatar_url || "/default-avatar.png"}
          alt="Profile"
          fill
          sizes="100%"
          className="object-cover"
        />
      </div>
      {isOpen && <p className="capitalize">hi, {username}</p>}
    </div>
  );
}
