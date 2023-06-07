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
import { Persona, PersonaSize } from '@fluentui/react/lib/Persona';
import * as strings from 'ZemployeedirWebPartStrings';
//import styles from './PeopleList.module.scss';
import './NewPeopleList.scss';
import { Callout, DirectionalHint } from '@fluentui/react/lib/Callout';
import { PeopleCallout } from '../PeopleCallout';
//import { Pagination } from '@pnp/spfx-controls-react';
var pageSize = 8;
var PeopleList = /** @class */ (function (_super) {
    __extends(PeopleList, _super);
    //[x: string]: any;
    function PeopleList(props) {
        var _this = _super.call(this, props) || this;
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-explicit-any
        _this._onPersonaClicked = function (index, person) { return function (_event) {
            _this.setState({
                showCallOut: !_this.state.showCallOut,
                calloutElement: index,
                person: person
            });
        }; };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-function-return-type
        _this._onCalloutDismiss = function (_event) {
            _this.setState({
                showCallOut: false,
            });
        };
        _this.state = {
            showCallOut: false,
            calloutElement: null,
            person: null,
            paginatedItems: [],
            allItems: [],
        };
        _this._onPersonaClicked = _this._onPersonaClicked.bind(_this);
        _this._onCalloutDismiss = _this._onCalloutDismiss.bind(_this);
        return _this;
    }
    PeopleList.prototype.componentDidMount = function () {
        var items = this.props.people;
        console.log(items);
        this._getPage(1);
    };
    PeopleList.prototype._getPage = function (page) {
        // round a number up to the next largest integer.
        var roundupPage = Math.ceil(page);
        console.log(page, roundupPage, pageSize, this.props.people);
        this.setState({
            paginatedItems: this.props.people.slice((roundupPage - 1) * pageSize, (roundupPage * pageSize))
        });
        console.log(this.props.people);
        var arr = this.props.people;
        function compare(a, b) {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
        }
        var sortedarr = arr.sort(compare);
        console.log(sortedarr);
    };
    PeopleList.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null,
            React.createElement("div", { className: 'container' },
                this.props.people.length === 0 &&
                    (this.props.selectedIndex !== 'Search' ||
                        (this.props.selectedIndex === 'Search' &&
                            this.props.hasSearchQuery)) &&
                    // Show the 'No people found' message if no people have been retrieved
                    // and the user either selected a letter in the navigation or issued
                    // a search query (but not when navigated to the Search tab without
                    // providing a query yet)
                    this.props.people.length === 0 &&
                    React.createElement("div", { className: 'row' },
                        React.createElement("div", { className: 'ms-textAlignCenter' },
                            React.createElement("label", { color: 'red' }, strings.NoPeopleFoundLabel)),
                        "   "),
                this.props.people.length > 0 &&
                    React.createElement("div", { className: 'row' },
                        React.createElement("div", { className: 'applygrid' }, this.props.people.map(function (p, i) {
                            //const phone: string = p.phone && p.mobile ? `${p.phone}/${p.mobile}` : p.phone ? p.phone : p.mobile;
                            // const toggleClassName: string = this.state.toggleClass ? `ms-Icon--ChromeClose ${styles.isClose}` : "ms-Icon--ContactInfo";
                            return (React.createElement("div", { key: i, className: "persona_card" },
                                React.createElement(Persona, { onClick: _this._onPersonaClicked(i, p), text: p.name, secondaryText: p.email, tertiaryText: p.mobile, imageUrl: '/_layouts/15/userphoto.aspx?size=S&accountname=' + p.email, imageAlt: p.name, size: PersonaSize.size72, styles: { primaryText: { fontSize: '15px', margin: '2px', fontWeight: 500 }, root: { margin: '1px' }, secondaryText: { fontSize: '11.5px', margin: '2px' }, tertiaryText: { fontSize: '12.5px', margin: '2px' } } }),
                                React.createElement("div", { id: "callout".concat(i), onClick: _this._onPersonaClicked(i, p), className: "persona" },
                                    React.createElement("i", { className: "ms-Icon ms-Icon--ContactInfo", "aria-hidden": "false" })),
                                _this.state.showCallOut && _this.state.calloutElement === i && (React.createElement(Callout, { className: _this.state.showCallOut ? "calloutShow" : "callout", gapSpace: 2, target: "#callout".concat(i), isBeakVisible: false, beakWidth: 10, setInitialFocus: true, onDismiss: _this._onCalloutDismiss, directionalHint: DirectionalHint.leftBottomEdge, doNotLayer: false },
                                    React.createElement(PeopleCallout, { person: _this.state.person })))));
                        }))))));
    };
    return PeopleList;
}(React.Component));
export { PeopleList };
//# sourceMappingURL=PeopleList.js.map