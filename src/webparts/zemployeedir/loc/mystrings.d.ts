declare interface IZemployeedirWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  AppLocalEnvironmentSharePoint: string;
  AppLocalEnvironmentTeams: string;
  AppLocalEnvironmentOffice: string;
  AppLocalEnvironmentOutlook: string;
  AppSharePointEnvironment: string;
  AppTeamsTabEnvironment: string;
  AppOfficeEnvironment: string;
  AppOutlookEnvironment: string;
  SearchButtonText: string;
  AllButtonText:string;
  LoadingSpinnerLabel: string;
  NoPeopleFoundLabel: string;
  SearchBoxPlaceholder: string;
  ErrorLabel: string;
  SkillsLabel: string;
  ProjectsLabel: string;
  CopyEmailLabel: string;
  CopyPhoneLabel: string;
  CopyMobileLabel: string;
}

declare module 'ZemployeedirWebPartStrings' {
  const strings: IZemployeedirWebPartStrings;
  export = strings;
}
