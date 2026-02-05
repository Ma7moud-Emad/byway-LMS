import Certificate from "@/components/dashboard/student/Certificate";
import NotFound from "@/components/dashboard/student/NotFound";
import { formatShortDate } from "@/lib/helper";
import { supabase } from "@/lib/supabase/client";

export default async function page({ params }: { params: { id: string } }) {
  const { id } = await params;

  const { data: certificates, error } = (await supabase
    .from("certificates")
    .select(
      `id,
      issued_at,
      profiles(full_name),
      courses(title,instructors!courses_instructor_id_fkey (profiles(full_name)))`,
    )
    .eq("user_id", id)) as {
    data: Array<{
      id: string;
      issued_at: string;
      profiles: {
        full_name: string;
      };
      courses: {
        title: string;
        instructors: {
          profiles: {
            full_name: string;
          };
        };
      };
    }> | null;
    error: Error | null;
  };

  if (error) {
    console.error("Error fetching certificates:", error);
    return <div>Error loading certificates.</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Certificates</h1>
      <div className="mt-6">
        {certificates && certificates.length > 0 ? (
          certificates.map((certificate) => {
            const {
              id,
              issued_at,
              profiles: { full_name: studentName },
              courses: {
                title,
                instructors: {
                  profiles: { full_name: instructorName },
                },
              },
            } = certificate;

            return (
              <Certificate
                key={id}
                student={studentName}
                course={title}
                date={formatShortDate(issued_at)}
                instructor={instructorName}
              />
            );
          })
        ) : (
          <NotFound msg="No certificates found" />
        )}
      </div>
    </div>
  );
}
