
# Portfolio Content

## Hero

### I like solving problems that require going deeper.

I’m a software developer driven by technical challenges. My projects are often an excuse to explore how systems actually work — building communication protocols, working with operating-system APIs, dealing with platform restrictions, and finding practical solutions to problems that don't have straightforward answers.

**View my work** · **Get in touch**

---

## About

I’m a software developer who enjoys taking on problems that don’t have straightforward solutions.

What interests me most about software engineering is the challenge of understanding how things work beneath the surface. I like projects that force me to learn something new, work around a limitation, or figure out a solution where there isn’t an obvious one.

That curiosity often leads me beyond the application layer. I’ve worked with communication protocols, Bluetooth, operating-system APIs, networking, databases, and platform-specific constraints. Whether I’m building a mobile application, a desktop tool, or a backend system, I enjoy understanding the underlying pieces and figuring out how to make them work together.

For me, a side project isn’t just something to build. It’s an opportunity to explore a difficult problem, learn something new, and see how far I can take the solution.

---

# Featured Projects

## Tools

### A growing collection of productivity tools built around seamless local-first communication.

Tools is an actively developed two-part productivity suite consisting of a mobile application and a desktop application. It brings together tools such as rich-text note taking, clipboard synchronization, and file sharing, with more utilities planned over time.

The project explores how devices can communicate and synchronize without relying entirely on cloud infrastructure. Notes and other data can be synchronized across devices over the local network or Bluetooth, while clipboard and file sharing require dealing with platform restrictions and different communication mechanisms.

The mobile application is built with **TypeScript and Expo**, with native **Kotlin modules** providing Bluetooth functionality. The desktop application is built with **Tauri**, combining a **React** frontend with a **Rust** backend responsible for communication, synchronization, and storage.

**Tech:** TypeScript · React · Expo · Kotlin · Tauri · Rust · TanStack Router · TanStack Query · Bluetooth · Local Networking

---

## ScreenShare

### A low-bandwidth screen-sharing system designed for classrooms.

ScreenShare started with a simple problem: during lectures, poor-quality projectors could make slides difficult to see. Instead of relying on students' mobile data, I explored a way for lecturers to broadcast their screens directly to students' devices over the local network.

During development, I experimented with several approaches, including media servers and FFmpeg-based streaming, before settling on a browser-based solution using the Screen Capture API and WebRTC.

The biggest challenge came when scaling the stream to many students. Sending the stream directly to every connected device quickly became expensive. The solution was to turn some students into relay nodes: the lecturer streams to a limited number of devices, which then retransmit the stream to others. This creates a distribution tree that allows the number of reachable devices to grow significantly without placing all the load on the original streamer.

Both the frontend and backend are written in **TypeScript**. The frontend uses **React and Remix**, while the backend uses **Express** together with libraries for **WebRTC and WebSockets**.

**Tech:** TypeScript · React · Remix · Express · WebRTC · WebSockets · Screen Capture API

---

## Future Farm Logistic

### A marketplace connecting remote agricultural producers with buyers in major cities.

Future Farm Logistic is a marketplace designed to connect farmers and producers in remote locations with buyers in major cities.

The platform allows buyers to discover and order agricultural products while coordinating the logistics required to get those products from remote farms to their destination. An orchestration module handles the dispatching of drivers responsible for collecting and delivering orders.

The platform also incorporates AI-assisted quality assessment, allowing farmers and Future Farm agents to scan agricultural products and evaluate their quality before they are listed on the marketplace.

The frontend is built with **React**, making extensive use of the **TanStack ecosystem**, including TanStack Router, TanStack Table, and TanStack Query. The backend is built with **NestJS**.

**Tech:** React · TypeScript · TanStack Router · TanStack Table · TanStack Query · NestJS · AI

---

# Experience

## Software Developer Intern — Fantastik SARL

*Internship · Renttik*

