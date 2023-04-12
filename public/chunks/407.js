exports.id = 407;
exports.ids = [407];
exports.modules = {

/***/ 963:
/***/ ((module) => {

// Exports
module.exports = {
	"product": "productbox_product__jvHvo",
	"box": "productbox_box__3xyp6",
	"edit": "productbox_edit__2zems",
	"links": "productbox_links__QA3qP",
	"delete": "productbox_delete__NIIPo"
};


/***/ }),

/***/ 9407:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _styles_productbox_module_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(963);
/* harmony import */ var _styles_productbox_module_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_styles_productbox_module_css__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _handelapi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5684);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var sweetalert__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4701);
/* harmony import */ var sweetalert__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(sweetalert__WEBPACK_IMPORTED_MODULE_4__);






function Productbox({ poster , title , rating , sells , price , id  }) {
    const [isdelete, setdelete] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
    function fn(text, count) {
        return text.slice(0, count) + (text.length > count ? "..." : "");
    }
    const deleteProduct = ()=>{
        sweetalert__WEBPACK_IMPORTED_MODULE_4___default()({
            title: "Are you sure?",
            text: "Remove This Product",
            icon: "warning",
            buttons: true,
            dangerMode: true
        }).then(async (willDelete)=>{
            if (willDelete) {
                const resdata = await (0,_handelapi__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z)("/manageproduct/" + id, "DELETE");
                if (resdata.error) {
                    sweetalert__WEBPACK_IMPORTED_MODULE_4___default()("Error", "This Product has been Not deleted!", {
                        icon: "error"
                    });
                } else {
                    sweetalert__WEBPACK_IMPORTED_MODULE_4___default()("Removed", "This Product has been deleted!", {
                        icon: "success"
                    });
                    setdelete(true);
                }
            }
        });
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: (_styles_productbox_module_css__WEBPACK_IMPORTED_MODULE_5___default().product),
        style: isdelete ? {
            opacity: 0.2
        } : null,
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: (_styles_productbox_module_css__WEBPACK_IMPORTED_MODULE_5___default().box),
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                        src: poster
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                        children: fn(title, 15)
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "star",
                        children: [
                            rating,
                            " Stars : Ratings"
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "star",
                        children: [
                            sells,
                            " Sells"
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "star",
                        children: [
                            price,
                            " RS"
                        ]
                    })
                ]
            }),
            isdelete ? "" : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: (_styles_productbox_module_css__WEBPACK_IMPORTED_MODULE_5___default().links),
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                        href: "/admin/product/" + id,
                        className: (_styles_productbox_module_css__WEBPACK_IMPORTED_MODULE_5___default().edit),
                        children: "Edit"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        className: (_styles_productbox_module_css__WEBPACK_IMPORTED_MODULE_5___default()["delete"]),
                        onClick: deleteProduct,
                        children: "Delete"
                    })
                ]
            })
        ]
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Productbox);


/***/ })

};
;