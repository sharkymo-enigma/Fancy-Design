# HR AI Agent — Design System (Master)

**Source:** UI/UX Pro Max — HR AI Agent domain. Data-Dense Dashboard style.

## Pattern
- **Name:** Data-Dense + Drill-Down
- **CTA:** Above fold; primary actions prominent
- **Sections:** Hero/context > Features/content > CTA

## Style
- **Name:** Data-Dense Dashboard
- **Keywords:** Multiple charts/widgets, data tables, KPI cards, minimal padding, grid layout, space-efficient, maximum data visibility
- **Best for:** Business intelligence, HR analytics, enterprise reporting, operational dashboards

## Colors
| Role | Hex | Usage |
|------|-----|--------|
| Primary | #0F172A | Headers, sidebar emphasis |
| Secondary | #1E293B | Cards, elevated surfaces |
| CTA | #22C55E | Primary buttons, success, positive actions |
| Background | #020617 | Page background |
| Text | #F8FAFC | Primary text |
| Muted text | #94A3B8 | Secondary text, captions |
| Border | #334155 | Dividers, borders |

## Typography
- **Heading:** Fira Code (mono; for titles/data)
- **Body:** Fira Sans (UI, body copy)
- **Mood:** dashboard, data, analytics, technical, precise
- **Google Fonts:** Fira Code 400–700, Fira Sans 300–700

## Effects
- Hover tooltips; row highlighting on hover; smooth filter animations (150–300ms); data loading spinners
- No layout shift on hover (no scale transforms that move content)

## Avoid (Anti-patterns)
- Ornate design; no filtering; emoji as icons (use Lucide/Heroicons SVG)
- Light backgrounds for main app (dark theme for data-dense HR)

## Pre-delivery checklist
- [ ] No emojis as icons (SVG: Lucide)
- [ ] cursor-pointer on all clickable elements
- [ ] Hover states with smooth transitions (150–300ms)
- [ ] Focus states visible for keyboard nav
- [ ] prefers-reduced-motion respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px
