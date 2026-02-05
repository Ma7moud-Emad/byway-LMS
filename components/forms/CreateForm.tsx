"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";

import toast from "react-hot-toast";
import { supabase } from "@/lib/supabase/client";

import { uploadFile } from "@/lib/helper";

import { MdDeleteOutline } from "react-icons/md";
import { FiChevronDown, FiChevronUp, FiPlus } from "react-icons/fi";

import Input from "./Input";
import Button from "./../ui/Button";
import LessonsForm from "./Lessons";
import RadioGroup from "./RadioGroup";
import { FileUploadPreview } from "./FileUploadPreview";
import DynamicArrayField from "./DynamicArrayField";

export type Course = {
  id: string;
  title: string;
  slug: string;
  description: string;
  short_description: string;
  poster: string;
  promo_video: string;
  price: number;
  discount_price: number;
  level: "beginner" | "intermediate" | "advanced";
  status: "published" | "archived" | "draft";
  total_time_minutes: number;
  instructor_id: string;
  category_id: string;
  languages: { value: string }[];
  tags: { value: string }[];
  requirements: { value: string }[];
  learning_outcomes: { value: string }[];
  is_featured: boolean;
  is_free: boolean;
  modules: Module[];
};

type Lesson = {
  module_id: string;
  title: string;
  description: string;
  content_type: "video" | "file";
  video_url: string;
  video: File | null;
  duration_minutes: number;
  order_number: number;
  is_free_preview: boolean;
  resources: { value: string }[];
};

export type Module = {
  course_id: string;
  title: string;
  description: string;
  order_number: number;
  lessons: Lesson[];
};

type Category = { id: string; title: string };

