import * as React from 'react';
import { IPeopleListProps } from '.';
import './NewPeopleList.scss';
import { IPeopleListState } from './IPeopleListState';
export declare class PeopleList extends React.Component<IPeopleListProps, IPeopleListState> {
    constructor(props: IPeopleListProps);
    componentDidMount(): void;
    _getPage(page: number): void;
    render(): React.ReactElement<IPeopleListProps>;
    private _onPersonaClicked;
    private _onCalloutDismiss;
}
//# sourceMappingURL=PeopleList.d.ts.map