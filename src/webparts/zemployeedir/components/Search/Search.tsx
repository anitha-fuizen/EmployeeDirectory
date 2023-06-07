import * as React from 'react';
import  './SearchPeople.scss';
import { ISearchProps } from '.';
import {SearchBox, ISearchBoxStyles} from '@fluentui/react/lib/SearchBox';
import * as strings from 'ZemployeedirWebPartStrings';
const searchBoxStyles: Partial<ISearchBoxStyles> = { root: { width: 300 } };
export class Search extends React.Component<ISearchProps, {}> {
  
  private _handleSearch = (searchQuery: string): void => {
    this.props.onSearch(searchQuery);
  }

  private _handleClear = (): void => {
    this.props.onClear();
  }

  public render(): React.ReactElement<ISearchProps> {
    return (
      <div>
      <div className='search'>
        <SearchBox 
        
          placeholder={strings.SearchBoxPlaceholder}
          onChange={(_, newValue) =>this._handleSearch }
          onSearch={this._handleSearch}
          onClear={this._handleClear}
          value={this.props.searchQuery}
          styles={searchBoxStyles}
          className={'searchBox'}
        />
        {/* <SearchBox
          placeholder="Department"
          onSearch={this._handleSearch}
          onClear={this._handleClear}
          value={this.props.searchQuery}
          
          className={'searchBox'}
        />
        <SearchBox
          placeholder="JobTitle"
          onSearch={this._handleSearch}
          onClear={this._handleClear}
          value={this.props.searchQuery}
          
          className={'searchBox'}
        />
        <SearchBox
          placeholder={strings.SearchBoxPlaceholder}
          onSearch={this._handleSearch}
          onClear={this._handleClear}
          value={this.props.searchQuery}
          
          className={'searchBox'}
        /> */}
      </div>
      </div>
    );
  }
}
