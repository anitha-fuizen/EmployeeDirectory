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
import { SPHttpClient } from '@microsoft/sp-http';
import './../Zemployeedir.module.scss';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import { MessageBar, MessageBarType } from '@fluentui/react/lib/MessageBar';
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";
import { IndexNavigation } from '../IndexNavigation';
import { PeopleList } from '../PeopleList';
import * as strings from 'ZemployeedirWebPartStrings';
// const slice: any = require('lodash/slice');
var Zemployeedir = /** @class */ (function (_super) {
    __extends(Zemployeedir, _super);
    function Zemployeedir(props) {
        var _this = _super.call(this, props) || this;
        _this._handleIndexSelect = function (index) {
            // switch the current tab to the tab selected in the navigation
            // and reset the search query
            _this.setState({
                selectedIndex: index,
                searchQuery: ''
            }, function () {
                // load information about people matching the selected tab
                this._loadPeopleInfo(index, null);
            });
            console.log(index);
        };
        _this._handleSearch = function (searchQuery) {
            // activate the Search tab in the navigation and set the
            // specified text as the current search query
            _this.setState({
                selectedIndex: 'Search',
                searchQuery: searchQuery
            }, function () {
                // load information about people matching the specified search query
                this._loadPeopleInfo(null, searchQuery);
            });
        };
        _this._handleSearchClear = function () {
            // activate the A tab in the navigation and clear the previous search query
            _this.setState({
                selectedIndex: 'ALL',
                searchQuery: ''
            }, function () {
                // load information about people   ALL
                this._loadPeopleInfo('ALL', null);
            });
        };
        _this.state = {
            loading: false,
            errorMessage: null,
            selectedIndex: 'ALL',
            searchQuery: '',
            people: [],
        };
        return _this;
    }
    /**
     * Loads information about people using SharePoint Search
     * @param index Selected tab in the index navigation or 'Search', if the user is searching
     * @param searchQuery Current search query or empty string if not searching
     */
    Zemployeedir.prototype._loadPeopleInfo = function (index, searchQuery) {
        var _this = this;
        // update the UI notifying the user that the component will now load its data
        // clear any previously set error message and retrieved list of people
        this.setState({
            loading: true,
            errorMessage: null,
            people: []
        });
        var headers = new Headers();
        // suppress metadata to minimize the amount of data loaded from SharePoint
        headers.append("accept", "application/json;odata.metadata=none");
        // if no search query has been specified, retrieve people whose last name begins with the
        // specified letter. if a search query has been specified, escape any ' (single quotes)
        // by replacing them with two '' (single quotes). Without this, the search query would fail
        // if (query.lastIndexOf('*') !== query.length - 1) {
        //   query += '*';,
        // }
        // retrieve information about people using SharePoint People Search
        // sort results ascending by the last name
        var requiredUrl = '';
        //let query: string;  
        var query = searchQuery === null ? "".concat(index) : searchQuery.replace(/'/g, "''");
        if (searchQuery === null && index === 'ALL') {
            console.log(index, searchQuery);
            // requiredUrl="/_api/web/lists/getbytitle('EmpDirectory')/Items?$select=firstName,LastName,PreferredName,WorkEmail,PictureURL,PhoneNumber,MobileNumber,JobTitle,Department,Skills,PastProjects";
            requiredUrl = "/_api/web/lists/getbytitle('EmployeeDetails')/Items?$select=Name/FirstName,Name/LastName,Name/EMail,Name/Department,MobileNumber,JobTitle,DateofJoining&$expand=Name";
        }
        else {
            requiredUrl = "/_api/web/lists/getbytitle('EmployeeDetails')/Items?$select=Name/FirstName,Name/LastName,Name/EMail,Name/Department,MobileNumber,JobTitle,DateofJoining&$expand=Name&$filter=startswith(Name/FirstName,'" + query + "')";
        }
        console.log(this.props.webUrl + requiredUrl);
        this.props.spHttpClient
            .get("".concat(this.props.webUrl).concat(requiredUrl), SPHttpClient.configurations.v1, {
            headers: headers
        })
            .then(function (res) {
            console.log(res.json);
            return res.json();
        })
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .then(function (res) {
            var _a;
            console.log(res);
            if (res.error) {
                // There was an error loading information about people.
                // Notify the user that loading data is finished and return the
                // error message that occurred
                _this.setState({
                    loading: false,
                    errorMessage: res.error.message
                });
                console.log(res.error.message);
                return;
            }
            console.log(res.value);
            if (!res.value) {
                // No results were found. Notify the user that loading data is finished
                _this.setState({
                    loading: false
                });
                return;
            }
            // convert the SharePoint People Search results to an array of people
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var people = (_a = res.value) === null || _a === void 0 ? void 0 : _a.map(function (x) {
                return {
                    name: x.Name.FirstName + x.Name.LastName,
                    mobile: x.MobileNumber,
                    email: x.Name.EMail,
                    function: x.JobTitle,
                    department: x.Name.Department,
                    DOJ: x.DateofJoining
                };
            });
            console.log(people);
            //const selectedIndex = this.state.selectedIndex;
            console.log(_this.state.searchQuery);
            // if (this.state.searchQuery === '') {
            //   // An Index is used to search people.
            //   //Reduce the people collection if the first letter of the lastName of the person is not equal to the selected index
            //   people = people.reduce((result: IPerson[], person: IPerson) => {
            //     if (person. firstName && person. firstName.indexOf(selectedIndex) === 0) {
            //       result.push(person);
            //       console.log(people)
            //        console.log(result)
            //     }
            //     return result;
            //   }, []);
            // }
            if (people.length > 0) {
                // notify the user that loading the data is finished and return the loaded information
                _this.setState({
                    loading: false,
                    people: people
                });
            }
            else {
                // People collection could be reduced to zero, so no results
                _this.setState({
                    loading: false
                });
                return;
            }
        }, function (error) {
            // An error has occurred while loading the data. Notify the user
            // that loading data is finished and return the error message.
            _this.setState({
                loading: false,
                errorMessage: error
            });
        })
            .catch(function (error) {
            // An exception has occurred while loading the data. Notify the user
            // that loading data is finished and return the exception.
            _this.setState({
                loading: false,
                errorMessage: error
            });
        });
    };
    /**
     * Retrieves the value of the particular managed property for the current search result.
     * If the property is not found, returns an empty string.
     * @param key Name of the managed property to retrieve from the search result
     * @param cells The array of cells for the current search result
     */
    Zemployeedir.prototype.componentDidMount = function () {
        // load information about people after the component has been
        // initiated on the page
        this._loadPeopleInfo(this.state.selectedIndex, null);
    };
    Zemployeedir.prototype.render = function () {
        var _a = this.state, loading = _a.loading, errorMessage = _a.errorMessage, selectedIndex = _a.selectedIndex, searchQuery = _a.searchQuery, people = _a.people;
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { className: 'peopleDirectory' },
                !loading &&
                    errorMessage &&
                    // if the component is not loading data anymore and an error message
                    // has been returned, display the error message to the user
                    React.createElement(MessageBar, { messageBarType: MessageBarType.error, isMultiline: false },
                        strings.ErrorLabel,
                        ": ",
                        errorMessage),
                React.createElement(WebPartTitle, { displayMode: this.props.displayMode, title: this.props.title, updateProperty: this.props.onTitleUpdate }),
                React.createElement(IndexNavigation, { selectedIndex: selectedIndex, searchQuery: searchQuery, onIndexSelect: this._handleIndexSelect, onSearch: this._handleSearch, onSearchClear: this._handleSearchClear, locale: this.props.locale }),
                loading &&
                    // if the component is loading its data, show the spinner
                    React.createElement(Spinner, { size: SpinnerSize.large, label: strings.LoadingSpinnerLabel }),
                !loading &&
                    !errorMessage &&
                    // if the component is not loading data anymore and no errors have occurred
                    // render the list of retrieved people
                    React.createElement("div", { className: "peoplegrid" },
                        React.createElement(PeopleList, { selectedIndex: selectedIndex, hasSearchQuery: searchQuery !== null, people: people, paginatedItems: people, allItems: people })))));
    };
    return Zemployeedir;
}(React.Component));
export { Zemployeedir };
//# sourceMappingURL=Zemployeedir.js.map