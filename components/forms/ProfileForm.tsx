"use client";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Input from "./Input";
import Button from "../ui/Button";
import Spinner from "../ui/Spinner";
import { isEqualExcept, uploadFile } from "@/lib/helper";
import toast from "react-hot-toast";
import { supabase } from "@/lib/supabase/client";
import { FileUploadPreview } from "./FileUploadPreview";

type Profile = {
  id: string;
  avatar_url: string;
  email: string;
  username: string;
  full_name: string;
  phone: string;
  bio: string;
};

export default function ProfileForm({ profile }: { profile: Profile }) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Profile>({
    defaultValues: profile,
  });

  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    profile.avatar_url || null,
  );
  const [avatarFile, setavatarFile] = useState<File | null>(null);

  // Extension of avatar file
  const fileExtension = avatarFile?.type.split("/")[1];

  const onSubmit: SubmitHandler<Profile> = async (data) => {
    let avatar_url = profile.avatar_url;

    if (avatarFile) {
      const path = profile.avatar_url.split("avatars/")[1];

      const { error } = await supabase.storage.from("avatars").remove([path]);
      if (error) console.error("Delete failed:", error.message);

      avatar_url = await uploadFile(
        avatarFile,
        "avatars",
        `${profile.id}/avatar.${fileExtension}`,
      );
    }

    // check if any updates
    const isUnchanged = isEqualExcept({ ...data, avatar_url }, profile);
    if (isUnchanged) {
      toast("No changes detected", { icon: "ℹ️" });
      return;
    }

    // update profile
    const { error: updateError } = await supabase
      .from("profiles")
      .update({ ...data, avatar_url })
      .eq("id", profile.id);

    if (updateError) {
      console.error("Update failed:", updateError.message);
    } else {
      toast.success("Updated successfully");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="pt-4">
      <Input label="email" name="email" register={register} isReadOnly={true} />

      <FileUploadPreview
        id="avatar"
        label="Avatar"
        accept="image/*"
        type="image"
        previewUrl={avatarPreview}
        setPreviewUrl={setAvatarPreview}
        setFile={setavatarFile}
      />

      <Input label="user name" name="username" register={register} />

      <Input label="full name" name="full_name" register={register} />
      <Input label="phone" name="phone" register={register} />

      <Input label="bio" name="bio" register={register} />

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? <Spinner /> : "save change"}
      </Button>
    </form>
  );
}
