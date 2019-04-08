"use strict";

require("@babel/polyfill");

var _graphqlYoga = require("graphql-yoga");

var _db = _interopRequireDefault(require("./db"));

var _prisma = _interopRequireDefault(require("./prisma"));

var _index = require("./resolvers/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pubsub = new _graphqlYoga.PubSub();
var server = new _graphqlYoga.GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers: _index.resolvers,
  context: function context(request) {
    return {
      db: _db.default,
      pubsub: pubsub,
      prisma: _prisma.default,
      request: request
    };
  },
  fragmentReplacements: _index.fragmentReplacements
});
server.start({
  port: process.env.PORT || 4000
}, function () {
  console.log('server UP!');
});