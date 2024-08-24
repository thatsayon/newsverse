interface PinnedCreators {
    name: string;
    website_link: string;
}

export interface UserProfileData {
    id: number;
    username: string;
    full_name: string;
    email?: string;
    date_joined?: string;
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
    personal_website?: string;
    profile_views?: number;
    longest_streak?: number;
    total_reading_days?: number;
    read_count?: number;
    upvote_count?: number;
    downvote_count?: number;
    address?: string;
    favourite_topics?: string[];
    pinned_creators?: PinnedCreators[];
    is_public: boolean;
}