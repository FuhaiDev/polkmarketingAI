import { Prompt, PromptCategory } from '../types';

export const categories: PromptCategory[] = [
  {
    id: 'social-media',
    name: 'Social Media',
    description: 'Prompts for various social media platforms',
    color: 'bg-blue-500',
  },
  {
    id: 'email',
    name: 'Email Marketing',
    description: 'Effective email marketing campaigns',
    color: 'bg-purple-500',
  },
  {
    id: 'ad-copy',
    name: 'Ad Copy',
    description: 'Compelling advertisements for various platforms',
    color: 'bg-pink-500',
  },
  {
    id: 'seo',
    name: 'SEO Content',
    description: 'Search engine optimized content',
    color: 'bg-green-500',
  },
  {
    id: 'product',
    name: 'Product Descriptions',
    description: 'Persuasive product descriptions',
    color: 'bg-yellow-500',
  },
];

export const prompts: Prompt[] = [
  {
    id: '1',
    title: 'Instagram Carousel Post',
    content: 'Create a 10-slide Instagram carousel about [topic] that educates my audience on [specific aspect]. Include actionable tips, statistics, and end with a call to action for my [product/service].',
    category: 'social-media',
    tags: ['instagram', 'carousel', 'educational'],
  },
  {
    id: '2',
    title: 'Twitter Thread',
    content: 'Write a 10-part Twitter thread about [topic] that positions me as a thought leader in [industry]. Include unique insights, one personal story, and end with a subtle promotion of my [product/service].',
    category: 'social-media',
    tags: ['twitter', 'thread', 'thought leadership'],
  },
  {
    id: '3',
    title: 'LinkedIn Article',
    content: 'Create an outline for a LinkedIn article about [industry trend] and how it impacts [target audience]. Focus on providing valuable insights that establish me as an authority on this topic while naturally mentioning my [product/service] as a solution.',
    category: 'social-media',
    tags: ['linkedin', 'article', 'authority'],
  },
  {
    id: '4',
    title: 'Welcome Email Sequence',
    content: 'Write a 5-part welcome email sequence for new subscribers that introduces my [brand/company], shares my unique value proposition, provides immediate value through [specific content], builds trust with a case study, and ends with a soft offer for my [product/service].',
    category: 'email',
    tags: ['welcome', 'sequence', 'onboarding'],
  },
  {
    id: '5',
    title: 'Abandoned Cart Email',
    content: 'Create an abandoned cart email for my [product] that uses psychological triggers, addresses common objections, includes social proof, and offers a time-limited discount to encourage completion of the purchase.',
    category: 'email',
    tags: ['abandoned cart', 'recovery', 'conversion'],
  },
  {
    id: '6',
    title: 'Facebook Ad Copy',
    content: 'Write Facebook ad copy for my [product/service] targeting [specific audience] that uses the PAS (Problem-Agitate-Solution) formula. Include a clear headline, compelling body text, and a strong call to action.',
    category: 'ad-copy',
    tags: ['facebook', 'PAS formula', 'targeted'],
  },
  {
    id: '7',
    title: 'Google Search Ad',
    content: 'Create a Google search ad for [keyword] that includes a compelling headline, two description lines highlighting unique benefits of my [product/service], and a clear call to action with a sense of urgency.',
    category: 'ad-copy',
    tags: ['google', 'search', 'keyword'],
  },
  {
    id: '8',
    title: 'SEO Blog Article Structure',
    content: 'Create an outline for a 2000-word SEO blog post about [keyword/topic] that includes an engaging introduction, 5-7 subheadings covering different aspects, FAQs, and a conclusion with a call to action for my [product/service].',
    category: 'seo',
    tags: ['blog', 'structure', 'long-form'],
  },
  {
    id: '9',
    title: 'E-commerce Product Description',
    content: 'Write a compelling product description for my [product] that highlights its unique features, explains specific benefits for the customer, addresses potential objections, includes sensory language, and ends with a persuasive call to action.',
    category: 'product',
    tags: ['e-commerce', 'description', 'conversion'],
  },
  {
    id: '10',
    title: 'SaaS Product Description',
    content: 'Create a persuasive product description for my SaaS [product] that clearly explains what it does, highlights its main benefits for [target audience], includes social proof, addresses common pain points, and ends with a clear next step for the prospect.',
    category: 'product',
    tags: ['saas', 'b2b', 'conversion'],
  }
];