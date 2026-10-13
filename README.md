# 🌌 UNCLE TOM — Premium Stargazing & Astronomy Experience Marketplace

[![Platform](https://img.shields.io/badge/Platform-Web%20SPA-8b5cf6.svg)](http://localhost:3000)
[![Tech](https://img.shields.io/badge/Architecture-AWS%20Cloud--Native-06b6d4.svg)](#architecture)
[![Status](https://img.shields.io/badge/Demo-Production%20Ready-34d399.svg)](http://localhost:3000)

**Uncle Tom** is a modern, production-grade digital aggregator marketplace for astronomical tourism, luxury stargazing retreats, telescope access, and guided deep-sky observation experiences under the world’s darkest skies.

---

## 🔭 Platform Ecosystem

Uncle Tom addresses the fragmentation of astronomical tourism with a unified multi-portal ecosystem:

### 1. 🔭 Customer Experience Portal (`#/` & `#/explore`)
- **Discovery Engine**: Filter by destination (Ladakh, Atacama, Hawaii, Canary Islands, Rajasthan, Outback), dates, telescope aperture, and celestial event category.
- **Tonight's Sky Conditions**: Real-time atmospheric metrics including cloud coverage, seeing index (arcseconds), Bortle darkness scale, and astronomical moon phase illumination.
- **Interactive Telescopes Explorer (`#/telescopes`)**: Detailed optical specs, aperture comparison (Celestron EdgeHD 14", PlaneWave CDK24, Obsession 30" Dobsonian, Takahashi FSQ-106), and ray-path diagnostics.
- **5-Step Booking Flow (`#/book/:id`)**:
  `Experience Review → Schedule Slot Selection → Guest Details → Checkout & Test Payment → Instant Confirmed E-Ticket`
- **Instant Verified E-Tickets (`#/bookings`)**: Dynamic SVG QR codes, add-to-calendar (`.ics`), and downloadable printable travel vouchers.

### 2. 🏢 Observatory Partner Portal (`#/partner`)
- **Facility Operations Dashboard**: Live view for observatory operators (e.g., *Hanle Dark Sky Reserve, Ladakh*).
- **Session Roster & Slot Inventory**: Manage guest capacity, time slots, and real-time bookings.
- **Telescope Fleet Telemetry**: Real-time health monitoring, mirror collimation diagnostics, and motor drive tracking status.
- **Automated Payouts**: Monthly gross revenue settlement and visitor analytics.

### 3. 📊 Enterprise Admin & Cloud Control (`#/admin`)
- **Cloud Infrastructure Telemetry**: Real-time AWS EKS microservices health status, request throughput, and p50/p99 latencies.
- **Apache Kafka Live Event Bus**: Real-time event streaming (`booking.created`, `payment.success`, `weather.updated`, `notification.sent`) with dynamic event simulation.
- **Marketplace Analytics**: Gross marketplace volume (GMV), total tickets issued, partner ratings, and cache controls.

### 4. 📐 Architecture Blueprint & 12-Month Roadmap (`#/architecture`)
- Visual multi-tier architecture diagram matching enterprise presentation requirements:
  - Edge & CDN: AWS CloudFront + Route53 DNS + WAF
  - Services: Spring Boot & Node microservices on Amazon EKS
  - Data Tier: Amazon Aurora PostgreSQL (Multi-AZ) + Redis Cluster (ElastiCache)
  - External Integrations: NASA APOD & NeoWs APIs, Open-Meteo Seeing API, Razorpay & Stripe Escrow, OpenAI Astronomy Assistant
  - 12-Month Enterprise Implementation Roadmap (Phases 1 through 4)

### 5. ✨ Stargazer AI Assistant
- Floating conversational assistant powered by astronomy knowledge base.
- Instant guidance for travelers on telescope suitability, optimal moon-free viewing windows, Bortle Class 1 sites, and the Clear-Sky Guarantee policy.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+ recommended)

### Running Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/MahammadAlthaf2002/uncle-tom-astronomy.git
   cd uncle-tom-astronomy
   ```

2. Start the local server:
   ```bash
   node server.js
   ```

3. Open in your browser:
   - **Localhost**: [http://localhost:3000](http://localhost:3000)
   - **Loopback**: [http://127.0.0.1:3000](http://127.0.0.1:3000)

---

## 🎨 Design System & Palette

- **Deep Space Navy**: `#05060f` & `#0a0d24`
- **Cosmic Violet**: `#8b5cf6` & `#a78bfa`
- **Cyan Nebula**: `#06b6d4` & `#22d3ee`
- **Stellar Gold**: `#f5d48a` & `#fbbf24`
- **Typography**: `Sora` (Headings) & `Inter` (UI/Body)
- **Effects**: Glassmorphism, real-time Canvas 2D animated starfield, smooth scroll transitions.

---

## 📄 License
This project is proprietary and confidential. Created for the **Uncle Tom Astronomy Platform** demo and evaluation.