During my internship at Fantastik SARL, I was responsible for developing and deploying **Renttik**, a property-management application designed to help landlords keep track of their tenants, record monthly rent payments, and send reminders for upcoming or overdue payments.

I worked across the entire product, from the mobile application to the backend and administration portal. The application is currently in production and continuing to grow.

I developed the mobile application with **Expo and TypeScript**, while building the backend with **Laravel and PHP**. I also developed the administration portal using **Inertia and React** and handled the deployment of the system.

**Tech:** TypeScript · React · Expo · PHP · Laravel · Inertia · PostgreSQL · REST APIs

---

## Software Developer — Freelance

*Congo Queen SARL*

As part of a two-person development team, I worked on an ERP system for **Congo Queen**, a logistics and import/export company operating across multiple cities and international destinations.

The system centralizes the company's operations, allowing them to manage **clients, orders, deliveries, agents, and other aspects of their logistics workflow**.

Working in a small team meant contributing across the application and translating real-world business processes into a centralized software system. The resulting application is currently in production.

The ERP was built using **Laravel, Inertia, React, and TypeScript**.

**Tech:** PHP · Laravel · Inertia · React · TypeScript · PostgreSQL

---

# How I Work

## Start with the problem

I like to understand the constraint before reaching for a solution. The most interesting problems are often the ones where the obvious approach doesn't quite work.

## Experiment freely

When I encounter something unfamiliar, I like to build small experiments around it. Python is often my first choice when I need to test an idea quickly, understand an API, or prove that something is possible.

## Go deeper when necessary

I don't like treating abstractions as black boxes when understanding what's underneath can lead to a better solution. Whether it's Bluetooth communication, WebRTC, operating-system APIs, or synchronization between devices, I'm comfortable going deeper when the problem demands it.

## Choose the right tools

Once I understand the problem, I choose the technology that makes sense for the solution. Lately, that has often led me toward Rust for projects where reliability, performance, and control matter. But the technology is always secondary to the problem.

## Build, learn, iterate

Most of my projects start as an attempt to answer a question. I build something, discover new constraints, rethink the approach, and keep going until I have something that actually works. The challenge is often the reason I started the project in the first place.

---

# Skills

## Languages

**TypeScript** is my primary language. I enjoy its type system and the confidence that comes from making contracts explicit in the code.

**Rust** has increasingly become my choice for projects where performance, reliability, and deeper system-level control matter. I particularly enjoy Rust's approach to correctness and memory safety.

**Python** is my go-to language when I want to experiment with an idea quickly. Once the problem is understood, I often move to a stack better suited to the final product.

**C** was the first programming language I learned, and it remains an important part of my foundation. It taught me to think closer to the machine and gave me an early understanding of how software actually works beneath higher-level abstractions.

## Frontend

**React** is my primary frontend library. I've also worked with **Vue.js**, and I'm comfortable working across modern frontend ecosystems.

I have experience with tools across the React ecosystem, including **TanStack Router, TanStack Query, TanStack Table, Inertia, Remix**, and **React Native / Expo**.

## Backend & APIs

I work primarily with **Laravel, NestJS, and Express**, building REST APIs, real-time communication systems, and application backends.

I've also worked extensively with **WebSockets and WebRTC** when projects require real-time communication.

## Systems & Desktop

I enjoy working beyond the traditional web stack. I've built desktop applications with **Tauri and Rust**, and have worked with **Slint** for building native user interfaces in Rust.

I'm particularly interested in **networking, Bluetooth, system integration, synchronization, and cross-platform communication**.

## Databases & Infrastructure

**PostgreSQL** and **SQLite** are the databases I work with most frequently. I'm also comfortable with **Redis, Docker, Git, Linux**, and application deployment.

---

# Contact

## Have an interesting problem?

Let's talk.

Whether you have a challenging project, an interesting technical problem, or simply want to connect, I'd be happy to hear from you.

**Email** · **GitHub** · **LinkedIn** · **Resume**
