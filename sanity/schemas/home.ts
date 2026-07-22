export default {
  name: 'home',
  title: 'Home Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Meta Description',
      type: 'text',
      validation: Rule => Rule.required().max(160)
    },
    {
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text'
    },
    {
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'servicesTitle',
      title: 'Services Section Title',
      type: 'string'
    },
    {
      name: 'servicesSubtitle',
      title: 'Services Section Subtitle',
      type: 'text'
    },
    {
      name: 'featuredServices',
      title: 'Featured Services',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'service' }]
        }
      ]
    },
    {
      name: 'projectsTitle',
      title: 'Projects Section Title',
      type: 'string'
    },
    {
      name: 'projectsSubtitle',
      title: 'Projects Section Subtitle',
      type: 'text'
    },
    {
      name: 'featuredProjects',
      title: 'Featured Projects',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'project' }]
        }
      ]
    },
    {
      name: 'testimonialsSectionTitle',
      title: 'Testimonials Section Title',
      type: 'string'
    },
    {
      name: 'testimonialsSectionSubtitle',
      title: 'Testimonials Section Subtitle',
      type: 'text'
    },
    {
      name: 'ctaTitle',
      title: 'CTA Title',
      type: 'string'
    },
    {
      name: 'ctaText',
      title: 'CTA Text',
      type: 'text'
    },
    {
      name: 'ctaPrimaryButtonText',
      title: 'CTA Primary Button Text',
      type: 'string'
    },
    {
      name: 'ctaPrimaryButtonUrl',
      title: 'CTA Primary Button URL',
      type: 'string'
    },
    {
      name: 'ctaSecondaryButtonText',
      title: 'CTA Secondary Button Text',
      type: 'string'
    },
    {
      name: 'ctaSecondaryButtonUrl',
      title: 'CTA Secondary Button URL',
      type: 'string'
    }
  ]
};