# Upwork Proposal Analyzer

AI-powered tool that generates tailored technical proposals for Upwork job postings. Submit a job description and receive a structured analysis with pain points, technical solutions, workflow diagrams, and relevant experience mapping.

## n8n Workflow

![n8n Workflow](assets/Screenshot%202025-11-13%20at%2017.49.19.png)

The workflow processes job descriptions through multiple AI agents to extract key insights and generate comprehensive proposal content, including:

- **Pain Point Extraction** - Identifies client challenges and concerns
- **Technical Solution** - Provides step-by-step approach tailored to the role
- **Workflow Diagram** - Generates Mermaid diagrams visualizing the proposed process
- **Relevant Experience** - Maps past projects to job requirements
- **Solution Summary** - Concise overview highlighting qualifications
- **Timeline** - Actionable milestones and deliverables

## Features

- Real-time job description processing via n8n webhook
- Interactive Mermaid diagram rendering with copy-to-clipboard
- Clean, professional UI for proposal review
- Structured output optimized for Upwork submissions

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Configure webhook URL in `.env`:
   ```
   REACT_APP_UPLOAD_WEBHOOK=your_n8n_webhook_url
   ```
4. Start the app: `npm start`

## n8n Workflow Import

Import the workflow from `assets/Upwork Proposal v1.json` into your n8n instance to replicate the AI processing pipeline.
