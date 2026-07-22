export default {
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Client Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'position',
      title: 'Position',
      type: 'string',
      description: 'Client\'s job title or position'
    },
    {
      name: 'company',
      title: 'Company',
      type: 'string',
      description: 'Client\'s company name'
    },
    {
      name: 'image',
      title: 'Client Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'content',
      title: 'Testimonial Content',
      type: 'text',
      validation: Rule => Rule.required()
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
      description: 'Rating out of 5',
      validation: Rule => Rule.min(1).max(5).precision(1)
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Feature this testimonial on the homepage',
      initialValue: false
    },
    {
      name: 'projectRelated',
      title: 'Related Project',
      type: 'reference',
      to: [{ type: 'project' }]
    },
    {
      name: 'serviceRelated',
      title: 'Related Service',
      type: 'reference',
      to: [{ type: 'service' }]
    }
  ]
};