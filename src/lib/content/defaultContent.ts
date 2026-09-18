import {
  PortfolioContent,
  Project,
  Experience,
  WorkPrinciple,
  SkillCategory,
  PassionItem,
  ProfileContent,
  HeroContent,
  AboutContent,
  ContactContent,
} from "./types";

export * from "./types";

export const defaultPortfolioContent: PortfolioContent = {
  profile: {
    name: "Franck Kibwe",
    title: "Software Developer & Software Engineering",
    role: "Multidisciplinary Systems Developer",
    location: "Global / Remote",
  },
  hero: {
    eyebrow: "Software Engineering",
    headline: "I like solving problems that require going deeper.",
    body: "I’m a software developer driven by technical challenges. My projects are often an excuse to explore how systems actually work — building communication protocols, working with operating-system APIs, dealing with platform restrictions, and finding practical solutions to problems that don't have straightforward answers.",
    primaryCta: { text: "View my work", href: "#projects" },
    secondaryCta: { text: "Get in touch", href: "#contact" },
  },
  about: {
    label: "02 / About",
    title: "About Me",
    paragraphs: [
      "I’m a software developer who enjoys taking on problems that don’t have straightforward solutions.",
      "What interests me most about software engineering is the challenge of understanding how things work beneath the surface. I like projects that force me to learn something new, work around a limitation, or figure out a solution where there isn’t an obvious one.",
      "That curiosity often leads me beyond the application layer. I’ve worked with communication protocols, operating-system APIs, networking, databases, and platform-specific constraints. Whether I’m building a mobile application, a desktop tool, or a backend system, I enjoy understanding the underlying pieces and figuring out how to make them work together.",
      "For me, a side project isn’t just something to build. It’s an opportunity to explore a difficult problem, learn something new, and see how far I can take the solution.",
    ],
    profileSpec: [
      {
        label: "FULLSTACK ARCHITECTURE",
        value: "End-to-End Web & Desktop Applications · Modern Reactive Frontends & Scalable Backends"
      },
      {
        label: "SYSTEMS CORE",
        value: "Rust (Zero-Cost Correctness) · TypeScript · Modern C/C++"
      },
      {
        label: "REALTIME & PROTOCOLS",
        value: "WebRTC Distribution Trees · WebSocket Streaming Pipelines · Custom Network Protocols"
      },
      {
        label: "ENGINEERING STANCE",
        value: "OS APIs & Platform Restriction Workarounds · Low-Level Clarity · Zero Black Boxes"
      }
    ],
    highlights: [
      { key: "Focus", val: "Fullstack Architecture & Systems Engineering" },
      { key: "Core Stack", val: "TypeScript, React, Next.js, Rust, Laravel" },
      { key: "Philosophy", val: "Low-level Clarity, Zero Black Boxes, Pragmatic Solutions" },
    ]
  },
  projects: [
    {
      id: "tools",
      ref: "SYS.01",
      title: "Tools",
      tagline: "A growing collection of productivity tools built around seamless local-first communication.",
      category: "Desktop & Mobile Suite",
      description: [
        "Tools is an actively developed two-part productivity suite consisting of a mobile application and a desktop application. It brings together tools such as rich-text note taking, clipboard synchronization, and file sharing, with more utilities planned over time.",
        "The project explores how devices can communicate and synchronize without relying entirely on cloud infrastructure. Notes and other data can be synchronized across devices over the local network, while clipboard and file sharing require dealing with platform restrictions and different communication mechanisms.",
        "The mobile application is built with TypeScript and Expo, with native Kotlin modules providing hardware functionality. The desktop application is built with Tauri, combining a React frontend with a Rust backend responsible for communication, synchronization, and storage."
      ],
      tech: [
        "TypeScript",
        "React",
        "Expo",
        "Kotlin",
        "Tauri",
        "Rust",
        "TanStack (Router, Query, Table)",
        "Bluetooth",
        "Local Networking"
      ],
      status: "Active Development"
    },
    {
      id: "screenshare",
      ref: "NET.02",
      title: "ScreenShare",
      tagline: "A low-bandwidth screen-sharing system designed for classrooms.",
      category: "Realtime & Networking",
      description: [
        "ScreenShare started with a simple problem: during lectures, poor-quality projectors could make slides difficult to see. Instead of relying on students' mobile data, I explored a way for lecturers to broadcast their screens directly to students' devices over the local network.",
        "During development, I experimented with several approaches, including media servers and FFmpeg-based streaming, before settling on a browser-based solution using the Screen Capture API and WebRTC.",
        "The biggest challenge came when scaling the stream to many students. Sending the stream directly to every connected device quickly became expensive. The solution was to turn some students into relay nodes: the lecturer streams to a limited number of devices, which then retransmit the stream to others. This creates a distribution tree that allows the number of reachable devices to grow significantly without placing all the load on the original streamer.",
        "Both the frontend and backend are written in TypeScript. The frontend uses React and Remix, while the backend uses Express together with libraries for WebRTC and WebSockets."
      ],
      tech: [
        "TypeScript",
        "React",
        "Remix",
        "Express",
        "WebRTC",
        "WebSockets",
        "Screen Capture API"
      ],
      status: "Completed Prototype"
    },
    {
      id: "future-farm",
      ref: "ARC.03",
      title: "Future Farm Logistic",
      tagline: "A marketplace connecting remote agricultural producers with buyers in major cities.",
      category: "Platform & Logistics",
      description: [
        "Future Farm Logistic is a marketplace designed to connect farmers and producers in remote locations with buyers in major cities.",
        "The platform allows buyers to discover and order agricultural products while coordinating the logistics required to get those products from remote farms to their destination. An orchestration module handles the dispatching of drivers responsible for collecting and delivering orders.",
        "The platform also incorporates AI-assisted quality assessment, allowing farmers and Future Farm agents to scan agricultural products and evaluate their quality before they are listed on the marketplace.",
        "The frontend is built with React, making extensive use of the TanStack ecosystem, including TanStack Router, TanStack Table, and TanStack Query. The backend is built with NestJS."
      ],
      tech: [
        "React",
        "TypeScript",
        "TanStack (Router, Query, Table)",
        "NestJS",
        "AI"
      ],
      status: "Production Architecture"
    }
  ],
  experience: [
    {
      role: "Software Developer Intern",
      company: "Fantastik SARL",
      type: "Internship",
      projectOrDomain: "Renttik",
      url: "https://renttik.com",
      description: [
        "Responsible for developing and deploying Renttik, a property-management application designed to help landlords keep track of their tenants, record monthly rent payments, and send reminders for upcoming or overdue payments.",
        "Worked across the entire product, from the mobile application to the backend and administration portal. The application is currently in production and continuing to grow.",
        "Developed the mobile application with Expo and TypeScript, built the backend with Laravel and PHP, and created the administration portal using Inertia and React while handling cloud deployment."
      ],
      tech: ["TypeScript", "React", "Expo", "PHP", "Laravel", "Inertia", "PostgreSQL", "REST APIs"]
    },
    {
      role: "Software Developer",
      company: "Freelance",
      type: "Contract",
      projectOrDomain: "Congo Queen SARL",
      url: "https://app.congoqueen.com",
      description: [
        "As part of a two-person development team, worked on an ERP system for Congo Queen, a logistics and import/export company operating across multiple cities and international destinations.",
        "The system centralizes the company's operations, allowing them to manage clients, orders, deliveries, agents, and other aspects of their logistics workflow.",
        "Translated complex real-world business processes into a centralized software system currently running in active production."
      ],
      tech: ["PHP", "Laravel", "Inertia", "React", "TypeScript", "PostgreSQL"]
    }
  ],
  howIWork: [
    {
      number: "01",
      title: "Start with the problem",
      description: "I like to understand the constraint before reaching for a solution. The most interesting problems are often the ones where the obvious approach doesn't quite work."
    },
    {
      number: "02",
      title: "Experiment freely",
      description: "When I encounter something unfamiliar, I like to build small experiments around it. Python is often my first choice when I need to test an idea quickly, understand an API, or prove that something is possible."
    },
    {
      number: "03",
      title: "Go deeper when necessary",
      description: "I don't like treating abstractions as black boxes when understanding what's underneath can lead to a better solution. Whether it's Bluetooth communication, WebRTC, operating-system APIs, or synchronization between devices, I'm comfortable going deeper when the problem demands it."
    },
    {
      number: "04",
      title: "Choose the right tools",
      description: "Once I understand the problem, I choose the technology that makes sense for the solution. Lately, that has often led me toward Rust for projects where reliability, performance, and control matter. But the technology is always secondary to the problem."
    },
    {
      number: "05",
      title: "Build, learn, iterate",
      description: "Most of my projects start as an attempt to answer a question. I build something, discover new constraints, rethink the approach, and keep going until I have something that actually works. The challenge is often the reason I started the project in the first place."
    }
  ],
  skills: [
    {
      category: "Languages",
      items: [
        { name: "TypeScript", description: "Primary language for type safety and explicit contracts across fullstack systems." },
        { name: "Vanilla JS", description: "Deep understanding of the DOM, event loops, Web APIs, and core ECMAScript specifications." },
        { name: "Rust", description: "High-performance systems programming, memory safety, and native desktop modules." },
        { name: "Python", description: "Rapid prototyping, protocol exploration, automation, and data workflows." },
        { name: "C++", description: "Performance-critical algorithms, systems engineering, and low-level resource management." },
        { name: "C", description: "Foundational thinking close to hardware, memory management, and Unix system calls." },
        { name: "Kotlin", description: "Modern Android development and native platform modules for Bluetooth and hardware." },
        { name: "PHP", description: "Server-side web development and enterprise backend services." }
      ]
    },
    {
      category: "Frontend & UI",
      items: [
        { name: "React", description: "Core frontend architecture for interactive, declarative component interfaces." },
        { name: "Next.js", description: "Fullstack web applications, Server Components, SSR, and App Router architecture." },
        { name: "Vue.js", description: "Progressive component-driven web applications and reactive state patterns." },
        { name: "HTML5", description: "Semantic markup, modern Web APIs, and accessibility-first structure." },
        { name: "CSS", description: "Modern layout engines (Flexbox, Grid), responsive design, and CSS variables." },
        { name: "TailwindCSS", description: "Utility-first design systems and custom aesthetic token styling." },
        { name: "TanStack (Router, Query, Table)", description: "Type-safe client routing, declarative server-state caching & sync, and headless data table orchestration." },
        { name: "Inertia.js", description: "Monolith-to-SPA architecture connecting server backends with modern React frontends." },
        { name: "Remix", description: "Web standard routing, nested layouts, and progressive enhancement." },
        { name: "React Native", description: "Cross-platform mobile application development for iOS and Android." },
        { name: "Expo", description: "Native module ecosystem, cross-platform workflows, and mobile deployment." }
      ]
    },
    {
      category: "Backend & APIs",
      items: [
        { name: "Laravel", description: "Robust backend architectures, Eloquent ORM, and secure REST APIs." },
        { name: "Django", description: "Batteries-included Python web framework with robust ORM, admin, and authentication." },
        { name: "FastAPI", description: "High-performance Python async API framework with automatic OpenAPI documentation." },
        { name: "Flask", description: "Lightweight, extensible Python microframework for modular web services." },
        { name: "NestJS", description: "Enterprise TypeScript architecture with modular dependency injection." },
        { name: "Express", description: "Lightweight Node.js REST services and real-time streaming servers." },
        { name: "WebSockets", description: "Bidirectional event-driven real-time communication channels." },
        { name: "WebRTC", description: "Peer-to-peer audio, video, and arbitrary low-latency data streaming." },
        { name: "REST APIs", description: "Strict contract design, stateless authentication, and structured endpoints." }
      ]
    },
    {
      category: "AI & Machine Learning",
      items: [
        { name: "TensorFlow", description: "Building, training, and deploying neural network architectures." },
        { name: "Keras", description: "High-level deep learning API for fast neural model prototyping." },
        { name: "scikit-learn", description: "Statistical machine learning, regression, clustering, and classification pipelines." },
        { name: "Pandas", description: "High-performance data manipulation, indexing, and tabular dataset analysis." },
        { name: "Matplotlib", description: "Data visualization, statistical plotting, and metric exploration." }
      ]
    },
    {
      category: "Systems & Desktop",
      items: [
        { name: "Tauri", description: "Lightweight, secure cross-platform desktop applications with Rust backends." },
        { name: "Slint", description: "Native reactive graphical user interface toolkit built in Rust." },
        { name: "Bluetooth & BLE", description: "Native peripheral communication, GATT services, and low-energy sync." },
        { name: "Local Networking", description: "Direct local network device discovery, broadcast, and data synchronization." },
        { name: "Protocols & Relays", description: "Custom tree distribution networks and mesh communication architectures." }
      ]
    },
    {
      category: "Databases & Infrastructure",
      items: [
        { name: "PostgreSQL", description: "Advanced relational database modeling, indexing, and transactional integrity." },
        { name: "MySQL", description: "Relational database design, query optimization, and structured storage." },
        { name: "SQLite", description: "Embedded serverless persistence for local-first desktop and mobile tools." },
        { name: "Redis", description: "High-throughput in-memory key-value caching and pub/sub message brokering." },
        { name: "Docker", description: "Containerized environments for reproducible development and deployments." },
        { name: "Linux", description: "Unix system administration, shell scripting, and server operations." },
        { name: "Git", description: "Distributed version control, branching strategies, and collaborative workflows." }
      ]
    }
  ],
  passions: [
    {
      id: "culinary",
      ref: "CRAFT.01",
      title: "Culinary Arts & Hospitality",
      tagline: "Cooking for others, mastering technique, and sharing joy through food.",
      paragraphs: [
        "Cooking is where precision technique meets genuine human hospitality. Much like engineering, great cuisine is built on understanding foundational ingredients, temperature control, knife skills, timing, and flavor balance.",
        "There is a quiet meditation in the prep work—hence the chef's knife moving in the background of this portfolio. But the ultimate reward is bringing people together around a table, sharing a delicious meal, and sparking genuine joy through something made with care."
      ],
      highlights: ["Knife Craft & Precision", "Flavor Architecture", "Hospitality & Connection"],
      icon: "UtensilsCrossed",
      featuredNote: "The inspiration behind the animated culinary knife in the background."
    },
    {
      id: "reading",
      ref: "LIT.02",
      title: "Literature, Strategy & Philosophy",
      tagline: "Dissecting human nature, systemic power dynamics, and strategic realism.",
      paragraphs: [
        "Reading is a lifelong pursuit to explore how keen minds dissect human nature, strategic thinking, and the architecture of institutions. I gravitate toward books that challenge easy assumptions, strip away illusions, and analyze how real-world dynamics actually unfold.",
        "My favorite book is 'The Prince' by Niccolò Machiavelli—a masterclass in political realism, pragmatic leadership, and understanding structural power without naive idealism. It offers timeless insights into decision-making under uncertainty and human incentives."
      ],
      highlights: ["Favorite Book: 'The Prince' by Machiavelli", "Strategic Realism", "Systemic Thinking"],
      icon: "BookOpen",
      featuredNote: "Favorite Book: 'The Prince' — Niccolò Machiavelli"
    },
    {
      id: "cinema",
      ref: "CINE.03",
      title: "Cinema & Visual Storytelling",
      tagline: "Appreciating narrative structure, visual cadence, and immersive world-building.",
      paragraphs: [
        "I have a deep love for cinema as an art form. Great films are masterclasses in visual composition, emotional pacing, sound design, and subtle subtext.",
        "Whether analyzing directorial choices, atmospheric cinematography, or compelling character arcs, I find immense inspiration in how complex stories and entire worlds can be constructed through visual frames."
      ],
      highlights: ["Cinematography & Framing", "Narrative Architecture", "Atmospheric World-Building"],
      icon: "Film"
    },
    {
      id: "science",
      ref: "CORE.04",
      title: "Science, Tech & Applied Engineering",
      tagline: "Curiosity for the fundamental laws that govern the physical and digital universe.",
      paragraphs: [
        "Beyond writing code, I am fascinated by physics, computing history, bio-mechanics, and structural engineering. The universe operates on elegant natural principles, and exploring how energy flows, how silicon computes, and how mechanical structures endure fuels my intuition as a developer.",
        "This interdisciplinary curiosity is the foundation of my work: understanding how things function at their deepest level, eliminating black boxes, and building systems that stand the test of time."
      ],
      highlights: ["Fundamental Physics", "Computing Architecture", "Mechanical & Bio Systems"],
      icon: "Atom"
    }
  ],
  contact: {
    eyebrow: "07 / Contact",
    headline: "Have an interesting problem?",
    subheadline: "Let's talk.",
    body: "Whether you have a challenging project, an interesting technical problem, or simply want to connect, I'd be happy to hear from you.",
    links: [
      { name: "Email", href: "mailto:franck.kyete@gmail.com", label: "franck.kyete@gmail.com", icon: "Mail" },
      { name: "GitHub", href: "https://github.com/franckKyete", label: "github.com/franckKyete", icon: "Github" },
      { name: "LinkedIn", href: "https://linkedin.com/in/franck-kibwe-4a34031a4", label: "linkedin.com/in/franck-kibwe-4a34031a4", icon: "Linkedin" },
      { name: "Resume", href: "#", label: "Download PDF", icon: "FileText" }
    ]
  }
};

export const portfolioContent = defaultPortfolioContent;
