"use client";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

import Logo from "./Logo";
import SearchBar from "./SearchBar";
import Mob_menu from "./Mob_menu";

export default function Header() {
  const [toggleMenu, setToggleMenu] = useState<boolean>(true);

  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<{ role: string } | null>(null);

  // check user is login
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.error("User fetch error:", error.message);
        return;
      }
      setUser(data.user);
    };

    fetchUser();
  }, []);

  // fetch profile based on user
  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Profile fetch error:", error.message);
        return;
      }

      setProfile(data);
    };

    fetchProfile();
  }, [user]);

  //

  return (
    <header className="flex shadow-md py-3 px-4 bg-white tracking-wide relative z-50">
      <div className="flex flex-wrap items-center justify-between gap-4 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-4 max-sm:flex-1 sm:w-3/5">
          <Logo />
          <SearchBar setToggleMenu={setToggleMenu} />
        </div>
        <Mob_menu
          toggleMenu={toggleMenu}
          setToggleMenu={setToggleMenu}
          user={user}
          profile={profile}
        />
      </div>
    </header>
  );
}
