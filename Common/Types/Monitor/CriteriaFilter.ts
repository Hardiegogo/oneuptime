export enum CheckOn {
    ResponseTime = 'Response Time (in ms)',
    ResponseCode = 'Response Code',
    ResponseHeader = 'Response Header',
    ResponseBody = 'Response Body',
    IsOnline = 'Is Online',
    IsOffline = 'Is Offline',
}

export interface CriteriaFilter {
    checkOn: CheckOn;
    filterType: FilterType | undefined;
    value: string | number | undefined;
}

export enum FilterType {
    EqualTo = 'Equal To',
    NotEqualTo = 'Not Equal To',
    GreaterThan = 'Greater Than',
    LessThan = 'Less Than',
    GreaterThanOrEqualTo = 'Greater Than Or Equal To',
    LessThanOrEqualTo = 'Less Than Or Equal To',
    Contains = 'Contains',
    NotContains = 'Not Contains',
    StartsWith = 'Starts With',
    EndsWith = 'Ends With',
    IsEmpty = 'Is Empty',
    IsNotEmpty = 'Is Not Empty',
}

export enum FilterCondition {
    All = 'All',
    Any = 'Any',
}
