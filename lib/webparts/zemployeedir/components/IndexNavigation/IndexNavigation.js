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
import './IndexNavBar.scss';
import { Search } from '../Search';
import { Pivot, PivotItem } from '@fluentui/react/lib/Pivot';
var IndexNavigation = /** @class */ (function (_super) {
    __extends(IndexNavigation, _super);
    function IndexNavigation() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Event handler for selecting a tab in the navigation
         */
        _this._handleIndexSelect = function (item, ev) {
            _this.props.onIndexSelect(item.props.linkText);
        };
        return _this;
    }
    IndexNavigation.prototype.shouldComponentUpdate = function (nextProps, nextState, nextContext) {
        // Component should update only if the selected tab has changed.
        // This check helps to avoid unnecessary renders
        return this.props.selectedIndex !== nextProps.selectedIndex;
    };
    IndexNavigation.prototype.render = function () {
        // build the list of alphabet letters A..Z
        // eslint-disable-next-line prefer-spread
        var az = Array.apply(null, { length: 26 }).map(function (x, i) { return String.fromCharCode(65 + i); });
        if (this.props.locale === "sv-SE") {
            az.push('Å', 'Ä', 'Ö');
        }
        // for each letter, create a PivotItem component
        var indexes = [];
        indexes.push(React.createElement(PivotItem, { linkText: 'ALL', itemKey: 'ALL', className: 'pivotstyle' }));
        indexes.push(az.map(function (index) { return React.createElement(PivotItem, { linkText: index, itemKey: index, key: index, className: 'pivotstyle' }); }));
        // as the last tab in the navigation, add the Search option
        // <PivotItem linkText="Search" itemKey='Search'> </PivotItem>
        //searchNavigation
        // const searchindexes: JSX.Element[]=[];
        // searchindexes
        return (React.createElement("div", { className: "indexNavigation" },
            React.createElement(Pivot, { className: 'Navigation', onLinkClick: this._handleIndexSelect, selectedKey: this.props.selectedIndex }, indexes),
            React.createElement("div", { className: 'searchbar' },
                React.createElement(Search, { searchQuery: this.props.searchQuery, onSearch: this.props.onSearch, onClear: this.props.onSearchClear }))));
    };
    return IndexNavigation;
}(React.Component));
export { IndexNavigation };
//# sourceMappingURL=IndexNavigation.js.map