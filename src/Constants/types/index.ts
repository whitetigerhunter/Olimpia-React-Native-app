import { NavigationStackProp } from 'react-navigation-stack';

import { Route } from 'app/Navigators';

export type NavigationProp<T, R> = NavigationStackProp<T, R>;

export type NavigationParams = {
  [Route.Root]: undefined;
  [Route.Onboarding]: undefined;
  [Route.Login]: undefined;
  [Route.ResetPassword]: undefined;
  [Route.Register]: undefined;
  [Route.Dashboard]: undefined;
  [Route.Selections]: undefined;
  [Route.PersonalizedRecipeNoteSelection]: NoteSelectionParams;
  [Route.PersonalizedRecipeRecommendedPerfumes]: PersonalizedRecipeRecommendedPerfumesParams;
  [Route.SelectStoryType]: undefined;
  [Route.ConfirmUploadStory]: ConfirmUploadStoryParams;
  [Route.PerfumeDetails]: PerfumeDetailsParams;
  [Route.NoteSelection]: NoteSelectionParams;
  [Route.Perfumes]: PerfumesParams;
  [Route.SaveRecipe]: undefined;
  [Route.AddNote]: AddNoteParams;
  [Route.RecordVideo]: undefined;
  [Route.RecordAudio]: undefined;
  [Route.StoryPlayer]: undefined;
  [Route.TextStory]: undefined;
  [Route.MyCollection]: undefined;
  [Route.Search]: undefined;
};

interface PersonalizedRecipeRecommendedPerfumesParams {
  suggestionId: number;
  notes: Note[];
  longitude: number;
  latitude: number;
}

interface PerfumesParams {
  isFromPersonalizedRecipe: boolean;
  longitude: number;
  latitude: number;
}

interface ConfirmUploadStoryParams {
  language?: string;
  video?: string;
  videoPath?: string;
  text?: string;
  videoType?: string;
  textStory?: FormData;
}

export interface NoteSelectionParams {
  videoPath?: string;
  videoType?: string;
  video?: string;
  isTextStory?: boolean;
  selectedNotes: Note[];
  recipe?: Recipe;
  textStory?: FormData;
}

interface PerfumeDetailsParams {
  selectedPerfume: Perfume;
}

interface AddNoteParams {
  suggestionId: number;
  route: string;
}

export interface Brand {
  name: string;
}

export enum Gender {
  Female = 'female',
  Male = 'male',
  Unisex = 'unisex',
}

export type Collection = null;

export interface AffiliateLinks {
  link: string;
  image: string;
  name: string;
}
export interface Perfume {
  fetch_accuracy: number;
  name: string;
  pk: number;
  image: string;
  gender: Gender;
  collection: Collection;
  brand: Brand;
  designer: string;
  release_year: string;
  notes: Note[];
  vegetarian: boolean;
  affiliate_links: AffiliateLinks[];
}

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  age: string;
  gender: string;
  skin_type: string;
  country: string;
  language: string;
  allergies: string;
  email: string;
  password: string;
  interested_in: string;
  image: string;
  my_perfumes: Perfume[];
  wish_perfumes: Perfume[];
  followers: User[];
  followings: string;
}

interface FeaturedImage {
  image: string;
}
export interface Note {
  featured_image: FeaturedImage;
  id: number;
  pk: number;
  name: string;
  name_fr: string;
  name_arabic: string;
  image: string;
  note_id: string;
  accord: string;
  added?: boolean;
  best_match_notes: RecipeBestMatch[];
}

export interface RegistrationPayload {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  language: string;
}

export interface RecipeBestMatch {
  pk: number;
  name: string;
  image: string;
}
export interface Recipe {
  id: number;
  recipe_name: string;
  selected_notes: Note[];
  added_notes: Note[];
}

export interface UpdateNotesPayload {
  selected_notes?: number[];
  added_notes?: number[];
  id?: number;
  token?: string;
  longitude?: number;
  latitude?: number;
  mode?: string[];
  saved_recipe?: boolean;
  recipe_name?: string;
  redirectTo?: string;
}

type AttachedFileKey = 'attached_file';

interface AttachedFileType {
  uri?: string;
  name?: string;
  type: string;
  language?: string;
  original_generated_text?: string;
  about?: string;
  description?: string;
  memoires?: string;
}
export interface UploadStoryPayload {
  story: Record<AttachedFileKey, AttachedFileType>;
  token: string;
}

export interface AddNewNotePayload {
  suggestionId: number;
  resultat: Note[];
}

export interface UserCoordinates {
  latitude: number;
  longitude: number;
}