export default function CreateForm({ course }: { course?: Course }) {
  const { id } = useParams();

  // module state
  const [openModules, setOpenModules] = useState<Record<number, boolean>>({});
  const toggleModule = (index: number) =>
    setOpenModules((prev) => ({ ...prev, [index]: !prev[index] }));

  // Categories state
  const [categories, setCategories] = useState<Category[]>([]);

  // get categories
  useEffect(() => {
    // fetch available categories
    async function fetchCategories() {
      const { data, error } = await supabase
        .from("categories")
        .select("id, title");

      if (error) {
        return [];
      }

      return data ?? [];
    }

    // change categories state after fetch
    const loadCategories = async () => {
      const data = await fetchCategories();
      setCategories(data);
    };

    loadCategories();
  }, []);

  // course poster state
  const [posterPreview, setPosterPreview] = useState<string | null>(null);
  const [posterFile, setPosterFile] = useState<File | null>(null);

  // promo course state
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);

  // react hook form
  const { register, control, handleSubmit } = useForm<Course>({
    defaultValues: course ?? {},
  });

  // form submission

  const onSubmit: SubmitHandler<Course> = async (data) => {
    // Destructuring
    const {
      is_free,
      is_featured,
      title,
      slug,
      description,
      short_description,
      total_time_minutes,
      price,
      discount_price,
      level,
      status,
      languages,
      requirements,
      learning_outcomes,
      tags,
      modules,
      category_id,
    } = data;

    // function convert {value:string}[] to string[]
    function Covert(list: { value: string }[]) {
      return list
        .map((item) => item.value.trim())
        .filter((value) => value !== "");
    }

    // Upload main course info
    const { data: insertCourse, error: insertError } = await supabase
      .from("courses")
      .insert([
        {
          is_free,
          is_featured,
          title,
          slug,
          description,
          short_description,
          total_time_minutes,
          price,
          discount_price,
          level,
          status,
          category_id,
          poster: "",
          instructor_id: id,
          languages: Covert(languages),
          tags: Covert(tags),
          learning_outcomes: Covert(learning_outcomes),
          requirements: Covert(requirements),
        },
      ])
      .select()
      .single();

    if (insertError) {
      console.log(insertError);
      toast.error(insertError.message);
    } else {
      toast.success("Course created and wait to upload poster and promo video");

      // Update Course poster and video
      const { error: updateError } = await supabase
        .from("courses")
        .update({
          poster: posterFile
            ? await uploadFile(
                posterFile,
                "course-posters",
                `/${insertCourse.id}/poster`,
                "Course poster was successfully uploaded and wait for upload promo",
              )
            : "",
          promo_video: videoFile
            ? await uploadFile(
                videoFile,
                "coursesPromo",
                `/${insertCourse.id}/promo`,
                "Course promo was successfully uploaded and wait for upload modules",
              )
            : "",
        })
        .eq("id", insertCourse.id);

      if (updateError) {
        console.log(updateError);
        toast.error(updateError.message);
      }

      // upload modules
      const cleanModules = modules.map((mod) => ({
        course_id: insertCourse.id,
        title: mod.title,
        description: mod.description,
        order_number: mod.order_number,
      }));

      const { data: insertModules, error: modulesError } = await supabase
        .from("modules")
        .insert(cleanModules)
        .select();

      if (modulesError) {
        console.log(updateError);
        toast.error(modulesError.message);
      } else {
        toast.success(
          "Modules was successfully uploaded and wait for upload lessons",
        );

        // upload lessons
        const lessons = modules.flatMap((mod, modIndex) =>
          mod.lessons.map((lesson) => ({
            module_id: insertModules[modIndex].id,
            title: lesson.title,
            description: lesson.description,
            content_type: lesson.content_type,
            video_url: "",
            duration_minutes: lesson.duration_minutes,
            order_number: lesson.order_number,
            is_free_preview: lesson.is_free_preview,
            resources: Covert(lesson.resources),
          })),
        );

        const { data: insertLessons, error: insertLessonsError } =
          await supabase.from("lessons").insert(lessons).select();

        if (insertLessonsError) {
          console.log(insertLessonsError);
          toast.error(insertLessonsError.message);
        } else {
          toast.success(
            "Lessons was successfully uploaded and wait for upload lessons video",
          );

          // upolad lessons video
          const ids = insertLessons.map((item) => item.id);

          let lessonCounter = 0;

          const lessonsvideo = modules.flatMap((mod) =>
            mod.lessons.map((lesson) => {
              const currentId = ids[lessonCounter];
              lessonCounter++;
              return {
                id: currentId,
                video: lesson.video,
              };
            }),
          );

          for (const lesson of lessonsvideo) {
            let videoUrl = "";

            if (lesson.video) {
              videoUrl = await uploadFile(
                lesson.video,
                "lesson-videos",
                `/${lesson.id}/video`,
                "Lesson Video was successfully uploaded and wait for upload next lessons video",
              );
            }
            const { error } = await supabase
              .from("lessons")
              .update({ video_url: videoUrl })
              .eq("id", lesson.id);

            if (error) {
              console.log(error);
              toast.error(error.message);
            }
          }
        }
      }
    }
  };

  // Dynamic fileds >> languages, requirements, learning outcomes and tags
  const {
    fields: languagesFields,
    append: appendLanguage,
    remove: removeLanguage,
  } = useFieldArray({
    control,
    name: "languages",
  });
  const {
    fields: requirementsFields,
    append: appendRequirement,
    remove: removeRequirement,
  } = useFieldArray({
    control,
    name: "requirements",
  });
  const {
    fields: outcomesFields,
    append: appendOutcome,
    remove: removeOutcome,
  } = useFieldArray({
    control,
    name: "learning_outcomes",
  });
  const {
    fields: tagsFields,
    append: appendTag,
    remove: removeTag,
  } = useFieldArray({
    control,
    name: "tags",
  });

  // modules
  const {
    fields: moduleFields,
    append: appendModule,
    remove: removeModule,
  } = useFieldArray({
    control,
    name: "modules",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl">
      <div>
        {/* Title */}
        <Input
          label="title"
          name="title"
          register={register}
          placeholder="Course Title"
        />

        {/* Slug */}
        <Input
          label="slug"
          name="slug"
          register={register}
          placeholder="Course Slug"
        />

        {/* Description */}
        <Input
          feildType="textarea"
          label="description"
          name="description"
          register={register}
          placeholder="Description..."
          rows={5}
        />

        {/* Short Description */}
        <Input
          feildType="textarea"
          label="short description"
          name="short_description"
          register={register}
          placeholder="Short Description"
        />

        {/* Total Time */}
        <Input
          type="number"
          label="total time (minutes)"
          name="total_time_minutes"
          register={register}
        />

        {/* Price */}
        <Input type="number" label="price" name="price" register={register} />

        {/* Discount Price */}
        <Input
          type="number"
          label="discount price"
          name="discount_price"
          register={register}
        />
        {/* Is Free */}
        <div className="flex items-center gap-2 mb-6">
          <input
            type="checkbox"
            id="is_Free"
            className="cursor-pointer"
            {...register("is_free")}
          />
          <label className="font-semibold cursor-pointer" htmlFor="is_Free">
            Is Free
          </label>
        </div>

        {/* Poster File */}
        <FileUploadPreview
          id="poster"
          label="Poster"
          accept="image/*"
          type="image"
          previewUrl={posterPreview}
          setPreviewUrl={setPosterPreview}
          setFile={setPosterFile}
        />

        {/* Promo Video File */}
        <FileUploadPreview
          id="promo"
          label="Promo Video"
          accept="video/*"
          type="video"
          previewUrl={videoPreview}
          setPreviewUrl={setVideoPreview}
          setFile={setVideoFile}
        />

        {/* category */}
        <RadioGroup<Course, { id: string; title: string }>
          label="Category"
          name="category_id"
          options={categories}
          register={register}
        />

        {/* level */}
        <RadioGroup<Course, "beginner" | "intermediate" | "advanced">
          label="Level"
          name="level"
          options={["beginner", "intermediate", "advanced"]}
          register={register}
        />

        {/* Status */}
        <RadioGroup<Course, "published" | "archived" | "draft">
          label="Status"
          name="status"
          options={["published", "archived", "draft"]}
          register={register}
        />

        {/* is featured */}
        <div className="flex items-center gap-2 my-6">
          <input
            type="checkbox"
            id="is_featured"
            className="cursor-pointer"
            {...register("is_featured")}
          />
          <label className="font-semibold cursor-pointer" htmlFor="is_featured">
            Is Featured
          </label>
        </div>

        {/* Languages */}
        <DynamicArrayField<Course>
          label="Languages"
          name="languages"
          fields={languagesFields}
          append={appendLanguage}
          remove={removeLanguage}
          register={register}
          placeholder="language"
        />

        {/* Requirements */}
        <DynamicArrayField<Course>
          label="Requirements"
          name="requirements"
          fields={requirementsFields}
          append={appendRequirement}
          remove={removeRequirement}
          register={register}
          placeholder="requirement"
        />

        {/* Learning Outcomes */}
        <DynamicArrayField<Course>
          label="Learning Outcomes"
          name="learning_outcomes"
          fields={outcomesFields}
          append={appendOutcome}
          remove={removeOutcome}
          register={register}
          placeholder="outcome"
        />

        {/* Tags */}
        <DynamicArrayField<Course>
          label="Tags"
          name="tags"
          fields={tagsFields}
          append={appendTag}
          remove={removeTag}
          register={register}
          placeholder="tag"
        />
      </div>

      {/* Moduels */}
      <div className="mt-4">
        <h1 className="font-semibold mb-2">Modules</h1>
        {moduleFields.map((mod, modIndex) => (
          <div
            key={mod.id}
            className="bg-white shadow rounded-sm mb-4 max-w-2xl"
          >
            <div
              className={`flex justify-between items-center cursor-pointer bg p-3 rounded-t-sm ${openModules[modIndex] && "bg-blue-700 text-gray-50"}`}
              onClick={() => toggleModule(modIndex)}
            >
              <span className="font-semibold">
                {mod.title || `Module ${modIndex + 1}`}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  suppressHydrationWarning
                  onClick={(e) => {
                    e.stopPropagation();
                    removeModule(modIndex);
                  }}
                  className={`cursor-pointer ${openModules[modIndex] ? "text-gray-50" : "text-red-500"}`}
                >
                  <MdDeleteOutline className="text-xl" />
                </button>
                {openModules[modIndex] ? (
                  <FiChevronUp className="text-xl" />
                ) : (
                  <FiChevronDown className="text-xl" />
                )}
              </div>
            </div>

            {openModules[modIndex] && (
              <div className="p-4">
                <div className="mb-4">
                  <label className="block font-semibold mb-1">Title</label>
                  <input
                    {...register(`modules.${modIndex}.title` as const)}
                    className="border text-gray-700 text-sm block w-full px-3 py-2.5 shadow-xs placeholder:text-gray-500 border-gray-300"
                    autoFocus
                    placeholder="module title"
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-semibold mb-1">
                    Description
                  </label>
                  <textarea
                    {...register(`modules.${modIndex}.description` as const)}
                    className="border text-gray-700 text-sm block w-full px-3 py-2.5 shadow-xs placeholder:text-gray-500 border-gray-300"
                    placeholder="module description..."
                  />
                </div>

                <div className="mb-3">
                  <label className="block font-semibold mb-1">Order</label>
                  <input
                    type="number"
                    {...register(`modules.${modIndex}.order_number` as const)}
                    className="border text-gray-700 text-sm block w-full px-3 py-2.5 shadow-xs placeholder:text-gray-500 border-gray-300"
                  />
                </div>

                {/* Lessons */}
                <LessonsForm
                  moduleIndex={modIndex}
                  control={control}
                  register={register}
                />
              </div>
            )}
          </div>
        ))}

        <Button
          classes="bg-blue-700"
          clickedFun={() => {
            appendModule({
              course_id: "",
              title: "",
              description: "",
              order_number: moduleFields.length + 1,
              lessons: [],
            });

            setOpenModules((prev) => ({
              ...prev,
              [moduleFields.length]: true,
            }));
          }}
        >
          <p className="flex items-center gap-2 text-gray-50">
            <FiPlus className="text-xl" /> <span>Add Module</span>
          </p>
        </Button>
      </div>

      <button
        suppressHydrationWarning
        type="submit"
        className="bg-gray-900 text-gray-50 px-6 font-semibold py-3 rounded  mt-6"
      >
        Create Course
      </button>
    </form>
  );
}
