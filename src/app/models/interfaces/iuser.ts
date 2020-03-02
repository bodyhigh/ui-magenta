export interface IUser {
    roles:         string[];
    clientRefs:    any[];
    _id:           string;
    firstName:     string;
    lastName:      string;
    email:         string;
    // password:      string;
    accountStatus: string;
    clients:       any[];
    artwork:       any[];
    addresses:     any[];
    createDate:    string;
    // __v:           number;
}

export function objToIUserMapper(resObject:any): IUser {
    const mappedUser: IUser = {
      _id           : resObject._id,
      firstName     : resObject.firstName,
      lastName      : resObject.lastName,
      email         : resObject.email,
      accountStatus : resObject.accountStatus,
      roles         : resObject.roles,
      clientRefs    : resObject.clientRefs,
      clients       : resObject.clients,
      artwork       : resObject.artwork,
      addresses     : resObject.addresses,
      createDate    : resObject.createDate
    }
    return mappedUser;
}