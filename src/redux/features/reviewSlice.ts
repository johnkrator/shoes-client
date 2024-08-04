import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Review } from "@/types/Review";

interface ReviewState {
    reviews: Review[];
    loading: boolean;
    error: string | null;
}

const initialState: ReviewState = {
    reviews: [],
    loading: false,
    error: null,
};

const storedReviews = localStorage.getItem("reviews");

if (storedReviews) {
    initialState.reviews = JSON.parse(storedReviews);
}

const reviewSlice = createSlice({
    name: "review",
    initialState,
    reducers: {
        addReview: (state, action: PayloadAction<Review>) => {
            state.reviews.unshift(action.payload);
            localStorage.setItem("reviews", JSON.stringify(state.reviews));
        },
        setReviews: (state, action: PayloadAction<Review[]>) => {
            state.reviews = action.payload;
            localStorage.setItem("reviews", JSON.stringify(state.reviews));
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        clearReviews: (state) => {
            state.reviews = [];
            localStorage.removeItem("reviews");
        },
        resetReviewState: (state) => {
            Object.assign(state, initialState);
        },
    },
});

export const {
    addReview,
    setReviews,
    setLoading,
    setError,
    clearReviews,
    resetReviewState,
} = reviewSlice.actions;

export default reviewSlice.reducer;
