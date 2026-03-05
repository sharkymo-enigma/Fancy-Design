<html>
<head>
<meta charset="utf-8"/>
<style>
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif; line-height: 1.6; color: #1a1a2e; max-width: 1100px; margin: 0 auto; padding: 32px; }
  h1 { font-size: 28px; border-bottom: 3px solid #0f62fe; padding-bottom: 12px; margin-top: 40px; color: #161616; }
  h2 { font-size: 22px; color: #0f62fe; margin-top: 36px; border-bottom: 1px solid #e0e0e0; padding-bottom: 8px; }
  h3 { font-size: 18px; color: #393939; margin-top: 24px; }
  h4 { font-size: 15px; color: #525252; margin-top: 16px; }
  table { border-collapse: collapse; width: 100%; margin: 16px 0; font-size: 14px; border: 1px solid #e0e0e0; }
  th { background: #f4f4f4 !important; border: 1px solid #e0e0e0 !important; padding: 10px 14px !important; text-align: left !important; font-weight: 600 !important; color: #161616 !important; }
  td { border: 1px solid #e0e0e0 !important; padding: 10px 14px !important; vertical-align: top !important; }
  tr.even td { background: #f9f9fb !important; }
  code { background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px; font-family: 'IBM Plex Mono', Consolas, monospace; }
  .callout { background: #edf5ff; border-left: 4px solid #0f62fe; padding: 16px 20px; margin: 20px 0; border-radius: 0 4px 4px 0; }
  .callout-warn { background: #fff8e1; border-left: 4px solid #f1c21b; }
  .callout-success { background: #defbe6; border-left: 4px solid #24a148; }
  .badge { display: inline-block; padding: 3px 10px; border-radius: 12px; font-size: 12px; font-weight: 600; }
  .badge-blue { background: #d0e2ff; color: #0043ce; }
  .badge-green { background: #defbe6; color: #0e6027; }
  .badge-purple { background: #e8daff; color: #6929c4; }
  .badge-orange { background: #fff1e6; color: #8a3800; }
  .badge-gray { background: #e0e0e0; color: #393939; }
  .img-container { text-align: center; margin: 24px 0; }
  .img-container img { max-width: 100%; border: 1px solid #e0e0e0; border-radius: 6px; }
  .img-caption { font-size: 13px; color: #6f6f6f; margin-top: 8px; font-style: italic; }
  .screenshot-placeholder { background: #f4f4f4; border: 2px dashed #c6c6c6; border-radius: 8px; padding: 40px 20px; text-align: center; color: #6f6f6f; margin: 16px 0; }
  .metric-grid { display: table; width: 100%; border-collapse: separate; border-spacing: 16px; margin: 16px 0; }
  .metric-row { display: table-row; }
  .metric-card { display: table-cell; background: #fff; border: 1px solid #e0e0e0; border-radius: 8px; padding: 16px; text-align: center; vertical-align: top; width: 25%; }
  .metric-card .value { font-size: 28px; font-weight: 700; color: #0f62fe; display: block; }
  .metric-card .label { font-size: 13px; color: #525252; margin-top: 4px; display: block; }
  .toc { background: #f4f4f4; border-radius: 8px; padding: 20px 28px; margin: 24px 0; }
  .toc h3 { margin-top: 0; color: #161616; }
  .toc ol { padding-left: 20px; }
  .toc a { color: #0f62fe; text-decoration: none; }
  hr { border: none; border-top: 1px solid #e0e0e0; margin: 32px 0; }
</style>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1a1a2e; max-width: 1100px; margin: 0 auto; padding: 32px;">
<!-- Fallback: if Confluence strips head styles, table/code rules below still apply -->
<style type="text/css">
  body table { border-collapse: collapse; width: 100%; margin: 16px 0; font-size: 14px; border: 1px solid #e0e0e0; }
  body th { background: #f4f4f4; border: 1px solid #e0e0e0; padding: 10px 14px; text-align: left; font-weight: 600; color: #161616; }
  body td { border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top; }
  body code { background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px; }
</style>

<h1 style="font-size: 28px; border-bottom: 3px solid #0f62fe; padding-bottom: 12px; margin-top: 40px; color: #161616;">Spec-Driven Design Methodology</h1>
<h3>AI-Augmented Design-to-Code Pipeline with Perpetual Learning</h3>

<p>This document describes a <strong>spec-driven design methodology</strong> that uses AI agents to transform raw knowledge (meeting transcripts, design files, stakeholder requirements) into a fully implemented, tested, and continuously improved application. The methodology is <strong>perpetual</strong> — each cycle's outputs feed back into the next cycle, creating a self-improving system.</p>

<div class="metric-grid" style="display: table; width: 100%; border-collapse: separate; border-spacing: 16px; margin: 16px 0;">
  <div class="metric-card" style="display: table-cell; background: #fff; border: 1px solid #e0e0e0; border-radius: 8px; padding: 16px; text-align: center; vertical-align: top; width: 25%;">
    <div class="value" style="font-size: 28px; font-weight: 700; color: #0f62fe;">8</div>
    <div class="label" style="font-size: 13px; color: #525252; margin-top: 4px;">Spec Artifacts</div>
  </div>
  <div class="metric-card" style="display: table-cell; background: #fff; border: 1px solid #e0e0e0; border-radius: 8px; padding: 16px; text-align: center; vertical-align: top; width: 25%;">
    <div class="value" style="font-size: 28px; font-weight: 700; color: #0f62fe;">5</div>
    <div class="label" style="font-size: 13px; color: #525252; margin-top: 4px;">Pocket Subagents</div>
  </div>
  <div class="metric-card" style="display: table-cell; background: #fff; border: 1px solid #e0e0e0; border-radius: 8px; padding: 16px; text-align: center; vertical-align: top; width: 25%;">
    <div class="value" style="font-size: 28px; font-weight: 700; color: #0f62fe;">95%</div>
    <div class="label" style="font-size: 13px; color: #525252; margin-top: 4px;">Quality Gate</div>
  </div>
  <div class="metric-card" style="display: table-cell; background: #fff; border: 1px solid #e0e0e0; border-radius: 8px; padding: 16px; text-align: center; vertical-align: top; width: 25%;">
    <div class="value" style="font-size: 28px; font-weight: 700; color: #0f62fe;">10</div>
    <div class="label" style="font-size: 13px; color: #525252; margin-top: 4px;">Pipeline Stages</div>
  </div>
</div>

<div class="toc" style="background: #f4f4f4; border-radius: 8px; padding: 20px 28px; margin: 24px 0;">
<h3 style="margin-top: 0; color: #161616;">Table of Contents</h3>
<ol>
  <li><a href="#overview">Methodology Overview</a></li>
  <li><a href="#workflow">Perpetual Pipeline Workflow</a></li>
  <li><a href="#agents">Agent Architecture</a></li>
  <li><a href="#artifacts">The 8 Spec Artifacts</a></li>
  <li><a href="#scoring">Confidence Scoring & Quality Gate</a></li>
  <li><a href="#stages">Pipeline Stages in Detail</a></li>
  <li><a href="#figma">Figma Integration</a></li>
  <li><a href="#design-system">Design System (IBM Carbon)</a></li>
  <li><a href="#screens">Application Screens</a></li>
  <li><a href="#roles">Roles & Permissions</a></li>
  <li><a href="#usability">Usability Testing & Auto-Reinforcement</a></li>
  <li><a href="#learning">Agent Learning Protocol</a></li>
  <li><a href="#results">Results & Outcomes</a></li>
</ol>
</div>

<hr>

<!-- ============================================================ -->
<h1 id="overview" style="font-size: 28px; border-bottom: 3px solid #0f62fe; padding-bottom: 12px; margin-top: 40px; color: #161616;">1. Methodology Overview</h1>

<p>The spec-driven design approach treats <strong>specification documents as the single source of truth</strong>. Rather than treating specs as static artifacts that get written once and forgotten, this methodology makes them <strong>living documents</strong> that are continuously refined by specialized AI agents, validated against user needs and KPIs, and used to automatically generate application code.</p>

<div class="callout" style="background: #edf5ff; border-left: 4px solid #0f62fe; padding: 16px 20px; margin: 20px 0; border-radius: 0 4px 4px 0;">
<strong>Core Principle:</strong> The spec is the product. Code is a derivative. When the spec changes, the code follows. When usability testing finds issues, findings flow back into the spec — closing the loop.
</div>

<h3>Key Innovation: The Perpetual Pipeline</h3>

<p>Traditional design-to-code workflows are linear: design → spec → build → done. This methodology introduces a <strong>perpetual feedback loop</strong> where:</p>

<ol>
  <li>New knowledge (transcripts, design changes, usability findings) <strong>automatically triggers</strong> the pipeline</li>
  <li>AI agents extract, validate, and refine spec artifacts</li>
  <li>A quality gate ensures spec readiness before any code is generated</li>
  <li>Post-build usability testing writes findings back into the knowledge base</li>
  <li>The next cycle picks up those findings and improves the spec and code</li>
</ol>

<hr>

<!-- ============================================================ -->
<h1 id="workflow" style="font-size: 28px; border-bottom: 3px solid #0f62fe; padding-bottom: 12px; margin-top: 40px; color: #161616;">2. Perpetual Pipeline Workflow</h1>

<p>The workflow consists of <strong>4 major stages</strong> and <strong>10 sequential steps</strong>, forming a continuous improvement loop.</p>

<div class="img-container" style="text-align: center; margin: 24px 0;">
  <img src="https://kb.epam.com/download/attachments/2771646494/workflow-diagram.png?version=1&modificationDate=1772308248576&api=v2" style="max-width: 100%; border: 1px solid #e0e0e0; border-radius: 6px;" alt="Spec-Driven Design Methodology - Perpetual Pipeline Workflow Diagram" />
  <div class="img-caption" style="font-size: 13px; color: #6f6f6f; margin-top: 8px; font-style: italic;">Figure 1: The perpetual pipeline — from knowledge base trigger through extraction, pocket agent refinement, build, and auto-reinforcement back to the start.</div>
</div>

<h3>Stage Summary</h3>

<table style="border-collapse: collapse; width: 100%; margin: 16px 0; font-size: 14px; border: 1px solid #e0e0e0;">
  <tr>
    <th style="background: #f4f4f4; border: 1px solid #e0e0e0; padding: 10px 14px; text-align: left; font-weight: 600; color: #161616;">Stage</th>
    <th style="background: #f4f4f4; border: 1px solid #e0e0e0; padding: 10px 14px; text-align: left; font-weight: 600; color: #161616;">Name</th>
    <th style="background: #f4f4f4; border: 1px solid #e0e0e0; padding: 10px 14px; text-align: left; font-weight: 600; color: #161616;">Purpose</th>
    <th style="background: #f4f4f4; border: 1px solid #e0e0e0; padding: 10px 14px; text-align: left; font-weight: 600; color: #161616;">Agents Involved</th>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><span class="badge badge-blue" style="display: inline-block; padding: 3px 10px; border-radius: 12px; font-size: 12px; font-weight: 600; background: #d0e2ff; color: #0043ce;">Stage 1</span></td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Perpetual Trigger</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Detect new or modified knowledge base files by comparing against a processed manifest</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Rule engine (automated)</td>
  </tr>
  <tr style="background: #f9f9fb;">
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><span class="badge badge-green" style="display: inline-block; padding: 3px 10px; border-radius: 12px; font-size: 12px; font-weight: 600; background: #defbe6; color: #0e6027;">Stage 2</span></td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Extraction & Validation</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Extract findings from KB, validate against scope/KPIs, present to user for review</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Analyst Agent, UX Agent</td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><span class="badge badge-purple" style="display: inline-block; padding: 3px 10px; border-radius: 12px; font-size: 12px; font-weight: 600; background: #e8daff; color: #6929c4;">Stage 3</span></td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Pocket Subagents</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Deep vertical refinement of spec artifacts by 5 pocket subagents (invoked dynamically by UX Agent via Task tool), scored by UX Agent</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Wireframe, IA, Design System, Use-Case, Content Design (subagents), UX Agent</td>
  </tr>
  <tr style="background: #f9f9fb;">
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><span class="badge badge-orange" style="display: inline-block; padding: 3px 10px; border-radius: 12px; font-size: 12px; font-weight: 600; background: #fff1e6; color: #8a3800;">Stage 4</span></td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Build & Test</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Auto-generate code from spec, run usability testing, write findings back to KB</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">UX Agent (build), Usability Testing Agent</td>
  </tr>
</table>

<hr>

<!-- ============================================================ -->
<h1 id="agents" style="font-size: 28px; border-bottom: 3px solid #0f62fe; padding-bottom: 12px; margin-top: 40px; color: #161616;">3. Agent Architecture</h1>

<p>The system uses <strong>3 main agents</strong> (Analyst, UX Orchestrator, Usability Testing) and <strong>5 pocket subagents</strong> (Wireframe, IA, Design System, Use-Case, Content Design). Pocket agents are implemented as <strong>Cursor subagents</strong> in <code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">.cursor/agents/</code>, launched by the UX Agent via the Task tool. Agents communicate through the shared spec artifacts — they don't talk to each other directly.</p>

<div class="img-container" style="text-align: center; margin: 24px 0;">
  <img src="https://kb.epam.com/download/attachments/2771646494/agent-architecture.png?version=2&modificationDate=1772308416064&api=v2" alt="Agent Architecture Diagram" style="max-width: 100%; border: 1px solid #e0e0e0; border-radius: 6px;" />
  <div class="img-caption" style="font-size: 13px; color: #6f6f6f; margin-top: 8px; font-style: italic;">Figure 2: Agent architecture — UX Agent orchestrates, pocket subagents refine, usability testing closes the loop.</div>
</div>

<h3>Agent Roster</h3>

<table style="border-collapse: collapse; width: 100%; margin: 16px 0; font-size: 14px; border: 1px solid #e0e0e0;">
  <tr>
    <th style="background: #f4f4f4; border: 1px solid #e0e0e0; padding: 10px 14px; text-align: left; font-weight: 600; color: #161616;">#</th>
    <th style="background: #f4f4f4; border: 1px solid #e0e0e0; padding: 10px 14px; text-align: left; font-weight: 600; color: #161616;">Agent</th>
    <th style="background: #f4f4f4; border: 1px solid #e0e0e0; padding: 10px 14px; text-align: left; font-weight: 600; color: #161616;">Type</th>
    <th style="background: #f4f4f4; border: 1px solid #e0e0e0; padding: 10px 14px; text-align: left; font-weight: 600; color: #161616;">Responsibility</th>
    <th style="background: #f4f4f4; border: 1px solid #e0e0e0; padding: 10px 14px; text-align: left; font-weight: 600; color: #161616;">Reads From</th>
    <th style="background: #f4f4f4; border: 1px solid #e0e0e0; padding: 10px 14px; text-align: left; font-weight: 600; color: #161616;">Writes To</th>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">1</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><strong>Analyst Agent</strong></td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><span class="badge badge-green" style="display: inline-block; padding: 3px 10px; border-radius: 12px; font-size: 12px; font-weight: 600; background: #defbe6; color: #0e6027;">Extractor</span></td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Reads raw knowledge base files (transcripts, documents, reinforcement data) and proposes structured updates to spec artifacts</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Knowledge Base</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Spec artifacts (via proposal)</td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">2</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><strong>UX Agent</strong></td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><span class="badge badge-blue" style="display: inline-block; padding: 3px 10px; border-radius: 12px; font-size: 12px; font-weight: 600; background: #d0e2ff; color: #0043ce;">Orchestrator</span></td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Validates analyst output against scope/KPIs. <strong>Delegates to pocket subagents via Task tool</strong> — no fixed order; chooses which subagent to invoke based on information at hand. Scores artifacts. Gates the workflow at 95%. Triggers auto code plan when gate passes.</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">All spec artifacts</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Confidence scores, build plan</td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">3</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><strong>Wireframe / Figma Agent</strong></td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><span class="badge badge-purple" style="display: inline-block; padding: 3px 10px; border-radius: 12px; font-size: 12px; font-weight: 600; background: #e8daff; color: #6929c4;">Subagent</span></td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Extracts layout, regions, and interactive elements from Figma designs via MCP. Defines screen structure. Invoked when UX has Figma/layout/visual-structure needs.</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Figma (via MCP), spec artifacts</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">key-screens.md</code>, <code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">design-spec.md</code></td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">4</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><strong>IA Agent</strong></td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><span class="badge badge-purple" style="display: inline-block; padding: 3px 10px; border-radius: 12px; font-size: 12px; font-weight: 600; background: #e8daff; color: #6929c4;">Subagent</span></td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Defines sitemap, navigation hierarchy, screen inventory, and routing structure. Invoked when UX has screen/nav/orphan-screen needs.</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Wireframe output, spec artifacts</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">ia-screens.md</code>, <code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">flows.md</code></td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">5</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><strong>Design System Agent</strong></td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><span class="badge badge-purple" style="display: inline-block; padding: 3px 10px; border-radius: 12px; font-size: 12px; font-weight: 600; background: #e8daff; color: #6929c4;">Subagent</span></td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Maps all UI elements to design system tokens and components. Audits accessibility. Identifies custom components that should use design system equivalents. Invoked when UX has component/token/a11y needs.</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Wireframe + IA output, spec</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">design-spec.md</code>, <code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">validation-edge-cases.md</code></td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">6</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><strong>Use-Case / Scenario Agent</strong></td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><span class="badge badge-purple" style="display: inline-block; padding: 3px 10px; border-radius: 12px; font-size: 12px; font-weight: 600; background: #e8daff; color: #6929c4;">Subagent</span></td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Discovers and introduces new scenarios, flows, and edge cases; validates existing ones. Defines acceptance criteria (Given/When/Then) and role-based behavior. Invoked when UX has flow/scenario/edge-case needs.</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">IA + wireframe + design system output</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">flows.md</code>, <code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">validation-edge-cases.md</code></td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">7</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><strong>Content Design Agent</strong></td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><span class="badge badge-purple" style="display: inline-block; padding: 3px 10px; border-radius: 12px; font-size: 12px; font-weight: 600; background: #e8daff; color: #6929c4;">Subagent</span></td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Writes microcopy, labels, error messages, empty states, and synthetic data. Verifies hardcoded strings match spec. Invoked when UX has copy/label/terminology needs.</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Spec artifacts (all pockets)</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">key-screens.md</code>, <code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">ia-screens.md</code>, <code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">validation-edge-cases.md</code>, <code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">data-entities.md</code></td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">8</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><strong>Usability Testing Agent</strong></td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><span class="badge badge-orange" style="display: inline-block; padding: 3px 10px; border-radius: 12px; font-size: 12px; font-weight: 600; background: #fff1e6; color: #8a3800;">Tester</span></td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Post-build assessment across 9 criteria for each user role. Writes findings to auto-reinforcement file. Updates agent learnings.</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Built code + all spec artifacts</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">knowledge-base/auto-reinforcement.md</code>, Agent learnings</td>
  </tr>
</table>

<div class="callout" style="background: #edf5ff; border-left: 4px solid #0f62fe; padding: 16px 20px; margin: 20px 0; border-radius: 0 4px 4px 0;">
<strong>Dynamic Dispatch &amp; Bidirectional Awareness:</strong> There is <strong>no fixed order</strong>. The UX Agent decides which pocket subagent to invoke based on the <strong>type of information at hand</strong> (e.g. new Figma → Wireframe; new flows → Use-Case; missing labels → Content). Each subagent returns cross-impacts; the UX Agent uses those to choose the next invocation. After convergence, the UX Agent scores and gates at 95%. Maximum 3 iteration passes.
</div>

<hr>

<!-- ============================================================ -->
<h1 id="artifacts" style="font-size: 28px; border-bottom: 3px solid #0f62fe; padding-bottom: 12px; margin-top: 40px; color: #161616;">4. The 8 Spec Artifacts</h1>

<p>All design knowledge is captured in <strong>8 structured documents</strong> that together form the complete specification. These are the single source of truth for what gets built. Each artifact follows a <strong>unified structure</strong>: a purpose statement, a "How this file is structured" section, and consistent sections (index tables where applicable) so subagents and users can parse and edit reliably.</p>

<table style="border-collapse: collapse; width: 100%; margin: 16px 0; font-size: 14px; border: 1px solid #e0e0e0;">
  <tr>
    <th style="background: #f4f4f4; border: 1px solid #e0e0e0; padding: 10px 14px; text-align: left; font-weight: 600; color: #161616;">Artifact</th>
    <th style="background: #f4f4f4; border: 1px solid #e0e0e0; padding: 10px 14px; text-align: left; font-weight: 600; color: #161616;">Purpose</th>
    <th style="background: #f4f4f4; border: 1px solid #e0e0e0; padding: 10px 14px; text-align: left; font-weight: 600; color: #161616;">Key Content</th>
    <th style="background: #f4f4f4; border: 1px solid #e0e0e0; padding: 10px 14px; text-align: left; font-weight: 600; color: #161616;">Primary Agents</th>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">scope.md</code></td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Product scope definition</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">What we're building, for whom, success criteria (KPIs), Phases table, in/out of scope, domain context, stakeholders</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Analyst, UX</td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">roles-permissions.md</code></td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Access control</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Role definitions (Viewer → Admin), permission matrix, UI checklist, Rules and policy, audit logging requirements</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Use-Case, Content</td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">flows.md</code></td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">User workflows</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Flow index (F1–F12), then one block per flow: Trigger, Roles, Entry/Exit, KPI, Steps, Decision points, Scenarios table, Acceptance criteria, Edge cases. One flow = one block.</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Use-Case, IA</td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">ia-screens.md</code></td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Information architecture</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Screen inventory, sitemap, navigation structure, routing, screen hierarchy</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">IA, Wireframe</td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">design-spec.md</code></td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Design system mapping</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Tokens (typography, spacing, color, motion), components, states, accessibility, loading patterns</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Design System, Wireframe</td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">key-screens.md</code></td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Screen specifications</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Complex layouts, critical behaviors, component usage, user flows per screen, Figma alignment</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Wireframe, Content</td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">data-entities.md</code></td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Data model</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Entity definitions, attributes, relationships, validation rules, synthetic data</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Content, Analyst</td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">validation-edge-cases.md</code></td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Edge cases &amp; validation</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">KPI implications, Field/Regulatory/Form validation, Empty states, Permission table, Edge cases by flow/screen (grouped subsections), Hardcoded strings, Domain rules</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Use-Case, Design System, Content</td>
  </tr>
</table>

<p>Each artifact includes a <strong>confidence score</strong> (0–100%) that reflects how complete, accurate, and implementation-ready the content is.</p>

<hr>

<!-- ============================================================ -->
<h1 id="scoring" style="font-size: 28px; border-bottom: 3px solid #0f62fe; padding-bottom: 12px; margin-top: 40px; color: #161616;">5. Confidence Scoring & Quality Gate</h1>

<p>The UX Agent scores each artifact across <strong>three lenses</strong> to determine if the spec is ready for code generation.</p>

<div class="img-container" style="text-align: center; margin: 24px 0;">
  <img src="https://kb.epam.com/download/attachments/2771646494/confidence-scoring.png?version=1&modificationDate=1772308239449&api=v2" alt="Confidence Scoring and Quality Gate Process" style="max-width: 100%; border: 1px solid #e0e0e0; border-radius: 6px;" />
  <div class="img-caption" style="font-size: 13px; color: #6f6f6f; margin-top: 8px; font-style: italic;">Figure 3: Confidence scoring across Business, User, and Technology lenses with the 95% quality gate.</div>
</div>

<h3>Three Scoring Lenses</h3>

<table style="border-collapse: collapse; width: 100%; margin: 16px 0; font-size: 14px; border: 1px solid #e0e0e0;">
  <tr>
    <th style="background: #f4f4f4; border: 1px solid #e0e0e0; padding: 10px 14px; text-align: left; font-weight: 600; color: #161616;">Lens</th>
    <th style="background: #f4f4f4; border: 1px solid #e0e0e0; padding: 10px 14px; text-align: left; font-weight: 600; color: #161616;">What It Assesses</th>
    <th style="background: #f4f4f4; border: 1px solid #e0e0e0; padding: 10px 14px; text-align: left; font-weight: 600; color: #161616;">Example Checks</th>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><strong>Business</strong></td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Scope alignment, KPIs, compliance, reporting</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Does the spec support the 90% in-dashboard resolution KPI? Are regulatory requirements documented?</td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><strong>User</strong></td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Tasks, flows, roles, terminology, states</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Can each persona complete their primary tasks? Are empty states handled? Is role-based hiding consistent?</td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><strong>Technology</strong></td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Design system, components, validation, data</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Are all UI elements mapped to Carbon components? Are interactive elements wired to state? Are edge cases covered?</td>
  </tr>
</table>

<h3>Quality Gate Decision</h3>

<table style="border-collapse: collapse; width: 100%; margin: 16px 0; font-size: 14px; border: 1px solid #e0e0e0;">
  <tr>
    <th style="background: #f4f4f4; border: 1px solid #e0e0e0; padding: 10px 14px; text-align: left; font-weight: 600; color: #161616;">Condition</th>
    <th style="background: #f4f4f4; border: 1px solid #e0e0e0; padding: 10px 14px; text-align: left; font-weight: 600; color: #161616;">Action</th>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Overall average <strong>≥ 95%</strong></td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><span class="badge badge-green" style="display: inline-block; padding: 3px 10px; border-radius: 12px; font-size: 12px; font-weight: 600; background: #defbe6; color: #0e6027;">GO</span> — Proceed to auto code plan and build</td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Overall <strong>< 95%</strong>, iteration < 3</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><span class="badge badge-orange" style="display: inline-block; padding: 3px 10px; border-radius: 12px; font-size: 12px; font-weight: 600; background: #fff1e6; color: #8a3800;">ITERATE</span> — Re-run affected pocket agents on lowest-scoring artifacts</td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Overall <strong>< 95%</strong> after 3 iterations</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><span class="badge badge-gray" style="display: inline-block; padding: 3px 10px; border-radius: 12px; font-size: 12px; font-weight: 600; background: #e0e0e0; color: #393939;">STOP</span> — Report gaps to user, request guidance</td>
  </tr>
</table>

<div class="callout-success callout" style="background: #defbe6; border-left: 4px solid #24a148; padding: 16px 20px; margin: 20px 0; border-radius: 0 4px 4px 0;">
<strong>Current Status:</strong> After 2 cycles of refinement, all 6 scored artifacts achieved 95–96% confidence, passing the quality gate and triggering automatic code generation.
</div>

<hr>

<!-- ============================================================ -->
<h1 id="stages">6. Pipeline Stages in Detail</h1>

<h3>Stage-by-Stage Breakdown</h3>

<table style="border-collapse: collapse; width: 100%; margin: 16px 0; font-size: 14px; border: 1px solid #e0e0e0;">
  <tr>
    <th style="background: #f4f4f4; border: 1px solid #e0e0e0; padding: 10px 14px; text-align: left; font-weight: 600; color: #161616;">Stage</th>
    <th style="background: #f4f4f4; border: 1px solid #e0e0e0; padding: 10px 14px; text-align: left; font-weight: 600; color: #161616;">Step</th>
    <th style="background: #f4f4f4; border: 1px solid #e0e0e0; padding: 10px 14px; text-align: left; font-weight: 600; color: #161616;">Agent(s)</th>
    <th style="background: #f4f4f4; border: 1px solid #e0e0e0; padding: 10px 14px; text-align: left; font-weight: 600; color: #161616;">Input</th>
    <th style="background: #f4f4f4; border: 1px solid #e0e0e0; padding: 10px 14px; text-align: left; font-weight: 600; color: #161616;">Output</th>
    <th style="background: #f4f4f4; border: 1px solid #e0e0e0; padding: 10px 14px; text-align: left; font-weight: 600; color: #161616;">Gate</th>
  </tr>
  <tr>
    <td rowspan="1" style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><span class="badge badge-blue" style="display: inline-block; padding: 3px 10px; border-radius: 12px; font-size: 12px; font-weight: 600; background: #d0e2ff; color: #0043ce;">1</span></td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">KB Detection</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Rule engine</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Compare <code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">knowledge-base/</code> files vs <code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">kb-manifest.md</code></td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">List of new/modified files</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">New files → Stage 2</td>
  </tr>
  <tr>
    <td rowspan="4" style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><span class="badge badge-green" style="display: inline-block; padding: 3px 10px; border-radius: 12px; font-size: 12px; font-weight: 600; background: #defbe6; color: #0e6027;">2</span></td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Extraction</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Analyst</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">KB files</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Proposed artifact updates</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">→ Validation</td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Validation</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">UX Agent</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Analyst proposal + scope/KPIs</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Validated proposal</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">UX agrees → User Review</td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">User Review</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">UX Agent (presents)</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Review document</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">User confirm/correct</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Confirmed → Spec Write</td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Spec Write</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Analyst</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Confirmed proposal</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Updated <code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">spec/</code> + <code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">kb-manifest</code></td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">→ Stage 3</td>
  </tr>
  <tr>
    <td rowspan="2" style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><span class="badge badge-purple" style="display: inline-block; padding: 3px 10px; border-radius: 12px; font-size: 12px; font-weight: 600; background: #e8daff; color: #6929c4;">3</span></td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Pocket Subagents</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">UX delegates dynamically to Wireframe, IA, Design System, Use-Case, Content (via Task tool; no fixed order)</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Spec artifacts</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Refined spec artifacts</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">→ Scoring</td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Scoring</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">UX Agent</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Refined artifacts</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Confidence scores</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">≥ 95% → Stage 4; < 95% → iterate</td>
  </tr>
  <tr>
    <td rowspan="3" style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><span class="badge badge-orange" style="display: inline-block; padding: 3px 10px; border-radius: 12px; font-size: 12px; font-weight: 600; background: #fff1e6; color: #8a3800;">4</span></td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Build</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">UX Agent</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Spec at 95%+</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Application code</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Build succeeds → Test</td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Usability Test</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Usability Testing Agent</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Built code + spec</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Assessment report</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">→ Reinforce</td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Reinforce</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Usability Testing Agent</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Findings</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">auto-reinforcement.md</code> + agent learnings</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">→ Stage 1 (next cycle)</td>
  </tr>
</table>

<hr>

<!-- ============================================================ -->
<h1 id="figma" style="font-size: 28px; border-bottom: 3px solid #0f62fe; padding-bottom: 12px; margin-top: 40px; color: #161616;">7. Figma Integration</h1>

<p>The system integrates directly with <strong>Figma</strong> via the Figma MCP (Model Context Protocol) server. The Wireframe/Figma agent fetches design data programmatically — extracting layouts, component structures, colors, typography, and interactive elements directly from Figma frames.</p>

<h3>Integration Capabilities</h3>

<table style="border-collapse: collapse; width: 100%; margin: 16px 0; font-size: 14px; border: 1px solid #e0e0e0;">
  <tr>
    <th style="background: #f4f4f4; border: 1px solid #e0e0e0; padding: 10px 14px; text-align: left; font-weight: 600; color: #161616;">Capability</th>
    <th style="background: #f4f4f4; border: 1px solid #e0e0e0; padding: 10px 14px; text-align: left; font-weight: 600; color: #161616;">MCP Tool</th>
    <th style="background: #f4f4f4; border: 1px solid #e0e0e0; padding: 10px 14px; text-align: left; font-weight: 600; color: #161616;">Usage</th>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Design context extraction</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">get_design_context</code></td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Fetches detailed component hierarchy, properties, styles, and layout constraints for a specific frame</td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Screenshot capture</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">get_screenshot</code></td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Captures rendered screenshots of Figma frames for visual reference</td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Metadata inspection</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">get_metadata</code></td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Reads file/frame metadata including node IDs, names, and structure</td>
  </tr>
</table>

<h3>Figma-to-Spec Mapping</h3>

<p>Each Figma section maps to specific spec artifacts and screens:</p>

<table style="border-collapse: collapse; width: 100%; margin: 16px 0; font-size: 14px; border: 1px solid #e0e0e0;">
  <tr>
    <th style="background: #f4f4f4; border: 1px solid #e0e0e0; padding: 10px 14px; text-align: left; font-weight: 600; color: #161616;">Figma Section</th>
    <th style="background: #f4f4f4; border: 1px solid #e0e0e0; padding: 10px 14px; text-align: left; font-weight: 600; color: #161616;">Frame</th>
    <th style="background: #f4f4f4; border: 1px solid #e0e0e0; padding: 10px 14px; text-align: left; font-weight: 600; color: #161616;">Application Screen</th>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Dashboard</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Dashboard 1</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Dashboard (Data Landscape) — landing page</td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Dashboard</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Source Expanded</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Dashboard drill-down into data source exceptions</td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Dashboard</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Resolution overlay</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Quick-resolve panel (compact Sheet)</td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Exceptions</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Exceptions</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Exception list with filters and bulk actions</td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Exceptions</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Exception Resolution</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Full resolution modal (ComposedModal with AI block)</td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Rules Engine</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Rules Engine</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Rule management with toggles and archive</td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Rules Engine</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Create Rule</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Rule builder modal (conditions + actions)</td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Audit Trail</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Audit Trail</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">System activity log with filters and export</td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Settings</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Settings</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">User/role management (Admin) / profile (others)</td>
  </tr>
</table>

<div class="callout" style="background: #edf5ff; border-left: 4px solid #0f62fe; padding: 16px 20px; margin: 20px 0; border-radius: 0 4px 4px 0;">
<strong>Context-Specific Resolution:</strong> A key discovery from Figma analysis was that the resolution screen has <em>different layouts</em> depending on the entry point. From the Dashboard, a compact overlay keeps the table visible. From Exceptions, a full modal includes AI recommendations, audit trail, and richer context. Both share the same form logic but differ in visual depth.
</div>

<hr>

<!-- ============================================================ -->
<h1 id="design-system" style="font-size: 28px; border-bottom: 3px solid #0f62fe; padding-bottom: 12px; margin-top: 40px; color: #161616;">8. Design System — IBM Carbon</h1>

<p>The application uses the <strong>IBM Carbon Design System</strong> exclusively. All tokens (typography, spacing, color, motion) and components come from <code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">@carbon/react</code> and <code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">@carbon/styles</code>. Custom implementations are flagged and migrated to Carbon equivalents.</p>

<h3>Core Token Categories</h3>

<table style="border-collapse: collapse; width: 100%; margin: 16px 0; font-size: 14px; border: 1px solid #e0e0e0;">
  <tr>
    <th style="background: #f4f4f4; border: 1px solid #e0e0e0; padding: 10px 14px; text-align: left; font-weight: 600; color: #161616;">Category</th>
    <th style="background: #f4f4f4; border: 1px solid #e0e0e0; padding: 10px 14px; text-align: left; font-weight: 600; color: #161616;">Example Tokens</th>
    <th style="background: #f4f4f4; border: 1px solid #e0e0e0; padding: 10px 14px; text-align: left; font-weight: 600; color: #161616;">Usage</th>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Typography</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">heading-05</code>, <code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">body-compact-01</code>, <code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">label-01</code></td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Section headings, body text, form labels. Font: IBM Plex Sans.</td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Spacing</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">spacing-03</code> (8px), <code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">spacing-05</code> (16px), <code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">spacing-07</code> (32px)</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Component padding, section gaps, layout margins</td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Color</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">text-primary</code>, <code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">layer-01</code>, <code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">support-error</code>, <code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">focus</code></td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Semantic colors — theme-dependent, WCAG AA compliant</td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Motion</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">duration-fast-02</code> (110ms), <code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">duration-moderate-02</code> (240ms)</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Transitions, toasts, modal open/close</td>
  </tr>
</table>

<h3>Key Carbon Components Used</h3>

<table style="border-collapse: collapse; width: 100%; margin: 16px 0; font-size: 14px; border: 1px solid #e0e0e0;">
  <tr>
    <th style="background: #f4f4f4; border: 1px solid #e0e0e0; padding: 10px 14px; text-align: left; font-weight: 600; color: #161616;">Category</th>
    <th style="background: #f4f4f4; border: 1px solid #e0e0e0; padding: 10px 14px; text-align: left; font-weight: 600; color: #161616;">Components</th>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Data Display</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">DataTable</code> (with expandable rows, batch actions, sorting), <code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">Tag</code> (status badges), <code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">SkeletonText</code></td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Forms</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">Dropdown</code>, <code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">TextInput</code>, <code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">TextArea</code>, <code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">Toggle</code>, <code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">DatePicker</code>, <code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">Search</code></td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Navigation</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">SideNav</code> (rail mode), <code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">Breadcrumb</code>, <code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">Tabs</code>, <code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">Header</code></td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Feedback</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">Modal</code>, <code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">ComposedModal</code>, <code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">InlineNotification</code>, <code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">ToastNotification</code></td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Actions</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">Button</code> (primary/secondary/ghost/danger), <code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">IconButton</code>, <code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">OverflowMenu</code></td>
  </tr>
</table>

<h3>Carbon Duplicate Audit</h3>

<p>The Design System agent performs a "Carbon duplicate audit" each cycle to identify custom implementations that should be replaced with Carbon equivalents:</p>

<table style="border-collapse: collapse; width: 100%; margin: 16px 0; font-size: 14px; border: 1px solid #e0e0e0;">
  <tr>
    <th style="background: #f4f4f4; border: 1px solid #e0e0e0; padding: 10px 14px; text-align: left; font-weight: 600; color: #161616;">Custom Implementation</th>
    <th style="background: #f4f4f4; border: 1px solid #e0e0e0; padding: 10px 14px; text-align: left; font-weight: 600; color: #161616;">Carbon Replacement</th>
    <th style="background: #f4f4f4; border: 1px solid #e0e0e0; padding: 10px 14px; text-align: left; font-weight: 600; color: #161616;">Accessibility Gap Resolved</th>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Custom modal overlay</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">ComposedModal</code></td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Focus trap, escape handling, <code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">aria-modal</code>, <code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">role="dialog"</code></td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Custom toggle switch (CSS)</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">Toggle</code></td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">aria-checked</code>, keyboard toggle via Space</td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Custom sidebar (div-based)</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">SideNav</code> with rail mode</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">aria-expanded</code>, keyboard navigation, collapse/expand</td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">"Back to list" link</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">Breadcrumb</code></td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Breadcrumb trail semantics, <code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">aria-label</code></td>
  </tr>
</table>

<hr>

<!-- ============================================================ -->
<h1 id="screens" style="font-size: 28px; border-bottom: 3px solid #0f62fe; padding-bottom: 12px; margin-top: 40px; color: #161616;">9. Application Screens</h1>

<p>The application consists of <strong>5 primary screens</strong>, <strong>2 secondary screens</strong>, and <strong>2 overlay components</strong>.</p>

<h3>Screen Inventory</h3>

<table style="border-collapse: collapse; width: 100%; margin: 16px 0; font-size: 14px; border: 1px solid #e0e0e0;">
  <tr>
    <th style="background: #f4f4f4; border: 1px solid #e0e0e0; padding: 10px 14px; text-align: left; font-weight: 600; color: #161616;">Level</th>
    <th style="background: #f4f4f4; border: 1px solid #e0e0e0; padding: 10px 14px; text-align: left; font-weight: 600; color: #161616;">Screen</th>
    <th style="background: #f4f4f4; border: 1px solid #e0e0e0; padding: 10px 14px; text-align: left; font-weight: 600; color: #161616;">Route</th>
    <th style="background: #f4f4f4; border: 1px solid #e0e0e0; padding: 10px 14px; text-align: left; font-weight: 600; color: #161616;">Purpose</th>
  </tr>
  <tr>
    <td rowspan="5" style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><span class="badge badge-blue" style="display: inline-block; padding: 3px 10px; border-radius: 12px; font-size: 12px; font-weight: 600; background: #d0e2ff; color: #0043ce;">Primary</span></td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Dashboard (Data Landscape)</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">/</code></td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Landing page — data source overview with expandable rows, toolbar filters, Big Picture sidebar</td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Exceptions</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">/exceptions</code></td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Exception list with filters, bulk actions, resolution</td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Rules Engine</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">/rules</code></td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Deterministic rule management (create, edit, toggle, archive)</td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Audit Trail</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">/audit-trail</code></td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Complete system activity log with filtering and CSV export</td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Settings</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">/settings</code></td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">User/role management (Admin) or profile view (others)</td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><span class="badge badge-green">Secondary</span></td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Exception Detail</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">/exceptions/:id</code></td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Deep investigation view with full data, audit trail, actions</td>
  </tr>
  <tr>
    <td rowspan="2" style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><span class="badge badge-purple" style="display: inline-block; padding: 3px 10px; border-radius: 12px; font-size: 12px; font-weight: 600; background: #e8daff; color: #6929c4;">Overlay</span></td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Resolution Overlay</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">—</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">In-context resolution (compact Sheet from Dashboard, full Modal from Exceptions)</td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Create Rule Modal</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">—</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Rule builder with dynamic conditions/actions</td>
  </tr>
</table>

<h3>Dashboard</h3>


<p>The Dashboard is the primary landing page. It provides a unified view of all data sources with exception counts, expandable drill-down, and a "Big Picture" sidebar with real-time statistics.</p>

<div class="screenshot-placeholder" style="background: #f4f4f4; border: 2px dashed #c6c6c6; border-radius: 8px; padding: 40px 20px; text-align: center; color: #6f6f6f; margin: 16px 0;">
  <strong>Screenshot: Dashboard</strong><br>
  <em> <div><img src="https://kb.epam.com/download/attachments/2771646494/Jny%20Ops%20Dashboard%20output.png?version=1&modificationDate=1772309555180&api=v2" style="max-width: 100%; border: 1px solid #e0e0e0; border-radius: 6px;" alt="Dashboard final output" /></div>
 </em>
</div>

<h4>Key Features</h4>
<ul>
  <li><strong>Toolbar</strong>: Search input + 6 filter dropdowns (Platform, Data Type, Product, Function, User, Status) + Sort + Clear filters</li>
  <li><strong>Expandable rows</strong>: Click chevron to drill into source-level exceptions</li>
  <li><strong>Exception badges</strong>: Color-coded count badges per source (red for active, green for resolved)</li>
  <li><strong>Big Picture sidebar</strong>: Real-time stats (Total Issues, Critical Issues), pending task links, trading venue overview</li>
  <li><strong>Collapsible navigation</strong>: Carbon SideNav with rail mode (48px collapsed, 256px expanded)</li>
</ul>

<h3>Exceptions</h3>

<p>The Exceptions page provides a filterable, sortable list of all trade and settlement exceptions with bulk action support.</p>

<div class="screenshot-placeholder" style="background: #f4f4f4; border: 2px dashed #c6c6c6; border-radius: 8px; padding: 40px 20px; text-align: center; color: #6f6f6f; margin: 16px 0;">
  <strong>Screenshot: Exceptions Page</strong><br>
  <em><div><img src="https://kb.epam.com/download/attachments/2771646494/Screenshot%202026-03-01%20at%201.47.33%E2%80%AFAM.png?version=1&modificationDate=1772309866983&api=v2" style="max-width: 100%; border: 1px solid #e0e0e0; border-radius: 6px;" alt="Dashboard final output" /></div></em>
</div>

<h4>Key Features</h4>
<ul>
  <li><strong>Filters</strong>: Status, Source, Type, Date range, Assignee, Sort</li>
  <li><strong>Bulk actions</strong>: Select multiple rows → Bulk resolve with shared resolution panel</li>
  <li><strong>Resolution overlay</strong>: Full ComposedModal with AI recommendation block, confidence meter, rationale, accept/reject, mini audit trail</li>
  <li><strong>Export</strong>: CSV download of filtered results</li>
</ul>

<h3>Resolution Overlay</h3>

<p>The resolution overlay enables exception resolution <em>without leaving the current page</em> — supporting the <strong>90% in-dashboard resolution KPI</strong>.</p>

<div class="screenshot-placeholder" style="background: #f4f4f4; border: 2px dashed #c6c6c6; border-radius: 8px; padding: 40px 20px; text-align: center; color: #6f6f6f; margin: 16px 0;">
  <strong>Screenshot: Resolution Overlay</strong><br>
  <em><div><img src="https://kb.epam.com/download/attachments/2771646494/Screenshot%202026-03-01%20at%201.46.26%E2%80%AFAM.png?version=1&modificationDate=1772309833845&api=v2" style="max-width: 100%; border: 1px solid #e0e0e0; border-radius: 6px;" alt="Dashboard final output" /></div></em>
</div>

<h4>Context-Specific Layouts</h4>

<table style="border-collapse: collapse; width: 100%; margin: 16px 0; font-size: 14px; border: 1px solid #e0e0e0;">
  <tr>
    <th style="background: #f4f4f4; border: 1px solid #e0e0e0; padding: 10px 14px; text-align: left; font-weight: 600; color: #161616;">Origin</th>
    <th style="background: #f4f4f4; border: 1px solid #e0e0e0; padding: 10px 14px; text-align: left; font-weight: 600; color: #161616;">Layout</th>
    <th style="background: #f4f4f4; border: 1px solid #e0e0e0; padding: 10px 14px; text-align: left; font-weight: 600; color: #161616;">Content</th>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Dashboard (source expanded)</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Compact Sheet (right side)</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Exception summary, action dropdown, reason, comment, Submit/Cancel. Table visible beneath.</td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Exceptions → Resolve</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Full ComposedModal</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Exception details, AI recommendation (confidence meter, rationale, accept/reject), resolution form, mini audit trail, assign/prioritize.</td>
  </tr>
</table>

<h3>Rules Engine</h3>

<p>The Rules Engine allows supervisors and admins to create, edit, toggle, and archive deterministic exception-handling rules.</p>

<div class="screenshot-placeholder" style="background: #f4f4f4; border: 2px dashed #c6c6c6; border-radius: 8px; padding: 40px 20px; text-align: center; color: #6f6f6f; margin: 16px 0;">
  <strong>Screenshot: Rules Engine</strong><br>
  <em><div><img src="https://kb.epam.com/download/attachments/2771646494/Screenshot%202026-03-01%20at%201.48.10%E2%80%AFAM.png?version=1&modificationDate=1772309902286&api=v2" style="max-width: 100%; border: 1px solid #e0e0e0; border-radius: 6px;" alt="Dashboard final output" /></div></em>
</div>

<h4>Key Features</h4>
<ul>
  <li><strong>Carbon Toggle</strong>: Active/Inactive status switch per rule</li>
  <li><strong>Create Rule modal</strong>: Dynamic condition builder (IF field/operator/value → THEN action/target)</li>
  <li><strong>Archive confirmation</strong>: Carbon Modal with <code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">danger</code> kind for destructive actions</li>
  <li><strong>Role gating</strong>: Only visible to Supervisor+ roles</li>
</ul>

<h3>Audit Trail</h3>

<p>Complete system activity log supporting the <strong>100% audit trail KPI</strong>.</p>

<div class="screenshot-placeholder" style="background: #f4f4f4; border: 2px dashed #c6c6c6; border-radius: 8px; padding: 40px 20px; text-align: center; color: #6f6f6f; margin: 16px 0;">
  <strong>Screenshot: Audit Trail</strong><br>
  <em><div><img src="https://kb.epam.com/download/attachments/2771646494/Screenshot%202026-03-01%20at%201.48.32%E2%80%AFAM.png?version=1&modificationDate=1772309922574&api=v2" style="max-width: 100%; border: 1px solid #e0e0e0; border-radius: 6px;" alt="Dashboard final output" /></div></em>
</div>

<h4>Key Features</h4>
<ul>
  <li><strong>Filters</strong>: Date range (start/end), User dropdown, Action Type dropdown, Apply/Reset buttons</li>
  <li><strong>Role badges</strong>: Color-coded tags showing user role for each action</li>
  <li><strong>Export CSV</strong>: Download filtered audit data</li>
  <li><strong>Global log</strong>: Captures all system actions — exceptions, rules, role changes, data edits</li>
</ul>

<h3>Settings</h3>

<div class="screenshot-placeholder" style="background: #f4f4f4; border: 2px dashed #c6c6c6; border-radius: 8px; padding: 40px 20px; text-align: center; color: #6f6f6f; margin: 16px 0;">
  <strong>Screenshot: Settings Page</strong><br>
  <em><div><img src="https://kb.epam.com/download/attachments/2771646494/Screenshot%202026-03-01%20at%201.56.32%E2%80%AFAM.png?version=1&modificationDate=1772310431524&api=v2" style="max-width: 100%; border: 1px solid #e0e0e0; border-radius: 6px;" alt="Dashboard final output" /></div></em>
</div>

<h4>Key Features</h4>
<ul>
  <li><strong>Admin view</strong>: User/role management table, role assignment dropdowns, Add User button</li>
  <li><strong>Non-Admin view</strong>: Own profile card with name, email, role</li>
  <li><strong>Role change confirmation</strong>: Carbon Modal with danger kind, audit trail notification</li>
</ul>

<hr>

<!-- ============================================================ -->
<h1 id="roles" style="font-size: 28px; border-bottom: 3px solid #0f62fe; padding-bottom: 12px; margin-top: 40px; color: #161616;">10. Roles & Permissions</h1>

<p>The system implements <strong>4 user roles</strong> with hierarchical access control. Role-based visibility is enforced at the UI component level.</p>

<table style="border-collapse: collapse; width: 100%; margin: 16px 0; font-size: 14px; border: 1px solid #e0e0e0;">
  <tr>
    <th style="background: #f4f4f4; border: 1px solid #e0e0e0; padding: 10px 14px; text-align: left; font-weight: 600; color: #161616;">Capability</th>
    <th style="background: #f4f4f4; border: 1px solid #e0e0e0; padding: 10px 14px; text-align: left; font-weight: 600; color: #161616;"><span class="badge badge-gray" style="display: inline-block; padding: 3px 10px; border-radius: 12px; font-size: 12px; font-weight: 600; background: #e0e0e0; color: #393939;">Viewer</span></th>
    <th style="background: #f4f4f4; border: 1px solid #e0e0e0; padding: 10px 14px; text-align: left; font-weight: 600; color: #161616;"><span class="badge badge-blue" style="display: inline-block; padding: 3px 10px; border-radius: 12px; font-size: 12px; font-weight: 600; background: #d0e2ff; color: #0043ce;">Analyst</span></th>
    <th style="background: #f4f4f4; border: 1px solid #e0e0e0; padding: 10px 14px; text-align: left; font-weight: 600; color: #161616;"><span class="badge badge-purple" style="display: inline-block; padding: 3px 10px; border-radius: 12px; font-size: 12px; font-weight: 600; background: #e8daff; color: #6929c4;">Supervisor</span></th>
    <th style="background: #f4f4f4; border: 1px solid #e0e0e0; padding: 10px 14px; text-align: left; font-weight: 600; color: #161616;"><span class="badge badge-orange" style="display: inline-block; padding: 3px 10px; border-radius: 12px; font-size: 12px; font-weight: 600; background: #fff1e6; color: #8a3800;">Admin</span></th>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">View exceptions, dashboard, audit trail</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">✓</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">✓</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">✓</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">✓</td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Resolve exceptions, comment, assign</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">✗</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">✓</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">✓</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">✓</td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Rules Engine (create, edit, toggle, archive)</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">✗</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">✗</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">✓</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">✓</td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Edit exception data (underlying fields)</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">✗</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">✗</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">✗</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">✓</td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">User & role management</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">✗</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">✗</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">✗</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">✓</td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Full Settings access</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Profile only</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Profile only</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Profile only</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">✓</td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Export CSV (Audit Trail)</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">✓</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">✓</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">✓</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">✓</td>
  </tr>
</table>

<h3>UI Implementation Rules</h3>

<ul>
  <li><strong>Viewer</strong>: Resolve/Bulk resolve buttons hidden; tooltip "Resolve requires Analyst or above". Rules Engine hidden from nav. Settings shows own profile only.</li>
  <li><strong>Analyst</strong>: Full resolve capability. Rules Engine hidden from nav. Settings shows own profile only.</li>
  <li><strong>Supervisor</strong>: Full resolve + Rules Engine access. Settings shows own profile.</li>
  <li><strong>Admin</strong>: Full access to everything including user management, exception data editing, and system configuration.</li>
</ul>

<hr>

<!-- ============================================================ -->
<h1 id="usability" style="font-size: 28px; border-bottom: 3px solid #0f62fe; padding-bottom: 12px; margin-top: 40px; color: #161616;">11. Usability Testing & Auto-Reinforcement</h1>

<p>After every successful build, the <strong>Usability Testing Agent</strong> performs a comprehensive assessment across <strong>9 criteria</strong> for <strong>4 user roles</strong>, producing a detailed report and feeding findings back into the pipeline.</p>

<h3>Assessment Criteria</h3>

<table style="border-collapse: collapse; width: 100%; margin: 16px 0; font-size: 14px; border: 1px solid #e0e0e0;">
  <tr>
    <th style="background: #f4f4f4; border: 1px solid #e0e0e0; padding: 10px 14px; text-align: left; font-weight: 600; color: #161616;">#</th>
    <th style="background: #f4f4f4; border: 1px solid #e0e0e0; padding: 10px 14px; text-align: left; font-weight: 600; color: #161616;">Criterion</th>
    <th style="background: #f4f4f4; border: 1px solid #e0e0e0; padding: 10px 14px; text-align: left; font-weight: 600; color: #161616;">What It Assesses</th>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">1</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><strong>Usefulness</strong></td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Does each screen serve a clear purpose? Can users accomplish goals? Are features discoverable?</td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">2</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><strong>Usability</strong></td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Task completion efficiency (minimal clicks/steps), logical flow, clear labels and actions</td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">3</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><strong>Accessibility</strong></td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Focus order, ARIA labels, color contrast (WCAG AA), keyboard navigation, screen reader support</td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">4</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><strong>Visual Design</strong></td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Consistent use of design system tokens, spacing, typography, alignment, professional appearance</td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">5</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><strong>Responsiveness</strong></td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Layout behavior at different viewports, no overflow, truncation, or broken layouts</td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">6</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><strong>Error Handling</strong></td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Error states visible and helpful, empty states informative, validation messages clear</td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">7</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><strong>Information Architecture</strong></td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Intuitive navigation, features findable without training, clear hierarchy</td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">8</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><strong>Completeness</strong></td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">ALL interactive UI elements functional — walk every clickable element per screen</td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">9</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><strong>Innovation & Relevance</strong></td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Identify low-value areas, suggest innovative features based on domain and persona analysis</td>
  </tr>
</table>

<h3>Auto-Reinforcement Loop</h3>

<p>The usability testing agent writes its findings to <code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">knowledge-base/auto-reinforcement.md</code>. This file is automatically detected by the perpetual trigger on the next cycle, causing the analyst to extract findings back into the spec — <strong>closing the feedback loop without manual intervention</strong>.</p>

<div class="callout-success callout" style="background: #defbe6; border-left: 4px solid #24a148; padding: 16px 20px; margin: 20px 0; border-radius: 0 4px 4px 0;">
<strong>Cycle 2 Results:</strong> The Usability Testing Agent identified 16 findings (6 high-priority, 10 medium), discovered 5 patterns, and produced 7 innovation suggestions including keyboard shortcuts, exception heat maps, AI confidence trends, smart bulk resolve, "My Queue" filter, rule effectiveness metrics, and real-time pulse indicators.
</div>

<h3>Innovation Suggestions from Cycle 2</h3>

<table style="border-collapse: collapse; width: 100%; margin: 16px 0; font-size: 14px; border: 1px solid #e0e0e0;">
  <tr>
    <th style="background: #f4f4f4; border: 1px solid #e0e0e0; padding: 10px 14px; text-align: left; font-weight: 600; color: #161616;">#</th>
    <th style="background: #f4f4f4; border: 1px solid #e0e0e0; padding: 10px 14px; text-align: left; font-weight: 600; color: #161616;">Suggestion</th>
    <th style="background: #f4f4f4; border: 1px solid #e0e0e0; padding: 10px 14px; text-align: left; font-weight: 600; color: #161616;">Description</th>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">1</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Keyboard shortcuts</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">R=resolve, E=escalate, N=next, /=search. "?" overlay with shortcut list for power users</td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">2</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Exception heat map</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Small visualization on Dashboard showing exception volume by hour of day</td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">3</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">AI confidence trend</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Mini sparkline showing how AI confidence has changed over time for similar exception types</td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">4</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Smart bulk resolve</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Suggest grouping selected exceptions by type/source with common resolution</td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">5</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">"My Queue" filter</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Dedicated tab showing only exceptions assigned to the current user</td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">6</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Rule effectiveness metrics</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Per-rule stats (auto-resolved count, success rate) on Rules Engine page</td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">7</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Real-time pulse indicator</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Subtle animation on Big Picture when new exceptions arrive</td>
  </tr>
</table>

<hr>

<!-- ============================================================ -->
<h1 id="learning" style="font-size: 28px; border-bottom: 3px solid #0f62fe; padding-bottom: 12px; margin-top: 40px; color: #161616;">12. Agent Learning Protocol</h1>

<p>After each successful cycle (build + usability test), the system updates each agent's knowledge with 1–3 bullet points of relevant findings. This creates <strong>incremental, persistent learning</strong> without bloating agent instructions.</p>

<h3>Learning Examples from Cycles 1–2</h3>

<table style="border-collapse: collapse; width: 100%; margin: 16px 0; font-size: 14px; border: 1px solid #e0e0e0;">
  <tr>
    <th style="background: #f4f4f4; border: 1px solid #e0e0e0; padding: 10px 14px; text-align: left; font-weight: 600; color: #161616;">Agent</th>
    <th style="background: #f4f4f4; border: 1px solid #e0e0e0; padding: 10px 14px; text-align: left; font-weight: 600; color: #161616;">Cycle</th>
    <th style="background: #f4f4f4; border: 1px solid #e0e0e0; padding: 10px 14px; text-align: left; font-weight: 600; color: #161616;">Learning</th>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Wireframe/Figma</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">1</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Extract interactive toolbar elements (dropdowns, buttons, sort controls) from Figma, not just visual layout</td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Wireframe/Figma</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">2</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Verify that state variables set by interactive elements are consumed in rendering logic. Group By was extracted but never used in table rendering — dead UI.</td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Design System</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">1</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Flag custom CSS components that duplicate Carbon equivalents (custom toggle vs Carbon Toggle)</td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Design System</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">2</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">During Carbon migration, audit ALL modal/overlay components in one pass. Two modals were missed.</td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Use-Case</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">2</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Add role-visibility scenarios for every nav item and action button — not just primary flows</td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Content</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">2</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Verify React Router <code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;"><Link></code> is used for all in-app navigation instead of <code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;"><a href></code></td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">UX Agent</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">1</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Spec quality (95%) does not guarantee build quality. Audit implementation artifacts for completeness.</td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Usability Testing</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">2</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Walk EVERY clickable element per screen. Innovation criterion produced 7 valuable feature suggestions.</td>
  </tr>
</table>

<div class="callout" style="background: #edf5ff; border-left: 4px solid #0f62fe; padding: 16px 20px; margin: 20px 0; border-radius: 0 4px 4px 0;">
<strong>How Learnings Work:</strong> Each learning is stored in the agent's skill file. On the next cycle, the agent reads its own learnings before starting work — avoiding previously discovered mistakes and applying discovered patterns automatically.
</div>

<hr>

<!-- ============================================================ -->
<h1 id="results" style="font-size: 28px; border-bottom: 3px solid #0f62fe; padding-bottom: 12px; margin-top: 40px; color: #161616;">13. Results & Outcomes</h1>

<h3>Cycle Progress</h3>

<table style="border-collapse: collapse; width: 100%; margin: 16px 0; font-size: 14px; border: 1px solid #e0e0e0;">
  <tr>
    <th style="background: #f4f4f4; border: 1px solid #e0e0e0; padding: 10px 14px; text-align: left; font-weight: 600; color: #161616;">Metric</th>
    <th style="background: #f4f4f4; border: 1px solid #e0e0e0; padding: 10px 14px; text-align: left; font-weight: 600; color: #161616;">Cycle 1</th>
    <th style="background: #f4f4f4; border: 1px solid #e0e0e0; padding: 10px 14px; text-align: left; font-weight: 600; color: #161616;">Cycle 2</th>
    <th style="background: #f4f4f4; border: 1px solid #e0e0e0; padding: 10px 14px; text-align: left; font-weight: 600; color: #161616;">Trend</th>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Spec confidence (overall)</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">95%</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">96%</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">↑ Improving</td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">High-priority findings</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">14</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">6</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">↓ 57% reduction</td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Cycle 1 findings fixed in Cycle 2</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">—</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">12 of 14</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">86% fix rate</td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Innovation suggestions generated</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">0</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">7</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">New capability</td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Agent learnings accumulated</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">8</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">16</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Growing knowledge</td>
  </tr>
</table>

<h3>KPI Alignment</h3>

<table style="border-collapse: collapse; width: 100%; margin: 16px 0; font-size: 14px; border: 1px solid #e0e0e0;">
  <tr>
    <th style="background: #f4f4f4; border: 1px solid #e0e0e0; padding: 10px 14px; text-align: left; font-weight: 600; color: #161616;">KPI</th>
    <th style="background: #f4f4f4; border: 1px solid #e0e0e0; padding: 10px 14px; text-align: left; font-weight: 600; color: #161616;">Target</th>
    <th style="background: #f4f4f4; border: 1px solid #e0e0e0; padding: 10px 14px; text-align: left; font-weight: 600; color: #161616;">Implementation Status</th>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Exceptions resolvable without leaving Dashboard</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">90%</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><span class="badge badge-green" style="display: inline-block; padding: 3px 10px; border-radius: 12px; font-size: 12px; font-weight: 600; background: #defbe6; color: #0e6027;">Implemented</span> — In-context resolution via overlay/modal from both Dashboard and Exceptions</td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">AI recommendation acceptance rate</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">60%</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><span class="badge badge-green" style="display: inline-block; padding: 3px 10px; border-radius: 12px; font-size: 12px; font-weight: 600; background: #defbe6; color: #0e6027;">Implemented</span> — AI block with confidence meter, rationale, accept/reject buttons</td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Complete audit trail</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">100%</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><span class="badge badge-green" style="display: inline-block; padding: 3px 10px; border-radius: 12px; font-size: 12px; font-weight: 600; background: #defbe6; color: #0e6027;">Implemented</span> — Global audit log capturing all system actions</td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Resolution time reduction</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">40%</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><span class="badge badge-green" style="display: inline-block; padding: 3px 10px; border-radius: 12px; font-size: 12px; font-weight: 600; background: #defbe6; color: #0e6027;">Implemented</span> — Toolbar filters, sort, bulk resolve, in-context panel</td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Data source connectivity</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">95%</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;"><span class="badge badge-blue" style="display: inline-block; padding: 3px 10px; border-radius: 12px; font-size: 12px; font-weight: 600; background: #d0e2ff; color: #0043ce;">Spec Ready</span> — Data Landscape mapped to dashboard sources</td>
  </tr>
</table>

<h3>Architecture Summary</h3>

<table style="border-collapse: collapse; width: 100%; margin: 16px 0; font-size: 14px; border: 1px solid #e0e0e0;">
  <tr>
    <th style="background: #f4f4f4; border: 1px solid #e0e0e0; padding: 10px 14px; text-align: left; font-weight: 600; color: #161616;">Layer</th>
    <th style="background: #f4f4f4; border: 1px solid #e0e0e0; padding: 10px 14px; text-align: left; font-weight: 600; color: #161616;">Technology</th>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Frontend</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">React + TypeScript + Vite</td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Design System</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">IBM Carbon Design System (<code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">@carbon/react</code>)</td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">State Management</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">React Context + <code style="background: #f0f0f3; padding: 2px 6px; border-radius: 3px; font-size: 13px;">useReducer</code> (AppStore)</td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Routing</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">React Router v6</td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Design Tool</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Figma (via MCP integration)</td>
  </tr>
  <tr>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Agent Platform</td>
    <td style="border: 1px solid #e0e0e0; padding: 10px 14px; vertical-align: top;">Cursor IDE with custom SKILL.md agents</td>
  </tr>
</table>

<hr>

<div class="callout-success callout" style="background: #defbe6; border-left: 4px solid #24a148; padding: 16px 20px; margin: 20px 0; border-radius: 0 4px 4px 0;">
<strong>Summary:</strong> This spec-driven design methodology demonstrates that AI agents can orchestrate a complete design-to-code pipeline with built-in quality gates, perpetual learning, and self-improving feedback loops. The system transforms raw stakeholder inputs into a production-ready application through structured spec artifacts, specialized agents, and measurable confidence scoring — all while maintaining human oversight at critical decision points.
</div>

<p style="text-align: center; color: #6f6f6f; font-size: 13px; margin-top: 40px;">
  <em>Document generated from the Spec-Driven Design Pipeline — Cycle 2 | Last updated: February 2026</em>
</p>

</body>
</html>
 