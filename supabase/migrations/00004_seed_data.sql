-- ============================================================
-- HouseConnect Kenya — Seed Data
-- ============================================================
-- Run after all other migrations.
-- Provides sample data for development and testing.
-- ============================================================

-- NOTE: This seed data requires real auth.users entries.
-- In local dev, create test users via the Supabase dashboard or
-- `supabase functions serve` and then run this seed.
-- For production, skip this file.

-- Sample jobs (will need real employer_id UUIDs from auth.users)
-- Uncomment and replace with real UUIDs when testing:

/*
INSERT INTO jobs (employer_id, title, description, responsibilities, requirements, benefits, county, town, employment_type, salary_min, salary_max)
VALUES
  (
    'EMPLOYER_UUID_HERE',
    'House Help Needed in Kilimani',
    'Looking for a reliable and experienced house help to manage daily household chores including cleaning, laundry, and occasional cooking for a family of four in Kilimani, Nairobi.',
    ARRAY['Daily cleaning and tidying of all rooms', 'Laundry and ironing', 'Meal preparation (lunch and dinner)', 'Grocery shopping as needed', 'Pet care (1 friendly dog)'],
    ARRAY['Minimum 2 years experience as a house help', 'Good references from previous employers', 'Knowledge of modern cleaning equipment', 'Basic cooking skills', 'Trustworthy and honest'],
    ARRAY['Monthly salary: KES 25,000-30,000', 'Free accommodation (live-in)', 'Meals provided', '2 days off per month', 'NHIF contribution'],
    'Nairobi', 'Kilimani', 'Live-in', 25000, 30000
  ),
  (
    'EMPLOYER_UUID_HERE',
    'Professional Nanny for Toddler',
    'Seeking a caring and experienced nanny to look after our 2-year-old daughter. Must be patient, playful, and knowledgeable about early childhood development.',
    ARRAY['Child care and supervision', 'Preparing meals and snacks for the child', 'Organizing educational play activities', 'Taking child to the park', 'Light housekeeping related to the child'],
    ARRAY['Minimum 3 years nanny experience', 'Certificate in Early Childhood Development (preferred)', 'First Aid training is a plus', 'Must love children', 'Fluent in English and Kiswahili'],
    ARRAY['Monthly salary: KES 30,000', 'Live-out position', 'Working hours: 7am-5pm, Mon-Fri', 'Paid annual leave', 'Friendly family environment'],
    'Nairobi', 'Westlands', 'Full-time', 28000, 35000
  ),
  (
    'EMPLOYER_UUID_HERE',
    'Experienced Gardener Wanted',
    'Looking for a skilled gardener to maintain our 1-acre property in Karen. Must have experience with landscaping, vegetable gardening, and general garden maintenance.',
    ARRAY['Lawn mowing and maintenance', 'Pruning and trimming trees/hedges', 'Vegetable garden management', 'Irrigation system maintenance', 'Pest and disease control'],
    ARRAY['Minimum 5 years gardening experience', 'Knowledge of Kenyan plants and flowers', 'Experience with irrigation systems', 'Familiarity with organic gardening practices', 'Physically fit'],
    ARRAY['Monthly salary: KES 20,000-25,000', 'Flexible working hours', 'Transport allowance', 'Tools provided'],
    'Nairobi', 'Karen', 'Part-time', 20000, 25000
  ),
  (
    'EMPLOYER_UUID_HERE',
    'Family Driver Needed',
    'Reliable and experienced driver needed for family transportation in Mombasa. Must be familiar with Mombasa roads and have a clean driving record.',
    ARRAY['School runs (morning and afternoon)', 'Shopping and errands', 'Airport pickups and drop-offs', 'Vehicle maintenance checks', 'Maintaining vehicle cleanliness'],
    ARRAY['Valid Kenyan driving license (Class BCE)', 'Minimum 5 years driving experience', 'Clean driving record (must provide abstract)', 'Knowledge of Mombasa and surrounding areas', 'Basic vehicle maintenance knowledge'],
    ARRAY['Monthly salary: KES 30,000-35,000', 'Fuel provided', 'Vehicle maintenance covered', 'Phone allowance'],
    'Mombasa', 'Nyali', 'Full-time', 30000, 35000
  ),
  (
    'EMPLOYER_UUID_HERE',
    'Cook for Indian Household',
    'Experienced cook needed for an Indian family in Parklands. Must be proficient in Indian cuisine (vegetarian and non-vegetarian) as well as Kenyan dishes.',
    ARRAY['Preparing breakfast, lunch, and dinner', 'Meal planning and grocery list preparation', 'Kitchen inventory management', 'Maintaining kitchen hygiene and cleanliness', 'Special meal preparation for guests/occasions'],
    ARRAY['Minimum 3 years cooking experience', 'Proficiency in Indian cuisine required', 'Knowledge of Kenyan cuisine', 'Food hygiene certificate (preferred)', 'Ability to follow recipes and dietary requirements'],
    ARRAY['Monthly salary: KES 25,000-30,000', 'Meals provided during working hours', 'Flexible schedule', 'Festival bonuses'],
    'Nairobi', 'Parklands', 'Full-time', 25000, 30000
  ),
  (
    'EMPLOYER_UUID_HERE',
    'Office Cleaner (Part-time)',
    'Part-time cleaner needed for a small office in CBD. Hours are 5am-8am, Monday to Saturday. Must be thorough, punctual, and trustworthy.',
    ARRAY['Office cleaning (floors, surfaces, windows)', 'Washroom sanitation', 'Trash disposal', 'Restocking supplies', 'Reporting maintenance issues'],
    ARRAY['Prior cleaning experience', 'Ability to work early morning hours', 'Attention to detail', 'Punctual and reliable', 'Honest and trustworthy'],
    ARRAY['Monthly salary: KES 15,000', 'Transport allowance provided', 'All cleaning supplies provided', 'Consistent schedule'],
    'Nairobi', 'CBD', 'Part-time', 12000, 15000
  ),
  (
    'EMPLOYER_UUID_HERE',
    'Elderly Care Assistant',
    'Compassionate caregiver needed for an elderly gentleman (78) in Kisumu. Light medical background preferred. Must be patient and kind.',
    ARRAY['Assistance with daily activities (bathing, dressing)', 'Medication reminders', 'Meal preparation', 'Light housekeeping', 'Companionship and conversation'],
    ARRAY['Experience in elderly care (minimum 2 years)', 'Basic First Aid certification', 'Patient and compassionate nature', 'Good communication skills', 'Willing to work flexible hours'],
    ARRAY['Monthly salary: KES 25,000-30,000', 'Live-in accommodation provided', 'Meals provided', 'Weekly day off'],
    'Kisumu', 'Milimani', 'Live-in', 25000, 30000
  ),
  (
    'EMPLOYER_UUID_HERE',
    'Laundry and Ironing Specialist',
    'Busy professional household in Lavington needs a laundry specialist. Must be skilled with different fabric types and stain removal techniques.',
    ARRAY['Sorting, washing, and drying laundry', 'Ironing and folding clothes', 'Stain treatment', 'Delicate fabric care', 'Wardrobe organization'],
    ARRAY['Experience with different fabric types', 'Stain removal expertise', 'Knowledge of washing machine operation', 'Attention to detail', 'Able to work independently'],
    ARRAY['Monthly salary: KES 20,000', 'Flexible hours (3 days/week)', 'All equipment provided', 'Transport allowance'],
    'Nairobi', 'Lavington', 'Part-time', 18000, 22000
  );
*/
