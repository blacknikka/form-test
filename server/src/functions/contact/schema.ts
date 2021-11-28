export default {
  type: "object",
  properties: {
    name: { type: 'string' },
    email: { type: 'string' },
    details: { type: 'string' },
    file: { type: 'object' },
  },
  required: ['name', 'email'],
} as const;
