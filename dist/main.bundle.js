/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ (() => {

eval("var labels = document.querySelectorAll('.pc_label');\nlabels.forEach(function () {\n  this.addEventListener('change', function (event) {\n    var input = event.target;\n    var loader = event.target.parentElement.parentElement.parentElement.querySelector('.loading');\n    var card = event.target.parentElement.parentElement.parentElement.querySelector('.card');\n    loader.style.visibility = 'visible';\n    card.style.opacity = '0.6';\n    fetch(\"/pc/\".concat(input.id), {\n      method: 'PUT',\n      body: JSON.stringify({\n        'label': input.value\n      })\n    });\n    setTimeout(function () {\n      loader.style.visibility = 'hidden';\n      card.style.opacity = '1';\n    }, 1500);\n  });\n});\nvar inputs = document.querySelector('.data').querySelectorAll('input');\nvar textareas = document.querySelector('.data').querySelectorAll('textarea');\nvar pcName = document.querySelector('#pc_name').value;\ninputs.forEach(function (input) {\n  input.addEventListener('change', function () {\n    var inputId = input.id;\n    fetch(\"/pc/\".concat(pcName), {\n      method: 'PUT',\n      body: JSON.stringify({\n        'field': inputId,\n        'value': input.value\n      })\n    }).then(function () {\n      input.parentElement.classList.toggle('saved');\n      setTimeout(function () {\n        input.parentElement.classList.toggle('saved');\n      }, 1000);\n    });\n  });\n});\ntextareas.forEach(function (input) {\n  input.addEventListener('change', function () {\n    var inputId = input.id;\n    fetch(\"/pc/\".concat(pcName), {\n      method: 'PUT',\n      body: JSON.stringify({\n        'field': inputId,\n        'value': input.value\n      })\n    }).then(function () {\n      input.parentElement.classList.toggle('saved');\n      setTimeout(function () {\n        input.parentElement.classList.toggle('saved');\n      }, 1000);\n    });\n  });\n});\nvar delButton = document.querySelector('#delete');\ndelButton.addEventListener('click', function () {\n  fetch(\"/pc/\".concat(pcName), {\n    method: 'DELETE'\n  }).then(function () {\n    window.location.assign(window.location.origin);\n  });\n});\n\n//# sourceURL=webpack://pcnetinfo-2/./index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./index.js"]();
/******/ 	
/******/ })()
;