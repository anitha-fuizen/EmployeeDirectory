var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from 'react';
import './SearchPeople.scss';
import { SearchBox } from '@fluentui/react/lib/SearchBox';
import * as strings from 'ZemployeedirWebPartStrings';
var searchBoxStyles = { root: { width: 300 } };
var Search = /** @class */ (function (_super) {
    __extends(Search, _super);
    function Search() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._handleSearch = function (searchQuery) {
            _this.props.onSearch(searchQuery);
        };
        _this._handleClear = function () {
            _this.props.onClear();
        };
        return _this;
    }
    Search.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null,
            React.createElement("div", { className: 'search' },
                React.createElement(SearchBox, { placeholder: strings.SearchBoxPlaceholder, onChange: function (_, newValue) { return _this._handleSearch; }, onSearch: this._handleSearch, onClear: this._handleClear, value: this.props.searchQuery, styles: searchBoxStyles, className: 'searchBox' }))));
    };
    return Search;
}(React.Component));
export { Search };
//# sourceMappingURL=Search.js.map