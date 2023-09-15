// appSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  loading: false,
  user: {},
  mode: localStorage.getItem("mode") || "dark",
  server: process.env.REACT_APP_BACKEND_URL,
  notes: [],
  papers: [],
  links: [],
  seniorsData: [],
  insights: [],
  clubsData: [],
  onlineUsers: [],
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setMode: (state, action) => {
      state.mode = action.payload;
    },
    setServer: (state, action) => {
      state.server = action.payload;
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setPapers: (state, action) => {
      state.papers = action.payload;
    },
    setLinks: (state, action) => {
      state.links = action.payload;
    },
    setSeniorsData: (state, action) => {
      state.seniorsData = action.payload;
    },
    setInsights: (state, action) => {
      state.insights = action.payload;
    },
    setClubsData: (state, action) => {
      state.clubsData = action.payload;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    }
  },
});

export const {
  setIsAuthenticated,
  setLoading,
  setUser,
  setMode,
  setServer,
  setNotes,
  setPapers,
  setLinks,
  setSeniorsData,
  setInsights,
  setClubsData,
  setOnlineUsers,
} = appSlice.actions;

export default appSlice.reducer;
