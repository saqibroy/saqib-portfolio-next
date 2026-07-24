import type { Note } from "./types";

export const notes = [
  {
    slug: "drawing-application-boundaries",
    title: "Drawing application boundaries for an AI-assisted product",
    description:
      "A concise note on separating interface, application and AI responsibilities without overstating system scale.",
    readingTime: "4 min",
    relatedCaseStudy: "ai-assisted-contract-workflow",
    sections: [
      {
        heading: "Start with the product flow",
        paragraphs: [
          "A useful system diagram starts with what the product must let someone do. In the contract workflow, conversational input, editing, purchasing and controlled access form one journey even though several technical parts support it.",
          "That framing keeps the diagram tied to product responsibility. It also avoids treating the AI service as the centre of the system when it is one participant in a larger application flow.",
        ],
      },
      {
        heading: "Give each boundary a reason",
        paragraphs: [
          "The React and TypeScript layer owns the browser interaction. Django remains the application backend. FastAPI provides the LLM inference and vector-retrieval integration. Stripe payment events connect purchasing to document access.",
          "The point of showing those boundaries is not to imply distributed-system scale. It is to make data flow, ownership and integration costs discussable.",
        ],
      },
      {
        heading: "Show the tradeoff",
        paragraphs: [
          "A separate AI service introduces another integration surface. In return, it keeps the AI-specific work distinct from the existing application backend. A structured conversational flow limits open-ended interaction, but gives backend APIs explicit input for contract population.",
        ],
      },
    ],
  },
  {
    slug: "modernisation-is-product-work",
    title: "Why frontend modernisation is product work",
    description:
      "A note on connecting framework migration, content architecture and outcomes for users and editors.",
    readingTime: "3 min",
    relatedCaseStudy: "platform-modernisation",
    sections: [
      {
        heading: "A migration is not the outcome",
        paragraphs: [
          "Moving three legacy applications to Next.js and Nuxt.js describes an implementation change. The stronger evidence is what changed around it: initial loads became 30% faster and the frontend foundations became easier to continue working with.",
        ],
      },
      {
        heading: "Content has an architecture too",
        paragraphs: [
          "Public research and educational platforms have two primary interfaces: the audience experience and the editorial workflow. Refactoring Decap CMS content architecture reduced editorial workflow time by more than 50%, making the content model part of the product outcome.",
        ],
      },
      {
        heading: "Quality is collaborative",
        paragraphs: [
          "Accessible delivery depends on product, design, research, editorial and engineering choices. The accurate claim is a contribution to WCAG 2.1 AA compliance, alongside work translating complex material into maintainable web experiences.",
        ],
      },
    ],
  },
] as const satisfies readonly Note[];

export function getNote(slug: string) {
  return notes.find((note) => note.slug === slug);
}

