export default {
  name: 'career',
  title: 'Career',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Job Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'department',
      title: 'Department',
      type: 'string',
      options: {
        list: [
          { title: 'Development', value: 'development' },
          { title: 'Design', value: 'design' },
          { title: 'Marketing', value: 'marketing' },
          { title: 'Sales', value: 'sales' },
          { title: 'Support', value: 'support' },
          { title: 'Management', value: 'management' },
          { title: 'Other', value: 'other' },
        ],
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'employmentType',
      title: 'Employment Type',
      type: 'string',
      options: {
        list: [
          { title: 'Full-time', value: 'full-time' },
          { title: 'Part-time', value: 'part-time' },
          { title: 'Contract', value: 'contract' },
          { title: 'Internship', value: 'internship' },
          { title: 'Remote', value: 'remote' },
        ],
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      validation: Rule => Rule.required()
    },
    {
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      validation: Rule => Rule.required()
    },
    {
      name: 'closingDate',
      title: 'Closing Date',
      type: 'datetime'
    },
    {
      name: 'salary',
      title: 'Salary Range',
      type: 'string'
    },
    {
      name: 'description',
      title: 'Job Description',
      type: 'array',
      of: [{ type: 'block' }],
      validation: Rule => Rule.required()
    },
    {
      name: 'responsibilities',
      title: 'Responsibilities',
      type: 'array',
      of: [{ type: 'string' }],
      validation: Rule => Rule.required()
    },
    {
      name: 'requirements',
      title: 'Requirements',
      type: 'array',
      of: [{ type: 'string' }],
      validation: Rule => Rule.required()
    },
    {
      name: 'benefits',
      title: 'Benefits',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'applicationUrl',
      title: 'Application URL',
      type: 'url'
    },
    {
      name: 'applicationEmail',
      title: 'Application Email',
      type: 'string'
    },
    {
      name: 'featured',
      title: 'Featured Job',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Open', value: 'open' },
          { title: 'Closed', value: 'closed' },
          { title: 'Draft', value: 'draft' },
        ],
      },
      initialValue: 'open',
      validation: Rule => Rule.required()
    }
  ],
  preview: {
    select: {
      title: 'title',
      department: 'department',
      location: 'location',
      status: 'status'
    },
    prepare(selection) {
      const { title, department, location, status } = selection;
      return {
        title,
        subtitle: `${department} | ${location} | ${status.toUpperCase()}`
      };
    }
  }
};