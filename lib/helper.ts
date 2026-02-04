import toast from "react-hot-toast";
import { supabase } from "./supabase/client";

export function getStars(avg_rating: number) {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (avg_rating >= i) {
      stars.push("full");
    } else if (avg_rating >= i - 0.5) {
      stars.push("half");
    } else {
      stars.push("empty");
    }
  }

  return stars;
}

export function formatShortDate(dateString: string) {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });

  return `${day} ${month}`;
}

export async function uploadFile(
  file: File,
  bucket: string,
  path: string,
  successMsg?: string,
): Promise<string> {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      upsert: true,
    });

  if (error) {
    console.error(error);
    toast.error(`Failed to upload file: ${error.message}`);
    throw error;
  }

  const { data: publicUrl } = supabase.storage
    .from(bucket)
    .getPublicUrl(data.path);

  toast.success(successMsg || "Upload file successfully");

  return publicUrl.publicUrl;
}

export const isEqualExcept = <T extends Record<string, unknown>>(
  a: T,
  b: T,
  ignoreKeys: (keyof T)[] = [],
): boolean => {
  const keys = (Object.keys(a) as (keyof T)[]).filter(
    (k) => !ignoreKeys.includes(k),
  );

  if (keys.length !== Object.keys(b).length - ignoreKeys.length) return false;

  return keys.every((key) => a[key] === b[key]);
};

type Enrollment = {
  enrolled_at: string;
};
export function groupEnrollmentsByMonth(data: Enrollment[]) {
  const map: Record<string, number> = {};

  data.forEach((item) => {
    const date = new Date(item.enrolled_at);

    const month = date.toLocaleString("en-US", {
      month: "short",
      year: "numeric",
    });

    map[month] = (map[month] || 0) + 1;
  });

  return Object.entries(map).map(([month, totalStudents]) => ({
    month,
    totalStudents,
  }));
}
