(function (React, adminjs, designSystem, reactDom) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

  /**
   * Replaces the default AdminJS dashboard. Redirects immediately to the Product list
   * so that after login users land on the catalog instead of the dashboard.
   */
  var DashboardRedirectToProducts = function DashboardRedirectToProducts() {
    React.useEffect(function () {
      var _window$REDUX_STATE;
      var rootPath = typeof window !== 'undefined' && ((_window$REDUX_STATE = window.REDUX_STATE) === null || _window$REDUX_STATE === void 0 || (_window$REDUX_STATE = _window$REDUX_STATE.paths) === null || _window$REDUX_STATE === void 0 ? void 0 : _window$REDUX_STATE.rootPath) || '/admin';
      window.location.replace("".concat(rootPath, "/resources/Product"));
    }, []);
    return /*#__PURE__*/React__default["default"].createElement("div", {
      style: {
        padding: 24,
        textAlign: 'center',
        color: '#64748b'
      }
    }, "Redirecting to products\u2026");
  };

  function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
    return n;
  }
  function _arrayWithHoles(r) {
    if (Array.isArray(r)) return r;
  }
  function _arrayWithoutHoles(r) {
    if (Array.isArray(r)) return _arrayLikeToArray(r);
  }
  function asyncGeneratorStep(n, t, e, r, o, a, c) {
    try {
      var i = n[a](c),
        u = i.value;
    } catch (n) {
      return void e(n);
    }
    i.done ? t(u) : Promise.resolve(u).then(r, o);
  }
  function _asyncToGenerator(n) {
    return function () {
      var t = this,
        e = arguments;
      return new Promise(function (r, o) {
        var a = n.apply(t, e);
        function _next(n) {
          asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
        }
        function _throw(n) {
          asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
        }
        _next(void 0);
      });
    };
  }
  function _createForOfIteratorHelper(r, e) {
    var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (!t) {
      if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) {
        t && (r = t);
        var n = 0,
          F = function () {};
        return {
          s: F,
          n: function () {
            return n >= r.length ? {
              done: !0
            } : {
              done: !1,
              value: r[n++]
            };
          },
          e: function (r) {
            throw r;
          },
          f: F
        };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var o,
      a = !0,
      u = !1;
    return {
      s: function () {
        t = t.call(r);
      },
      n: function () {
        var r = t.next();
        return a = r.done, r;
      },
      e: function (r) {
        u = !0, o = r;
      },
      f: function () {
        try {
          a || null == t.return || t.return();
        } finally {
          if (u) throw o;
        }
      }
    };
  }
  function _iterableToArray(r) {
    if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
  }
  function _iterableToArrayLimit(r, l) {
    var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (null != t) {
      var e,
        n,
        i,
        u,
        a = [],
        f = !0,
        o = !1;
      try {
        if (i = (t = t.call(r)).next, 0 === l) {
          if (Object(t) !== t) return;
          f = !1;
        } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
      } catch (r) {
        o = !0, n = r;
      } finally {
        try {
          if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
        } finally {
          if (o) throw n;
        }
      }
      return a;
    }
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _regenerator() {
    /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */
    var e,
      t,
      r = "function" == typeof Symbol ? Symbol : {},
      n = r.iterator || "@@iterator",
      o = r.toStringTag || "@@toStringTag";
    function i(r, n, o, i) {
      var c = n && n.prototype instanceof Generator ? n : Generator,
        u = Object.create(c.prototype);
      return _regeneratorDefine(u, "_invoke", function (r, n, o) {
        var i,
          c,
          u,
          f = 0,
          p = o || [],
          y = !1,
          G = {
            p: 0,
            n: 0,
            v: e,
            a: d,
            f: d.bind(e, 4),
            d: function (t, r) {
              return i = t, c = 0, u = e, G.n = r, a;
            }
          };
        function d(r, n) {
          for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) {
            var o,
              i = p[t],
              d = G.p,
              l = i[2];
            r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0));
          }
          if (o || r > 1) return a;
          throw y = !0, n;
        }
        return function (o, p, l) {
          if (f > 1) throw TypeError("Generator is already running");
          for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) {
            i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u);
            try {
              if (f = 2, i) {
                if (c || (o = "next"), t = i[o]) {
                  if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object");
                  if (!t.done) return t;
                  u = t.value, c < 2 && (c = 0);
                } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1);
                i = e;
              } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break;
            } catch (t) {
              i = e, c = 1, u = t;
            } finally {
              f = 1;
            }
          }
          return {
            value: t,
            done: y
          };
        };
      }(r, o, i), !0), u;
    }
    var a = {};
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
    t = Object.getPrototypeOf;
    var c = [][n] ? t(t([][n]())) : (_regeneratorDefine(t = {}, n, function () {
        return this;
      }), t),
      u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c);
    function f(e) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e;
    }
    return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine(u), _regeneratorDefine(u, o, "Generator"), _regeneratorDefine(u, n, function () {
      return this;
    }), _regeneratorDefine(u, "toString", function () {
      return "[object Generator]";
    }), (_regenerator = function () {
      return {
        w: i,
        m: f
      };
    })();
  }
  function _regeneratorDefine(e, r, n, t) {
    var i = Object.defineProperty;
    try {
      i({}, "", {});
    } catch (e) {
      i = 0;
    }
    _regeneratorDefine = function (e, r, n, t) {
      function o(r, n) {
        _regeneratorDefine(e, r, function (e) {
          return this._invoke(r, n, e);
        });
      }
      r ? i ? i(e, r, {
        value: n,
        enumerable: !t,
        configurable: !t,
        writable: !t
      }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2));
    }, _regeneratorDefine(e, r, n, t);
  }
  function _slicedToArray(r, e) {
    return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
  }
  function _toConsumableArray(r) {
    return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
  }
  function _unsupportedIterableToArray(r, a) {
    if (r) {
      if ("string" == typeof r) return _arrayLikeToArray(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
    }
  }

  var UPLOAD_URL = '/cloudinary/upload';
  var DELETE_URL = '/cloudinary/delete';
  var ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif'];
  var CloudinaryUrlUpload = function CloudinaryUrlUpload(_ref) {
    var _custom$isMultiple;
    var property = _ref.property,
      record = _ref.record,
      onChange = _ref.onChange;
    var params = record.params;
    var custom = property && property.custom || {};
    var isMultiple = (_custom$isMultiple = custom.isMultiple) !== null && _custom$isMultiple !== void 0 ? _custom$isMultiple : false;
    var currentValue = adminjs.flat.get(params, property.path);
    var urls = isMultiple ? Array.isArray(currentValue) ? currentValue : currentValue ? [currentValue] : [] : currentValue ? [currentValue] : [];
    var _useState = React.useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      uploading = _useState2[0],
      setUploading = _useState2[1];
    var _useState3 = React.useState(null),
      _useState4 = _slicedToArray(_useState3, 2),
      error = _useState4[0],
      setError = _useState4[1];
    var uploadFile = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(file) {
        var formData, res, err, data;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              formData = new FormData();
              formData.append('file', file);
              _context.n = 1;
              return fetch(UPLOAD_URL, {
                method: 'POST',
                body: formData,
                credentials: 'include'
              });
            case 1:
              res = _context.v;
              if (res.ok) {
                _context.n = 3;
                break;
              }
              _context.n = 2;
              return res.json()["catch"](function () {
                return {
                  message: res.statusText
                };
              });
            case 2:
              err = _context.v;
              throw new Error(err.message || 'Upload failed');
            case 3:
              _context.n = 4;
              return res.json();
            case 4:
              data = _context.v;
              return _context.a(2, data.url);
          }
        }, _callee);
      }));
      return function uploadFile(_x) {
        return _ref2.apply(this, arguments);
      };
    }();
    var onFilesSelected = /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(files) {
        var newUrls, _iterator, _step, file, url, _t, _t2;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              setError(null);
              setUploading(true);
              _context2.p = 1;
              newUrls = [];
              _iterator = _createForOfIteratorHelper(files);
              _context2.p = 2;
              _iterator.s();
            case 3:
              if ((_step = _iterator.n()).done) {
                _context2.n = 6;
                break;
              }
              file = _step.value;
              _context2.n = 4;
              return uploadFile(file);
            case 4:
              url = _context2.v;
              newUrls.push(url);
            case 5:
              _context2.n = 3;
              break;
            case 6:
              _context2.n = 8;
              break;
            case 7:
              _context2.p = 7;
              _t = _context2.v;
              _iterator.e(_t);
            case 8:
              _context2.p = 8;
              _iterator.f();
              return _context2.f(8);
            case 9:
              if (isMultiple) {
                onChange(property.path, [].concat(_toConsumableArray(urls), newUrls));
              } else {
                onChange(property.path, newUrls[0] || '');
              }
              _context2.n = 11;
              break;
            case 10:
              _context2.p = 10;
              _t2 = _context2.v;
              setError(_t2 instanceof Error ? _t2.message : 'Upload failed');
            case 11:
              _context2.p = 11;
              setUploading(false);
              return _context2.f(11);
            case 12:
              return _context2.a(2);
          }
        }, _callee2, null, [[2, 7, 8, 9], [1, 10, 11, 12]]);
      }));
      return function onFilesSelected(_x2) {
        return _ref3.apply(this, arguments);
      };
    }();
    var deleteFromCloudinary = /*#__PURE__*/function () {
      var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(url) {
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              if (!(!url || !url.includes('cloudinary.com'))) {
                _context3.n = 1;
                break;
              }
              return _context3.a(2);
            case 1:
              _context3.p = 1;
              _context3.n = 2;
              return fetch(DELETE_URL, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  url: url
                }),
                credentials: 'include'
              });
            case 2:
              _context3.n = 4;
              break;
            case 3:
              _context3.p = 3;
              _context3.v;
            case 4:
              return _context3.a(2);
          }
        }, _callee3, null, [[1, 3]]);
      }));
      return function deleteFromCloudinary(_x3) {
        return _ref4.apply(this, arguments);
      };
    }();
    var handleRemove = /*#__PURE__*/function () {
      var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(index) {
        var urlToRemove, newUrls;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              urlToRemove = urls[index];
              _context4.n = 1;
              return deleteFromCloudinary(urlToRemove);
            case 1:
              if (isMultiple) {
                newUrls = urls.filter(function (_, i) {
                  return i !== index;
                });
                onChange(property.path, newUrls);
              } else {
                onChange(property.path, '');
              }
            case 2:
              return _context4.a(2);
          }
        }, _callee4);
      }));
      return function handleRemove(_x4) {
        return _ref5.apply(this, arguments);
      };
    }();
    return /*#__PURE__*/React__default["default"].createElement(designSystem.FormGroup, null, /*#__PURE__*/React__default["default"].createElement(designSystem.Label, null, property.label), uploading && /*#__PURE__*/React__default["default"].createElement("div", {
      style: {
        marginBottom: 8
      }
    }, "Uploading..."), error && /*#__PURE__*/React__default["default"].createElement("div", {
      style: {
        color: 'red',
        marginBottom: 8
      }
    }, error), /*#__PURE__*/React__default["default"].createElement(designSystem.DropZone, {
      onChange: onFilesSelected,
      multiple: isMultiple,
      validate: {
        mimeTypes: ALLOWED_TYPES,
        maxSize: 10 * 1024 * 1024
      },
      files: []
    }), urls.filter(Boolean).map(function (url, index) {
      return /*#__PURE__*/React__default["default"].createElement(designSystem.DropZoneItem, {
        key: url,
        filename: url.split('/').pop() || "Image ".concat(index + 1),
        src: url,
        onRemove: function onRemove() {
          return handleRemove(index);
        }
      });
    }));
  };

  var ImageUrlShow = function ImageUrlShow(_ref) {
    var property = _ref.property,
      record = _ref.record;
    var value = adminjs.flat.get(record.params, property.path);
    var custom = property && property.custom || {};
    var combineWithMain = custom.combineWithMain === true;
    var urls = Array.isArray(value) ? value : value ? [value] : [];
    if (combineWithMain && property.path === 'images') {
      var main = adminjs.flat.get(record.params, 'mainImage');
      var mainArr = main ? [main] : [];
      urls = [].concat(mainArr, _toConsumableArray(Array.isArray(urls) ? urls : []));
    }
    urls = urls.filter(Boolean);
    if (!urls.length) return null;
    return /*#__PURE__*/React__default["default"].createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        alignItems: 'flex-start'
      }
    }, urls.map(function (url) {
      return /*#__PURE__*/React__default["default"].createElement("img", {
        key: url,
        src: url,
        alt: "",
        style: {
          width: 120,
          height: 120,
          objectFit: 'cover',
          borderRadius: 4,
          border: '1px solid #eee',
          flexShrink: 0
        }
      });
    }));
  };

  var ImageListCell = function ImageListCell(_ref) {
    var property = _ref.property,
      record = _ref.record;
    var url = adminjs.flat.get(record.params, property.path);

    // mainImage: use mainImage or fallback to first image in images array
    if (property.path === 'mainImage' && !url) {
      var images = adminjs.flat.get(record.params, 'images');
      url = Array.isArray(images) && images[0] ? images[0] : null;
    }
    // images: use first image from array
    if (property.path === 'images') {
      var _images = Array.isArray(url) ? url : url ? [url] : [];
      url = _images[0] || null;
    }
    if (!url || typeof url !== 'string') return null;
    return /*#__PURE__*/React__default["default"].createElement("img", {
      src: url,
      alt: "",
      style: {
        width: 56,
        height: 56,
        objectFit: 'cover',
        borderRadius: 6,
        display: 'block'
      }
    });
  };

  var STATUSES = [{
    value: 'pending',
    label: 'Pending',
    color: '#b45309',
    bg: '#fef3c7'
  }, {
    value: 'paid',
    label: 'Paid',
    color: '#047857',
    bg: '#d1fae5'
  }, {
    value: 'shipped',
    label: 'Shipped',
    color: '#1d4ed8',
    bg: '#dbeafe'
  }, {
    value: 'rejected',
    label: 'Rejected',
    color: '#b91c1c',
    bg: '#fee2e2'
  }, {
    value: 'failed',
    label: 'Failed',
    color: '#7f1d1d',
    bg: '#fecaca'
  }, {
    value: 'refunded',
    label: 'Refunded',
    color: '#6d28d9',
    bg: '#ede9fe'
  }, {
    value: 'cancelled',
    label: 'Cancelled',
    color: '#475569',
    bg: '#f1f5f9'
  }];
  var OrderStatusList = function OrderStatusList(_ref) {
    var _ref2, _record$id, _record$params, _record$params2, _resource$id;
    var property = _ref.property,
      record = _ref.record,
      resource = _ref.resource,
      where = _ref.where;
    var currentStatus = adminjs.flat.get(record.params, property.path) || 'pending';
    var _useState = React.useState(currentStatus),
      _useState2 = _slicedToArray(_useState, 2),
      status = _useState2[0],
      setStatus = _useState2[1];
    var _useState3 = React.useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      loading = _useState4[0],
      setLoading = _useState4[1];
    var _useState5 = React.useState(null),
      _useState6 = _slicedToArray(_useState5, 2),
      error = _useState6[0],
      setError = _useState6[1];
    var _useState7 = React.useState(false),
      _useState8 = _slicedToArray(_useState7, 2),
      open = _useState8[0],
      setOpen = _useState8[1];
    var containerRef = React.useRef(null);
    var orderId = (_ref2 = (_record$id = record === null || record === void 0 ? void 0 : record.id) !== null && _record$id !== void 0 ? _record$id : record === null || record === void 0 || (_record$params = record.params) === null || _record$params === void 0 ? void 0 : _record$params._id) !== null && _ref2 !== void 0 ? _ref2 : record === null || record === void 0 || (_record$params2 = record.params) === null || _record$params2 === void 0 ? void 0 : _record$params2.id;
    var resourceId = (_resource$id = resource === null || resource === void 0 ? void 0 : resource.id) !== null && _resource$id !== void 0 ? _resource$id : 'Order';
    var statusMeta = STATUSES.find(function (s) {
      return s.value === status;
    }) || STATUSES[0];
    var _useState9 = React.useState(null),
      _useState0 = _slicedToArray(_useState9, 2),
      dropdownRect = _useState0[0],
      setDropdownRect = _useState0[1];
    var buttonRef = React.useRef(null);
    var dropdownRef = React.useRef(null);
    var isShowPage = where === 'show';
    React.useEffect(function () {
      setStatus(currentStatus);
    }, [currentStatus]);
    React.useEffect(function () {
      if (!open) return;
      var close = function close(e) {
        var inCell = containerRef.current && containerRef.current.contains(e.target);
        var inDropdown = dropdownRef.current && dropdownRef.current.contains(e.target);
        if (!inCell && !inDropdown) setOpen(false);
      };
      document.addEventListener('click', close, true);
      return function () {
        return document.removeEventListener('click', close, true);
      };
    }, [open]);
    React.useEffect(function () {
      if (open && buttonRef.current) {
        setDropdownRect(buttonRef.current.getBoundingClientRect());
      } else {
        setDropdownRect(null);
      }
    }, [open]);
    var handleSelect = /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(newStatus) {
        var _window$REDUX_STATE, _data$notice, rootPath, origin, url, form, res, data, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              setOpen(false);
              if (!(newStatus === status)) {
                _context.n = 1;
                break;
              }
              return _context.a(2);
            case 1:
              if (orderId) {
                _context.n = 2;
                break;
              }
              setError('Order ID missing');
              return _context.a(2);
            case 2:
              setStatus(newStatus);
              setError(null);
              setLoading(true);
              _context.p = 3;
              rootPath = typeof window !== 'undefined' && ((_window$REDUX_STATE = window.REDUX_STATE) === null || _window$REDUX_STATE === void 0 || (_window$REDUX_STATE = _window$REDUX_STATE.paths) === null || _window$REDUX_STATE === void 0 ? void 0 : _window$REDUX_STATE.rootPath) || '/admin';
              origin = typeof window !== 'undefined' ? window.location.origin : '';
              url = "".concat(origin).concat(rootPath, "/api/resources/").concat(resourceId, "/records/").concat(orderId, "/updateStatus");
              form = new FormData();
              form.append('status', newStatus);
              _context.n = 4;
              return fetch(url, {
                method: 'POST',
                credentials: 'same-origin',
                body: form
              });
            case 4:
              res = _context.v;
              _context.n = 5;
              return res.json()["catch"](function () {
                return {};
              });
            case 5:
              data = _context.v;
              if (res.ok) {
                _context.n = 6;
                break;
              }
              throw new Error(((_data$notice = data.notice) === null || _data$notice === void 0 ? void 0 : _data$notice.message) || data.message || "Failed (".concat(res.status, ")"));
            case 6:
              _context.n = 8;
              break;
            case 7:
              _context.p = 7;
              _t = _context.v;
              setError((_t === null || _t === void 0 ? void 0 : _t.message) || 'Update failed');
              setStatus(currentStatus);
            case 8:
              _context.p = 8;
              setLoading(false);
              return _context.f(8);
            case 9:
              return _context.a(2);
          }
        }, _callee, null, [[3, 7, 8, 9]]);
      }));
      return function handleSelect(_x) {
        return _ref3.apply(this, arguments);
      };
    }();
    var triggerPadding = isShowPage ? '12px 16px' : '6px 10px';
    var triggerMinWidth = isShowPage ? 160 : 120;
    var triggerFontSize = isShowPage ? 14 : 12;
    var triggerGap = isShowPage ? 12 : 8;
    var dotSize = isShowPage ? 10 : 6;
    var dropdownMinWidth = isShowPage ? 180 : 140;
    var optionPadding = isShowPage ? '12px 16px' : '8px 12px';
    var optionFontSize = isShowPage ? 14 : 12;
    return /*#__PURE__*/React__default["default"].createElement("div", {
      ref: containerRef,
      "data-order-status-cell": true,
      style: {
        minWidth: isShowPage ? 280 : 220,
        padding: isShowPage ? '8px 0' : '2px 0',
        position: 'relative'
      },
      onClick: function onClick(e) {
        return e.stopPropagation();
      },
      onMouseDown: function onMouseDown(e) {
        return e.stopPropagation();
      }
    }, isShowPage && /*#__PURE__*/React__default["default"].createElement("div", {
      style: {
        fontSize: 12,
        fontWeight: 600,
        color: '#374151',
        marginBottom: 8
      }
    }, (property === null || property === void 0 ? void 0 : property.title) || 'Order status'), /*#__PURE__*/React__default["default"].createElement("button", {
      ref: buttonRef,
      type: "button",
      title: "Change order status",
      disabled: loading,
      onClick: function onClick(e) {
        e.stopPropagation();
        e.preventDefault();
        setOpen(function (v) {
          return !v;
        });
      },
      onMouseDown: function onMouseDown(e) {
        e.stopPropagation();
        e.preventDefault();
      },
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: triggerGap,
        minWidth: triggerMinWidth,
        padding: triggerPadding,
        fontSize: triggerFontSize,
        fontWeight: 600,
        borderRadius: isShowPage ? 10 : 6,
        border: "2px solid ".concat(statusMeta.color),
        outline: 'none',
        background: loading ? '#e2e8f0' : statusMeta.bg,
        color: statusMeta.color,
        cursor: loading ? 'wait' : 'pointer',
        boxShadow: isShowPage ? '0 2px 8px rgba(0,0,0,0.08)' : '0 1px 2px rgba(0,0,0,0.05)',
        textAlign: 'left',
        transition: 'box-shadow 0.2s ease'
      },
      onMouseEnter: function onMouseEnter(e) {
        if (!loading && !open) e.currentTarget.style.boxShadow = "0 4px 12px ".concat(statusMeta.color, "30");
      },
      onMouseLeave: function onMouseLeave(e) {
        e.currentTarget.style.boxShadow = isShowPage ? '0 2px 8px rgba(0,0,0,0.08)' : '0 1px 2px rgba(0,0,0,0.05)';
      }
    }, /*#__PURE__*/React__default["default"].createElement("span", {
      style: {
        width: dotSize,
        height: dotSize,
        borderRadius: '50%',
        flexShrink: 0,
        backgroundColor: statusMeta.color
      }
    }), /*#__PURE__*/React__default["default"].createElement("span", {
      style: {
        flex: 1
      }
    }, statusMeta.label), /*#__PURE__*/React__default["default"].createElement("span", {
      style: {
        opacity: 0.8,
        fontSize: isShowPage ? 12 : 10
      }
    }, open ? '▲' : '▼')), open && dropdownRect && typeof document !== 'undefined' && /*#__PURE__*/reactDom.createPortal(/*#__PURE__*/React__default["default"].createElement("div", {
      ref: dropdownRef,
      role: "listbox",
      onClick: function onClick(e) {
        return e.stopPropagation();
      },
      onMouseDown: function onMouseDown(e) {
        return e.stopPropagation();
      },
      style: {
        position: 'fixed',
        left: dropdownRect.left,
        top: dropdownRect.bottom + 6,
        minWidth: dropdownMinWidth,
        maxHeight: 320,
        overflow: 'auto',
        background: '#fff',
        borderRadius: isShowPage ? 12 : 8,
        border: '1px solid #e5e7eb',
        boxShadow: '0 10px 40px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)',
        zIndex: 10000
      }
    }, STATUSES.map(function (s, idx) {
      var isSelected = s.value === status;
      var isLast = idx === STATUSES.length - 1;
      return /*#__PURE__*/React__default["default"].createElement("button", {
        key: s.value,
        type: "button",
        role: "option",
        "aria-selected": isSelected,
        onClick: function onClick(e) {
          e.stopPropagation();
          e.preventDefault();
          handleSelect(s.value);
        },
        onMouseDown: function onMouseDown(e) {
          e.stopPropagation();
          e.preventDefault();
        },
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: triggerGap,
          width: '100%',
          padding: optionPadding,
          fontSize: optionFontSize,
          fontWeight: isSelected ? 600 : 500,
          border: 'none',
          borderRadius: isLast ? isShowPage ? '0 0 11px 11px' : '0 0 7px 7px' : 0,
          background: isSelected ? s.bg : '#fff',
          color: s.color,
          cursor: 'pointer',
          textAlign: 'left',
          borderBottom: isLast ? 'none' : '1px solid #f3f4f6'
        },
        onMouseEnter: function onMouseEnter(e) {
          if (!isSelected) e.currentTarget.style.background = '#f9fafb';
        },
        onMouseLeave: function onMouseLeave(e) {
          if (!isSelected) e.currentTarget.style.background = '#fff';
        }
      }, /*#__PURE__*/React__default["default"].createElement("span", {
        style: {
          width: dotSize,
          height: dotSize,
          borderRadius: '50%',
          flexShrink: 0,
          backgroundColor: s.color
        }
      }), s.label);
    })), document.body), loading && /*#__PURE__*/React__default["default"].createElement("span", {
      style: {
        fontSize: isShowPage ? 12 : 11,
        color: '#6b7280',
        marginTop: 6,
        display: 'block'
      }
    }, "Updating\u2026"), error && /*#__PURE__*/React__default["default"].createElement("div", {
      style: {
        fontSize: isShowPage ? 12 : 11,
        color: '#dc2626',
        marginTop: 6,
        fontWeight: 600
      }
    }, error));
  };

  /**
   * Displays amount in pence as GBP (e.g. 133000 -> £1,330.00).
   * Use for list and show views.
   */
  var GbpAmountCell = function GbpAmountCell(_ref) {
    var property = _ref.property,
      record = _ref.record;
    var value = adminjs.flat.get(record.params, property.path);
    if (value == null || value === '') return '—';
    var pence = Number(value);
    if (Number.isNaN(pence)) return String(value);
    var pounds = pence / 100;
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(pounds);
  };

  var formatGbp = function formatGbp(pence) {
    if (pence == null || pence === '') return '—';
    var n = Number(pence);
    if (Number.isNaN(n)) return String(pence);
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(n / 100);
  };
  var OrderItemsShow = function OrderItemsShow(_ref) {
    var _flat$get;
    var property = _ref.property,
      record = _ref.record;
    var items = adminjs.flat.get(record.params, property.path) || [];
    var totalAmount = (_flat$get = adminjs.flat.get(record.params, 'totalAmount')) !== null && _flat$get !== void 0 ? _flat$get : 0;
    var arr = Array.isArray(items) ? items : [];
    var subtotalPence = arr.reduce(function (sum, item) {
      return sum + (Number(item === null || item === void 0 ? void 0 : item.priceAmount) || 0) * (Number(item === null || item === void 0 ? void 0 : item.quantity) || 0);
    }, 0);
    var shippingPence = Math.max(0, Number(totalAmount) - subtotalPence);
    return /*#__PURE__*/React__default["default"].createElement("div", {
      style: {
        marginTop: 8
      }
    }, /*#__PURE__*/React__default["default"].createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 16
      }
    }, arr.map(function (item, idx) {
      var _item$quantity, _item$priceAmount, _item$quantity2;
      return /*#__PURE__*/React__default["default"].createElement("div", {
        key: idx,
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          padding: 16,
          background: '#f8f9fa',
          borderRadius: 8,
          border: '1px solid #eee'
        }
      }, /*#__PURE__*/React__default["default"].createElement("div", {
        style: {
          width: 72,
          height: 72,
          borderRadius: 8,
          overflow: 'hidden',
          background: '#e9ecef',
          flexShrink: 0
        }
      }, item !== null && item !== void 0 && item.productImage ? /*#__PURE__*/React__default["default"].createElement("img", {
        src: item.productImage,
        alt: "",
        style: {
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }
      }) : /*#__PURE__*/React__default["default"].createElement("div", {
        style: {
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#868e96',
          fontSize: 12
        }
      }, "No image")), /*#__PURE__*/React__default["default"].createElement("div", {
        style: {
          flex: 1,
          minWidth: 0
        }
      }, /*#__PURE__*/React__default["default"].createElement("div", {
        style: {
          fontWeight: 600,
          fontSize: 15,
          marginBottom: 4
        }
      }, (item === null || item === void 0 ? void 0 : item.productName) || (item === null || item === void 0 ? void 0 : item.productSlug) || 'Item'), /*#__PURE__*/React__default["default"].createElement("div", {
        style: {
          fontSize: 13,
          color: '#495057'
        }
      }, "Qty: ", (_item$quantity = item === null || item === void 0 ? void 0 : item.quantity) !== null && _item$quantity !== void 0 ? _item$quantity : 1, " \xD7 ", formatGbp(item === null || item === void 0 ? void 0 : item.priceAmount), " =", ' ', formatGbp(((_item$priceAmount = item === null || item === void 0 ? void 0 : item.priceAmount) !== null && _item$priceAmount !== void 0 ? _item$priceAmount : 0) * ((_item$quantity2 = item === null || item === void 0 ? void 0 : item.quantity) !== null && _item$quantity2 !== void 0 ? _item$quantity2 : 1)))));
    })), /*#__PURE__*/React__default["default"].createElement("div", {
      style: {
        marginTop: 20,
        paddingTop: 16,
        borderTop: '1px solid #dee2e6',
        maxWidth: 280,
        marginLeft: 'auto'
      }
    }, /*#__PURE__*/React__default["default"].createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: 8,
        fontSize: 14
      }
    }, /*#__PURE__*/React__default["default"].createElement("span", null, "Subtotal"), /*#__PURE__*/React__default["default"].createElement("span", null, formatGbp(subtotalPence))), /*#__PURE__*/React__default["default"].createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: 8,
        fontSize: 14
      }
    }, /*#__PURE__*/React__default["default"].createElement("span", null, "Shipping"), /*#__PURE__*/React__default["default"].createElement("span", null, formatGbp(shippingPence))), /*#__PURE__*/React__default["default"].createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        fontWeight: 700,
        fontSize: 16,
        paddingTop: 8
      }
    }, /*#__PURE__*/React__default["default"].createElement("span", null, "Total"), /*#__PURE__*/React__default["default"].createElement("span", null, formatGbp(totalAmount)))));
  };

  AdminJS.UserComponents = {};
  AdminJS.UserComponents.Component0 = DashboardRedirectToProducts;
  AdminJS.UserComponents.Component1 = CloudinaryUrlUpload;
  AdminJS.UserComponents.Component2 = ImageUrlShow;
  AdminJS.UserComponents.Component3 = ImageListCell;
  AdminJS.UserComponents.Component4 = CloudinaryUrlUpload;
  AdminJS.UserComponents.Component5 = ImageUrlShow;
  AdminJS.UserComponents.Component6 = OrderStatusList;
  AdminJS.UserComponents.Component7 = OrderStatusList;
  AdminJS.UserComponents.Component8 = GbpAmountCell;
  AdminJS.UserComponents.Component9 = OrderItemsShow;
  AdminJS.UserComponents.Component10 = GbpAmountCell;
  AdminJS.UserComponents.Component11 = GbpAmountCell;

})(React, AdminJS, AdminJSDesignSystem, ReactDOM);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9kaXN0L2FkbWluL2NvbXBvbmVudHMvZGFzaGJvYXJkLXJlZGlyZWN0LXRvLXByb2R1Y3RzLmpzeCIsIi4uL2Rpc3QvYWRtaW4vY29tcG9uZW50cy9jbG91ZGluYXJ5LXVybC11cGxvYWQuanN4IiwiLi4vZGlzdC9hZG1pbi9jb21wb25lbnRzL2ltYWdlLXVybC1zaG93LmpzeCIsIi4uL2Rpc3QvYWRtaW4vY29tcG9uZW50cy9pbWFnZS1saXN0LWNlbGwuanN4IiwiLi4vZGlzdC9hZG1pbi9jb21wb25lbnRzL29yZGVyLXN0YXR1cy1saXN0LmpzeCIsIi4uL2Rpc3QvYWRtaW4vY29tcG9uZW50cy9nYnAtYW1vdW50LWNlbGwuanN4IiwiLi4vZGlzdC9hZG1pbi9jb21wb25lbnRzL29yZGVyLWl0ZW1zLXNob3cuanN4IiwiLmVudHJ5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5cbi8qKlxuICogUmVwbGFjZXMgdGhlIGRlZmF1bHQgQWRtaW5KUyBkYXNoYm9hcmQuIFJlZGlyZWN0cyBpbW1lZGlhdGVseSB0byB0aGUgUHJvZHVjdCBsaXN0XG4gKiBzbyB0aGF0IGFmdGVyIGxvZ2luIHVzZXJzIGxhbmQgb24gdGhlIGNhdGFsb2cgaW5zdGVhZCBvZiB0aGUgZGFzaGJvYXJkLlxuICovXG5jb25zdCBEYXNoYm9hcmRSZWRpcmVjdFRvUHJvZHVjdHMgPSAoKSA9PiB7XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3Qgcm9vdFBhdGggPSAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LlJFRFVYX1NUQVRFPy5wYXRocz8ucm9vdFBhdGgpIHx8ICcvYWRtaW4nO1xuICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKGAke3Jvb3RQYXRofS9yZXNvdXJjZXMvUHJvZHVjdGApO1xuICB9LCBbXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IHN0eWxlPXt7IHBhZGRpbmc6IDI0LCB0ZXh0QWxpZ246ICdjZW50ZXInLCBjb2xvcjogJyM2NDc0OGInIH19PlxuICAgICAgUmVkaXJlY3RpbmcgdG8gcHJvZHVjdHPigKZcbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IERhc2hib2FyZFJlZGlyZWN0VG9Qcm9kdWN0cztcbiIsImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IEVkaXRQcm9wZXJ0eVByb3BzLCBmbGF0IH0gZnJvbSAnYWRtaW5qcyc7XG5pbXBvcnQge1xuICBEcm9wWm9uZSxcbiAgRm9ybUdyb3VwLFxuICBMYWJlbCxcbiAgRHJvcFpvbmVJdGVtLFxufSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcblxuY29uc3QgVVBMT0FEX1VSTCA9ICcvY2xvdWRpbmFyeS91cGxvYWQnO1xuY29uc3QgREVMRVRFX1VSTCA9ICcvY2xvdWRpbmFyeS9kZWxldGUnO1xuY29uc3QgQUxMT1dFRF9UWVBFUyA9IFtcbiAgJ2ltYWdlL3BuZycsXG4gICdpbWFnZS9qcGVnJyxcbiAgJ2ltYWdlL2pwZycsXG4gICdpbWFnZS93ZWJwJyxcbiAgJ2ltYWdlL2dpZicsXG5dO1xuXG5jb25zdCBDbG91ZGluYXJ5VXJsVXBsb2FkID0gKHsgcHJvcGVydHksIHJlY29yZCwgb25DaGFuZ2UgfSkgPT4ge1xuICBjb25zdCB7IHBhcmFtcyB9ID0gcmVjb3JkO1xuICBjb25zdCBjdXN0b20gPSAocHJvcGVydHkgJiYgcHJvcGVydHkuY3VzdG9tKSB8fCB7fTtcbiAgY29uc3QgaXNNdWx0aXBsZSA9IGN1c3RvbS5pc011bHRpcGxlID8/IGZhbHNlO1xuXG4gIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IGZsYXQuZ2V0KHBhcmFtcywgcHJvcGVydHkucGF0aCk7XG4gIGNvbnN0IHVybHMgPSBpc011bHRpcGxlXG4gICAgPyBBcnJheS5pc0FycmF5KGN1cnJlbnRWYWx1ZSlcbiAgICAgID8gY3VycmVudFZhbHVlXG4gICAgICA6IGN1cnJlbnRWYWx1ZVxuICAgICAgICA/IFtjdXJyZW50VmFsdWVdXG4gICAgICAgIDogW11cbiAgICA6IGN1cnJlbnRWYWx1ZVxuICAgICAgPyBbY3VycmVudFZhbHVlXVxuICAgICAgOiBbXTtcblxuICBjb25zdCBbdXBsb2FkaW5nLCBzZXRVcGxvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbZXJyb3IsIHNldEVycm9yXSA9IHVzZVN0YXRlKG51bGwpO1xuXG4gIGNvbnN0IHVwbG9hZEZpbGUgPSBhc3luYyAoZmlsZSkgPT4ge1xuICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgZm9ybURhdGEuYXBwZW5kKCdmaWxlJywgZmlsZSk7XG4gICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goVVBMT0FEX1VSTCwge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBib2R5OiBmb3JtRGF0YSxcbiAgICAgIGNyZWRlbnRpYWxzOiAnaW5jbHVkZScsXG4gICAgfSk7XG4gICAgaWYgKCFyZXMub2spIHtcbiAgICAgIGNvbnN0IGVyciA9IGF3YWl0IHJlcy5qc29uKCkuY2F0Y2goKCkgPT4gKHsgbWVzc2FnZTogcmVzLnN0YXR1c1RleHQgfSkpO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGVyci5tZXNzYWdlIHx8ICdVcGxvYWQgZmFpbGVkJyk7XG4gICAgfVxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXMuanNvbigpO1xuICAgIHJldHVybiBkYXRhLnVybDtcbiAgfTtcblxuICBjb25zdCBvbkZpbGVzU2VsZWN0ZWQgPSBhc3luYyAoZmlsZXMpID0+IHtcbiAgICBzZXRFcnJvcihudWxsKTtcbiAgICBzZXRVcGxvYWRpbmcodHJ1ZSk7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IG5ld1VybHMgPSBbXTtcbiAgICAgIGZvciAoY29uc3QgZmlsZSBvZiBmaWxlcykge1xuICAgICAgICBjb25zdCB1cmwgPSBhd2FpdCB1cGxvYWRGaWxlKGZpbGUpO1xuICAgICAgICBuZXdVcmxzLnB1c2godXJsKTtcbiAgICAgIH1cbiAgICAgIGlmIChpc011bHRpcGxlKSB7XG4gICAgICAgIG9uQ2hhbmdlKHByb3BlcnR5LnBhdGgsIFsuLi51cmxzLCAuLi5uZXdVcmxzXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvbkNoYW5nZShwcm9wZXJ0eS5wYXRoLCBuZXdVcmxzWzBdIHx8ICcnKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBzZXRFcnJvcihlIGluc3RhbmNlb2YgRXJyb3IgPyBlLm1lc3NhZ2UgOiAnVXBsb2FkIGZhaWxlZCcpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRVcGxvYWRpbmcoZmFsc2UpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBkZWxldGVGcm9tQ2xvdWRpbmFyeSA9IGFzeW5jICh1cmwpID0+IHtcbiAgICBpZiAoIXVybCB8fCAhdXJsLmluY2x1ZGVzKCdjbG91ZGluYXJ5LmNvbScpKSByZXR1cm47XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGZldGNoKERFTEVURV9VUkwsIHtcbiAgICAgICAgbWV0aG9kOiAnREVMRVRFJyxcbiAgICAgICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgdXJsIH0pLFxuICAgICAgICBjcmVkZW50aWFsczogJ2luY2x1ZGUnLFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCB7XG4gICAgICAvLyBJZ25vcmUgZGVsZXRlIGVycm9ycyAtIGZvcm0gd2lsbCBzdGlsbCB1cGRhdGVcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlUmVtb3ZlID0gYXN5bmMgKGluZGV4KSA9PiB7XG4gICAgY29uc3QgdXJsVG9SZW1vdmUgPSB1cmxzW2luZGV4XTtcbiAgICBhd2FpdCBkZWxldGVGcm9tQ2xvdWRpbmFyeSh1cmxUb1JlbW92ZSk7XG4gICAgaWYgKGlzTXVsdGlwbGUpIHtcbiAgICAgIGNvbnN0IG5ld1VybHMgPSB1cmxzLmZpbHRlcigoXywgaSkgPT4gaSAhPT0gaW5kZXgpO1xuICAgICAgb25DaGFuZ2UocHJvcGVydHkucGF0aCwgbmV3VXJscyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9uQ2hhbmdlKHByb3BlcnR5LnBhdGgsICcnKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8Rm9ybUdyb3VwPlxuICAgICAgPExhYmVsPntwcm9wZXJ0eS5sYWJlbH08L0xhYmVsPlxuICAgICAge3VwbG9hZGluZyAmJiA8ZGl2IHN0eWxlPXt7IG1hcmdpbkJvdHRvbTogOCB9fT5VcGxvYWRpbmcuLi48L2Rpdj59XG4gICAgICB7ZXJyb3IgJiYgPGRpdiBzdHlsZT17eyBjb2xvcjogJ3JlZCcsIG1hcmdpbkJvdHRvbTogOCB9fT57ZXJyb3J9PC9kaXY+fVxuICAgICAgPERyb3Bab25lXG4gICAgICAgIG9uQ2hhbmdlPXtvbkZpbGVzU2VsZWN0ZWR9XG4gICAgICAgIG11bHRpcGxlPXtpc011bHRpcGxlfVxuICAgICAgICB2YWxpZGF0ZT17eyBtaW1lVHlwZXM6IEFMTE9XRURfVFlQRVMsIG1heFNpemU6IDEwICogMTAyNCAqIDEwMjQgfX1cbiAgICAgICAgZmlsZXM9e1tdfVxuICAgICAgLz5cbiAgICAgIHt1cmxzLmZpbHRlcihCb29sZWFuKS5tYXAoKHVybCwgaW5kZXgpID0+IChcbiAgICAgICAgPERyb3Bab25lSXRlbVxuICAgICAgICAgIGtleT17dXJsfVxuICAgICAgICAgIGZpbGVuYW1lPXt1cmwuc3BsaXQoJy8nKS5wb3AoKSB8fCBgSW1hZ2UgJHtpbmRleCArIDF9YH1cbiAgICAgICAgICBzcmM9e3VybH1cbiAgICAgICAgICBvblJlbW92ZT17KCkgPT4gaGFuZGxlUmVtb3ZlKGluZGV4KX1cbiAgICAgICAgLz5cbiAgICAgICkpfVxuICAgIDwvRm9ybUdyb3VwPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQ2xvdWRpbmFyeVVybFVwbG9hZDtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBmbGF0IH0gZnJvbSAnYWRtaW5qcyc7XG5cbmNvbnN0IEltYWdlVXJsU2hvdyA9ICh7IHByb3BlcnR5LCByZWNvcmQgfSkgPT4ge1xuICBjb25zdCB2YWx1ZSA9IGZsYXQuZ2V0KHJlY29yZC5wYXJhbXMsIHByb3BlcnR5LnBhdGgpO1xuICBjb25zdCBjdXN0b20gPSAocHJvcGVydHkgJiYgcHJvcGVydHkuY3VzdG9tKSB8fCB7fTtcbiAgY29uc3QgY29tYmluZVdpdGhNYWluID0gY3VzdG9tLmNvbWJpbmVXaXRoTWFpbiA9PT0gdHJ1ZTtcblxuICBsZXQgdXJscyA9IEFycmF5LmlzQXJyYXkodmFsdWUpID8gdmFsdWUgOiB2YWx1ZSA/IFt2YWx1ZV0gOiBbXTtcbiAgaWYgKGNvbWJpbmVXaXRoTWFpbiAmJiBwcm9wZXJ0eS5wYXRoID09PSAnaW1hZ2VzJykge1xuICAgIGNvbnN0IG1haW4gPSBmbGF0LmdldChyZWNvcmQucGFyYW1zLCAnbWFpbkltYWdlJyk7XG4gICAgY29uc3QgbWFpbkFyciA9IG1haW4gPyBbbWFpbl0gOiBbXTtcbiAgICB1cmxzID0gWy4uLm1haW5BcnIsIC4uLihBcnJheS5pc0FycmF5KHVybHMpID8gdXJscyA6IFtdKV07XG4gIH1cblxuICB1cmxzID0gdXJscy5maWx0ZXIoQm9vbGVhbik7XG4gIGlmICghdXJscy5sZW5ndGgpIHJldHVybiBudWxsO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdlxuICAgICAgc3R5bGU9e3tcbiAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICBmbGV4RGlyZWN0aW9uOiAncm93JyxcbiAgICAgICAgZmxleFdyYXA6ICd3cmFwJyxcbiAgICAgICAgZ2FwOiAxMixcbiAgICAgICAgYWxpZ25JdGVtczogJ2ZsZXgtc3RhcnQnLFxuICAgICAgfX1cbiAgICA+XG4gICAgICB7dXJscy5tYXAoKHVybCkgPT4gKFxuICAgICAgICA8aW1nXG4gICAgICAgICAga2V5PXt1cmx9XG4gICAgICAgICAgc3JjPXt1cmx9XG4gICAgICAgICAgYWx0PVwiXCJcbiAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgd2lkdGg6IDEyMCxcbiAgICAgICAgICAgIGhlaWdodDogMTIwLFxuICAgICAgICAgICAgb2JqZWN0Rml0OiAnY292ZXInLFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiA0LFxuICAgICAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkICNlZWUnLFxuICAgICAgICAgICAgZmxleFNocmluazogMCxcbiAgICAgICAgICB9fVxuICAgICAgICAvPlxuICAgICAgKSl9XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBJbWFnZVVybFNob3c7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgZmxhdCB9IGZyb20gJ2FkbWluanMnO1xuXG5jb25zdCBJbWFnZUxpc3RDZWxsID0gKHsgcHJvcGVydHksIHJlY29yZCB9KSA9PiB7XG4gIGxldCB1cmwgPSBmbGF0LmdldChyZWNvcmQucGFyYW1zLCBwcm9wZXJ0eS5wYXRoKTtcblxuICAvLyBtYWluSW1hZ2U6IHVzZSBtYWluSW1hZ2Ugb3IgZmFsbGJhY2sgdG8gZmlyc3QgaW1hZ2UgaW4gaW1hZ2VzIGFycmF5XG4gIGlmIChwcm9wZXJ0eS5wYXRoID09PSAnbWFpbkltYWdlJyAmJiAhdXJsKSB7XG4gICAgY29uc3QgaW1hZ2VzID0gZmxhdC5nZXQocmVjb3JkLnBhcmFtcywgJ2ltYWdlcycpO1xuICAgIHVybCA9IEFycmF5LmlzQXJyYXkoaW1hZ2VzKSAmJiBpbWFnZXNbMF0gPyBpbWFnZXNbMF0gOiBudWxsO1xuICB9XG4gIC8vIGltYWdlczogdXNlIGZpcnN0IGltYWdlIGZyb20gYXJyYXlcbiAgaWYgKHByb3BlcnR5LnBhdGggPT09ICdpbWFnZXMnKSB7XG4gICAgY29uc3QgaW1hZ2VzID0gQXJyYXkuaXNBcnJheSh1cmwpID8gdXJsIDogdXJsID8gW3VybF0gOiBbXTtcbiAgICB1cmwgPSBpbWFnZXNbMF0gfHwgbnVsbDtcbiAgfVxuXG4gIGlmICghdXJsIHx8IHR5cGVvZiB1cmwgIT09ICdzdHJpbmcnKSByZXR1cm4gbnVsbDtcblxuICByZXR1cm4gKFxuICAgIDxpbWdcbiAgICAgIHNyYz17dXJsfVxuICAgICAgYWx0PVwiXCJcbiAgICAgIHN0eWxlPXt7XG4gICAgICAgIHdpZHRoOiA1NixcbiAgICAgICAgaGVpZ2h0OiA1NixcbiAgICAgICAgb2JqZWN0Rml0OiAnY292ZXInLFxuICAgICAgICBib3JkZXJSYWRpdXM6IDYsXG4gICAgICAgIGRpc3BsYXk6ICdibG9jaycsXG4gICAgICB9fVxuICAgIC8+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBJbWFnZUxpc3RDZWxsO1xuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VSZWYsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNyZWF0ZVBvcnRhbCB9IGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgeyBmbGF0IH0gZnJvbSAnYWRtaW5qcyc7XG5cbmNvbnN0IFNUQVRVU0VTID0gW1xuICB7IHZhbHVlOiAncGVuZGluZycsIGxhYmVsOiAnUGVuZGluZycsIGNvbG9yOiAnI2I0NTMwOScsIGJnOiAnI2ZlZjNjNycgfSxcbiAgeyB2YWx1ZTogJ3BhaWQnLCBsYWJlbDogJ1BhaWQnLCBjb2xvcjogJyMwNDc4NTcnLCBiZzogJyNkMWZhZTUnIH0sXG4gIHsgdmFsdWU6ICdzaGlwcGVkJywgbGFiZWw6ICdTaGlwcGVkJywgY29sb3I6ICcjMWQ0ZWQ4JywgYmc6ICcjZGJlYWZlJyB9LFxuICB7IHZhbHVlOiAncmVqZWN0ZWQnLCBsYWJlbDogJ1JlamVjdGVkJywgY29sb3I6ICcjYjkxYzFjJywgYmc6ICcjZmVlMmUyJyB9LFxuICB7IHZhbHVlOiAnZmFpbGVkJywgbGFiZWw6ICdGYWlsZWQnLCBjb2xvcjogJyM3ZjFkMWQnLCBiZzogJyNmZWNhY2EnIH0sXG4gIHsgdmFsdWU6ICdyZWZ1bmRlZCcsIGxhYmVsOiAnUmVmdW5kZWQnLCBjb2xvcjogJyM2ZDI4ZDknLCBiZzogJyNlZGU5ZmUnIH0sXG4gIHsgdmFsdWU6ICdjYW5jZWxsZWQnLCBsYWJlbDogJ0NhbmNlbGxlZCcsIGNvbG9yOiAnIzQ3NTU2OScsIGJnOiAnI2YxZjVmOScgfSxcbl07XG5cbmNvbnN0IE9yZGVyU3RhdHVzTGlzdCA9ICh7IHByb3BlcnR5LCByZWNvcmQsIHJlc291cmNlLCB3aGVyZSB9KSA9PiB7XG4gIGNvbnN0IGN1cnJlbnRTdGF0dXMgPSBmbGF0LmdldChyZWNvcmQucGFyYW1zLCBwcm9wZXJ0eS5wYXRoKSB8fCAncGVuZGluZyc7XG4gIGNvbnN0IFtzdGF0dXMsIHNldFN0YXR1c10gPSB1c2VTdGF0ZShjdXJyZW50U3RhdHVzKTtcbiAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbZXJyb3IsIHNldEVycm9yXSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbb3Blbiwgc2V0T3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IGNvbnRhaW5lclJlZiA9IHVzZVJlZihudWxsKTtcblxuICBjb25zdCBvcmRlcklkID0gcmVjb3JkPy5pZCA/PyByZWNvcmQ/LnBhcmFtcz8uX2lkID8/IHJlY29yZD8ucGFyYW1zPy5pZDtcbiAgY29uc3QgcmVzb3VyY2VJZCA9IHJlc291cmNlPy5pZCA/PyAnT3JkZXInO1xuICBjb25zdCBzdGF0dXNNZXRhID0gU1RBVFVTRVMuZmluZCgocykgPT4gcy52YWx1ZSA9PT0gc3RhdHVzKSB8fCBTVEFUVVNFU1swXTtcbiAgY29uc3QgW2Ryb3Bkb3duUmVjdCwgc2V0RHJvcGRvd25SZWN0XSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBidXR0b25SZWYgPSB1c2VSZWYobnVsbCk7XG4gIGNvbnN0IGRyb3Bkb3duUmVmID0gdXNlUmVmKG51bGwpO1xuXG4gIGNvbnN0IGlzU2hvd1BhZ2UgPSB3aGVyZSA9PT0gJ3Nob3cnO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc2V0U3RhdHVzKGN1cnJlbnRTdGF0dXMpO1xuICB9LCBbY3VycmVudFN0YXR1c10pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFvcGVuKSByZXR1cm47XG4gICAgY29uc3QgY2xvc2UgPSAoZSkgPT4ge1xuICAgICAgY29uc3QgaW5DZWxsID0gY29udGFpbmVyUmVmLmN1cnJlbnQgJiYgY29udGFpbmVyUmVmLmN1cnJlbnQuY29udGFpbnMoZS50YXJnZXQpO1xuICAgICAgY29uc3QgaW5Ecm9wZG93biA9IGRyb3Bkb3duUmVmLmN1cnJlbnQgJiYgZHJvcGRvd25SZWYuY3VycmVudC5jb250YWlucyhlLnRhcmdldCk7XG4gICAgICBpZiAoIWluQ2VsbCAmJiAhaW5Ecm9wZG93bikgc2V0T3BlbihmYWxzZSk7XG4gICAgfTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlLCB0cnVlKTtcbiAgICByZXR1cm4gKCkgPT4gZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZSwgdHJ1ZSk7XG4gIH0sIFtvcGVuXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAob3BlbiAmJiBidXR0b25SZWYuY3VycmVudCkge1xuICAgICAgc2V0RHJvcGRvd25SZWN0KGJ1dHRvblJlZi5jdXJyZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2V0RHJvcGRvd25SZWN0KG51bGwpO1xuICAgIH1cbiAgfSwgW29wZW5dKTtcblxuICBjb25zdCBoYW5kbGVTZWxlY3QgPSBhc3luYyAobmV3U3RhdHVzKSA9PiB7XG4gICAgc2V0T3BlbihmYWxzZSk7XG4gICAgaWYgKG5ld1N0YXR1cyA9PT0gc3RhdHVzKSByZXR1cm47XG4gICAgaWYgKCFvcmRlcklkKSB7XG4gICAgICBzZXRFcnJvcignT3JkZXIgSUQgbWlzc2luZycpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzZXRTdGF0dXMobmV3U3RhdHVzKTtcbiAgICBzZXRFcnJvcihudWxsKTtcbiAgICBzZXRMb2FkaW5nKHRydWUpO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByb290UGF0aCA9ICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuUkVEVVhfU1RBVEU/LnBhdGhzPy5yb290UGF0aCkgfHwgJy9hZG1pbic7XG4gICAgICBjb25zdCBvcmlnaW4gPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4gOiAnJztcbiAgICAgIGNvbnN0IHVybCA9IGAke29yaWdpbn0ke3Jvb3RQYXRofS9hcGkvcmVzb3VyY2VzLyR7cmVzb3VyY2VJZH0vcmVjb3Jkcy8ke29yZGVySWR9L3VwZGF0ZVN0YXR1c2A7XG4gICAgICBjb25zdCBmb3JtID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgICBmb3JtLmFwcGVuZCgnc3RhdHVzJywgbmV3U3RhdHVzKTtcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKHVybCwge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgY3JlZGVudGlhbHM6ICdzYW1lLW9yaWdpbicsXG4gICAgICAgIGJvZHk6IGZvcm0sXG4gICAgICB9KTtcbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXMuanNvbigpLmNhdGNoKCgpID0+ICh7fSkpO1xuICAgICAgaWYgKCFyZXMub2spIHRocm93IG5ldyBFcnJvcihkYXRhLm5vdGljZT8ubWVzc2FnZSB8fCBkYXRhLm1lc3NhZ2UgfHwgYEZhaWxlZCAoJHtyZXMuc3RhdHVzfSlgKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHNldEVycm9yKGVycj8ubWVzc2FnZSB8fCAnVXBkYXRlIGZhaWxlZCcpO1xuICAgICAgc2V0U3RhdHVzKGN1cnJlbnRTdGF0dXMpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgdHJpZ2dlclBhZGRpbmcgPSBpc1Nob3dQYWdlID8gJzEycHggMTZweCcgOiAnNnB4IDEwcHgnO1xuICBjb25zdCB0cmlnZ2VyTWluV2lkdGggPSBpc1Nob3dQYWdlID8gMTYwIDogMTIwO1xuICBjb25zdCB0cmlnZ2VyRm9udFNpemUgPSBpc1Nob3dQYWdlID8gMTQgOiAxMjtcbiAgY29uc3QgdHJpZ2dlckdhcCA9IGlzU2hvd1BhZ2UgPyAxMiA6IDg7XG4gIGNvbnN0IGRvdFNpemUgPSBpc1Nob3dQYWdlID8gMTAgOiA2O1xuICBjb25zdCBkcm9wZG93bk1pbldpZHRoID0gaXNTaG93UGFnZSA/IDE4MCA6IDE0MDtcbiAgY29uc3Qgb3B0aW9uUGFkZGluZyA9IGlzU2hvd1BhZ2UgPyAnMTJweCAxNnB4JyA6ICc4cHggMTJweCc7XG4gIGNvbnN0IG9wdGlvbkZvbnRTaXplID0gaXNTaG93UGFnZSA/IDE0IDogMTI7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICByZWY9e2NvbnRhaW5lclJlZn1cbiAgICAgIGRhdGEtb3JkZXItc3RhdHVzLWNlbGxcbiAgICAgIHN0eWxlPXt7XG4gICAgICAgIG1pbldpZHRoOiBpc1Nob3dQYWdlID8gMjgwIDogMjIwLFxuICAgICAgICBwYWRkaW5nOiBpc1Nob3dQYWdlID8gJzhweCAwJyA6ICcycHggMCcsXG4gICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICAgICAgfX1cbiAgICAgIG9uQ2xpY2s9eyhlKSA9PiBlLnN0b3BQcm9wYWdhdGlvbigpfVxuICAgICAgb25Nb3VzZURvd249eyhlKSA9PiBlLnN0b3BQcm9wYWdhdGlvbigpfVxuICAgID5cbiAgICAgIHtpc1Nob3dQYWdlICYmIChcbiAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogMTIsIGZvbnRXZWlnaHQ6IDYwMCwgY29sb3I6ICcjMzc0MTUxJywgbWFyZ2luQm90dG9tOiA4IH19PlxuICAgICAgICAgIHtwcm9wZXJ0eT8udGl0bGUgfHwgJ09yZGVyIHN0YXR1cyd9XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cbiAgICAgIDxidXR0b25cbiAgICAgICAgcmVmPXtidXR0b25SZWZ9XG4gICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICB0aXRsZT1cIkNoYW5nZSBvcmRlciBzdGF0dXNcIlxuICAgICAgICBkaXNhYmxlZD17bG9hZGluZ31cbiAgICAgICAgb25DbGljaz17KGUpID0+IHtcbiAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBzZXRPcGVuKCh2KSA9PiAhdik7XG4gICAgICAgIH19XG4gICAgICAgIG9uTW91c2VEb3duPXsoZSkgPT4ge1xuICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9fVxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIGRpc3BsYXk6ICdpbmxpbmUtZmxleCcsXG4gICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgICAgICAgZ2FwOiB0cmlnZ2VyR2FwLFxuICAgICAgICAgIG1pbldpZHRoOiB0cmlnZ2VyTWluV2lkdGgsXG4gICAgICAgICAgcGFkZGluZzogdHJpZ2dlclBhZGRpbmcsXG4gICAgICAgICAgZm9udFNpemU6IHRyaWdnZXJGb250U2l6ZSxcbiAgICAgICAgICBmb250V2VpZ2h0OiA2MDAsXG4gICAgICAgICAgYm9yZGVyUmFkaXVzOiBpc1Nob3dQYWdlID8gMTAgOiA2LFxuICAgICAgICAgIGJvcmRlcjogYDJweCBzb2xpZCAke3N0YXR1c01ldGEuY29sb3J9YCxcbiAgICAgICAgICBvdXRsaW5lOiAnbm9uZScsXG4gICAgICAgICAgYmFja2dyb3VuZDogbG9hZGluZyA/ICcjZTJlOGYwJyA6IHN0YXR1c01ldGEuYmcsXG4gICAgICAgICAgY29sb3I6IHN0YXR1c01ldGEuY29sb3IsXG4gICAgICAgICAgY3Vyc29yOiBsb2FkaW5nID8gJ3dhaXQnIDogJ3BvaW50ZXInLFxuICAgICAgICAgIGJveFNoYWRvdzogaXNTaG93UGFnZSA/ICcwIDJweCA4cHggcmdiYSgwLDAsMCwwLjA4KScgOiAnMCAxcHggMnB4IHJnYmEoMCwwLDAsMC4wNSknLFxuICAgICAgICAgIHRleHRBbGlnbjogJ2xlZnQnLFxuICAgICAgICAgIHRyYW5zaXRpb246ICdib3gtc2hhZG93IDAuMnMgZWFzZScsXG4gICAgICAgIH19XG4gICAgICAgIG9uTW91c2VFbnRlcj17KGUpID0+IHtcbiAgICAgICAgICBpZiAoIWxvYWRpbmcgJiYgIW9wZW4pIGUuY3VycmVudFRhcmdldC5zdHlsZS5ib3hTaGFkb3cgPSBgMCA0cHggMTJweCAke3N0YXR1c01ldGEuY29sb3J9MzBgO1xuICAgICAgICB9fVxuICAgICAgICBvbk1vdXNlTGVhdmU9eyhlKSA9PiB7XG4gICAgICAgICAgZS5jdXJyZW50VGFyZ2V0LnN0eWxlLmJveFNoYWRvdyA9IGlzU2hvd1BhZ2UgPyAnMCAycHggOHB4IHJnYmEoMCwwLDAsMC4wOCknIDogJzAgMXB4IDJweCByZ2JhKDAsMCwwLDAuMDUpJztcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAgPHNwYW5cbiAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgd2lkdGg6IGRvdFNpemUsXG4gICAgICAgICAgICBoZWlnaHQ6IGRvdFNpemUsXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc1MCUnLFxuICAgICAgICAgICAgZmxleFNocmluazogMCxcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogc3RhdHVzTWV0YS5jb2xvcixcbiAgICAgICAgICB9fVxuICAgICAgICAvPlxuICAgICAgICA8c3BhbiBzdHlsZT17eyBmbGV4OiAxIH19PntzdGF0dXNNZXRhLmxhYmVsfTwvc3Bhbj5cbiAgICAgICAgPHNwYW4gc3R5bGU9e3sgb3BhY2l0eTogMC44LCBmb250U2l6ZTogaXNTaG93UGFnZSA/IDEyIDogMTAgfX0+e29wZW4gPyAn4payJyA6ICfilrwnfTwvc3Bhbj5cbiAgICAgIDwvYnV0dG9uPlxuXG4gICAgICB7b3BlbiAmJiBkcm9wZG93blJlY3QgJiYgdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyAmJiBjcmVhdGVQb3J0YWwoXG4gICAgICAgIDxkaXZcbiAgICAgICAgICByZWY9e2Ryb3Bkb3duUmVmfVxuICAgICAgICAgIHJvbGU9XCJsaXN0Ym94XCJcbiAgICAgICAgICBvbkNsaWNrPXsoZSkgPT4gZS5zdG9wUHJvcGFnYXRpb24oKX1cbiAgICAgICAgICBvbk1vdXNlRG93bj17KGUpID0+IGUuc3RvcFByb3BhZ2F0aW9uKCl9XG4gICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnZml4ZWQnLFxuICAgICAgICAgICAgbGVmdDogZHJvcGRvd25SZWN0LmxlZnQsXG4gICAgICAgICAgICB0b3A6IGRyb3Bkb3duUmVjdC5ib3R0b20gKyA2LFxuICAgICAgICAgICAgbWluV2lkdGg6IGRyb3Bkb3duTWluV2lkdGgsXG4gICAgICAgICAgICBtYXhIZWlnaHQ6IDMyMCxcbiAgICAgICAgICAgIG92ZXJmbG93OiAnYXV0bycsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAnI2ZmZicsXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6IGlzU2hvd1BhZ2UgPyAxMiA6IDgsXG4gICAgICAgICAgICBib3JkZXI6ICcxcHggc29saWQgI2U1ZTdlYicsXG4gICAgICAgICAgICBib3hTaGFkb3c6ICcwIDEwcHggNDBweCByZ2JhKDAsMCwwLDAuMTIpLCAwIDJweCA4cHggcmdiYSgwLDAsMCwwLjA2KScsXG4gICAgICAgICAgICB6SW5kZXg6IDEwMDAwLFxuICAgICAgICAgIH19XG4gICAgICAgID5cbiAgICAgICAgICB7U1RBVFVTRVMubWFwKChzLCBpZHgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGlzU2VsZWN0ZWQgPSBzLnZhbHVlID09PSBzdGF0dXM7XG4gICAgICAgICAgICBjb25zdCBpc0xhc3QgPSBpZHggPT09IFNUQVRVU0VTLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAga2V5PXtzLnZhbHVlfVxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgIHJvbGU9XCJvcHRpb25cIlxuICAgICAgICAgICAgICAgIGFyaWEtc2VsZWN0ZWQ9e2lzU2VsZWN0ZWR9XG4gICAgICAgICAgICAgICAgb25DbGljaz17KGUpID0+IHsgZS5zdG9wUHJvcGFnYXRpb24oKTsgZS5wcmV2ZW50RGVmYXVsdCgpOyBoYW5kbGVTZWxlY3Qocy52YWx1ZSk7IH19XG4gICAgICAgICAgICAgICAgb25Nb3VzZURvd249eyhlKSA9PiB7IGUuc3RvcFByb3BhZ2F0aW9uKCk7IGUucHJldmVudERlZmF1bHQoKTsgfX1cbiAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgICBnYXA6IHRyaWdnZXJHYXAsXG4gICAgICAgICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgICAgICAgICAgICAgcGFkZGluZzogb3B0aW9uUGFkZGluZyxcbiAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiBvcHRpb25Gb250U2l6ZSxcbiAgICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ6IGlzU2VsZWN0ZWQgPyA2MDAgOiA1MDAsXG4gICAgICAgICAgICAgICAgICBib3JkZXI6ICdub25lJyxcbiAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogaXNMYXN0ID8gKGlzU2hvd1BhZ2UgPyAnMCAwIDExcHggMTFweCcgOiAnMCAwIDdweCA3cHgnKSA6IDAsXG4gICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBpc1NlbGVjdGVkID8gcy5iZyA6ICcjZmZmJyxcbiAgICAgICAgICAgICAgICAgIGNvbG9yOiBzLmNvbG9yLFxuICAgICAgICAgICAgICAgICAgY3Vyc29yOiAncG9pbnRlcicsXG4gICAgICAgICAgICAgICAgICB0ZXh0QWxpZ246ICdsZWZ0JyxcbiAgICAgICAgICAgICAgICAgIGJvcmRlckJvdHRvbTogaXNMYXN0ID8gJ25vbmUnIDogJzFweCBzb2xpZCAjZjNmNGY2JyxcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIG9uTW91c2VFbnRlcj17KGUpID0+IHtcbiAgICAgICAgICAgICAgICAgIGlmICghaXNTZWxlY3RlZCkgZS5jdXJyZW50VGFyZ2V0LnN0eWxlLmJhY2tncm91bmQgPSAnI2Y5ZmFmYic7XG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICBvbk1vdXNlTGVhdmU9eyhlKSA9PiB7XG4gICAgICAgICAgICAgICAgICBpZiAoIWlzU2VsZWN0ZWQpIGUuY3VycmVudFRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kID0gJyNmZmYnO1xuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IGRvdFNpemUsXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogZG90U2l6ZSxcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnNTAlJyxcbiAgICAgICAgICAgICAgICAgICAgZmxleFNocmluazogMCxcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBzLmNvbG9yLFxuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIHtzLmxhYmVsfVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSl9XG4gICAgICAgIDwvZGl2PixcbiAgICAgICAgZG9jdW1lbnQuYm9keVxuICAgICAgKX1cblxuICAgICAge2xvYWRpbmcgJiYgKFxuICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250U2l6ZTogaXNTaG93UGFnZSA/IDEyIDogMTEsIGNvbG9yOiAnIzZiNzI4MCcsIG1hcmdpblRvcDogNiwgZGlzcGxheTogJ2Jsb2NrJyB9fT5cbiAgICAgICAgICBVcGRhdGluZ+KAplxuICAgICAgICA8L3NwYW4+XG4gICAgICApfVxuICAgICAge2Vycm9yICYmIChcbiAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogaXNTaG93UGFnZSA/IDEyIDogMTEsIGNvbG9yOiAnI2RjMjYyNicsIG1hcmdpblRvcDogNiwgZm9udFdlaWdodDogNjAwIH19PlxuICAgICAgICAgIHtlcnJvcn1cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgT3JkZXJTdGF0dXNMaXN0O1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGZsYXQgfSBmcm9tICdhZG1pbmpzJztcblxuLyoqXG4gKiBEaXNwbGF5cyBhbW91bnQgaW4gcGVuY2UgYXMgR0JQIChlLmcuIDEzMzAwMCAtPiDCozEsMzMwLjAwKS5cbiAqIFVzZSBmb3IgbGlzdCBhbmQgc2hvdyB2aWV3cy5cbiAqL1xuY29uc3QgR2JwQW1vdW50Q2VsbCA9ICh7IHByb3BlcnR5LCByZWNvcmQgfSkgPT4ge1xuICBjb25zdCB2YWx1ZSA9IGZsYXQuZ2V0KHJlY29yZC5wYXJhbXMsIHByb3BlcnR5LnBhdGgpO1xuICBpZiAodmFsdWUgPT0gbnVsbCB8fCB2YWx1ZSA9PT0gJycpIHJldHVybiAn4oCUJztcbiAgY29uc3QgcGVuY2UgPSBOdW1iZXIodmFsdWUpO1xuICBpZiAoTnVtYmVyLmlzTmFOKHBlbmNlKSkgcmV0dXJuIFN0cmluZyh2YWx1ZSk7XG4gIGNvbnN0IHBvdW5kcyA9IHBlbmNlIC8gMTAwO1xuICByZXR1cm4gbmV3IEludGwuTnVtYmVyRm9ybWF0KCdlbi1HQicsIHtcbiAgICBzdHlsZTogJ2N1cnJlbmN5JyxcbiAgICBjdXJyZW5jeTogJ0dCUCcsXG4gICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAyLFxuICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogMixcbiAgfSkuZm9ybWF0KHBvdW5kcyk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBHYnBBbW91bnRDZWxsO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGZsYXQgfSBmcm9tICdhZG1pbmpzJztcblxuY29uc3QgZm9ybWF0R2JwID0gKHBlbmNlKSA9PiB7XG4gIGlmIChwZW5jZSA9PSBudWxsIHx8IHBlbmNlID09PSAnJykgcmV0dXJuICfigJQnO1xuICBjb25zdCBuID0gTnVtYmVyKHBlbmNlKTtcbiAgaWYgKE51bWJlci5pc05hTihuKSkgcmV0dXJuIFN0cmluZyhwZW5jZSk7XG4gIHJldHVybiBuZXcgSW50bC5OdW1iZXJGb3JtYXQoJ2VuLUdCJywge1xuICAgIHN0eWxlOiAnY3VycmVuY3knLFxuICAgIGN1cnJlbmN5OiAnR0JQJyxcbiAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDIsXG4gICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiAyLFxuICB9KS5mb3JtYXQobiAvIDEwMCk7XG59O1xuXG5jb25zdCBPcmRlckl0ZW1zU2hvdyA9ICh7IHByb3BlcnR5LCByZWNvcmQgfSkgPT4ge1xuICBjb25zdCBpdGVtcyA9IGZsYXQuZ2V0KHJlY29yZC5wYXJhbXMsIHByb3BlcnR5LnBhdGgpIHx8IFtdO1xuICBjb25zdCB0b3RhbEFtb3VudCA9IGZsYXQuZ2V0KHJlY29yZC5wYXJhbXMsICd0b3RhbEFtb3VudCcpID8/IDA7XG4gIGNvbnN0IGFyciA9IEFycmF5LmlzQXJyYXkoaXRlbXMpID8gaXRlbXMgOiBbXTtcblxuICBjb25zdCBzdWJ0b3RhbFBlbmNlID0gYXJyLnJlZHVjZShcbiAgICAoc3VtLCBpdGVtKSA9PlxuICAgICAgc3VtICsgKE51bWJlcihpdGVtPy5wcmljZUFtb3VudCkgfHwgMCkgKiAoTnVtYmVyKGl0ZW0/LnF1YW50aXR5KSB8fCAwKSxcbiAgICAwLFxuICApO1xuICBjb25zdCBzaGlwcGluZ1BlbmNlID0gTWF0aC5tYXgoMCwgTnVtYmVyKHRvdGFsQW1vdW50KSAtIHN1YnRvdGFsUGVuY2UpO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBzdHlsZT17eyBtYXJnaW5Ub3A6IDggfX0+XG4gICAgICA8ZGl2XG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxuICAgICAgICAgIGdhcDogMTYsXG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIHthcnIubWFwKChpdGVtLCBpZHgpID0+IChcbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBrZXk9e2lkeH1cbiAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgICAgICAgICAgIGdhcDogMTYsXG4gICAgICAgICAgICAgIHBhZGRpbmc6IDE2LFxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnI2Y4ZjlmYScsXG4gICAgICAgICAgICAgIGJvcmRlclJhZGl1czogOCxcbiAgICAgICAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkICNlZWUnLFxuICAgICAgICAgICAgfX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgd2lkdGg6IDcyLFxuICAgICAgICAgICAgICAgIGhlaWdodDogNzIsXG4gICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiA4LFxuICAgICAgICAgICAgICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnI2U5ZWNlZicsXG4gICAgICAgICAgICAgICAgZmxleFNocmluazogMCxcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge2l0ZW0/LnByb2R1Y3RJbWFnZSA/IChcbiAgICAgICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgICAgICBzcmM9e2l0ZW0ucHJvZHVjdEltYWdlfVxuICAgICAgICAgICAgICAgICAgYWx0PVwiXCJcbiAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogJzEwMCUnLFxuICAgICAgICAgICAgICAgICAgICBvYmplY3RGaXQ6ICdjb3ZlcicsXG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAnMTAwJScsXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgICAgIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcjODY4ZTk2JyxcbiAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6IDEyLFxuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICBObyBpbWFnZVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZsZXg6IDEsIG1pbldpZHRoOiAwIH19PlxuICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ6IDYwMCxcbiAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiAxNSxcbiAgICAgICAgICAgICAgICAgIG1hcmdpbkJvdHRvbTogNCxcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge2l0ZW0/LnByb2R1Y3ROYW1lIHx8IGl0ZW0/LnByb2R1Y3RTbHVnIHx8ICdJdGVtJ31cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6IDEzLCBjb2xvcjogJyM0OTUwNTcnIH19PlxuICAgICAgICAgICAgICAgIFF0eToge2l0ZW0/LnF1YW50aXR5ID8/IDF9IMOXIHtmb3JtYXRHYnAoaXRlbT8ucHJpY2VBbW91bnQpfSA9eycgJ31cbiAgICAgICAgICAgICAgICB7Zm9ybWF0R2JwKChpdGVtPy5wcmljZUFtb3VudCA/PyAwKSAqIChpdGVtPy5xdWFudGl0eSA/PyAxKSl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICkpfVxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2XG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgbWFyZ2luVG9wOiAyMCxcbiAgICAgICAgICBwYWRkaW5nVG9wOiAxNixcbiAgICAgICAgICBib3JkZXJUb3A6ICcxcHggc29saWQgI2RlZTJlNicsXG4gICAgICAgICAgbWF4V2lkdGg6IDI4MCxcbiAgICAgICAgICBtYXJnaW5MZWZ0OiAnYXV0bycsXG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJyxcbiAgICAgICAgICAgIG1hcmdpbkJvdHRvbTogOCxcbiAgICAgICAgICAgIGZvbnRTaXplOiAxNCxcbiAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAgPHNwYW4+U3VidG90YWw8L3NwYW4+XG4gICAgICAgICAgPHNwYW4+e2Zvcm1hdEdicChzdWJ0b3RhbFBlbmNlKX08L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgIGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYmV0d2VlbicsXG4gICAgICAgICAgICBtYXJnaW5Cb3R0b206IDgsXG4gICAgICAgICAgICBmb250U2l6ZTogMTQsXG4gICAgICAgICAgfX1cbiAgICAgICAgPlxuICAgICAgICAgIDxzcGFuPlNoaXBwaW5nPC9zcGFuPlxuICAgICAgICAgIDxzcGFuPntmb3JtYXRHYnAoc2hpcHBpbmdQZW5jZSl9PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICBqdXN0aWZ5Q29udGVudDogJ3NwYWNlLWJldHdlZW4nLFxuICAgICAgICAgICAgZm9udFdlaWdodDogNzAwLFxuICAgICAgICAgICAgZm9udFNpemU6IDE2LFxuICAgICAgICAgICAgcGFkZGluZ1RvcDogOCxcbiAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAgPHNwYW4+VG90YWw8L3NwYW4+XG4gICAgICAgICAgPHNwYW4+e2Zvcm1hdEdicCh0b3RhbEFtb3VudCl9PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgT3JkZXJJdGVtc1Nob3c7XG4iLCJBZG1pbkpTLlVzZXJDb21wb25lbnRzID0ge31cbmltcG9ydCBDb21wb25lbnQwIGZyb20gJy4uL2Rpc3QvYWRtaW4vY29tcG9uZW50cy9kYXNoYm9hcmQtcmVkaXJlY3QtdG8tcHJvZHVjdHMnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkNvbXBvbmVudDAgPSBDb21wb25lbnQwXG5pbXBvcnQgQ29tcG9uZW50MSBmcm9tICcuLi9kaXN0L2FkbWluL2NvbXBvbmVudHMvY2xvdWRpbmFyeS11cmwtdXBsb2FkJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5Db21wb25lbnQxID0gQ29tcG9uZW50MVxuaW1wb3J0IENvbXBvbmVudDIgZnJvbSAnLi4vZGlzdC9hZG1pbi9jb21wb25lbnRzL2ltYWdlLXVybC1zaG93J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5Db21wb25lbnQyID0gQ29tcG9uZW50MlxuaW1wb3J0IENvbXBvbmVudDMgZnJvbSAnLi4vZGlzdC9hZG1pbi9jb21wb25lbnRzL2ltYWdlLWxpc3QtY2VsbCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuQ29tcG9uZW50MyA9IENvbXBvbmVudDNcbmltcG9ydCBDb21wb25lbnQ0IGZyb20gJy4uL2Rpc3QvYWRtaW4vY29tcG9uZW50cy9jbG91ZGluYXJ5LXVybC11cGxvYWQnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkNvbXBvbmVudDQgPSBDb21wb25lbnQ0XG5pbXBvcnQgQ29tcG9uZW50NSBmcm9tICcuLi9kaXN0L2FkbWluL2NvbXBvbmVudHMvaW1hZ2UtdXJsLXNob3cnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkNvbXBvbmVudDUgPSBDb21wb25lbnQ1XG5pbXBvcnQgQ29tcG9uZW50NiBmcm9tICcuLi9kaXN0L2FkbWluL2NvbXBvbmVudHMvb3JkZXItc3RhdHVzLWxpc3QnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkNvbXBvbmVudDYgPSBDb21wb25lbnQ2XG5pbXBvcnQgQ29tcG9uZW50NyBmcm9tICcuLi9kaXN0L2FkbWluL2NvbXBvbmVudHMvb3JkZXItc3RhdHVzLWxpc3QnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkNvbXBvbmVudDcgPSBDb21wb25lbnQ3XG5pbXBvcnQgQ29tcG9uZW50OCBmcm9tICcuLi9kaXN0L2FkbWluL2NvbXBvbmVudHMvZ2JwLWFtb3VudC1jZWxsJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5Db21wb25lbnQ4ID0gQ29tcG9uZW50OFxuaW1wb3J0IENvbXBvbmVudDkgZnJvbSAnLi4vZGlzdC9hZG1pbi9jb21wb25lbnRzL29yZGVyLWl0ZW1zLXNob3cnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkNvbXBvbmVudDkgPSBDb21wb25lbnQ5XG5pbXBvcnQgQ29tcG9uZW50MTAgZnJvbSAnLi4vZGlzdC9hZG1pbi9jb21wb25lbnRzL2dicC1hbW91bnQtY2VsbCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuQ29tcG9uZW50MTAgPSBDb21wb25lbnQxMFxuaW1wb3J0IENvbXBvbmVudDExIGZyb20gJy4uL2Rpc3QvYWRtaW4vY29tcG9uZW50cy9nYnAtYW1vdW50LWNlbGwnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkNvbXBvbmVudDExID0gQ29tcG9uZW50MTEiXSwibmFtZXMiOlsiRGFzaGJvYXJkUmVkaXJlY3RUb1Byb2R1Y3RzIiwidXNlRWZmZWN0IiwiX3dpbmRvdyRSRURVWF9TVEFURSIsInJvb3RQYXRoIiwid2luZG93IiwiUkVEVVhfU1RBVEUiLCJwYXRocyIsImxvY2F0aW9uIiwicmVwbGFjZSIsImNvbmNhdCIsIlJlYWN0IiwiY3JlYXRlRWxlbWVudCIsInN0eWxlIiwicGFkZGluZyIsInRleHRBbGlnbiIsImNvbG9yIiwiVVBMT0FEX1VSTCIsIkRFTEVURV9VUkwiLCJBTExPV0VEX1RZUEVTIiwiQ2xvdWRpbmFyeVVybFVwbG9hZCIsIl9yZWYiLCJfY3VzdG9tJGlzTXVsdGlwbGUiLCJwcm9wZXJ0eSIsInJlY29yZCIsIm9uQ2hhbmdlIiwicGFyYW1zIiwiY3VzdG9tIiwiaXNNdWx0aXBsZSIsImN1cnJlbnRWYWx1ZSIsImZsYXQiLCJnZXQiLCJwYXRoIiwidXJscyIsIkFycmF5IiwiaXNBcnJheSIsIl91c2VTdGF0ZSIsInVzZVN0YXRlIiwiX3VzZVN0YXRlMiIsIl9zbGljZWRUb0FycmF5IiwidXBsb2FkaW5nIiwic2V0VXBsb2FkaW5nIiwiX3VzZVN0YXRlMyIsIl91c2VTdGF0ZTQiLCJlcnJvciIsInNldEVycm9yIiwidXBsb2FkRmlsZSIsIl9yZWYyIiwiX2FzeW5jVG9HZW5lcmF0b3IiLCJfcmVnZW5lcmF0b3IiLCJtIiwiX2NhbGxlZSIsImZpbGUiLCJmb3JtRGF0YSIsInJlcyIsImVyciIsImRhdGEiLCJ3IiwiX2NvbnRleHQiLCJuIiwiRm9ybURhdGEiLCJhcHBlbmQiLCJmZXRjaCIsIm1ldGhvZCIsImJvZHkiLCJjcmVkZW50aWFscyIsInYiLCJvayIsImpzb24iLCJtZXNzYWdlIiwic3RhdHVzVGV4dCIsIkVycm9yIiwiYSIsInVybCIsIl94IiwiYXBwbHkiLCJhcmd1bWVudHMiLCJvbkZpbGVzU2VsZWN0ZWQiLCJfcmVmMyIsIl9jYWxsZWUyIiwiZmlsZXMiLCJuZXdVcmxzIiwiX2l0ZXJhdG9yIiwiX3N0ZXAiLCJfdCIsIl90MiIsIl9jb250ZXh0MiIsInAiLCJfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlciIsInMiLCJkb25lIiwidmFsdWUiLCJwdXNoIiwiZSIsImYiLCJfdG9Db25zdW1hYmxlQXJyYXkiLCJfeDIiLCJkZWxldGVGcm9tQ2xvdWRpbmFyeSIsIl9yZWY0IiwiX2NhbGxlZTMiLCJfY29udGV4dDMiLCJpbmNsdWRlcyIsImhlYWRlcnMiLCJKU09OIiwic3RyaW5naWZ5IiwiX3gzIiwiaGFuZGxlUmVtb3ZlIiwiX3JlZjUiLCJfY2FsbGVlNCIsImluZGV4IiwidXJsVG9SZW1vdmUiLCJfY29udGV4dDQiLCJmaWx0ZXIiLCJfIiwiaSIsIl94NCIsIkZvcm1Hcm91cCIsIkxhYmVsIiwibGFiZWwiLCJtYXJnaW5Cb3R0b20iLCJEcm9wWm9uZSIsIm11bHRpcGxlIiwidmFsaWRhdGUiLCJtaW1lVHlwZXMiLCJtYXhTaXplIiwiQm9vbGVhbiIsIm1hcCIsIkRyb3Bab25lSXRlbSIsImtleSIsImZpbGVuYW1lIiwic3BsaXQiLCJwb3AiLCJzcmMiLCJvblJlbW92ZSIsIkltYWdlVXJsU2hvdyIsImNvbWJpbmVXaXRoTWFpbiIsIm1haW4iLCJtYWluQXJyIiwibGVuZ3RoIiwiZGlzcGxheSIsImZsZXhEaXJlY3Rpb24iLCJmbGV4V3JhcCIsImdhcCIsImFsaWduSXRlbXMiLCJhbHQiLCJ3aWR0aCIsImhlaWdodCIsIm9iamVjdEZpdCIsImJvcmRlclJhZGl1cyIsImJvcmRlciIsImZsZXhTaHJpbmsiLCJJbWFnZUxpc3RDZWxsIiwiaW1hZ2VzIiwiU1RBVFVTRVMiLCJiZyIsIk9yZGVyU3RhdHVzTGlzdCIsIl9yZWNvcmQkaWQiLCJfcmVjb3JkJHBhcmFtcyIsIl9yZWNvcmQkcGFyYW1zMiIsIl9yZXNvdXJjZSRpZCIsInJlc291cmNlIiwid2hlcmUiLCJjdXJyZW50U3RhdHVzIiwic3RhdHVzIiwic2V0U3RhdHVzIiwibG9hZGluZyIsInNldExvYWRpbmciLCJfdXNlU3RhdGU1IiwiX3VzZVN0YXRlNiIsIl91c2VTdGF0ZTciLCJfdXNlU3RhdGU4Iiwib3BlbiIsInNldE9wZW4iLCJjb250YWluZXJSZWYiLCJ1c2VSZWYiLCJvcmRlcklkIiwiaWQiLCJfaWQiLCJyZXNvdXJjZUlkIiwic3RhdHVzTWV0YSIsImZpbmQiLCJfdXNlU3RhdGU5IiwiX3VzZVN0YXRlMCIsImRyb3Bkb3duUmVjdCIsInNldERyb3Bkb3duUmVjdCIsImJ1dHRvblJlZiIsImRyb3Bkb3duUmVmIiwiaXNTaG93UGFnZSIsImNsb3NlIiwiaW5DZWxsIiwiY3VycmVudCIsImNvbnRhaW5zIiwidGFyZ2V0IiwiaW5Ecm9wZG93biIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJoYW5kbGVTZWxlY3QiLCJuZXdTdGF0dXMiLCJfZGF0YSRub3RpY2UiLCJvcmlnaW4iLCJmb3JtIiwibm90aWNlIiwidHJpZ2dlclBhZGRpbmciLCJ0cmlnZ2VyTWluV2lkdGgiLCJ0cmlnZ2VyRm9udFNpemUiLCJ0cmlnZ2VyR2FwIiwiZG90U2l6ZSIsImRyb3Bkb3duTWluV2lkdGgiLCJvcHRpb25QYWRkaW5nIiwib3B0aW9uRm9udFNpemUiLCJyZWYiLCJtaW5XaWR0aCIsInBvc2l0aW9uIiwib25DbGljayIsInN0b3BQcm9wYWdhdGlvbiIsIm9uTW91c2VEb3duIiwiZm9udFNpemUiLCJmb250V2VpZ2h0IiwidGl0bGUiLCJ0eXBlIiwiZGlzYWJsZWQiLCJwcmV2ZW50RGVmYXVsdCIsIm91dGxpbmUiLCJiYWNrZ3JvdW5kIiwiY3Vyc29yIiwiYm94U2hhZG93IiwidHJhbnNpdGlvbiIsIm9uTW91c2VFbnRlciIsImN1cnJlbnRUYXJnZXQiLCJvbk1vdXNlTGVhdmUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJmbGV4Iiwib3BhY2l0eSIsImNyZWF0ZVBvcnRhbCIsInJvbGUiLCJsZWZ0IiwidG9wIiwiYm90dG9tIiwibWF4SGVpZ2h0Iiwib3ZlcmZsb3ciLCJ6SW5kZXgiLCJpZHgiLCJpc1NlbGVjdGVkIiwiaXNMYXN0IiwiYm9yZGVyQm90dG9tIiwibWFyZ2luVG9wIiwiR2JwQW1vdW50Q2VsbCIsInBlbmNlIiwiTnVtYmVyIiwiaXNOYU4iLCJTdHJpbmciLCJwb3VuZHMiLCJJbnRsIiwiTnVtYmVyRm9ybWF0IiwiY3VycmVuY3kiLCJtaW5pbXVtRnJhY3Rpb25EaWdpdHMiLCJtYXhpbXVtRnJhY3Rpb25EaWdpdHMiLCJmb3JtYXQiLCJmb3JtYXRHYnAiLCJPcmRlckl0ZW1zU2hvdyIsIl9mbGF0JGdldCIsIml0ZW1zIiwidG90YWxBbW91bnQiLCJhcnIiLCJzdWJ0b3RhbFBlbmNlIiwicmVkdWNlIiwic3VtIiwiaXRlbSIsInByaWNlQW1vdW50IiwicXVhbnRpdHkiLCJzaGlwcGluZ1BlbmNlIiwiTWF0aCIsIm1heCIsIl9pdGVtJHF1YW50aXR5IiwiX2l0ZW0kcHJpY2VBbW91bnQiLCJfaXRlbSRxdWFudGl0eTIiLCJwcm9kdWN0SW1hZ2UiLCJqdXN0aWZ5Q29udGVudCIsInByb2R1Y3ROYW1lIiwicHJvZHVjdFNsdWciLCJwYWRkaW5nVG9wIiwiYm9yZGVyVG9wIiwibWF4V2lkdGgiLCJtYXJnaW5MZWZ0IiwiQWRtaW5KUyIsIlVzZXJDb21wb25lbnRzIiwiQ29tcG9uZW50MCIsIkNvbXBvbmVudDEiLCJDb21wb25lbnQyIiwiQ29tcG9uZW50MyIsIkNvbXBvbmVudDQiLCJDb21wb25lbnQ1IiwiQ29tcG9uZW50NiIsIkNvbXBvbmVudDciLCJDb21wb25lbnQ4IiwiQ29tcG9uZW50OSIsIkNvbXBvbmVudDEwIiwiQ29tcG9uZW50MTEiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7RUFFQTtFQUNBO0VBQ0E7RUFDQTtFQUNBLElBQU1BLDJCQUEyQixHQUFHLFNBQTlCQSwyQkFBMkJBLEdBQVM7RUFDeENDLEVBQUFBLGVBQVMsQ0FBQyxZQUFNO0VBQUEsSUFBQSxJQUFBQyxtQkFBQSxDQUFBO01BQ2QsSUFBTUMsUUFBUSxHQUFJLE9BQU9DLE1BQU0sS0FBSyxXQUFXLEtBQUEsQ0FBQUYsbUJBQUEsR0FBSUUsTUFBTSxDQUFDQyxXQUFXLE1BQUEsSUFBQSxJQUFBSCxtQkFBQSxLQUFBLEtBQUEsQ0FBQSxJQUFBLENBQUFBLG1CQUFBLEdBQWxCQSxtQkFBQSxDQUFvQkksS0FBSyxNQUFBLElBQUEsSUFBQUosbUJBQUEsS0FBQSxLQUFBLENBQUEsR0FBQSxLQUFBLENBQUEsR0FBekJBLG1CQUFBLENBQTJCQyxRQUFRLENBQUEsSUFBSyxRQUFRLENBQUE7TUFDbkdDLE1BQU0sQ0FBQ0csUUFBUSxDQUFDQyxPQUFPLElBQUFDLE1BQUEsQ0FBSU4sUUFBUSxFQUFBLG9CQUFBLENBQW9CLENBQUMsQ0FBQTtLQUN6RCxFQUFFLEVBQUUsQ0FBQyxDQUFBO0lBRU4sb0JB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
