// schemas/comment.ts
export const commentType = {
  name: 'comment',
  type: 'document',
  fields: [
    { name: 'name', type: 'string' },
    { name: 'comment', type: 'text' },
    { name: 'post', type: 'reference', to: [{ type: 'post' }] },
    { name: 'approved', type: 'boolean', initialValue: false } // Safety: manual approval
  ]
};