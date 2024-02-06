import { type SchemaTypeDefinition } from 'sanity'

import richText from './schemas/richText'
import tweet from './schemas/tweet'
import comment from './schemas/comment'
import userDetails from './schemas/userDetails'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [tweet,comment, richText,userDetails],
}
