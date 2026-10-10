export const portfolioProjects = [
  {
    "id": "staypilot",
    "title": "StayPilot",
    "category": "Hotel operations / automation",
    "status": "Interactive prototype",
    "repo": "staypilot-hotel-os",
    "public": true,
    "branch": "main",
    "image": "/work/staypilot.jpg",
    "imageKind": "Demo screenshot",
    "live": "https://staypilot-hotel-os.pages.dev/",
    "summary": "A hotel command center that gives routine work to automation and sensitive decisions to people.",
    "premise": "Hotel operations span reservations, room readiness, guest requests and financial decisions. StayPilot brings these into a shared operational context, with exceptions and approvals at the center of the Owner experience.",
    "scope": "Product interface · Workflow design · Policy-aware automation",
    "stack": "React · Vite · Shared browser state · Cloudflare / Supabase integration code",
    "caption": "Captured from the public Owner demo. Names, amounts, counts and estimated time savings are seeded demo values, not client results.",
    "decisions": [
      [
        "One state, several workspaces",
        "Reservations, rooms, tasks and approvals share a hotel state. The demo’s workflow actions change that state rather than only increasing an animation counter."
      ],
      [
        "Authority before action",
        "Auto, Policy, Approval and Suggest modes make automation boundaries visible. Sensitive Manager actions route to an Owner decision."
      ],
      [
        "A trace people can inspect",
        "Run inspectors expose triggers, actions, scope and execution history. A global safety pause defers events without discarding their context."
      ]
    ],
    "limits": "The public demo persists browser state. It is not proof of production hotel deployment, live provider delivery or measured staff savings. Backend and integration code require separate operational verification.",
    "sourceFiles": [
      "README.md",
      "src/",
      "functions/"
    ],
    "commit": "28220c1b12ffa12dbf1979344c027a13dfb721df",
    "year": "2026",
    "role": "Owner-selected project from SaamVR’s work. AI-assisted development; exact personal contribution and collaborator credits are not yet supplied."
  },
  {
    "id": "sm-manager",
    "title": "SM Manager",
    "category": "Conversational commerce / operations",
    "status": "Application implementation",
    "repo": "sm-manager",
    "public": false,
    "branch": "main",
    "image": "/work/sm-manager.svg",
    "imageKind": "Architecture diagram",
    "live": "",
    "summary": "A Messenger commerce assistant with a human-operated workspace for products, orders and conversations.",
    "premise": "Bangladeshi f-commerce sellers need to turn a conversation into a consistent product choice, cart and order while keeping manual takeover available.",
    "scope": "Conversation state · Commerce pipeline · Admin interface",
    "stack": "Express · React · Supabase · Messenger · OpenAI-assisted NLU",
    "caption": "New explanatory diagram based on the inspected message pipeline. It is not a dashboard screenshot or a live customer conversation.",
    "decisions": [
      [
        "Normalize before routing",
        "Messenger webhook events become internal message events before entering a state-aware conversation pipeline."
      ],
      [
        "Keep order context explicit",
        "Product, variant, cart and order-slot services separate commerce state from intent interpretation and fallback replies."
      ],
      [
        "Make human intervention possible",
        "The React admin provides product, order, conversation, learning and QA surfaces, including manual conversation takeover."
      ]
    ],
    "limits": "Source implementation is inspectable privately. This review did not exercise real Messenger delivery, production credentials or live customer orders; no sales or response-quality result is claimed.",
    "sourceFiles": [
      "README.md",
      "src/pipeline/",
      "admin/src/pages/"
    ],
    "commit": "9e4af62759b0f054a8fafaa0ad12202675c008a3",
    "year": "2026",
    "role": "Owner-selected project from SaamVR’s work. AI-assisted development; exact personal contribution and collaborator credits are not yet supplied."
  },
  {
    "id": "ecomcms",
    "title": "EcomCMS",
    "category": "Commerce platform / CMS",
    "status": "Application implementation",
    "repo": "EcomCMS",
    "public": false,
    "branch": "main",
    "image": "/work/ecomcms.svg",
    "imageKind": "Architecture diagram",
    "live": "",
    "summary": "A Bangladesh-first commerce engine connecting storefronts, merchant tools and a configurable page system.",
    "premise": "Different merchants need different storefronts without rebuilding commerce logic for each one. The repository connects a tenant storefront runtime to merchant administration and a reusable CMS block system.",
    "scope": "Storefront system · Merchant workspace · Page builder",
    "stack": "Next.js · React / TypeScript · Supabase Auth / RLS · Tailwind",
    "caption": "New source-based system diagram. It illustrates inspected modules, not a shipped merchant dashboard or customer store.",
    "decisions": [
      [
        "Blocks with a contract",
        "CMS schemas, validation, templates and the block registry provide a shared language for configurable storefront pages."
      ],
      [
        "Store context throughout",
        "Tenant/store resolution and store-scoped commerce data keep storefront rendering tied to the merchant context."
      ],
      [
        "Separate platform and merchant work",
        "Admin screens, onboarding, media management and platform lifecycle helpers address different responsibilities within the commerce product."
      ]
    ],
    "limits": "Private source and fixture screenshots were inspected. Product-photo rights and production tenant/provider behavior have not been certified here; third-party product imagery is not republished.",
    "sourceFiles": [
      "README.md",
      "src/lib/cms/block-library.ts",
      "src/lib/cms/block-registry.test.ts",
      "src/components/storefront/"
    ],
    "commit": "ae68041ae39f4afecd8759848761a787b3a2534f",
    "year": "2026",
    "role": "Owner-selected project from SaamVR’s work. AI-assisted development; exact personal contribution and collaborator credits are not yet supplied."
  },
  {
    "id": "tingtune",
    "title": "TingTune",
    "category": "Learning product / rhythm interaction",
    "status": "Playable learning prototype",
    "repo": "TingTune",
    "public": false,
    "branch": "feat/p006-levels2-3-integrate-20261005",
    "image": "/work/tingtune.jpg",
    "imageKind": "Demo screenshot",
    "live": "https://tingtune-phase000-review.vercel.app/panda-rhythm",
    "summary": "A child-focused music-learning system where rhythm, notation, sound and movement share one timing model.",
    "premise": "Learning rhythm needs more than a quiz. TingTune connects a playable learner to structured lessons, a notation engine and evidence-aware progression.",
    "scope": "Learning interaction · Timing architecture · Content system",
    "stack": "Next.js / React · TypeScript · Web Audio · Headless learning packages",
    "caption": "Captured from the public Phase-000 Panda rhythm demo. This older deployed lesson is distinct from the inspected P006 implementation branch.",
    "decisions": [
      [
        "One timing contract",
        "Structured musical values compile to an event timeline; browser audio and movement adapt to the shared rhythm model."
      ],
      [
        "Engines outside the shell",
        "Notation, activity state, evidence and motion are separate packages. The application shell presents those engines rather than becoming their source of truth."
      ],
      [
        "Content that can be checked",
        "Versioned lesson content and schemas support reusable activities. Evidence tracks modality and assistance context instead of treating every action as mastery."
      ]
    ],
    "limits": "This capture proves the public demo is reachable and shows its interface, not educational effectiveness or a child-study result. The latest branch and the deployed Phase-000 demo are different snapshots; no new device/audio certification is claimed.",
    "sourceFiles": [
      "apps/learner/app/panda-rhythm/",
      "packages/notation-engine/",
      "packages/evidence/src/index.ts",
      "packages/audio-web/"
    ],
    "commit": "8f40ba43904469fa115973751f3b80bdbc5ea3d3",
    "year": "2026",
    "role": "Owner-selected project from SaamVR’s work. AI-assisted development; exact personal contribution and collaborator credits are not yet supplied."
  },
  {
    "id": "nova",
    "title": "NOVA",
    "category": "Interactive 3D / product storytelling",
    "status": "Concept experience",
    "repo": "nova-interactive-portfolio",
    "public": false,
    "branch": "main",
    "image": "/work/nova.jpg",
    "imageKind": "Local runtime screenshot",
    "live": "",
    "summary": "A spatial product story where an animated headphone model becomes part of the page’s navigation language.",
    "premise": "NOVA explores how a product can carry the story itself: a real-time object, embedded animation and editorial chapters respond to page scrolling.",
    "scope": "Art direction · 3D integration · Scroll-driven interaction",
    "stack": "Three.js · FBX animation · HTML / CSS · JavaScript",
    "caption": "Captured from the repository’s local runtime after the FBX loaded. Asset creator and licensing attribution are not established by this inspection.",
    "decisions": [
      [
        "The object is the interface",
        "A loaded FBX model anchors the spatial stage while ordinary HTML carries the story and navigation."
      ],
      [
        "Embedded animation, page-driven",
        "The runtime uses the model’s animation and relates playback to scroll progression across editorial chapters."
      ],
      [
        "Material and composition together",
        "Lighting, material handling and responsive copy place the object inside a dark product-study composition."
      ]
    ],
    "limits": "This is a concept, not a manufactured product. Battery, weight and response specifications in the original concept copy are fictional and are not portfolio outcome claims. Asset-origin attribution still needs confirmation.",
    "sourceFiles": [
      "site/index.html",
      "site/models/nova-headphones.fbx"
    ],
    "commit": "4a38d2609cb1de579a45bd39489d0fbadef47bfd",
    "year": "2026",
    "role": "Owner-selected project from SaamVR’s work. AI-assisted development; exact personal contribution and collaborator credits are not yet supplied."
  },
  {
    "id": "servicedesk",
    "title": "ServiceDesk AI",
    "category": "Service operations / workflow systems",
    "status": "Application implementation",
    "repo": "ServiceDesk",
    "public": true,
    "branch": "gate/servicedesk-v2-multilane-cycle-20261007",
    "image": "/work/servicedesk.svg",
    "imageKind": "Architecture diagram",
    "live": "",
    "summary": "An operations platform connecting cleaning enquiries, quoting, crew dispatch, payments and quality.",
    "premise": "A cleaning business needs the customer request, commercial commitment and field work to stay connected. ServiceDesk models the journey through domain workflows and operator workspaces.",
    "scope": "Operational UX · Domain workflows · Provider boundaries",
    "stack": "Next.js · TypeScript · PostgreSQL / Supabase · Domain modules",
    "caption": "New diagram based on the inspected implementation branch. It is not a production operations screenshot.",
    "decisions": [
      [
        "A journey across workspaces",
        "Inbox, customer, job, schedule, billing and automation routes make the operation navigable without collapsing every responsibility into one screen."
      ],
      [
        "Domain success is authoritative",
        "Pricing, capacity, operations, payments and approvals have explicit domain modules. Provider acceptance is tracked separately from business-state success."
      ],
      [
        "Exceptions are part of the product",
        "The repository includes inbound email, voice and photo intake boundaries, with recovery and review paths rather than a fictional always-successful provider flow."
      ]
    ],
    "limits": "Main contains an older baseline; this case uses an inspected V2 gate branch. No production provider verification, active cleaning business, revenue or field-crew result is claimed.",
    "sourceFiles": [
      "src/domain/operations.ts",
      "src/domain/approval.ts",
      "src/app/app/[workspace]/",
      "README.md"
    ],
    "commit": "8bf6f76393ca212ddb2cdcd108ea63c053e754de",
    "year": "2026",
    "role": "Owner-selected project from SaamVR’s work. AI-assisted development; exact personal contribution and collaborator credits are not yet supplied."
  },
  {
    "id": "ezcomo",
    "title": "EZComo",
    "category": "Commerce presentation / product narrative",
    "status": "Homepage prototype",
    "repo": "ezcomo-homepage-v6-preview",
    "public": true,
    "branch": "main",
    "image": "/work/ezcomo.jpg",
    "imageKind": "Local runtime screenshot",
    "live": "",
    "summary": "A connected-commerce homepage that explains the storefront and the business workspace together.",
    "premise": "A storefront builder’s value is easier to understand when the public store and the merchant’s daily work appear together. This homepage uses a connected preview to make that relationship tangible.",
    "scope": "Homepage design · Product communication · Interactive previews",
    "stack": "HTML · CSS · JavaScript · Static preview",
    "caption": "Captured from the repository’s root homepage locally. Product names, prices, order counts and storefront previews are demonstration content.",
    "decisions": [
      [
        "Show the whole commerce loop",
        "Storefront and merchant workspace panels explain how products, orders, payment context and delivery fit together."
      ],
      [
        "A local market vocabulary",
        "Bangladesh-oriented payment and delivery references make the product narrative specific without claiming verified payment integrations."
      ],
      [
        "Several storefront directions",
        "The prototype exposes different storefront previews, language controls and a product-oriented route through the page."
      ]
    ],
    "limits": "This is a homepage prototype related to the commerce ecosystem, not evidence that every marketed backend capability is deployed. The repository contains several later variants; this capture identifies the inspected root version.",
    "sourceFiles": [
      "index.html",
      "styles.css",
      "app.js"
    ],
    "commit": "c89daa346e2fb91f564ae163bafd83838cf168df",
    "year": "2026",
    "role": "Owner-selected project from SaamVR’s work. AI-assisted development; exact personal contribution and collaborator credits are not yet supplied."
  }
] as const;
export const featuredProject = portfolioProjects[0];
