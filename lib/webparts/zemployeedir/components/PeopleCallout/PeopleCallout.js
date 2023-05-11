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
import './CalloutPeople.scss';
import * as strings from 'ZemployeedirWebPartStrings';
var PeopleCallout = /** @class */ (function (_super) {
    __extends(PeopleCallout, _super);
    function PeopleCallout(props) {
        var _this = _super.call(this, props) || this;
        _this._onCopyClicked = function (elementName) { return function (event) {
            var copyText = document.getElementById(elementName);
            var range = document.createRange();
            range.selectNode(copyText);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
            document.execCommand("copy");
            window.getSelection().removeAllRanges();
            event.target.className = "ms-Icon ms-Icon--StatusCircleCheckmark";
        }; };
        _this.state = {};
        return _this;
    }
    PeopleCallout.prototype.render = function () {
        return (React.createElement("div", { className: 'calloutCard' },
            React.createElement("h2", { className: "ms-font-xl" }, this.props.person.name),
            React.createElement("ul", { className: 'PeopleCallout' },
                this.props.person.function &&
                    React.createElement("li", null,
                        "Designation:",
                        this.props.person.function),
                this.props.person.department &&
                    React.createElement("li", null,
                        "Department:",
                        this.props.person.department),
                this.props.person.email &&
                    React.createElement("li", { id: "personcopyemail" },
                        React.createElement("i", { className: "ms-Icon ms-Icon--Mail icon", "aria-hidden": "true" }),
                        React.createElement("a", { href: "mailto:".concat(this.props.person.email), className: 'info' }, this.props.person.email),
                        React.createElement("i", { className: 'ms-Icon ms-Icon--Copy clipboard', "aria-hidden": "true", title: strings.CopyEmailLabel, onClick: this._onCopyClicked('personcopyemail') })))));
    };
    return PeopleCallout;
}(React.Component));
export { PeopleCallout };
//# sourceMappingURL=PeopleCallout.js.map