export type User = {
  id: string;
  name: string;
  grade?: string;
  classNumber?: string;
  studentNumber?: string;
};

export type TravelCountryInfo = {
  countryName: string;
  flagImage: string;
  displayName: string;
  area: string;
  population: string;
  language: string;
  capital: string;
  continent: string;
  mapImage: string;
};

export type PassportState = {
  user: User | null;
  immigrationCompleted: string[];
  workbookCompleted: string[];
  addedCountries: string[];
  travelInfo: Record<string, TravelCountryInfo>;
  workbookNotes: Record<string, string>;
};

const STORAGE_KEY = "baeum-passport-state";

export const defaultState: PassportState = {
  user: null,
  immigrationCompleted: [],
  workbookCompleted: [],
  addedCountries: [],
  travelInfo: {},
  workbookNotes: {},
};

export function loadState(): PassportState {
  if (typeof window === "undefined") return defaultState;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    return { ...defaultState, ...JSON.parse(raw) };
  } catch {
    return defaultState;
  }
}

export function saveState(state: PassportState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function updateState(updater: (state: PassportState) => PassportState) {
  const next = updater(loadState());
  saveState(next);
  return next;
}

export function addUnique(items: string[], value: string) {
  return items.includes(value) ? items : [...items, value];
}
