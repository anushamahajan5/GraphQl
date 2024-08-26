export const typeDefs = `#graphql
  type Game {
    id: ID!
    title: String!
    platform: [String!]!
    reviews: [Review!]
  }
  type Review {
    id: ID!
    rating: Int!
    content: String!
    author: Author!
    game: Game!
  }
  type Author {
    id: ID!
    name: String!
    verified: Boolean!
    reviews: [Review!]
  }
  type Query {
    games: [Game]
    game(id: ID!): Game
    reviews: [Review]
    review(id: ID!): Review
    authors: [Author]
    author(id: ID!): Author
  }
  type Mutation{
    #define an object addgameinput that describes the input of query
    
    addGame(game: AddGameInput!): Game
    deleteGame(id: ID!): [Game]
    updateGame(id: ID!, edits: EditGameInput): Game
  }
  input AddGameInput{#the  input must contain a title, platform and id will be randomly alloted
        title: String!,
        platform: [String!]!
  }
  input EditGameInput{
    title: String,
    platform: [String!]
  }
`;
//! indicates field can't be null
//5 basic scala types in graphql=int, boolean, string, float, ID(used to serialize data)
