export default {
  name: 'contact',
  title: 'Contact Information',
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
      name: 'phoneNumber',
      title: 'Phone Number',
      type: 'string'
    },
    {
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'address',
      title: 'Office Address',
      type: 'text'
    },
    {
      name: 'googleMapsUrl',
      title: 'Google Maps URL',
      type: 'url'
    },
    {
      name: 'latitude',
      title: 'Latitude',
      type: 'number',
      description: 'For map display'
    },
    {
      name: 'longitude',
      title: 'Longitude',
      type: 'number',
      description: 'For map display'
    },
    {
      name: 'officeHours',
      title: 'Office Hours',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'day',
              title: 'Day',
              type: 'string'
            },
            {
              name: 'hours',
              title: 'Hours',
              type: 'string'
            }
          ]
        }
      ]
    },
    {
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        {
          name: 'facebook',
          title: 'Facebook URL',
          type: 'url'
        },
        {
          name: 'twitter',
          title: 'Twitter URL',
          type: 'url'
        },
        {
          name: 'instagram',
          title: 'Instagram URL',
          type: 'url'
        },
        {
          name: 'linkedin',
          title: 'LinkedIn URL',
          type: 'url'
        },
        {
          name: 'youtube',
          title: 'YouTube URL',
          type: 'url'
        }
      ]
    },
    {
      name: 'formFields',
      title: 'Contact Form Fields',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Field Name',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'label',
              title: 'Field Label',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'type',
              title: 'Field Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Text', value: 'text' },
                  { title: 'Email', value: 'email' },
                  { title: 'Textarea', value: 'textarea' },
                  { title: 'Select', value: 'select' },
                  { title: 'Checkbox', value: 'checkbox' },
                  { title: 'Radio', value: 'radio' }
                ]
              },
              validation: Rule => Rule.required()
            },
            {
              name: 'required',
              title: 'Required Field',
              type: 'boolean',
              initialValue: false
            },
            {
              name: 'options',
              title: 'Options (for select, checkbox, radio)',
              type: 'array',
              of: [{ type: 'string' }]
            }
          ]
        }
      ]
    }
  ]
};