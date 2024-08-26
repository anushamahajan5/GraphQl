import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
//generally data is in mongodb and not as local variables
import database from "./database.js";
//types
import { typeDefs} from "./schema.js";

const resolvers = {
  //query is the entry point in graph therefore mandatory
  Query: {
    games() {
      return database.games;
    },
    game(_, args) {
      return database.games.find((game) => game.id === args.id);
    },
    reviews() {
      return database.reviews;
    },
    review(_, args) {
      return database.reviews.find((review) => review.id === args.id);
    },
    authors() {
      return database.authors;
    },
    author(_, args) {
      return database.authors.find((author) => author.id === args.id);
    },
  },
  //once we have entered in the graph, we can manage the flow in graph
  Game: {
    reviews(parent) {
      return database.reviews.filter((r) => r.game_id === parent.id);
    },
  },
  Author: {
    reviews(parent) {
      return database.reviews.filter((r) => r.author_id === parent.id);
    },
  },
  Review: {
    author(parent) {
      return database.authors.find((a) => a.id === parent.author_id);
    },
    game(parent) {
      return database.games.find((g) => g.id === parent.game_id);
    },
  },
  //mutations help to mutate i.e edit or delete data
  Mutation: {
    addGame(_, args) {
      let game = {
        ...args.game,
        id: Math.floor(Math.random() * 10000).toString(),
      };
      database.games.push(game);

      return game;
    },
    deleteGame(_, args) {
      database.games = database.games.filter((g) => g.id !== args.id);

      return database.games;
    },
    updateGame(_, args) {
      database.games = database.games.map((g) => {
        if (g.id === args.id) {
          return { ...g, ...args.edits };
        }

        return g;
      });

      return database.games.find((g) => g.id === args.id);
    },
  },
};

//server setup
const server=new ApolloServer({
    typeDefs,//we have mapped the typedefs to tell the server what out graph looks like
    resolvers
})

const {url}=await startStandaloneServer(server,{
    listen:{port:4000}
})

console.log(`Server ready at port: ${url}`)