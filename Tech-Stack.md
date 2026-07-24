# Technology Philosophy

Choose technologies that are:

* Modern
* Stable
* Scalable
* High Performance
* SEO Friendly
* Accessible
* Developer Friendly
* Production Ready
* Enterprise Grade

Always recommend proven technologies over experimental ones unless explicitly requested.

# Frontend Stack

## Framework

* Next.js (Latest Stable Version)

## Language

* TypeScript

## UI Library

* React

## Styling

* Tailwind CSS

## Component Architecture

* Reusable Components
* Atomic Design Principles
* Composition over Duplication

# UI Component Libraries

Preferred order:

1. shadcn/ui
2. Radix UI
3. Headless UI

Use component libraries only as a foundation.

Customize them to match the Avhad Enterprises design system.

Never rely on default styles.

# Icons

Preferred:

* Lucide React

Alternative:

* Heroicons

Avoid mixing multiple icon families in the same project.

# Animation

Primary:

* Framer Motion

Advanced:

* GSAP

Use animations to improve user experience, not as decoration.

Keep animations smooth, subtle, and purposeful.

# Forms

Preferred:

* React Hook Form

Validation:

* Zod

Build accessible and user-friendly forms.

# State Management

Use according to project size.

Small Projects:

* React Context
* useState

Medium Projects:

* Zustand

Large Applications:

* Redux Toolkit

Choose the simplest solution that meets the project's needs.

# Data Fetching

Preferred:

* TanStack Query

For Server Components:

* Native Next.js Fetch

Implement caching and error handling where appropriate.

# Backend Integration

Support integration with:

* REST APIs
* GraphQL APIs
* Headless CMS
* Serverless Functions

Keep frontend architecture backend-agnostic.

# Authentication

Preferred solutions:

* Clerk
* Auth.js (NextAuth)
* Firebase Authentication

Select based on project requirements.

# Database Compatibility

Design applications compatible with:

* PostgreSQL
* MySQL
* MongoDB
* Supabase
* Firebase Firestore

# CMS Support

Preferred CMS options:

* Sanity
* Contentful
* Strapi
* Payload CMS
* Shopify

Choose the CMS that best fits the project's content management needs.

# E-commerce

Preferred platforms:

* Shopify
* Shopify Hydrogen
* WooCommerce
* Medusa

Design storefronts for performance and conversions.

# AI Integration

Support integration with:

* OpenAI
* Anthropic
* Google Gemini

Design AI features with usability, transparency, and security in mind.

# Performance Standards

Optimize for:

* Core Web Vitals
* Lazy Loading
* Code Splitting
* Tree Shaking
* Image Optimization
* Font Optimization
* Bundle Size Reduction

Performance is a core feature.

# SEO Standards

Implement:

* Semantic HTML
* Metadata
* Open Graph
* Structured Data
* XML Sitemap
* Robots.txt
* Canonical URLs

Design with search visibility in mind.

# Accessibility Standards

Target WCAG 2.2 AA compliance.

Ensure:

* Keyboard Navigation
* Focus States
* Screen Reader Support
* Sufficient Color Contrast
* Semantic Markup
* Accessible Forms
* Appropriate Touch Targets

Accessibility is mandatory.

# Responsive Design

Support:

* Mobile
* Tablet
* Laptop
* Desktop
* Ultra-Wide Displays

Adopt a mobile-first approach.

# Version Control

Use:

* Git

Repository Hosting:

* GitHub

Follow:

* Feature Branch Workflow
* Pull Requests
* Code Reviews

# Design Tools

Primary:

* Figma

Supporting Tools:

* FigJam
* Adobe Illustrator
* Adobe Photoshop

Maintain design consistency across all assets.

# Development Tools

Preferred:

* Visual Studio Code
* Cursor
* GitHub Copilot
* Claude Code (when appropriate)

Use modern tooling to improve productivity.

# Deployment

Preferred Platforms:

* Vercel
* Netlify

Enterprise Options:

* AWS
* Azure
* Google Cloud Platform

Deploy with automated CI/CD pipelines where possible.

# Code Quality

Maintain:

* ESLint
* Prettier
* Type Safety
* Clean Architecture
* Modular Components
* Reusable Utilities
* Comprehensive Documentation

Code should be readable, maintainable, and scalable.

# Security

Always:

* Validate user input
* Sanitize data
* Protect secrets
* Use HTTPS
* Follow authentication best practices
* Prevent common web vulnerabilities

Security must be considered from the start.

# Development Principles

Always:

* Build reusable components.
* Write clean and maintainable code.
* Follow DRY and SOLID principles.
* Optimize for performance.
* Prioritize accessibility.
* Maintain visual consistency.
* Keep dependencies minimal.
* Document important implementation decisions.

Never:

* Use deprecated libraries.
* Introduce unnecessary dependencies.
* Sacrifice performance for visual effects.
* Ignore responsive behavior.
* Ignore accessibility.
* Ship unoptimized assets.
* Use inconsistent coding practices.

# Approved Technology Stack Summary

Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS

UI

* shadcn/ui
* Radix UI
* Lucide React

Animation

* Framer Motion
* GSAP

Forms

* React Hook Form
* Zod

State Management

* Zustand
* Redux Toolkit (Large Projects)

Data

* TanStack Query

CMS

* Sanity
* Payload CMS
* Shopify
* Contentful

Authentication

* Clerk
* Auth.js
* Firebase Auth

Deployment

* Vercel
* Netlify

Version Control

* Git
* GitHub

This technology stack serves as the default standard for all Avhad Enterprises projects unless a project explicitly requires an alternative.
