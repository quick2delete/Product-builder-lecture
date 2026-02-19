# Project Blueprint

## Overview

This project is a simple, single-page web application that allows users to generate random lottery numbers. It features a modern UI with dark mode support and custom Web Components for an interactive experience.

## Implementation Details

### Feature: Lotto Number Generator
*   **Objective:** Create a user-friendly interface to generate a set of 6 unique lottery numbers.
*   **Web Components:**
    *   **`<lotto-ball>`:** Encapsulates the styling and logic for individual lotto balls, including dynamic color gradients based on the number range and a "pop-in" entry animation.
*   **Logic (`main.js`):** Generates 6 unique random numbers between 1 and 45 and renders them sequentially with a slight delay for a better visual experience.

### Feature: Dark and Light Mode
*   **Objective:** Provide users with a choice of visual themes (Dark/Light).
*   **Implementation:**
    *   Utilizes **CSS Variables** defined in `:root` and overridden in the `body.dark-mode` class.
    *   A theme toggle button persists the user's preference in `localStorage`.
    *   Smooth transitions between background and text colors.

### Design & Style
*   **Layout:** Centered, mobile-responsive layout with a sleek container card.
*   **Typography:** Expressive typography using "Roboto" and "Montserrat".
*   **Visual Effects:** Multi-layered drop shadows for depth and subtle gradients for the lotto balls.

## Current State & Recent Changes

### Recent Updates:
*   Added **Dark Mode** toggle with persistent storage.
*   Refactored styling to use **CSS Variables** for easier theming.
*   Improved the visual design of the container and buttons with rounded corners and modern shadows.
*   Implemented a **Partnership Inquiry Form** using Formspree (`https://formspree.io/f/mkovvjzl`) for handling user submissions.
*   Verified code integrity (syntax check) and prepared for deployment.
*   Added `firebase.json` for Firebase Hosting support.

## Planned Enhancements

### 1. Partnership Inquiry Form
*   **Objective:** Allow users to send partnership inquiries directly from the page.
*   **Implementation:**
    *   **Formspree Integration:** Uses Formspree as the backend handler for form submissions.
    *   **Web Component:** Encapsulated `<partnership-form>` component for a clean and reusable implementation.
    *   **Fields:** Company Name, Contact Name, Email, and Message.
    *   **Validation:** Client-side validation with immediate visual feedback using modern CSS (`:has()`).

### 2. Interactive Animations
*   Further refine the ball entry animations (e.g., rolling effect).
*   Provide visual feedback on the button click (e.g., ripple effect).

### 2. "Past Draws" History
*   Implement a section below the main card to store and display previous results using `localStorage`.

### 3. Advanced Responsive Design
*   Enhance responsiveness using Container Queries to adapt the ball layout perfectly on all screen sizes.
