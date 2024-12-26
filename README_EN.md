# The Movie Blog 🎬

A bilingual web application (PT/EN) to explore detailed analyses of classic movies, focusing on technical, historical, and cultural aspects.

## 🌟 Features

- **Bilingual Interface**: Full support for Portuguese and English
- **Detailed Analysis**: Structured sections covering various aspects of films
- **Responsive Design**: Optimized experience across different devices
- **Intuitive Navigation**: Clean and easy-to-use interface
- **Image Gallery**: View movie scenes and posters
- **Soundtracks**: Information about original movie soundtracks

## 🚀 Technologies

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Styled Components](https://styled-components.com/)
- [React Router](https://reactrouter.com/)

## 📦 Installation

Install dependencies
```bash
npm install
```
Start development server
```bash
npm run dev
```

## Setup

1. Create a .env file in the project root with the following variables:
```bash
VITE_MOVIE_SEARCH_BLOG_API_URL=api_url_here
```

## Project Structure

```bash
src/
├── components/ # Reusable components
├── contexts/ # React contexts (e.g., LanguageContext)
├── features/ # Redux features
├── pages/ # Page components
├��─ store/ # Redux configuration
├── styles/ # Global styles
└── types/ # TypeScript type definitions
```

## 🎯 Main Features

### Bilingual Navigation
- Easy PT/EN toggle
- Language preference persistence
- Fully translated content

### Movie Analysis
- Introduction
- Cast and Characters
- Historical Context
- Cultural Importance
- Technical Analysis
- Original Soundtrack
- Conclusion

### Media Gallery
- Movie posters
- Important scenes
- Responsive interface 