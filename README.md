# Job Importer & Queue Processing System

## Overview

This repository contains a scalable Job Importer system that:
- Fetches job listings from multiple external XML APIs,
- Converts XML to JSON,
- Queues import jobs via Redis + BullMQ,
- Processes jobs with configurable concurrency,
- Stores jobs into MongoDB,
- Tracks import history with detailed logging,
- Provides a frontend admin UI built with Next.js to view import history.

---

## Setup & Installation

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB instance (local or Atlas)
- Redis server (local or Redis Cloud)
- npm

### Backend Setup

1.Navigate to the backend folder:


```bash
cd server
```

2 Compile and run the project

```bash
npm i 
npm run format
npm start
```