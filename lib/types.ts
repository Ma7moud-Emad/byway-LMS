import { loginSchema, signSchema, userSchema } from "./schema";
import { Url } from "next/dist/shared/lib/router/router";
import { StaticImageData } from "next/image";
import { ReactNode } from "react";
import {
  FieldError,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { IconType } from "react-icons";
import z from "zod";
import {
  FaPaintBrush,
  FaBriefcase,
  FaLaptopCode,
  FaLanguage,
  FaCode,
  FaFacebook,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import { GrYoutube } from "react-icons/gr";
import { BsTwitterX } from "react-icons/bs";

export type BannerProps = {
  image: StaticImageData;
  title: string;
  description: string;
  ctaText?: string;
  ctaHref?: Url;
  priority?: boolean;
};

export type HomeContainerProps = {
  title: string;
  ctaHref?: Url;
  children: ReactNode;
};

export type InputProps<T extends FieldValues> = {
  name: Path<T>;
  type?: string;
  placeholder?: string;
  label?: string;
  register: UseFormRegister<T>;
  error?: FieldError;
  autocomplete?: string;
  accept?: string;
  isReadOnly?: boolean;
  feildType?: "input" | "textarea";
  rows?: number;
};

export type SignFormProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  signin?: boolean;
  btnName?: string;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
};

export type CategoryCardProps = {
  id: string;
  title: string;
  count: number;
  Icon: IconType;
};

export const iconsMap = {
  FaPaintBrush: FaPaintBrush,
  FaBriefcase: FaBriefcase,
  FaLaptopCode: FaLaptopCode,
  FaLanguage: FaLanguage,
  FaCode: FaCode,
};
export type Category = {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: keyof typeof iconsMap;
  num_courses: number;
};

export type LoginData = z.infer<typeof loginSchema>;

export type UserData = z.infer<typeof userSchema>;

export type SignData = z.infer<typeof signSchema>;

export type CourseCardProps = {
  title: string;
  avg_rating: number;
  discount_price: number;
  instructor_id: string;
  poster: string;
  total_lessons: number;
  total_reviews: number;
  total_time_minutes: number;
  level: string;
  price: number;
  short_description?: string;
  id: Url;
  type?: string;
  role?: string;
};

export const social_icons_map: Record<string, IconType> = {
  facebook: FaFacebook,
  twitter: BsTwitterX,
  github: FaGithub,
  youtube: GrYoutube,
  linkedin: FaLinkedin,
};

export type ProfileDetails = {
  avatar_url: string;
  full_name: string;
  phone: string;
  bio: string;
  username: string;
  email: string;
};

export type instructorDetails = {
  avg_rating: number;
  total_courses: number;
  expertise: string[];
  headline: string;
  social_links: Record<string, string>;
  total_students: number;
};
export type Filter = {
  title: string;
  param: string;
  items: { value: string; label: ReactNode }[];
  type?: "radio" | "checkbox";
};
export type SortOptions = {
  label: string;
  value: string;
};
export type Lesson = {
  id: number;
  title: string;
  duration_minutes: number;
  is_free_preview: boolean;
  video_url?: string;
  description: string;
  order_number: number;
};

export type Module = {
  id: number;
  title: string;
  description: string;
  lessons: Lesson[];
};
export type CourseHeaderProps = {
  title: string;
  shortDescription: string;
  avgRating: number;
  totalStudents: number;
  level: string;
  promoVideo: string;
  totalLessons: number;
  totalMinutes: number;
  languages: string[];
};
export type CourseProps = {
  price: number;
  discountPrice: number;
  role: string | null;
  course_id: string;
  student_id: string | null;
};
export type ShortLesson = {
  title: string;
  video_url: string;
  description: string;
};
export type InstruictorProps = {
  name: string;
  headline: string;
  username: string;
  id: string;
  avatar: string;
};
// create course
const twoWords = (val: string) => val.trim().split(/\s+/).length >= 2;
const numberField = (min: number, max?: number) =>
  z.preprocess(
    (val) => (val === "" ? 0 : Number(val)),
    max !== undefined ? z.number().min(min).max(max) : z.number().min(min),
  );

export const courseSchema = z
  .object({
    title: z.string().min(2, "Title must be at least 2 letters"),

    slug: z.string().regex(/^\S+$/, "Slug must not contain spaces"),

    description: z
      .string()
      .refine(twoWords, "Description must contain at least 2 words"),

    short_description: z
      .string()
      .refine(twoWords, "Short description must contain at least 2 words"),

    price: numberField(0, 1000),
    discount_price: numberField(0),
    totalTime: numberField(1),
    level: z.enum(["beginner", "intermediate", "advanced"]),

    status: z.enum(["published", "archived", "draft"]),

    program: z.enum([
      "Art & Design",
      "Business",
      "IT & Software",
      "Languages",
      "Programming",
    ]),

    languages: z
      .array(z.string().min(1, "Language cannot be empty"))
      .min(1, "At least one language is required"),

    requirements: z.string().min(1, "At least one requirement is required"),

    learning_outcomes: z
      .string()
      .min(1, "At least one learning outcome is required"),

    tags: z.string().min(1, "At least one tag is required"),

    isFeatured: z.boolean(),

    // Files
    poster: z
      .any()
      .refine(
        (files) => files instanceof FileList && files.length === 1,
        "Poster image is required",
      )
      .refine(
        (files) => files?.[0]?.type.startsWith("image/"),
        "Poster must be an image",
      ),

    promo_video: z
      .any()
      .refine(
        (files) => files instanceof FileList && files.length === 1,
        "Promo video is required",
      )
      .refine(
        (files) => files?.[0]?.type.startsWith("video/"),
        "Promo video must be a video",
      ),
  })
  .refine((data) => data.discount_price <= data.price, {
    message: "Discount price cannot be greater than price",
    path: ["discountPrice"],
  });

export type CourseFormData = z.infer<typeof courseSchema>;
