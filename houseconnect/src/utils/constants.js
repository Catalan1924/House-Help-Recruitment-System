/**
 * All 47 Kenyan counties.
 */
export const KENYAN_COUNTIES = [
  "Baringo", "Bomet", "Bungoma", "Busia", "Elgeyo Marakwet", "Embu",
  "Garissa", "Homa Bay", "Isiolo", "Kajiado", "Kakamega", "Kericho",
  "Kiambu", "Kilifi", "Kirinyaga", "Kisii", "Kisumu", "Kitui", "Kwale",
  "Laikipia", "Lamu", "Machakos", "Makueni", "Mandera", "Marsabit",
  "Meru", "Migori", "Mombasa", "Murang'a", "Nairobi", "Nakuru", "Nandi",
  "Narok", "Nyamira", "Nyandarua", "Nyeri", "Samburu", "Siaya",
  "Taita Taveta", "Tana River", "Tharaka Nithi", "Trans Nzoia", "Turkana",
  "Uasin Gishu", "Vihiga", "Wajir", "West Pokot",
];

/**
 * Employment types for jobs.
 */
export const EMPLOYMENT_TYPES = [
  "Full-time",
  "Part-time",
  "Live-in",
  "Live-out",
  "Contract",
  "Temporary",
];

/**
 * Salary ranges (monthly KES).
 */
export const SALARY_RANGES = [
  { label: "Under KES 15,000", min: 0, max: 15000 },
  { label: "KES 15,000 - 25,000", min: 15000, max: 25000 },
  { label: "KES 25,000 - 40,000", min: 25000, max: 40000 },
  { label: "KES 40,000 - 60,000", min: 40000, max: 60000 },
  { label: "Above KES 60,000", min: 60000, max: 999999 },
];

/**
 * Experience levels.
 */
export const EXPERIENCE_LEVELS = [
  "0-1 year",
  "1-3 years",
  "3-5 years",
  "5-10 years",
  "10+ years",
];

/**
 * Worker availability statuses.
 */
export const AVAILABILITY_STATUSES = [
  "Available",
  "Employed",
  "Not Available",
];

/**
 * Application statuses.
 */
export const APPLICATION_STATUSES = [
  "pending",
  "reviewed",
  "shortlisted",
  "accepted",
  "rejected",
  "withdrawn",
];

/**
 * Verification statuses.
 */
export const VERIFICATION_STATUSES = [
  "pending",
  "verified",
  "rejected",
  "not_submitted",
];

/**
 * User roles.
 */
export const USER_ROLES = ["worker", "employer", "admin"];

/**
 * Preferred job types for workers.
 */
export const PREFERRED_JOB_TYPES = [
  "House Help",
  "Nanny",
  "Gardener",
  "Cook",
  "Driver",
  "Cleaner",
  "Laundry",
  "Elderly Care",
  "Other",
];

/**
 * Common skills for domestic workers.
 */
export const COMMON_SKILLS = [
  "Cleaning",
  "Cooking",
  "Childcare",
  "Laundry",
  "Ironing",
  "Gardening",
  "Driving",
  "Elderly Care",
  "Pet Care",
  "House Management",
  "Shopping",
  "Deep Cleaning",
  "Organizing",
  "Meal Planning",
];
