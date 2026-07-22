export default {
  name: 'about',
  title: 'About Page',
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
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'missionTitle',
      title: 'Mission Section Title',
      type: 'string'
    },
    {
      name: 'missionContent',
      title: 'Mission Content',
      type: 'array',
      of: [{ type: 'block' }]
    },
    {
      name: 'visionTitle',
      title: 'Vision Section Title',
      type: 'string'
    },
    {
      name: 'visionContent',
      title: 'Vision Content',
      type: 'array',
      of: [{ type: 'block' }]
    },
    {
      name: 'valuesTitle',
      title: 'Values Section Title',
      type: 'string'
    },
    {
      name: 'values',
      title: 'Company Values',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Value Title',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'description',
              title: 'Value Description',
              type: 'text'
            },
            {
              name: 'icon',
              title: 'Value Icon',
              description: 'Name of the Lucide icon',
              type: 'string'
            }
          ]
        }
      ]
    },
    {
      name: 'storyTitle',
      title: 'Our Story Title',
      type: 'string'
    },
    {
      name: 'storyContent',
      title: 'Our Story Content',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: {
            hotspot: true
          }
        }
      ]
    },
    {
      name: 'timelineTitle',
      title: 'Timeline Title',
      type: 'string'
    },
    {
      name: 'timeline',
      title: 'Company Timeline',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'year',
              title: 'Year',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'title',
              title: 'Event Title',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'description',
              title: 'Event Description',
              type: 'text'
            }
          ]
        }
      ]
    },
    {
      name: 'teamSectionTitle',
      title: 'Team Section Title',
      type: 'string'
    },
    {
      name: 'teamSectionDescription',
      title: 'Team Section Description',
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
    }
  ]
};