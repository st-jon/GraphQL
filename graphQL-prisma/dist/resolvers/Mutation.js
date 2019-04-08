"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _getUserId = _interopRequireDefault(require("../utils/getUserId"));

var _generateToken = _interopRequireDefault(require("../Utils/generateToken"));

var _hashPassword = _interopRequireDefault(require("../utils/hashPassword"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Mutation = {
  createUser: function () {
    var _createUser = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(parent, args, _ref, info) {
      var prisma, password, user;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              prisma = _ref.prisma;
              _context.next = 3;
              return (0, _hashPassword.default)(args.data.password);

            case 3:
              password = _context.sent;
              user = prisma.mutation.createUser({
                data: _objectSpread({}, args.data, {
                  password: password
                })
              });
              return _context.abrupt("return", {
                user: user,
                token: (0, _generateToken.default)(user.id)
              });

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function createUser(_x, _x2, _x3, _x4) {
      return _createUser.apply(this, arguments);
    }

    return createUser;
  }(),
  deleteUser: function () {
    var _deleteUser = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(parent, args, _ref2, info) {
      var prisma, request, userId;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              prisma = _ref2.prisma, request = _ref2.request;
              userId = (0, _getUserId.default)(request);
              return _context2.abrupt("return", prisma.mutation.deleteUser({
                where: {
                  id: userId
                }
              }, info));

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function deleteUser(_x5, _x6, _x7, _x8) {
      return _deleteUser.apply(this, arguments);
    }

    return deleteUser;
  }(),
  updateUser: function () {
    var _updateUser = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(parent, args, _ref3, info) {
      var prisma, request, userId;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              prisma = _ref3.prisma, request = _ref3.request;
              userId = (0, _getUserId.default)(request);

              if (!(typeof args.data.password === 'string')) {
                _context3.next = 6;
                break;
              }

              _context3.next = 5;
              return (0, _hashPassword.default)(args.data.password);

            case 5:
              args.data.password = _context3.sent;

            case 6:
              return _context3.abrupt("return", prisma.mutation.updateUser({
                data: args.data,
                where: {
                  id: userId
                }
              }, info));

            case 7:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    function updateUser(_x9, _x10, _x11, _x12) {
      return _updateUser.apply(this, arguments);
    }

    return updateUser;
  }(),
  createPost: function () {
    var _createPost = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4(parent, args, _ref4, info) {
      var prisma, request, pubsub, userId, userExist;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              prisma = _ref4.prisma, request = _ref4.request, pubsub = _ref4.pubsub;
              userId = (0, _getUserId.default)(request);
              _context4.next = 4;
              return prisma.exists.User({
                id: args.id
              });

            case 4:
              userExist = _context4.sent;

              if (userExist) {
                _context4.next = 7;
                break;
              }

              throw new Error('user not found');

            case 7:
              return _context4.abrupt("return", prisma.mutation.createPost({
                data: {
                  title: args.data.title,
                  body: args.data.body,
                  published: args.data.published,
                  author: {
                    connect: {
                      id: userId
                    }
                  }
                }
              }, info));

            case 8:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    function createPost(_x13, _x14, _x15, _x16) {
      return _createPost.apply(this, arguments);
    }

    return createPost;
  }(),
  deletePost: function () {
    var _deletePost = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5(parent, args, _ref5, info) {
      var prisma, request, userId, postExist;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              prisma = _ref5.prisma, request = _ref5.request;
              userId = (0, _getUserId.default)(request);
              _context5.next = 4;
              return prisma.exists.Post({
                id: args.id,
                author: {
                  id: userId
                }
              });

            case 4:
              postExist = _context5.sent;

              if (postExist) {
                _context5.next = 7;
                break;
              }

              throw new Error('unable to delete post');

            case 7:
              return _context5.abrupt("return", prisma.mutation.deletePost({
                where: {
                  id: args.id
                }
              }, info));

            case 8:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    function deletePost(_x17, _x18, _x19, _x20) {
      return _deletePost.apply(this, arguments);
    }

    return deletePost;
  }(),
  updatePost: function () {
    var _updatePost = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6(parent, args, _ref6, info) {
      var prisma, request, userId, postExist, isPublished;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              prisma = _ref6.prisma, request = _ref6.request;
              userId = (0, _getUserId.default)(request);
              _context6.next = 4;
              return prisma.exists.Post({
                id: args.id,
                author: {
                  id: userId
                }
              });

            case 4:
              postExist = _context6.sent;
              _context6.next = 7;
              return prisma.exists.Post({
                id: args.id,
                published: true
              });

            case 7:
              isPublished = _context6.sent;

              if (postExist) {
                _context6.next = 10;
                break;
              }

              throw new Error('unable to update post');

            case 10:
              if (!(isPublished && args.data.published === false)) {
                _context6.next = 13;
                break;
              }

              _context6.next = 13;
              return prisma.mutation.deleteManyComments({
                where: {
                  post: {
                    id: args.id
                  }
                }
              });

            case 13:
              return _context6.abrupt("return", prisma.mutation.updatePost({
                data: args.data,
                where: {
                  id: args.id
                }
              }, info));

            case 14:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    function updatePost(_x21, _x22, _x23, _x24) {
      return _updatePost.apply(this, arguments);
    }

    return updatePost;
  }(),
  createComment: function () {
    var _createComment = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee7(parent, args, _ref7, info) {
      var prisma, request, userId, postExists;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              prisma = _ref7.prisma, request = _ref7.request;
              userId = (0, _getUserId.default)(request);
              _context7.next = 4;
              return prisma.exists.Post({
                id: args.data.post,
                published: true
              });

            case 4:
              postExists = _context7.sent;

              if (postExists) {
                _context7.next = 7;
                break;
              }

              throw new Error('unable to find post');

            case 7:
              return _context7.abrupt("return", prisma.mutation.createComment({
                data: {
                  text: args.data.text,
                  post: {
                    connect: {
                      id: args.data.post
                    }
                  },
                  author: {
                    connect: {
                      id: userId
                    }
                  }
                }
              }, info));

            case 8:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }));

    function createComment(_x25, _x26, _x27, _x28) {
      return _createComment.apply(this, arguments);
    }

    return createComment;
  }(),
  deleteComment: function () {
    var _deleteComment = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee8(parent, args, _ref8, info) {
      var prisma, request, userId, commentExist;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              prisma = _ref8.prisma, request = _ref8.request;
              userId = (0, _getUserId.default)(request);
              _context8.next = 4;
              return prisma.exists.Comment({
                id: args.id,
                author: {
                  id: userId
                }
              });

            case 4:
              commentExist = _context8.sent;

              if (commentExist) {
                _context8.next = 7;
                break;
              }

              throw new Error('unable to delete Comment');

            case 7:
              return _context8.abrupt("return", prisma.mutation.deleteComment({
                where: {
                  id: args.id
                }
              }, info));

            case 8:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    }));

    function deleteComment(_x29, _x30, _x31, _x32) {
      return _deleteComment.apply(this, arguments);
    }

    return deleteComment;
  }(),
  updateComment: function () {
    var _updateComment = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee9(parent, args, _ref9, info) {
      var prisma, request, userId, commentExist;
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              prisma = _ref9.prisma, request = _ref9.request;
              userId = (0, _getUserId.default)(request);
              _context9.next = 4;
              return prisma.exists.Comment({
                id: args.id,
                author: {
                  id: userId
                }
              });

            case 4:
              commentExist = _context9.sent;

              if (commentExist) {
                _context9.next = 7;
                break;
              }

              throw new Error('unable to update Comment');

            case 7:
              return _context9.abrupt("return", prisma.mutation.updateComment({
                where: {
                  id: args.id
                },
                data: args.data
              }, info));

            case 8:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    }));

    function updateComment(_x33, _x34, _x35, _x36) {
      return _updateComment.apply(this, arguments);
    }

    return updateComment;
  }(),
  login: function () {
    var _login = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee10(parent, args, _ref10, info) {
      var prisma, user, match;
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              prisma = _ref10.prisma;
              _context10.next = 3;
              return prisma.query.user({
                where: {
                  email: args.data.email
                }
              });

            case 3:
              user = _context10.sent;

              if (user) {
                _context10.next = 6;
                break;
              }

              throw new Error('User not found');

            case 6:
              _context10.next = 8;
              return _bcryptjs.default.compare(args.data.password, user.password);

            case 8:
              match = _context10.sent;

              if (match) {
                _context10.next = 11;
                break;
              }

              throw new Error('Password invalid');

            case 11:
              return _context10.abrupt("return", {
                user: user,
                token: (0, _generateToken.default)(user.id)
              });

            case 12:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10);
    }));

    function login(_x37, _x38, _x39, _x40) {
      return _login.apply(this, arguments);
    }

    return login;
  }()
};
var _default = Mutation;
exports.default = _default;