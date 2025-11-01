# Design Guidelines: MERN Stack Blog Platform

## Design Approach

**Selected Approach:** Design System with Medium/Ghost/Notion Inspiration

**Justification:** This blog platform is content-focused and utility-driven, requiring clear information hierarchy, excellent readability, and standard interaction patterns. Drawing from industry-leading blog platforms (Medium, Ghost, Notion) ensures familiar, proven UX patterns while maintaining a professional, distraction-free reading experience.

**Key Design Principles:**
- Content-first: Typography and readability take priority over decorative elements
- Clarity: Clear visual hierarchy guides users through authentication, creation, and consumption flows
- Consistency: Predictable patterns across all CRUD operations
- Efficiency: Minimal clicks to accomplish core tasks (create, edit, publish, read)

---

## Core Design Elements

### A. Typography

**Primary Font:** Inter or system-ui font stack
- **Headlines (H1):** 2.5rem (40px), font-weight 800, tight line-height (1.2)
- **Post Titles (H2):** 1.875rem (30px), font-weight 700
- **Section Headers (H3):** 1.5rem (24px), font-weight 600
- **Body Text:** 1.125rem (18px), font-weight 400, line-height 1.7 for optimal readability
- **Metadata/Labels:** 0.875rem (14px), font-weight 500
- **Buttons:** 1rem (16px), font-weight 600

**Secondary Font:** Georgia or serif for long-form post content (optional enhancement)

**Content Width:** max-w-3xl (768px) for blog post content, max-w-7xl for dashboard layouts

---

### B. Layout System

**Spacing Primitives:** Tailwind units of 2, 4, 6, 8, 12, 16
- Component padding: p-4 to p-8
- Section spacing: py-12 to py-16
- Card gaps: gap-6 to gap-8
- Form field spacing: space-y-4

**Grid System:**
- Post listings: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 with gap-6
- Dashboard sidebar: Fixed sidebar (w-64) + main content area
- Single post: Centered single column with max-w-3xl

**Container Strategy:**
- Authentication pages: max-w-md centered
- Post editor: max-w-4xl
- Home/listing pages: max-w-7xl
- Reading view: max-w-3xl for optimal line length

---

### C. Component Library

**Navigation**
- **Top Navigation Bar:** Fixed header with logo (left), search bar (center), user menu + create post button (right)
- Height: h-16, subtle bottom border
- **Sidebar Navigation (Dashboard):** Vertical menu with icons + labels, active state highlighted
- Links: "My Posts", "Drafts", "Published", "Categories", "Profile"

**Post Cards (Home/Listing Pages)**
- Featured image at top (aspect-ratio-video, rounded-t-lg)
- Post title, author name with small avatar, date, category badge
- Excerpt preview (2-3 lines, truncated)
- Read time estimate
- Hover: subtle lift effect (shadow-lg)
- Structure: Vertical card with image → metadata → title → excerpt

**Authentication Forms**
- Centered card layout (max-w-md, shadow-xl, rounded-lg)
- Logo/heading at top
- Input fields with floating labels
- Primary CTA button (full width)
- Secondary action links below (e.g., "Already have an account?")
- OAuth buttons (optional) with icon + text

**Post Editor**
- **Toolbar:** Sticky formatting bar (bold, italic, headings, lists, links, image upload)
- **Title Input:** Large, borderless input (text-3xl, placeholder visible)
- **Content Area:** Rich text editor or textarea with markdown support
- **Metadata Sidebar:** Category select, tags input, featured image upload, publish/draft toggle
- **Action Buttons:** Save Draft (secondary), Publish (primary) in fixed bottom bar or top-right

**Single Post View**
- Hero section with featured image (if available), full-width or max-w-5xl
- Post title, author card (avatar, name, date), category/tags below title
- Content area with optimal reading width (max-w-3xl)
- Social sharing buttons (floating or end of post)
- Comments section below content
- Related posts carousel at bottom

**Comments Component**
- Threaded comments with indentation
- User avatar + name + timestamp per comment
- Reply and Like buttons
- Comment input with user avatar, textarea, submit button

**User Profile**
- Cover image area (h-48 to h-64)
- Avatar overlapping cover (-mt-16)
- User name, bio, join date
- Tabs: "Posts", "Drafts", "Liked Posts"
- Settings button for own profile

**Category Pages**
- Category header with name, description, post count
- Filtered post grid below

**Pagination**
- Centered pagination controls
- Previous/Next buttons + numbered pages
- Show "..." for long page lists
- Highlight current page

**Forms & Inputs**
- Consistent input styling: border, rounded-lg, px-4, py-3
- Focus states with ring (ring-2)
- Error states with red border + error message below
- Labels above inputs with mb-2

**Buttons**
- **Primary:** Solid fill, rounded-lg, px-6, py-3, font-semibold
- **Secondary:** Outline style or ghost button
- **Icon Buttons:** Circular or square, p-2
- **Hover:** Subtle opacity change or slight darkening

---

### D. Animations

**Minimal Motion Strategy:**
- Card hover: translate-y-(-2px) + shadow transition
- Button hover: opacity change (duration-200)
- Page transitions: Simple fade-in
- Modal/drawer: Slide-in from right or fade + scale
- Loading states: Subtle pulse or spinner
- **No:** Parallax, auto-playing animations, scroll-triggered effects

---

## Images

**Hero Section (Home Page):**
- Large hero banner with search bar overlay
- Background: Abstract gradient or subtle pattern (not a photo)
- Height: 60vh on desktop, 40vh on mobile
- Contains: Main headline, search input with blurred background button, subheading

**Post Featured Images:**
- Aspect ratio: 16:9 (aspect-video)
- Rounded corners: rounded-lg on cards, full-width on single post view
- Object-fit: cover
- Placeholder: Gradient or pattern if no image uploaded

**User Avatars:**
- Circular (rounded-full)
- Sizes: Small (h-8 w-8), Medium (h-12 w-12), Large (h-24 w-24)
- Default: Colored circle with initials if no profile picture

**Post Content Images:**
- Centered within content area
- Max-width: full within max-w-3xl container
- Rounded corners: rounded-lg
- Shadow for depth: shadow-md

**Image Upload UI:**
- Drag-and-drop zone with dashed border
- Preview thumbnail after upload
- Replace/remove buttons

---

## Layout Specifications

**Home Page:**
1. Navigation bar (fixed top)
2. Hero section with search
3. Category filter tabs/pills
4. Post grid (2-3 columns)
5. Pagination
6. Footer with links

**Single Post Page:**
1. Navigation
2. Full-width featured image (optional)
3. Post header (title, author card, metadata)
4. Content area (max-w-3xl, centered)
5. Social sharing
6. Comments section
7. Related posts
8. Footer

**Dashboard/My Posts:**
1. Navigation
2. Sidebar (left, w-64)
3. Main content area with post list or editor
4. Action buttons (Create New Post as floating action or top-right)

**Authentication Pages:**
1. Centered card (max-w-md)
2. Logo and heading
3. Form fields
4. Submit button
5. Alternative action links

---

## Special Considerations

- **Reading Experience:** Prioritize typography, line-height, and content width for comfortable reading
- **Mobile-First:** Stack all grids to single column on mobile, simplify navigation to hamburger menu
- **Loading States:** Skeleton screens for post cards, spinners for form submissions
- **Empty States:** Friendly messaging with CTAs when no posts exist
- **Error Handling:** Clear inline validation, toast notifications for success/error
- **Accessibility:** Proper heading hierarchy, alt text for images, keyboard navigation, sufficient contrast ratios