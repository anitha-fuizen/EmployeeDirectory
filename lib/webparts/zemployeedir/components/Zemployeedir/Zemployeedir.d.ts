import * as React from 'react';
import './../Zemployeedir.module.scss';
import { IZemployeedirProps, IZemployeedirState } from '.';
export declare class Zemployeedir extends React.Component<IZemployeedirProps, IZemployeedirState> {
    constructor(props: IZemployeedirProps);
    private _handleIndexSelect;
    private _handleSearch;
    private _handleSearchClear;
    /**
     * Loads information about people using SharePoint Search
     * @param index Selected tab in the index navigation or 'Search', if the user is searching
     * @param searchQuery Current search query or empty string if not searching
     */
    private _loadPeopleInfo;
    /**
     * Retrieves the value of the particular managed property for the current search result.
     * If the property is not found, returns an empty string.
     * @param key Name of the managed property to retrieve from the search result
     * @param cells The array of cells for the current search result
     */
    componentDidMount(): void;
    render(): React.ReactElement<IZemployeedirProps>;
}
//# sourceMappingURL=Zemployeedir.d.ts.map