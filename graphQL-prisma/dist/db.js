"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var users = [{
  id: "1",
  name: 'chris',
  email: "c.johanny@gmail.com",
  age: 37
}, {
  id: "2",
  name: "caro",
  email: 'caro@gmail.com'
}, {
  id: "3",
  name: 'Eliott',
  email: "eliott@gmail.com",
  age: 3
}];
var posts = [{
  id: "a",
  title: "title 1",
  body: 'blab albakakejaebk',
  published: true,
  author: "1"
}, {
  id: "b",
  title: "title 2",
  body: 'bldsfsdfab albakakesqfsdgjaebk',
  published: false,
  author: "1"
}, {
  id: "c",
  title: "title 3",
  body: 'skdfakakejaebk',
  published: true,
  author: "2"
}];
var comments = [{
  id: "10",
  text: 'yeah!',
  author: '3',
  post: 'b'
}, {
  id: "11",
  text: 'bouuuouo!',
  author: '2',
  post: 'a'
}, {
  id: "12",
  text: 'nullll!',
  author: '1',
  post: 'b'
}, {
  id: "13",
  text: 'goooood!',
  author: '3',
  post: 'c'
}];
var db = {
  users: users,
  posts: posts,
  comments: comments
};
var _default = db;
exports.default = _default;