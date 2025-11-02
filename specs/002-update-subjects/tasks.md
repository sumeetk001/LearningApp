# Tasks: Update Learning App Subjects

**Input**: Design documents from `/specs/002-update-subjects/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are NOT included as they were not explicitly requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

Single React project structure: `src/`, `tests/` at repository root

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and TypeScript type updates

- [x] T001 Update TypeScript types to support new subject fields in src/types/index.ts
- [x] T002 [P] Create utility functions for progress management in src/utils/progressUtils.ts
- [x] T003 [P] Create utility functions for image optimization in src/utils/imageUtils.ts
- [x] T004 [P] Create featured content data structure in src/data/featuredContent.ts

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core data and component infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T005 Update subjects data with 6 new subjects (Ancient Civilizations, Insects, Physics, Birds, Human Body, Rocks and Minerals) in src/data/subjects.ts
- [ ] T006 [P] Create ProgressBadge component for showing lesson progress in src/components/ui/ProgressBadge.tsx
- [ ] T007 [P] Create TrendingBadge component for "Hot" indicators in src/components/ui/TrendingBadge.tsx
- [ ] T008 [P] Create FeaturedBanner component for promotional content in src/components/ui/FeaturedBanner.tsx
- [ ] T009 Update existing SubjectCard component to support progress and trending indicators in src/components/landing/SubjectCard.tsx
- [ ] T010 Add localStorage service for progress persistence in src/services/storageService.ts

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - View Updated Subject Catalog (Priority: P1) 🎯 MVP

**Goal**: Users can see a comprehensive catalog of educational subjects with proper images, titles, and progress indicators in a grid format

**Independent Test**: Open the app and verify all 10+ subjects (6 new + existing) are displayed correctly with proper images, titles, and progress indicators

### Implementation for User Story 1

- [ ] T011 [P] [US1] Update SubjectGrid component to handle new subject data structure in src/components/landing/SubjectGrid.tsx
- [ ] T012 [P] [US1] Add responsive grid layout with proper spacing for subject cards in src/components/landing/SubjectGrid.tsx
- [ ] T013 [US1] Update LandingPage component to display updated subject catalog in src/components/pages/LandingPage.tsx
- [ ] T014 [US1] Implement image loading with fallback handling for failed loads in src/components/landing/SubjectCard.tsx
- [ ] T015 [US1] Add proper alt text and accessibility attributes for all subject images in src/components/landing/SubjectCard.tsx
- [ ] T016 [US1] Ensure subjects display correctly across mobile, tablet, and desktop breakpoints in src/components/landing/SubjectGrid.tsx

**Checkpoint**: At this point, User Story 1 should be fully functional - all subjects display in grid with proper responsive behavior

---

## Phase 4: User Story 2 - Navigate to Subject Content (Priority: P2)

**Goal**: Users can easily access specific subject content with clear visual feedback about their progress and navigate properly

**Independent Test**: Select any subject card and verify proper navigation to subject-specific content with progress indicators working correctly

### Implementation for User Story 2

- [ ] T017 [P] [US2] Add click handlers to SubjectCard for navigation to subject content in src/components/landing/SubjectCard.tsx
- [ ] T018 [P] [US2] Implement progress tracking when users start/resume subjects in src/utils/progressUtils.ts
- [ ] T019 [US2] Update SubjectCard to show accurate progress status ("Started", lesson counts) in src/components/landing/SubjectCard.tsx
- [ ] T020 [US2] Integrate ProgressBadge component into SubjectCard display in src/components/landing/SubjectCard.tsx
- [ ] T021 [US2] Add navigation routing to subject pages using React Router in src/components/pages/LandingPage.tsx
- [ ] T022 [US2] Ensure progress data persists and displays correctly when returning to catalog in src/utils/progressUtils.ts
- [ ] T023 [US2] Add hover animations and visual feedback for interactive elements in src/components/landing/SubjectCard.tsx

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently - navigation and progress tracking functional

---

## Phase 5: User Story 3 - Discover Featured Content (Priority: P3)

**Goal**: Users can easily identify featured or trending educational content through visual indicators and promotional banners

**Independent Test**: Verify featured content banners appear correctly at top of page and "Hot" labels are displayed on trending subjects

### Implementation for User Story 3

- [ ] T024 [P] [US3] Create featured content data for promotional banners in src/data/featuredContent.ts
- [ ] T025 [P] [US3] Integrate FeaturedBanner component into LandingPage layout in src/components/pages/LandingPage.tsx
- [ ] T026 [US3] Add TrendingBadge component to SubjectCard for "Hot" indicators in src/components/landing/SubjectCard.tsx
- [ ] T027 [US3] Implement click handlers for featured content navigation in src/components/ui/FeaturedBanner.tsx
- [ ] T028 [US3] Add trending logic to identify and mark popular subjects in src/data/subjects.ts
- [ ] T029 [US3] Style featured banner with proper background images and call-to-action buttons in src/components/ui/FeaturedBanner.tsx
- [ ] T030 [US3] Ensure featured content and trending indicators are accessible and keyboard navigable in src/components/ui/FeaturedBanner.tsx

**Checkpoint**: All user stories should now be independently functional - full subject discovery experience complete

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories and final validation

- [ ] T031 [P] Add React Spring animations for smooth card transitions in src/components/landing/SubjectCard.tsx
- [ ] T032 [P] Optimize image loading with lazy loading for better performance in src/components/landing/SubjectCard.tsx
- [ ] T033 [P] Add proper error boundaries for graceful error handling in src/components/ui/ErrorBoundary.tsx
- [ ] T034 [P] Validate color contrast ratios meet WCAG 4.5:1 requirements across all new components
- [ ] T035 [P] Test responsive design across all target breakpoints (320px, 640px, 1024px, 1920px)
- [ ] T036 [P] Validate bundle size remains under 500KB target in package.json
- [ ] T037 Add comprehensive error handling for localStorage failures in src/utils/progressUtils.ts
- [ ] T038 Run quickstart.md validation to ensure implementation matches guide

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Builds on US1 subject display but independently testable
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Enhances US1 display but independently testable

### Within Each User Story

- Core implementation before integration
- Component updates before layout integration
- Data structures before UI components
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch parallel tasks for User Story 1:
Task: "Update SubjectGrid component to handle new subject data structure in src/components/landing/SubjectGrid.tsx"
Task: "Add responsive grid layout with proper spacing for subject cards in src/components/landing/SubjectGrid.tsx"
# Then sequential integration tasks follow
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T004)
2. Complete Phase 2: Foundational (T005-T010) - CRITICAL foundation
3. Complete Phase 3: User Story 1 (T011-T016)
4. **STOP and VALIDATE**: Test subject catalog display independently
5. Deploy/demo if ready - users can now view updated subject catalog

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready (subjects data and components exist)
2. Add User Story 1 → Test independently → Deploy/Demo (MVP - view subjects!)
3. Add User Story 2 → Test independently → Deploy/Demo (navigation + progress!)
4. Add User Story 3 → Test independently → Deploy/Demo (full discovery experience!)
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together (T001-T010)
2. Once Foundational is done:
   - Developer A: User Story 1 (T011-T016)
   - Developer B: User Story 2 (T017-T023)
   - Developer C: User Story 3 (T024-T030)
3. Stories complete and integrate independently

---

## Task Summary

**Total Tasks**: 38 tasks across 6 phases
**MVP Scope**: Phases 1-3 (16 tasks) - View Updated Subject Catalog
**Parallel Opportunities**: 15 tasks marked [P] can run in parallel within their phases
**Independent Test Criteria**: Each user story has clear validation criteria
**Estimated Time**: 2-3 hours total (per quickstart.md guide)

### Task Count Per User Story

- **Setup (Phase 1)**: 4 tasks
- **Foundational (Phase 2)**: 6 tasks  
- **User Story 1 (Phase 3)**: 6 tasks - View Updated Subject Catalog
- **User Story 2 (Phase 4)**: 7 tasks - Navigate to Subject Content  
- **User Story 3 (Phase 5)**: 7 tasks - Discover Featured Content
- **Polish (Phase 6)**: 8 tasks - Cross-cutting improvements

### Success Validation

Each user story includes:
- ✅ Clear goal statement
- ✅ Independent test criteria  
- ✅ Specific implementation tasks with file paths
- ✅ Checkpoint validation
- ✅ Parallel execution opportunities
- ✅ Constitutional compliance (child-first design, accessibility, performance)

---

## Notes

- [P] tasks = different files, no dependencies within phase
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Focus on MVP first (User Story 1) for fastest value delivery
- All tasks follow React/TypeScript/Material-UI patterns established in project