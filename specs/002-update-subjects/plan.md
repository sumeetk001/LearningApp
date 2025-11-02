# Implementation Plan: Update Learning App Subjects

**Branch**: `002-update-subjects` | **Date**: November 2, 2025 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/002-update-subjects/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Update the educational subjects catalog to include new subjects from reference image: Ancient Civilizations, Insects, Physics, Birds, Human Body, and Rocks and Minerals. Implementation will update the subjects data structure, add new high-quality images, implement progress tracking ("Started" status, lesson counts), trending indicators ("Hot" labels), and a featured content banner. Technical approach uses existing React/TypeScript architecture with Material-UI components and React Spring animations.

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

## Technical Context

**Language/Version**: TypeScript 4.9.5, React 19.2.0  
**Primary Dependencies**: Material-UI v7.3.4, React Router v7.9.5, React Spring v10.0.3  
**Storage**: Static data files (subjects.ts), localStorage for user progress  
**Testing**: Jest, React Testing Library, React Scripts test runner  
**Target Platform**: Web application (mobile-first responsive), PWA capable
**Project Type**: Single React web application  
**Performance Goals**: <3 seconds image load, 90+ Lighthouse score, <500KB initial bundle  
**Constraints**: COPPA compliance, <48dp touch targets, 5-7min attention span chunks  
**Scale/Scope**: 6+ educational subjects, grid layout, progress tracking, featured content banner

## Constitution Check

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

✅ **Child-First Design**: Feature prioritizes educational value with age-appropriate subjects (Ancient Civilizations, Science topics). UI maintains large touch targets (48dp+) and intuitive navigation suitable for ages 5-10.

✅ **Chunk-Based Learning**: Each subject is self-contained and independently accessible. Content organization supports 5-7 minute attention spans through discrete subject chunks.

✅ **Interactive & Animated Experience**: Maintains existing React Spring animations for subject cards and implements progress indicators with immediate visual feedback. Featured banner adds engaging promotional content.

✅ **Mobile-First React Implementation**: Builds on existing React 19+ mobile-first architecture. Touch interactions prioritized through Material-UI touch targets. Performance maintained with optimized image loading.

✅ **Privacy & Security by Design**: No additional data collection beyond existing progress tracking in localStorage. Maintains COPPA compliance with parent-controlled architecture.

**POST-DESIGN VALIDATION**: ✅ PASSED - All design decisions strengthen constitutional compliance. Progress tracking enhances educational engagement without compromising privacy. Featured content provides discovery without data collection.

**Constitution Compliance**: ✅ PASSED - All core principles maintained and enhanced

## Project Structure

### Documentation (this feature)

### Documentation (this feature)

