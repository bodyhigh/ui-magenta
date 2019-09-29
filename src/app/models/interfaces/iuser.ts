export interface IUser {
    roles:         string[];
    clientRefs:    any[];
    _id:           string;
    firstName:     string;
    lastName:      string;
    email:         string;
    password:      string;
    accountStatus: string;
    clients:       any[];
    artwork:       any[];
    addresses:     any[];
    createDate:    string;
    // __v:           number;
}
