import { supabase } from "../lib/supabase";

/**
 * Create a review for a user (worker or employer).
 */
export const createReview = async (reviewData) => {
  const { data, error } = await supabase
    .from("reviews")
    .insert({
      reviewer_id: reviewData.reviewer_id,
      reviewee_id: reviewData.reviewee_id,
      rating: reviewData.rating,
      comment: reviewData.comment || "",
      job_id: reviewData.job_id || null,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Get all reviews for a specific worker.
 */
export const getWorkerReviews = async (workerId) => {
  const { data, error } = await supabase
    .from("reviews")
    .select("*, reviewer:reviewer_id(id, full_name)")
    .eq("reviewee_id", workerId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

/**
 * Get all reviews for the current user.
 */
export const getMyReviews = async (userId) => {
  const { data, error } = await supabase
    .from("reviews")
    .select("*, reviewer:reviewer_id(id, full_name)")
    .eq("reviewee_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

/**
 * Get reviews written by the current user.
 */
export const getReviewsByMe = async (userId) => {
  const { data, error } = await supabase
    .from("reviews")
    .select("*, reviewee:reviewee_id(id, full_name)")
    .eq("reviewer_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

/**
 * Get the average rating for a user.
 */
export const getAverageRating = async (userId) => {
  const { data, error } = await supabase
    .from("reviews")
    .select("rating")
    .eq("reviewee_id", userId);

  if (error) throw error;

  if (!data || data.length === 0) {
    return { average: 0, count: 0 };
  }

  const total = data.reduce((sum, r) => sum + r.rating, 0);
  return {
    average: (total / data.length).toFixed(1),
    count: data.length,
  };
};

/**
 * Delete a review (owner/admin only).
 */
export const deleteReview = async (id) => {
  const { error } = await supabase.from("reviews").delete().eq("id", id);
  if (error) throw error;
};