```text
specs/002-update-subjects/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
├── media/               # Visual assets (mockups, diagrams, references)
│   ├── mockups/         # UI/UX mockups and wireframes
│   ├── diagrams/        # Architecture and flow diagrams
│   └── references/      # Reference images and examples
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Visual Assets Strategy *(include if feature has UI/UX components)*

<!--
  ACTION REQUIRED: Define visual asset requirements and creation approach.
  Only include this section if the feature involves user interfaces, visual design,
  or requires diagrams/mockups for clarity.
-->

### Visual Assets Strategy *(include if feature has UI/UX components)*

**Design System**: Material Design v5 (Material-UI) with child-friendly adaptations  
**Visual Assets Needed**: Subject card images, featured banner graphics, progress indicator icons, "Hot" trending badges  
**Asset Creation Approach**: High-quality stock photos from Unsplash with educational focus, SVG icons for indicators  
**Image Formats**: JPEG for subject photos (optimized), PNG for badges with transparency, SVG for scalable icons  
**Accessibility Requirements**: Descriptive alt text for all images, 4.5:1+ color contrast ratios, meaningful filenames  
**Responsive Considerations**: Mobile breakpoints (320px, 640px, 1024px), tablet landscape orientation, desktop grid layouts

**Asset Validation Checklist**:
- [ ] All images have descriptive filenames (ancient-civilizations.jpg, not image1.png)
- [ ] All images include meaningful alt text for screen readers
- [ ] File sizes are optimized (<500KB per image, <100KB for icons)
- [ ] SVG used for badges, icons and scalable graphics
- [ ] Images follow consistent naming convention (subject-name-type.ext)
- [ ] Visual assets align with educational content and age appropriateness

### Media Directory Structure *(include if visual assets planned)*

### Media Directory Structure *(include if visual assets planned)*

```text
specs/002-update-subjects/media/
├── mockups/
│   ├── subject-grid-desktop.png     # Desktop subject catalog layout
│   ├── subject-grid-mobile.png      # Mobile responsive layout
│   ├── featured-banner-desktop.png  # Featured content banner design
│   └── progress-indicators.png      # "Started", "Hot" badge designs
├── diagrams/
│   ├── user-flow-subject-selection.svg    # User journey from catalog to subject
│   ├── data-flow-progress-tracking.svg    # Progress state management
│   └── component-relationships.svg        # Subject card component structure
└── references/
    ├── reference-app-screenshot.jpg        # Original reference image from user
    ├── material-ui-card-patterns.png       # Material-UI card design patterns
    └── educational-app-examples.png        # Similar educational app layouts
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
### Source Code (repository root)

```text
src/
├── components/
│   ├── landing/
│   │   ├── HeroSection.tsx          # Updated with featured banner
│   │   ├── SubjectCard.tsx          # Enhanced with progress indicators
│   │   └── SubjectGrid.tsx          # Updated grid layout
│   ├── ui/
│   │   ├── ProgressBadge.tsx        # New: "Started" progress indicator
│   │   ├── TrendingBadge.tsx        # New: "Hot" trending indicator
│   │   └── FeaturedBanner.tsx       # New: promotional content banner
│   └── animations/
│       └── PageTransitions.tsx      # Enhanced card animations
├── data/
│   ├── subjects.ts                  # Updated with new subjects data
│   └── progress.ts                  # New: user progress tracking
├── types/
│   └── index.ts                     # Enhanced types for progress/featured content
└── utils/
    ├── imageUtils.ts                # New: image optimization helpers
    └── progressUtils.ts             # New: progress calculation utilities

tests/
├── components/
│   ├── SubjectCard.test.tsx         # Updated tests for new features
│   ├── ProgressBadge.test.tsx       # New: progress indicator tests
│   └── FeaturedBanner.test.tsx      # New: featured banner tests
└── data/
    └── subjects.test.ts             # Updated data structure tests
```

**Structure Decision**: Single React application structure maintained. Enhanced existing components rather than creating new modules to preserve architectural simplicity and child-first design principles.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No constitutional violations identified. All complexity additions serve educational purposes:

| Enhancement | Educational Benefit | Child-First Justification |
|-------------|-------------------|---------------------------|
| Progress tracking | Motivates continued learning and provides achievement feedback | Visual progress indicators help children understand learning journey |
| Featured content | Highlights new educational opportunities | Age-appropriate discovery mechanism with parental oversight |
| Trending badges | Draws attention to popular subjects | Social learning cues help children find engaging content |

**Complexity Assessment**: All additions enhance educational value while maintaining simplicity and child-first design principles.

---

## Implementation Status

**Phase 0**: ✅ **COMPLETED** - Research documented in `research.md`  
**Phase 1**: ✅ **COMPLETED** - Design artifacts generated:
- `data-model.md` - Comprehensive data structures
- `contracts/api-spec.md` - Client-side API contracts  
- `contracts/openapi.yaml` - OpenAPI specification
- `quickstart.md` - Implementation guide

**Phase 2**: 🔄 **READY** - Use `/speckit.tasks` command to generate implementation tasks

**Branch**: `002-update-subjects`  
**Next Command**: `/speckit.tasks` to begin implementation  
**Estimated Implementation Time**: 2-3 hours (per quickstart guide)
