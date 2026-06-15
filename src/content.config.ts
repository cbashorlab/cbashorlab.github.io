/**
 * @file Content Configuration
 * @purpose Defines and validates the data schemas for Astro Content Collections.
 * This file acts as the single source of truth for structured data (JSON) 
 * used across the website, ensuring type safety and proper data loading.
 */

import { defineCollection, z } from 'astro:content';
import { file, glob } from 'astro/loaders';

/**
 * ==========================================
 * 1. PUBLICATIONS COLLECTION
 * ==========================================
 * Purpose: Manages academic papers, articles, and associated media links.
 * Source: Single JSON file containing an array of publications.
 */
const publications = defineCollection({
  // Loads all entries from a single centralized JSON file
  loader: file("src/assets/content/publications.json"),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    authors: z.string(), // Comma-separated list or string of author names
    journal: z.string(), // Journal or conference venue name
    year: z.string(),    // Kept as string to support flexible formatting (e.g., "2024", "In Press")
    page: z.string(),    // Page range or article number
    
    // Optional fields for supplementary materials
    url: z.string().optional(),       // URL to the PDF/Publisher page (optional if not open-access)
    videoUrl: z.string().optional(),  // URL to presentations, talks, or video abstracts
    
    // Nested array for special media coverage, awards, or specific feature highlights
    features: z.array(
      z.object({
        text: z.string(),             // Description of the feature/award
        url: z.string().optional()    // Deep-link to the external feature source
      })
    ).optional()                      // Entire features array is optional
  }),
});

/**
 * ==========================================
 * 2. MEMBERS COLLECTION
 * ==========================================
 * Purpose: Profiles current lab or team members.
 * Source: Single JSON file listing active personnel.
 */
const members = defineCollection({
  loader: file("src/assets/content/members.json"),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    occupation: z.string(),  // Role title (e.g., "Principal Investigator", "PhD Candidate")
    distinction: z.string(), // Short bio highlight, honors, or sub-team designation
    avatar: z.string(),      // Relative path or URL to the profile image
  }),
});

/**
 * ==========================================
 * 3. ALUMNI COLLECTION
 * ==========================================
 * Purpose: Tracks past members and their historical roles.
 * Source: Single JSON file mimicking the 'members' schema for UI consistency.
 */
const alumni = defineCollection({
  loader: file("src/assets/content/alumni.json"),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    occupation: z.string(),  // Past role or current destination post-exit
    distinction: z.string(), // Awards won or year of graduation/departure
    avatar: z.string(),      // Profile image path
  }),
});

/**
 * ==========================================
 * 4. ABOUT COLLECTION
 * ==========================================
 * Purpose: Supplies copy for the landing page or "About Us" section.
 * Source: Targeted lookup via glob pattern matching.
 */
const about = defineCollection({
  loader: glob({ pattern: 'about.json', base: "src/assets/content/" }),
  schema: z.object({
    title: z.string(),       // Main section heading
    description: z.string(), // Core introductory paragraph or bio copy
  }),
});

/**
 * ==========================================
 * 5. RESEARCH COLLECTION
 * ==========================================
 * Purpose: Organizes the core research themes, tracks, or project descriptions.
 * Source: Targeted lookup via glob pattern matching.
 */
const research = defineCollection({
  loader: glob({ 
    pattern: 'research.json', 
    base: './src/assets/content' 
  }),
  schema: z.object({
    mainTitle: z.string(), // Overall page/section header
    // Dynamic array supporting an arbitrary number of sub-themes/projects
    sections: z.array(
      z.object({
        heading: z.string(), // Name of the research area / project title
        content: z.string(), // Detailed markdown-friendly or plain text explanation
      })
    ),
  }),
});

/**
 * ==========================================
 * 6. CONTACT COLLECTION
 * ==========================================
 * Purpose: Stores central contact channels and physical address information.
 * Source: Targeted lookup via glob pattern matching.
 */
const contact = defineCollection({
  loader: glob({ 
    pattern: 'contact.json', 
    base: './src/assets/content' 
  }),
  schema: z.object({
    title: z.string(),
    email: z.string().email(), // Enforces strict email formatting validation (e.g., user@domain.com)
    phone: z.string(),         // Kept as a string to accommodate country codes/formatting
    address: z.string(),       // Multiline or structured physical location text
  }),
});

/**
 * Export all defined collections to make them accessible 
 * via Astro's standard `getCollection()` content APIs.
 */
export const collections = { 
  publications, 
  members, 
  alumni, 
  about, 
  research, 
  contact 
};