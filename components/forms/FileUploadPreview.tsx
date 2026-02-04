"use client";

import Image from "next/image";
import { useEffect } from "react";

type FileType = "image" | "video";
interface FileUploadPreviewProps {
  label: string;
  accept: string;
  type: FileType;
  previewUrl: string | null;
  setPreviewUrl: (url: string | null) => void;
  setFile: (file: File | null) => void;
  id: string;
}

export function FileUploadPreview({
  label,
  accept,
  type,
  previewUrl,
  setPreviewUrl,
  setFile,
  id,
}: FileUploadPreviewProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setFile(file);
  };

  // clean object url
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return (
    <div className="md:col-span-2 mb-6 text-gray-700">
      <p className="block font-semibold mb-2.5">{label}</p>
      <input
        type="file"
        accept={accept}
        onChange={handleChange}
        className={`border text-sm block w-full px-3 py-2.5 shadow-xs 
          placeholder:text-gray-500 cursor-pointer ${previewUrl && "hidden"}`}
        id={id}
      />

      {/* upload image */}
      {previewUrl && type === "image" && (
        <label htmlFor={id} className="cursor-pointer">
          <div className="relative my-4 w-40 h-40">
            <Image
              src={previewUrl}
              alt={`${label} Preview`}
              fill
              sizes="100%"
              className="object-cover rounded"
            />
          </div>
        </label>
      )}

      {/* upload video */}
      {previewUrl && type === "video" && (
        <>
          <label
            htmlFor={id}
            className="cursor-pointer text-gray-900 bg-gray-300 px-2 py-1 rounded-sm font-medium"
          >
            change
          </label>
          <video
            src={previewUrl}
            className="mt-2 w-full h-48 rounded "
            controls
            controlsList="nodownload"
            onContextMenu={(e) => e.preventDefault()}
          />
        </>
      )}
    </div>
  );
}
