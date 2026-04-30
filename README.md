<a href="https://chatbot.ai-sdk.dev/demo">
  <img alt="Chatbot" src="app/(chat)/opengraph-image.png">
  <h1 align="center">AI Dungeon Master Chatbot</h1>
</a>

<p align="center">
    AI Game Master DnD Chatbot is an project built on top of the Chatbot (Next.js + AI SDK) template, extended to function as an intelligent Game Master for Dungeons & Dragons–style adventures.
</p>

<p align="center">
  <a href="https://chatbot.ai-sdk.dev/docs"><strong>Original Template Docs</strong></a> ·
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#ai-dungeon-master-features"><strong>GM Features</strong></a> ·
  <a href="#model-providers"><strong>Model Providers</strong></a> ·
  <a href="#running-locally"><strong>Running locally</strong></a>
</p>

---

## Project Overview

This project is based on the open-source Chatbot template built with Next.js and the AI SDK.

It has been modified and extended to create a **fully interactive AI Game Master (GM)** for tabletop RPG experiences such as **Dungeons & Dragons (DnD)**.

Instead of a standard chatbot, this version is designed to:
- Run immersive fantasy campaigns
- Manage game rules and encounters
- Track persistent world state
- Generate dynamic storylines based on player decisions

The goal is to provide a **solo or multiplayer AI-driven DnD experience without a human Dungeon Master**.

---

## AI Dungeon Master Features

- Dynamic storytelling engine
- Rule-based decision arbitration (DnD-inspired mechanics)
- Persistent world memory (quests, NPCs, inventory, choices)
- Adaptive encounter generation (combat, exploration, social events)
- Player-driven narrative progression
- Context-aware NPC behavior and dialogue
- Campaign continuity across sessions

---

## Features (Base Template)

- [Next.js](https://nextjs.org) App Router
  - Advanced routing for seamless navigation and performance
  - React Server Components (RSCs) and Server Actions
- [AI SDK](https://ai-sdk.dev/docs/introduction)
  - Unified API for LLM interactions (text, tools, structured outputs)
- [shadcn/ui](https://ui.shadcn.com)
  - Tailwind CSS styling with accessible UI primitives
- Data Persistence
  - Neon Serverless Postgres for storing campaign state and chat history
  - Vercel Blob for file storage
- Auth.js
  - Secure authentication system

---

## Model Providers

This project uses the Vercel AI Gateway to support multiple LLM providers such as:
Mistral, OpenAI, Anthropic, DeepSeek, and xAI.

---

## Running locally

Follow the original setup from the Chatbot template:

1. Install Vercel CLI:
```bash
npm i -g vercel
pnpm install
pnpm db:migrate # Setup database or apply latest database changes
pnpm dev
```

Your app template should now be running on [localhost:3000](http://localhost:3000).
