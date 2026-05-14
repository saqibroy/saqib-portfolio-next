# CV Data to Component Mapping

Quick reference showing how your CV data is used in portfolio components.

---

## 📊 Data Structure Overview

```
src/data/
├── about.ts ───────────────► Personal branding & work history
├── projects.ts ────────────► Portfolio showcase
└── expertise.ts ───────────► Skills & services
```

---

## 🎨 Component Usage

### 1. ProjectsShowcase Component
**Location:** `src/components/ProjectsShowcase.tsx`

**Uses:** `src/data/projects.ts`

**Data Mapping:**
```typescript
// Your Data → Component Display
projects[]         → Grid of project cards
  ├── title        → Card heading
  ├── description  → Card summary
  ├── technologies → Technology badges
  ├── role         → Role badge
  ├── featured     → Featured filter
  ├── category     → Category filter
  ├── metrics      → Impact statistics
  └── links        → "View Live", "GitHub", "Case Study" buttons
```

**Example Usage:**
```tsx
<ProjectsShowcase />                              // All 8 projects
<ProjectsShowcase featured={true} />              // 4 featured projects
<ProjectsShowcase category="Open Source" />       // 5 open-source projects
<ProjectsShowcase category="AI/ML" />             // 2 AI projects
```

---

### 2. ExpertiseShowcase Component
**Location:** `src/components/ExpertiseShowcase.tsx`

**Uses:** `src/data/expertise.ts`

**Data Mapping:**
```typescript
// Your Data → Component Display
services[]         → 6 service cards (grid layout)
  ├── title        → Card heading
  ├── description  → Service description
  └── expertise[]  → Technology list

expertiseAreas[]   → 3 expandable sections
  ├── category     → Section heading
  └── skills[]     → Skill entries
       ├── name    → Skill name
       ├── level   → Proficiency indicator (Expert/Advanced/Intermediate)
       ├── description → Skill details
       └── experience → Years of experience
```

**Example Usage:**
```tsx
<ExpertiseShowcase />  // Shows all services and expertise
```

---

### 3. AboutSection Component
**Location:** `src/components/AboutSection.tsx`

**Uses:** `src/data/about.ts`

**Data Mapping:**

#### AboutHero
```typescript
professionalBio →
  ├── title       → "Full-Stack Engineer"
  ├── headline    → Main tagline
  ├── summary     → Short description
  ├── achievements[] → 6 metric cards
  └── callToAction → CTA buttons
```

#### SkillsHighlight
```typescript
skillsHighlight →
  ├── frontend[]  → Frontend skills (8 items)
  ├── backend[]   → Backend skills (8 items)
  ├── devops[]    → DevOps skills (7 items)
  └── soft[]      → Soft skills (6 items)
```

#### InterestsAndPassions
```typescript
professionalBio.interests[] → 8 interest badges
```

#### SocialLinks
```typescript
professionalBio.socialLinks[] →
  ├── name        → Link label
  ├── url         → Link destination
  └── icon        → Icon name
```

**Example Usage:**
```tsx
<AboutHero compact={false} />
<SkillsHighlight showIntro={true} />
<InterestsAndPassions />
<SocialLinks layout="horizontal" />
```

---

## 🔄 Data Flow Examples

### Example 1: Displaying a Single Project
```typescript
import { getProjectById } from '@/data/projects';

const project = getProjectById('headless-contract-editor');

// project contains:
{
  title: 'Headless Contract Editor',
  description: 'Enterprise document editor...',
  technologies: ['React.js', 'FastAPI', 'Python', ...],
  role: 'Senior Full-Stack Engineer',
  featured: true,
  category: 'Full Stack',
  metrics: [...],
  keyFeatures: [...],
  links: { github?: string, live?: string }
}
```

### Example 2: Getting Featured Projects
```typescript
import { getFeaturedProjects } from '@/data/projects';

const featured = getFeaturedProjects();
// Returns 4 featured projects for showcase
```

### Example 3: Filtering by Category
```typescript
import { getProjectsByCategory } from '@/data/projects';

const openSource = getProjectsByCategory('Open Source');
// Returns 5 open-source projects
```

### Example 4: Getting Expert Skills
```typescript
import { getExpertSkills } from '@/data/expertise';

const experts = getExpertSkills();
// Returns: React.js, Next.js, TypeScript, Tailwind CSS, WCAG 2.1
```

---

## 📋 Complete Data Reference

### About.ts Fields
```typescript
professionalBio {
  title: 'Full-Stack Engineer'
  headline: 'Architecting scalable web applications...'
  summary: 'I'm a full-stack engineer...'
  longBio: 'I'm Saqib Sohail, a full-stack engineer...'
  location: 'Berlin, Germany'
  timezone: 'CET (UTC+1)'
  
  socialLinks: [
    { name: 'GitHub', url: 'https://github.com/saqibroy', ... },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/saqibroy', ... },
    { name: 'Website', url: 'https://ssohail.com', ... },
    { name: 'Email', url: 'mailto:saqib@ssohail.com', ... }
  ]
  
  achievements: [
    { label: 'Years Building Web Applications', value: '8+', ... },
    { label: 'Performance Improvement', value: '30%', ... },
    { label: 'WCAG Compliance', value: '5+ Apps', ... },
    { label: 'Platform Migrations', value: '3', ... },
    { label: 'Open-Source Projects', value: '5+', ... },
    { label: 'Technologies Mastered', value: '20+', ... }
  ]
  
  interests: [
    'Full-Stack Web Development',
    'AI & LLM Integration',
    'Web Accessibility & Inclusive Design',
    ... (8 total)
  ]
  
  education: [
    { institution: 'Technische Universität Berlin', field: 'M.Sc. Computer Science', ... },
    { institution: 'GIFT University', field: 'B.Sc. Computer Science', ... }
  ]
}

workExperience: [
  {
    id: 'velsa-current',
    role: 'Senior Full-Stack Engineer',
    company: 'Velsa Technologies',
    duration: '08/2025 - Present',
    location: 'Berlin, Germany',
    highlights: [...],
    technologies: [...]
  },
  ... (5 positions total)
]

skillsHighlight: {
  frontend: ['React.js', 'Next.js', 'Vue.js', ...],
  backend: ['Node.js', 'FastAPI', 'Django', ...],
  devops: ['Docker', 'GitLab CI/CD', ...],
  soft: ['Problem Solving', 'Technical Leadership', ...]
}
```

