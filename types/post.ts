export interface Post {
  _id: string
  title: string
  slug: {
    current: string
  }
  coverImage?: {
    asset: {
      _ref: string
    }
  }
  publishedAt: string
  excerpt?: string
  category: {
    _ref: string
    title?: string
    slug?: {
      current: string
    }
  }
  content?: any
}
