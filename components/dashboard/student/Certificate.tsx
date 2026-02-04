"use client";

import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import { useRef } from "react";
import Button from "@/components/ui/Button";

type CertificateProps = {
  student: string;
  course: string;
  date: string;
};

export default function Certificate({
  student,
  course,
  date,
}: CertificateProps) {
  const certRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!certRef.current) return;

    const canvas = await html2canvas(certRef.current, {
      scale: 2,
      logging: true,
    });

    canvas.toBlob((blob) => {
      if (blob) saveAs(blob, `${student}-certificate.png`);
    });
  };

  return (
    <div className="relative flex flex-col items-center gap-2 mb-12">
      <div
        ref={certRef}
        className="relative w-full max-h-[80vh] max-w-5xl aspect-16/11  bg-[#2b7fff33]  shadow select-none cursor-default"
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-[5%]">
          <h1 className="text-[3.5vw] md:text-4xl font-extrabold text-[#1f2937]">
            Certificate of Completion
          </h1>
          <p className="mt-[2%] text-[1.4vw] md:text-base text-[#6b7280]">
            This certificate is proudly presented to
          </p>
          <h2 className="mt-[3%] text-[4vw] md:text-5xl font-bold text-[#2b7fff] capitalize">
            {student}
          </h2>
          <p className="mt-[3%] text-[1.4vw] md:text-lg text-[#374151]">
            For successfully completing the course
          </p>
          <h3 className="mt-[1%] text-[2vw] md:text-2xl font-semibold">
            {course}
          </h3>

          <div className="absolute bottom-[8%] left-[8%] right-[8%] flex justify-between text-[1.2vw] md:text-sm">
            {/* <div>
              <p className="font-semibold capitalize">{instructor}</p>
              <p className="text-[#6b7280]">Instructor</p>
            </div> */}
            <div className="text-right">
              <p className="font-semibold text-center">{date}</p>
              <p className="text-[#6b7280]">Byway academy </p>
            </div>
          </div>
        </div>
      </div>

      <Button clickedFun={handleDownload}>Download</Button>
    </div>
  );
}