### Projects.ts Fields
```typescript
projects: [
  {
    id: 'headless-contract-editor',
    title: 'Headless Contract Editor',
    description: 'Enterprise document editor...',
    fullDescription: 'Built a sophisticated...',
    technologies: ['React.js', 'FastAPI', ...],
    role: 'Senior Full-Stack Engineer',
    category: 'Full Stack',
    featured: true,
    keyFeatures: [...],
    metrics: [
      { label: 'Company', value: 'Velsa Technologies' },
      ...
    ],
    links: {
      live?: 'https://...',
      github?: 'https://github.com/...',
      case_study?: 'https://...'
    }
  },
  ... (8 projects total)
]
```

### Expertise.ts Fields
```typescript
services: [
  {
    id: 'frontend-development',
    title: 'Front-End Development',
    description: 'Modern responsive interfaces...',
    expertise: ['React.js', 'Next.js', ...],
    icon: 'Code'
  },
  ... (6 services total)
]

expertiseAreas: [
  {
    category: 'Front-End Technologies',
    icon: 'Code',
    skills: [
      {
        name: 'React.js',
        level: 'Expert',
        description: '...',
        experience: '6+ years'
      },
      ... (20+ skills across 3 categories)
    ]
  }
]
```

---

## 🎯 Common Integration Patterns

### Pattern 1: Hero Section with Bio
```tsx
import { AboutHero } from '@/components/AboutSection';

export default function Home() {
  return <AboutHero compact={false} />;
}
```

### Pattern 2: Skills Showcase
```tsx
import { SkillsHighlight } from '@/components/AboutSection';
import { ExpertiseShowcase } from '@/components/ExpertiseShowcase';

export default function SkillsPage() {
  return (
    <div>
      <SkillsHighlight showIntro={true} />
      <ExpertiseShowcase />
    </div>
  );
}
```

### Pattern 3: Projects Page
```tsx
import { ProjectsShowcase } from '@/components/ProjectsShowcase';

export default function ProjectsPage() {
  return (
    <div>
      <h1>All Projects</h1>
      <ProjectsShowcase />
    </div>
  );
}
```

### Pattern 4: About Page
```tsx
import { AboutHero, SkillsHighlight, InterestsAndPassions, SocialLinks } from '@/components/AboutSection';

export default function AboutPage() {
  return (
    <div>
      <AboutHero compact={false} />
      <SkillsHighlight showIntro={true} />
      <InterestsAndPassions />
      <SocialLinks layout="vertical" />
    </div>
  );
}
```

---

## 📱 Component Props Reference

### ProjectsShowcase
```typescript
interface ProjectsShowcaseProps {
  featured?: boolean;        // Show only featured projects
  category?: string;         // Filter by category
}
```

### ExpertiseShowcase
No props required (uses data directly)

### AboutHero
```typescript
interface AboutHeroProps {
  compact?: boolean;         // Compact or full mode
}
```

### SkillsHighlight
```typescript
interface SkillsHighlightProps {
  showIntro?: boolean;       // Show intro text
}
```

### InterestsAndPassions
No props required

### SocialLinks
```typescript
interface SocialLinksProps {
  layout?: 'horizontal' | 'vertical';
}
```

---

## 🔍 Quick Lookup

| Need | File | Function |
|------|------|----------|
| Hero bio | `about.ts` | `professionalBio` |
| Work history | `about.ts` | `workExperience` |
| All projects | `projects.ts` | `projects` |
| Featured projects | `projects.ts` | `getFeaturedProjects()` |
| All services | `expertise.ts` | `services` |
| All skills | `expertise.ts` | `expertiseAreas` |
| Soft skills | `expertise.ts` | `softSkills` |
| Languages | `about.ts` | `languages` |
| Volunteer work | `about.ts` | `volunteerExperience` |

---

## ✅ Data Verification Checklist

- [x] All 8 projects from CV included
- [x] All 5 work positions documented
- [x] All social links correct
- [x] All technologies listed
- [x] All metrics included
- [x] All interest areas listed
- [x] Education complete
- [x] Volunteer experience included
- [x] Languages documented
- [x] Helper functions working
- [x] TypeScript types correct
- [x] No compilation errors

---

## 🚀 Ready to Use!

All data is:
- ✅ Accurate and complete
- ✅ TypeScript-safe
- ✅ Component-ready
- ✅ Production-grade
- ✅ Well-documented

Start building! 🎉
