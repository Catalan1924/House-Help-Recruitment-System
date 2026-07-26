import { supabase } from "../lib/supabase";


/*
=========================================
NORMALIZE JOB PAYLOAD
=========================================
*/

function normalizeJob(job, employerId) {
  return {
    employer_id: employerId,

    title: job.title.trim(),
    description: job.description.trim(),

    county: job.county || null,
    town: job.town || null,

    employment_type: job.employment_type || null,

    salary:
      job.salary === "" || job.salary === null
        ? null
        : Number(job.salary),

    experience_required:
      job.experience_required === "" ||
      job.experience_required === null
        ? null
        : Number(job.experience_required),

    education: job.education || null,

    skills: Array.isArray(job.skills)
      ? job.skills
      : [],

    languages: Array.isArray(job.languages)
      ? job.languages
      : [],

    gender_preference:
      job.gender_preference || null,

    age_min:
      job.age_min === "" || job.age_min === null
        ? null
        : Number(job.age_min),

    age_max:
      job.age_max === "" || job.age_max === null
        ? null
        : Number(job.age_max),

    accommodation: Boolean(job.accommodation),
    meals: Boolean(job.meals),
    transport: Boolean(job.transport),

    status: "open",
  };
}

/*
=========================================
CREATE JOB
=========================================
*/

export async function createJob(
  employerId,
  job
) {
  const payload = normalizeJob(
    job,
    employerId
  );

  const { data, error } = await supabase
    .from("jobs")
    .insert(payload)
    .select()
    .single();

  if (error) throw error;

  return data;
}

/*
=========================================
GET JOB
=========================================
*/

export async function getJobById(jobId) {
  const { data, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("id", jobId)
    .single();

  if (error) throw error;

  return data;
}

/*
=========================================
GET EMPLOYER JOBS
=========================================
*/

export async function getEmployerJobs(
  employerId
) {
  const { data, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("employer_id", employerId)
    .order("created_at", {
      ascending: false,
    });

  if (error) throw error;

  return data;
}

/*
=========================================
GET OPEN JOBS
=========================================
*/

export async function getOpenJobs() {
  const { data, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("status", "open")
    .order("created_at", {
      ascending: false,
    });

  if (error) throw error;

  return data;
}

/*
=========================================
UPDATE JOB
=========================================
*/

export async function updateJob(
  jobId,
  updates
) {
  const payload = {
    ...updates,
  };

  if ("salary" in payload) {
    payload.salary =
      payload.salary === "" ||
      payload.salary === null
        ? null
        : Number(payload.salary);
  }

  if ("experience_required" in payload) {
    payload.experience_required =
      payload.experience_required === "" ||
      payload.experience_required === null
        ? null
        : Number(
            payload.experience_required
          );
  }

  if ("age_min" in payload) {
    payload.age_min =
      payload.age_min === "" ||
      payload.age_min === null
        ? null
        : Number(payload.age_min);
  }

  if ("age_max" in payload) {
    payload.age_max =
      payload.age_max === "" ||
      payload.age_max === null
        ? null
        : Number(payload.age_max);
  }

  const { data, error } = await supabase
    .from("jobs")
    .update(payload)
    .eq("id", jobId)
    .select()
    .single();

  if (error) throw error;

  return data;
}

/*
=========================================
CHANGE JOB STATUS
=========================================
*/

export async function changeJobStatus(
  jobId,
  status
) {
const allowedStatuses = [
  "applied",
  "shortlisted",
  "interview",
  "accepted",
  "rejected",
];

  if (
    !allowedStatuses.includes(status)
  ) {
    throw new Error(
      "Invalid job status."
    );
  }

  const { data, error } = await supabase
    .from("jobs")
    .update({ status })
    .eq("id", jobId)
    .select()
    .single();

  if (error) throw error;

  return data;
}

/*
=========================================
DELETE JOB
=========================================
*/

export async function deleteJob(
  jobId
) {
  const { error } = await supabase
    .from("jobs")
    .delete()
    .eq("id", jobId);

  if (error) throw error;

  return true;
}