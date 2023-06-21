import * as React from 'react';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import  './../Zemployeedir.module.scss';
import {
  Spinner,
  SpinnerSize
} from '@fluentui/react/lib/Spinner';
import {
  MessageBar,
  MessageBarType
} from '@fluentui/react/lib/MessageBar';
import {WebPartTitle} from "@pnp/spfx-controls-react/lib/WebPartTitle"

import {
  IZemployeedirProps,
  IZemployeedirState,
  IPerson,
} from '.';
import { IndexNavigation } from '../IndexNavigation';

import { PeopleList } from '../PeopleList';
import * as strings from 'ZemployeedirWebPartStrings';


// const slice: any = require('lodash/slice');

export class Zemployeedir extends React.Component<IZemployeedirProps, IZemployeedirState> {
  constructor(props: IZemployeedirProps) {
    super(props);

    this.state = {
      loading: false,
      errorMessage: null,
      selectedIndex:'ALL',
      searchQuery: '',
      people: [],
      
    };
    
  }
  
  private _handleIndexSelect = (index: string): void => {
    // switch the current tab to the tab selected in the navigation
    // and reset the search query
    this.setState({
      selectedIndex: index,
      searchQuery: ''
    },
      function () {
        // load information about people matching the selected tab
        this._loadPeopleInfo(index, null);
      });
       console.log(index);
  }

  private _handleSearch = (searchQuery: string): void => {
    
    // activate the Search tab in the navigation and set the
    // specified text as the current search query
    console.log(searchQuery);
    
    if(searchQuery===""){
      console.log('IT IS WORKING');
      this.setState({
        selectedIndex: 'ALL',
        searchQuery: ''
      },
        function () {
          // load information about people   ALL
          this._loadPeopleInfo('ALL', null);
        });
      
    }else{
    this.setState({
      selectedIndex: 'Search',
      searchQuery: searchQuery
     
    },
      function () {
        // load information about people matching the specified search query
        this._loadPeopleInfo(null, searchQuery);
      });
    }
  }

  private _handleSearchClear = (): void => {
    // activate the A tab in the navigation and clear the previous search query
    this.setState({
      selectedIndex: 'ALL',
      searchQuery: ''
    },
      function () {
        // load information about people   ALL
        this._loadPeopleInfo('ALL', null);
      });
  }

