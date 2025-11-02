# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]
**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

[Extract from feature spec: primary requirement + technical approach from research]

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: [e.g., Python 3.11, Swift 5.9, Rust 1.75 or NEEDS CLARIFICATION]  
**Primary Dependencies**: [e.g., FastAPI, UIKit, LLVM or NEEDS CLARIFICATION]  
**Storage**: [if applicable, e.g., PostgreSQL, CoreData, files or N/A]  
**Testing**: [e.g., pytest, XCTest, cargo test or NEEDS CLARIFICATION]  
**Target Platform**: [e.g., Linux server, iOS 15+, WASM or NEEDS CLARIFICATION]
**Project Type**: [single/web/mobile - determines source structure]  
**Performance Goals**: [domain-specific, e.g., 1000 req/s, 10k lines/sec, 60 fps or NEEDS CLARIFICATION]  
**Constraints**: [domain-specific, e.g., <200ms p95, <100MB memory, offline-capable or NEEDS CLARIFICATION]  
**Scale/Scope**: [domain-specific, e.g., 10k users, 1M LOC, 50 screens or NEEDS CLARIFICATION]

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

[Gates determined based on constitution file]

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
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

**Design System**: [e.g., Material Design, Apple HIG, custom design system or NEEDS CLARIFICATION]  
**Visual Assets Needed**: [e.g., mockups, wireframes, icons, illustrations or N/A]  
**Asset Creation Approach**: [e.g., design tools used, collaboration process or NEEDS CLARIFICATION]  
**Image Formats**: [e.g., PNG for mockups, SVG for diagrams, JPEG for photos or NEEDS CLARIFICATION]  
**Accessibility Requirements**: [e.g., alt text standards, color contrast ratios or NEEDS CLARIFICATION]  
**Responsive Considerations**: [e.g., mobile breakpoints, tablet layouts or N/A]

**Asset Validation Checklist**:
- [ ] All images have descriptive filenames (not image1.png)
- [ ] All images include meaningful alt text
- [ ] File sizes are optimized (<2MB per image)
- [ ] SVG used for diagrams and scalable graphics
- [ ] Images follow consistent naming convention
- [ ] Visual assets align with feature requirements

### Media Directory Structure *(include if visual assets planned)*

```text
specs/[###-feature]/media/
├── mockups/
│   ├── [screen-name]-desktop.png    # Desktop mockups
│   ├── [screen-name]-mobile.png     # Mobile mockups
│   └── [screen-name]-tablet.png     # Tablet mockups (if needed)
├── diagrams/
│   ├── user-flow-[flow-name].svg    # User journey diagrams
│   ├── architecture-overview.svg    # System architecture
│   ├── data-flow-[process].svg      # Data flow diagrams
│   └── component-relationships.svg  # Component interaction diagrams
└── references/
    ├── competitor-[feature].jpg      # Reference implementations
    ├── design-inspiration-[x].png    # Visual inspiration
    └── existing-patterns-[y].png     # Current system patterns
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
# [REMOVE IF UNUSED] Option 1: Single project (DEFAULT)
src/
├── models/
├── services/
├── cli/
└── lib/

tests/
├── contract/
├── integration/
└── unit/

# [REMOVE IF UNUSED] Option 2: Web application (when "frontend" + "backend" detected)
backend/
├── src/
│   ├── models/
│   ├── services/
│   └── api/
└── tests/

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   └── services/
└── tests/

# [REMOVE IF UNUSED] Option 3: Mobile + API (when "iOS/Android" detected)
api/
└── [same as backend above]

ios/ or android/
└── [platform-specific structure: feature modules, UI flows, platform tests]
```

**Structure Decision**: [Document the selected structure and reference the real
directories captured above]

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
