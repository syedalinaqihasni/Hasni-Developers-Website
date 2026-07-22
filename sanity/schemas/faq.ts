export default {
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    {
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'answer',
      title: 'Answer',
      type: 'array',
      of: [{ type: 'block' }],
      validation: Rule => Rule.required()
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'General', value: 'general' },
          { title: 'Services', value: 'services' },
          { title: 'Web Development', value: 'web-development' },
          { title: 'SEO', value: 'seo' },
          { title: 'Mobile Development', value: 'mobile-development' },
          { title: 'Support', value: 'support' },
          { title: 'Pricing', value: 'pricing' },
        ],
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Feature this FAQ on the homepage',
      initialValue: false
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Control the order of FAQs (lower numbers appear first)'
    }
  ],
  preview: {
    select: {
      title: 'question',
      subtitle: 'category'
    }
  }
};