  /**
   * Loads information about people using SharePoint Search
   * @param index Selected tab in the index navigation or 'Search', if the user is searching
   * @param searchQuery Current search query or empty string if not searching
   */
  private _loadPeopleInfo(index: string, searchQuery: string): void {
    // update the UI notifying the user that the component will now load its data
    // clear any previously set error message and retrieved list of people
    this.setState({
      loading: true,
      errorMessage: null,
      people: []
    });

    const headers: HeadersInit = new Headers();
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
      let requiredUrl='';
      //let query: string;  
    const  query = searchQuery === null ? `${index}` : searchQuery.replace(/'/g, `''`);
      if(searchQuery===null && index==='ALL')
      { 
       console.log(index,searchQuery);
      // requiredUrl="/_api/web/lists/getbytitle('EmpDirectory')/Items?$select=firstName,LastName,PreferredName,WorkEmail,PictureURL,PhoneNumber,MobileNumber,JobTitle,Department,Skills,PastProjects";
       requiredUrl="/_api/web/lists/getbytitle('EmployeeDetails')/Items?$select=EmpName/FirstName,EmpName/LastName,EmpName/EMail,EmpName/Department,Contactno,DateofJoining,JobTitle&$expand=EmpName";
      }
   else  {
    
   requiredUrl="/_api/web/lists/getbytitle('EmployeeDetails')/Items?$select=EmpName/FirstName,EmpName/LastName,EmpName/EMail,EmpName/Department,Contactno,DateofJoining,JobTitle&$expand=EmpName&$filter=startswith(EmpName/FirstName,'"+query+"')";
   } 
console.log(this.props.webUrl+ requiredUrl)
      this.props.spHttpClient 
      .get(`${this.props.webUrl}${requiredUrl}` , SPHttpClient.configurations.v1, {
      headers: headers
      })
      .then((res: SPHttpClientResponse): Promise<void> => {
        console.log(res.json)
        return res.json();
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((res: any): void => {
        console.log(res)

        if (res.error) {
          // There was an error loading information about people.
          // Notify the user that loading data is finished and return the
          // error message that occurred
          this.setState({
            loading: false,
            errorMessage: res.error.message
          });
          console.log(res.error.message)
          return;

        }
        console.log(res.value)
      
        if (!res.value) {
          // No results were found. Notify the user that loading data is finished
          this.setState({
            loading: false
          });
          return;
        }
        // convert the SharePoint People Search results to an array of people
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const people: IPerson[] = res.value?.map((x:any) => {
          return {
            name:x.EmpName.FirstName+' '+x.EmpName.LastName,
            mobile:x.Contactno,
            email: x.EmpName.EMail,
            function: x.JobTitle,
            department:x.EmpName.Department,
            DOJ:x.DateofJoining
          
          
          };
          
        });
        console.log(people);
        //const selectedIndex = this.state.selectedIndex;
console.log(this.state.searchQuery);
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
          this.setState({
            loading: false,
            people: people
          });
        }
        else {
          // People collection could be reduced to zero, so no results
          this.setState({
            loading: false
            
          });
          return;
        }
      }, (error): void => {
        // An error has occurred while loading the data. Notify the user
        // that loading data is finished and return the error message.
        this.setState({
          loading: false,
          errorMessage: error
        });
      })
      .catch((error): void => {
        // An exception has occurred while loading the data. Notify the user
        // that loading data is finished and return the exception.
        this.setState({
          loading: false,
          errorMessage: error
        });
      });
  }

  /**
   * Retrieves the value of the particular managed property for the current search result.
   * If the property is not found, returns an empty string.
   * @param key Name of the managed property to retrieve from the search result
   * @param cells The array of cells for the current search result
   */

  public componentDidMount(): void {
    // load information about people after the component has been
    // initiated on the page
    console.log(this.state.selectedIndex);
    this._loadPeopleInfo(this.state.selectedIndex, null);
    console.log(this.state.people);
  }

  public render(): React.ReactElement<IZemployeedirProps> {
    const { loading, errorMessage, selectedIndex, searchQuery, people,
     } = this.state;

    return (
      <>
      {/* className={styles.peopleDirectory} */}
      <div className='peopleDirectory' >
        {!loading &&
          errorMessage &&
          // if the component is not loading data anymore and an error message
          // has been returned, display the error message to the user
          <MessageBar
            messageBarType={MessageBarType.error}
            isMultiline={false}>{strings.ErrorLabel}: {errorMessage}</MessageBar>
        }
        <WebPartTitle
          displayMode={this.props.displayMode}
          title={this.props.title}
          updateProperty={this.props.onTitleUpdate} />
        <IndexNavigation
          selectedIndex={selectedIndex}
          searchQuery={searchQuery}
          onIndexSelect={this._handleIndexSelect}
          onSearch={this._handleSearch}
          onSearchClear={this._handleSearchClear}
          locale={this.props.locale} />
        {loading &&
          // if the component is loading its data, show the spinner
          <Spinner size={SpinnerSize.large} label={strings.LoadingSpinnerLabel} />
        }
        {!loading &&
          !errorMessage &&
          // if the component is not loading data anymore and no errors have occurred
          // render the list of retrieved people
          <div className="peoplegrid">
          <PeopleList
            selectedIndex={selectedIndex}
             hasSearchQuery={searchQuery !== null}
            people={people}
            paginatedItems={people} allItems={people} />
          </div>
        }
        
      </div>
      </>
    );
  }
}


