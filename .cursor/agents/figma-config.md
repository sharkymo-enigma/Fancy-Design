# Figma design file config

Figma file URL and frame node IDs for the wireframe agent's MCP calls.

## Current design file

**This project:** IMF AI Use Cases POC (ICRFP 428), Phase 1: HR Robin E2E. No Figma file linked yet.

When you have a Figma design for HR Robin (e.g. Case list, Draft editor, Benefits Calculator), add the URL and frame node IDs below. Reference screens 3.png, 4.png, 5.png can be placed in `reference/` for layout alignment.

```yaml
figma_file_url: ""   # Add HR Robin / IMF POC Figma URL when available
file_key: ""
default_node_id: "0-1"

frames: []   # Add screen name + node_id per frame when Figma is available

additional_frames: []
```

## MCP usage

- **`get_metadata`**: Call with `fileKey` + `nodeId` to get layer names, types, positions, sizes.
- **`get_design_context`**: Call with `fileKey` + `nodeId` for detailed layout, structure, styling.
- **`get_variable_defs`**: Optional, for tokens/variables.
- Use `default_node_id: "0-1"` to get the whole file. Use per-frame `node_id` for specific screens.
