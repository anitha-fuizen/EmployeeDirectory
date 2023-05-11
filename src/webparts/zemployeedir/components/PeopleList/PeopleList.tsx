import * as React from 'react';
import { IPeopleListProps } from '.';
import {
  Persona,
  PersonaSize
} from '@fluentui/react/lib/Persona';


import * as strings from 'ZemployeedirWebPartStrings';
//import styles from './PeopleList.module.scss';
import './NewPeopleList.scss'
import { Callout, DirectionalHint } from '@fluentui/react/lib/Callout';
import { IPeopleListState } from './IPeopleListState';
import { PeopleCallout } from '../PeopleCallout';
import { IPerson } from '../Zemployeedir';
//import { PeopleDirectory } from '../PeopleDirectory';
// import { Pagination } from "@pnp/spfx-controls-react/lib/pagination";
// export interface IPnPPaginationState {
//   allItems: ISPItem[];
//   paginatedItems: ISPItem[];
// }
const pageSize: number = 6;
export class PeopleList extends React.Component<IPeopleListProps, IPeopleListState> {
  //[x: string]: any;
  constructor(props: IPeopleListProps) {
    super(props);

    this.state = {
      showCallOut: false,
      calloutElement: null,
      person: null,
      paginatedItems:[],
      allItems:[],

    };

    this._onPersonaClicked = this._onPersonaClicked.bind(this);
    this._onCalloutDismiss = this._onCalloutDismiss.bind(this);
  }
  public componentDidMount(): void {
    const items: IPerson[] = this.props.people;
    console.log(items);
   this._getPage(1);
  }
  public _getPage(page: number):void {
    // round a number up to the next largest integer.
    const roundupPage = Math.ceil(page);
    console.log(page, roundupPage);
    this.setState({
      paginatedItems: this.props.people.slice((roundupPage-1) * pageSize, (roundupPage * pageSize) )
    });
    console.log(this.state.paginatedItems)
  }

  public render(): React.ReactElement<IPeopleListProps> {
    return (
      <div >
        <div className='container'>
         
            {
               this.props.people.length === 0 &&
               (this.props.selectedIndex !== 'Search' ||
                  (this.props.selectedIndex === 'Search' &&
                    this.props.hasSearchQuery)) &&
              // Show the 'No people found' message if no people have been retrieved
              // and the user either selected a letter in the navigation or issued
              // a search query (but not when navigated to the Search tab without
              // providing a query yet)
              this.props.people.length === 0 &&
              <div className='row'>
              <div className='ms-textAlignCenter'><label color='red'>{strings.NoPeopleFoundLabel}</label></div>   </div>}
         
             {/* this.props.people.map(p => <Persona primaryText={p.name} secondaryText={p.email} tertiaryText={p.phone} imageUrl={p.photoUrl} imageAlt={p.name} size={PersonaSize.size72} />) */}
           
            {this.props.people.length > 0 &&
                     <div className='row'>
                       <div className='applygrid'> 
              {/* // for each retrieved person, create a persona card with the retrieved
              // information */}
              
              {this.state.paginatedItems.map((p:IPerson, i: number) => {
                //const phone: string = p.phone && p.mobile ? `${p.phone}/${p.mobile}` : p.phone ? p.phone : p.mobile;
                // const toggleClassName: string = this.state.toggleClass ? `ms-Icon--ChromeClose ${styles.isClose}` : "ms-Icon--ContactInfo";
                return (
                   
                  <div key={i} className="persona_card" >
                 {console.log(p.photoUrl)}
                    <Persona onClick={this._onPersonaClicked(i, p)} 
                    text={p.name} secondaryText={p.email} 
                    tertiaryText={p.mobile}
                     imageUrl={'/_layouts/15/userphoto.aspx?size=S&accountname=' + p.email} 
                    imageAlt={p.name} size={PersonaSize.size72}
                    styles={{ primaryText: { fontSize: '13px',margin:'2px',fontWeight:500}, root: { margin: '1px' },secondaryText:{fontSize:'10.5px',margin:'2px'},tertiaryText:{fontSize:'12px',margin:'2px'} }
                             
                  }
                     />
                    <div id={`callout${i}`} onClick={this._onPersonaClicked(i, p)} className="persona" >
                    
                      <i className="ms-Icon ms-Icon--ContactInfo" aria-hidden="false"/>
                    </div>
                    {this.state.showCallOut && this.state.calloutElement === i && (
                      <Callout
                         className={this.state.showCallOut ? "calloutShow" : "callout"}
                        gapSpace={2}
                        target={`#callout${i}`}
                        isBeakVisible={false}
                        beakWidth={10}
                        setInitialFocus={true}
                        onDismiss={this._onCalloutDismiss}
                        directionalHint={DirectionalHint.leftBottomEdge}
                        doNotLayer={false}
                      >
                        <PeopleCallout person={this.state.person}/>
                      </Callout>
                    )}
                  </div>
                );
              })
            }             
  </div>
       {/* <Pagination
              currentPage={1}
              totalPages={Math.ceil((this.props.people.length / pageSize))}
              onChange={(page) => this._getPage(page)}
              limiter={2}
            />  */}
  </div>
            }
        </div>
      </div>
    );
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-explicit-any
  private _onPersonaClicked = (index: number, person: IPerson) => (_event: any) => {
    this.setState({
      showCallOut: !this.state.showCallOut,
      calloutElement: index,
      person: person
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-function-return-type
  private _onCalloutDismiss = (_event: any) => {
    this.setState({
      showCallOut: false,
    });
  }
 
}
