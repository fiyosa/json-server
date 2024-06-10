export interface Root {
  posts: Post[]
  comments: Comment[]
  albums: Album[]
  photos: Photo[]
  users: User[]
  todos: Todo[]
}

export interface Post {
  userId: string
  id: string
  title: string
  body: string
}

export interface Comment {
  postId: string
  id: string
  name: string
  email: string
  body: string
}

export interface Album {
  userId: string
  id: string
  title: string
}

export interface Photo {
  albumId: string
  id: string
  title: string
  url: string
  thumbnailUrl: string
}

export interface User {
  id: string
  name: string
  username: string
  password: string
  email: string
  address: Address
  phone: string
  website: string
  company: Company
}

export interface Address {
  street: string
  suite: string
  city: string
  zipcode: string
  geo: Geo
}

export interface Geo {
  lat: string
  lng: string
}

export interface Company {
  name: string
  catchPhrase: string
  bs: string
}

export interface Todo {
  userId: string
  id: string
  title: string
  completed: boolean
}
